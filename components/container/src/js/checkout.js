function process() {
    if (!validateForm('checkout'))
        return;
    
    if ($('#cb3').is(':checked')) {
        var url;
        if ($("#place_order_form #coupone").val().length > 3) {
            var coupone_code = $("#place_order_form #coupone").val()

            url = coupone_code + "/total-charge";
        } else {
            url = "1234/total-charge";
        }
        $.ajax({
            //url: "user/total-charge",
            //type: "GET",
            url: url,
            type: "POST",
            contentType: false,
            processData: false,
            beforeSend: function() {
                //$('#load').show();
                $('#place-order-btn').attr("disabled", "disabled").html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>');
            },
            timeout: 5000,
            success: function(data) {
                console.log(data);
                try {
                    json = JSON.parse(data);
                    if (json.success == true) {
                        var charge = json.data;
                        if (charge < 50) {
                            charge = 5;

                        }

                        // tell paystack to process
                        payWithPaystack(charge);
                    } else if (json.success == false) {
                        // 
                        toast('Couldnt get total charge!');
                        $("#place-order-btn").removeAttr("disabled").html('Place Order');
                        return;
                    }
                } catch (e) {
                    console.log("An error occured while tryin to get charge. Data recieved: " + data);
                    $("#place-order-btn").removeAttr("disabled").html('Place Order');
                }
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            //renderErrorPage('Sorry! Couldnt cook the requested page');
            $("#place-order-btn").removeAttr("disabled").html('Place Order');
            toast('Connection Error. Try again');
        });
    } else {
        // pay on delivery - trigger checkout
        $('#place_order_form').trigger("submit");
    }
}

function payWithPaystack(charge) {
    var customer = user.getDetails();

    var handler = PaystackPop.setup({
        key: 'pk_test_354160b69baa943cd10b0c6f4c5472d57e1a5034',
        email: customer.email || 'iamblizzyy@gmail.com',
        amount: charge * 100,
        ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        metadata: {
            custom_fields: [{
                display_name: "Mobile Number",
                variable_name: "mobile_number",
                value: "+2348012345678"
            }]
        },
        callback: function(response) {
            // check()
            toast('Transaction successful');
            $('#transaction_ref').val(response.reference);

            $('#place_order_form').trigger("submit");
        },
        onClose: function() {
            toast('Transaction was cancelled');
            $("#place-order-btn").removeAttr("disabled").html('Place Order');
            //$('#place_order_form').trigger("submit");
        }
    });
    handler.openIframe();
}

$('#place_order_form').on('submit', function(e) {
    var auth_token = localStorage.getItem("auth_token");
    $('#auth_token_id').val(auth_token);
    e.preventDefault();
    $.ajax({
        url: "checkout/process-order",
        type: "POST",
        data: new FormData(this),
        contentType: false,
        processData: false,
        //dataType: 'json',
        beforeSend: function() {
            $('#place-order-btn').attr("disabled", "disabled").html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>');

            //$('#load').show();
        },
        complete: function() {
            //$('#load').hide();
            $("#place-order-btn").removeAttr("disabled").html('Place Order');
        },
        timeout: 5000,
        success: function(data) {
            var json = $.parseJSON(data);
            console.log(json);
            if (json.response == "1") {
                user.incrementNumOfOrders();
                displayThankYouPage(json.details.orderId, json.details.total, json.details.method);
            }
            if (json.response == "0") {
                toast('We could not process your order');
            }
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        //renderErrorPage('Sorry! Couldnt cook the requested page');
        $("#place-order-btn").removeAttr("disabled").html('Place Order');
        toast('Connection Error. Try again');
    });
});