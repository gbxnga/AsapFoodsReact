

function filter(element, what) {
    var value = $(element).val();
    //$(what+' .item-parent').hide();

    value = value.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });

    if (value == '') {
        $(what + ' .item-parent').show();
    } else {
        $(what + ' .item-parent:not(:contains(' + value + '))').hide();
        $(what + ' .item-parent:contains(' + value + ')').show();
    }
};

function checkDevice() {
    if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))) {
        // some code..
        //alert('hello');
        //window.location.replace('#home');
        return true;
    }
}
route(decodeURI(window.location.hash));

$('#update_profile_form').on('submit', function(e) {
    e.preventDefault();
    var url;
    if (localStorage.getItem("log_type") != "email") {

        url = "auth/update";
    } else {
        url = "update";
    }
    $.ajax({
        url: url,
        type: "POST",
        data: new FormData(this),
        contentType: false,
        processData: false,
        //dataType: 'json',
        beforeSend: function() {
            //$('#load').show();
            $('#update_profile_form button').attr("disabled", "disabled").html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>');

        },
        complete: function() {
            $("#update_profile_form button").removeAttr("disabled").html('Update');
            //$('#load').hide();
        },
        success: function(data) {
            try {
                var json = $.parseJSON(data);
                console.log(json);
                if (json.success == true) {
                    // update details
                    user.addDetails({ name: json.data.fullname, address: json.data.address, phone: json.data.phone, email: json.data.email, username: json.data.username });
                    user.updateModel();

                    toast('Profile Updated!');
                    $("#edit_profile_btn").trigger("click");
                } else if (json.success == false)
                    toast('Update failed. Try again');
            } catch (e) {
                toast('An error occured!');
                console.log('erro occured in #Update_profile_form submit: ' + e);
            }
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        toast('Connection Error. Try again');
    });
});

function validateForm(form) {
    var regexPhone = /^\d{11}$/;
    var regexName = /^[a-zA-Z0-9]{3,100}$/;
    var regexAddress = /^[a-zA-Z0-9]{3,100}$/;
    var regexUsername = /^[a-zA-Z0-9]{5,12}$/;
    var regexPassword = /^[a-zA-Z_0-9]{5,12}$/;
    var regexEmail = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;

    if (form == 'register') {

        if (!regexPhone.test($('#phone-input').val())) {
            $('.warning').show().html('Phone number must be 11 digits');
            toast("Phone number invalid!");
            return false;
        } else if (!regexUsername.test($('#username-input').val())) {
            $('.warning').show().html('Username must be 5-12 characters and(or) digits long');
            toast("Username invalid!");
            return false;
        } else if (!regexEmail.test($('#email-input-2').val())) {
            $('.warning').show().html('Email should be a standard, acceptable email');
            toast("Email invalid!");
            return false;
        } else if (!regexPassword.test($('#password-input-2').val())) {
            $('.warning').show().html('Password must be 5-12 characters and(or) digits long');
            toast("Password invalid!");
            return false;
        } else {
            return true;
        }
    } else if (form == 'login') {
        if (!regexPassword.test($('#password-input').val())) {
            //$('.warning').show().html('Phone number must be 11 digits');
            toast("Password invalid!");
            return false;
        } else if (!regexUsername.test($('#email-input').val())) {
            //$('.warning').show().html('Username must be 5-12 characters and(or) digits long');
            toast("Username invalid!");
            return false;
        } else {
            return true;
        }

    }
    else if (form == 'checkout')
    {
        var checkout_phone = document.querySelector("#checkout-phone");
        var checkout_name = document.querySelector("#checkout-name");
        var checkout_address = document.querySelector("#checkout-address");
        
        if ((checkout_phone.value == "" )) {
            toast("Phone number invalid!");
            return false;
        }
        else if ((checkout_name.value == "")) {
            toast("No name provided!");
            return false;
        }
        else if ((checkout_address.value == "")) {
            toast("No address provided!");
            return false;
        }
        else {
            return true;
        }
    } else {
        return false;
    }
}

$('#register-form').on('submit', function(e) {
    e.preventDefault();
    if (!validateForm('register'))
        return;
    $.ajax({
        url: "register",
        type: "POST",
        data: new FormData(this),
        contentType: false,
        processData: false,
        //dataType: 'json',
        beforeSend: function() {
            //$('#load').show();
            $('#register-form button').attr("disabled", "disabled").html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>');

        },
        complete: function() {
            //$('#load').hide();
            $("#register-form button").removeAttr("disabled").html('Register');
        },

        success: function(data) {
            console.log('Register data: ' + data);
            try {

                var json = $.parseJSON(data);
                console.log(json);
                if (json.success == true) {
                    $('#register-form input').val('');
                    toast('Successfully registered!');
                    redirectTo('login');
                } else if (json.success == false) {
                    toast('Registration failed. Try again');
                }
            } catch (e) {
                console.log('Error: ' + e);
                toast('An error occured!');
            }
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        toast('Connection Error. Try again');
    });
});
$('#login-form').on('submit', function(e) {

    e.preventDefault();
    if (!validateForm('login'))
        return;
    var username = $('#email-input').val();
    var password = $('#password-input').val();
    $.ajax({
        url: "login",
        type: "POST",
        data: new FormData(this),
        contentType: false,
        processData: false,
        //dataType: 'json',
        beforeSend: function() {
            //$('#load').show();
            $('#login-form button').attr("disabled", "disabled").html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>');

        },
        complete: function() {
            //$('#load').hide();
            $("#login-form button").removeAttr("disabled").html('Login');
        },
        timeout: 5000,
        success: function(data) {
            console.log('Register data: ' + data);
            try {
                var json = $.parseJSON(data);
                console.log(json);
                if (json.success == true) {
                    console.log('user login status confimed on server side');
                    user.addDetails({ name: json.data.fullname, address: json.data.address, phone: json.data.phone, email: json.data.email, username: json.data.username });

                    user.loginOnClientSide("email", json.token);
                    user.updateModel();
                    user.setNumOfOrders(json.orders || 0);
                    $('#login-form input').val('');

                    toast('Successfully Logged in!');
                    redirectTo('pick-kitchen');
                } else if (json.success == false) {
                    toast('Login failed. Try again');
                }
            } catch (e) {
                console.log('Error: ' + e);
                toast('An error occured!');
            }
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        toast('Connection Error. Try again');
    });

});


$('.sidenav a ').on('click', function() {
    closeNav();
})

$(document).on('click', '.glyphicon-plus', function() {
    var pay = $(this).siblings('.item-qty-val');
    var initial = pay.attr("data-val");
    var newVal = parseFloat(initial) + 1;
    pay.html(newVal).attr("data-val", newVal);
    var item_id = pay.attr("data-item-id");
    if ($(this).siblings('.input-form')) {
        $(this).siblings('.input-form').remove();
        pay.before('<input name="' + item_id + '" value="' + newVal + '" type="num" class="input-form" hidden="hidden"/>');
    }
    $(this).parents('.inner-item-con').css('border', '2px solid #FF4C00');
});

$(document).on('click', '.glyphicon-minus', function() {
    var pay = $(this).siblings('.item-qty-val');
    var initial = pay.attr("data-val");
    // Don't allow decrementing below zero
    if (initial > 0) {
        var newVal = parseFloat(initial) - 1;
        pay.html(newVal).attr("data-val", newVal);

        if (newVal == "0") {
            $(this).parents('.inner-item-con').css('border', '2px solid white');
            $(this).siblings('.input-form').remove();

        } else {
            var item_id = pay.attr("data-item-id");
            if ($(this).siblings('.input-form')) {
                $(this).siblings('.input-form').remove();
                pay.before('<input name="' + item_id + '" value="' + newVal + '" type="num" class="input-form" hidden="hidden"/>');
            }
        }
    } else {
        newVal = 0;
        $(this).parents('.inner-item-con').css('border', '2px solid white');
        pay.siblings('.input-form').remove();
    }
    //pay.val(newVal); 
});

function openNav() {
    if (!user.isLoggedIn())
        return;
    $('#mySidenav').animate({
        "margin-left": "+0"
    }, 10, function() {
        $('#cover').show();
    });

    user.updateModel();
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    $('#cover').hide();
    $('#mySidenav').animate({
        "margin-left": "-80%"
    }, 10);
}
$('#verify-coupone-form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
        url: "user/verify-coupone",
        type: "POST",
        data: new FormData(this),
        contentType: false,
        processData: false,
        beforeSend: function() {
            $('#verify-coupone-btn').attr("disabled", "disabled").html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>');

        },
        complete: function() {
            $("#verify-coupone-btn").removeAttr("disabled").html('USE CODE');
        },
        success: function(data) {
            var json = $.parseJSON(data);
            console.log(json);
            if (json.response == "1") {
                toast('Valid Code! Value: ₦' + json.data);
            }
            if (json.response == "2") {
                toast('Code already used!');
            }
            if (json.response == "3") {
                toast('Invalid Code!');
            }

        }

    }).fail(function(jqXHR, textStatus, errorThrown) {
        $("#verify-coupone-btn").removeAttr("disabled").html('USE CODE');
        toast('Connection Error. Try again');

    });

})

function verifyCoupone() {
    var coupone_code = $('#coupone').val();
    $('#verify-coupone-form input').val(coupone_code);
    $('#verify-coupone-form').trigger("submit");
}

function checkForLogoutCommand(json) {
    if (json.log_out == "1") {
        user.logout();
        return;
    }
}

function getCharges() {
    var subtotal = 0;
    var no_of_plates = 0;
    var values = $('.sub_total_value.valid');
    //var length = $('.sub_total_value.valid').length;
    //alert(length);
    $.each(values, function(sub_tot_al = 0) {
        var sub_total = 0;
        sub_total = $(this).attr("value");

        sub_total = (sub_total * 1);

        subtotal = subtotal + sub_total;
        no_of_plates++;
    });
    var grandtotal = (subtotal * 1);
    //var no_of_plates = $('.plate-container-class').length;
    grandtotal = grandtotal + (150 * no_of_plates);
    var no_of_plates_2 = no_of_plates;
    var no_of_plate_not_to_pay = 0;
    do {
        if (no_of_plates_2 % 4 == 0) {
            no_of_plate_not_to_pay++;
            grandtotal = grandtotal - 150;
        }

        no_of_plates_2--;
    }
    while (no_of_plates_2 > 0);
    $('#grandtotal_td strong').html('&#8358;' + grandtotal);
    $('#subtotal_td strong').html('&#8358;' + subtotal);
    $('#delivery_td strong').html('&#8358;' + (150 * (no_of_plates - no_of_plate_not_to_pay)));
}
$(document).on('click', '.delete-plate-btn', function() {
    //$('body').html('');
    // e.preventDefault();
    var plate_id = $(this).attr("data-plate-id");
    var token = localStorage.getItem("auth_token");
    var btn = $(this);
    var form = $('form').get(0);

    $.ajax({
        url: "plate/" + plate_id + "/delete",
        type: "POST",
        data: new FormData(form),
        contentType: false,
        processData: false,
        //dataType: 'json',
        beforeSend: function() {
            //$('#load').show();
            //$(this).removeClass('glyphicon glyphicon-trash').addClass('fa fa-spinner fa-spin fa-1x fa-fw');

            $(btn).removeAttr('class').attr('class', 'fa fa-spinner fa-spin fa-1x fa-fw delete-plate-btn');
        },
        complete: function() {
            //$('#load').hide();
        },
        failure: function(data) {
            renderErrorPage('Sorry! Couldnt cook the requested page');
        },
        success: function(data) {
            var json = $.parseJSON(data);
            console.log(json);
            checkForLogoutCommand(json);
            if (json.response == "1") {
                // remove plate
                $('.plate_' + plate_id).slideUp(300, function() {
                    $('.plate_' + plate_id).children('.sub_total_value').removeClass('valid').addClass('invalid');
                    // $('.plate_' + plate_id).remove();
                }).delay(100, function() {

                    // we take a 0.1s delay to allow for DOM update
                    // before displaying current, updated cahrges
                    getCharges();
                })

                // notify
                $('.page-heading').html(json.data);
                //toastContainer.style.background = '#FF4C00';
                toast(json.data);

                // redirect user to pick kitchen page if 
                // plate is emppty
                if ($('.plate-container-class').length <= 1)
                    redirectTo('pick-kitchen');
            }
            if (json.response == "0") {
                // notify
                toast('Please try again!');
                //$(this).removeClass('fa fa-spinner fa-spin fa-1x fa-fw').addClass('glyphicon glyphicon-trash');
                $(btn).removeAttr('class').attr('class', 'glyphicon glyphicon-trash delete-plate-btn');
            }
        }

    }).fail(function(jqXHR, textStatus, errorThrown) {
        $(btn).removeAttr('class').attr('class', 'glyphicon glyphicon-trash delete-plate-btn');
        toast('Connection Error. Try again');

    });
    getCharges();
    getNumberOfPlates();
});

function showOrderDetails(id) {
    if (isNaN(id)) {
        goBack();
        return;
    }

    var auth_token = localStorage.getItem("auth_token");
    $('#get-details-of-order-form #auth_token_order').val(auth_token);
    $('#get-details-of-order-form #order_id_order').val(id);
    $('#get-details-of-order-form').trigger('submit');
}
$('#get-details-of-order-form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
        url: "user/view-order",
        type: "POST",
        data: new FormData(this),
        contentType: false,
        processData: false,
        //dataType: 'json',
        beforeSend: function() {

            showPage('.empty-page');

        },
        failure: function(data) {
            renderErrorPage('Sorry! Couldnt cook the requested page');
        },
        success: function(data) {
            if (data == "") {
                renderErrorPage('Sorry! Your plate is empty.');
                return;
            }
            var json = JSON.parse(data);
            console.log(json);
            if (json.success == true) {
                $("#view-order-name").html(json.data.fullname);
                $("#view-order-address").html(json.data.address);
                $("#view-order-phone").html(json.data.phone);
                $("#view-order-payment").html(json.data.payment);
                $("#view-order-status").html(json.data.order_status);

                if (json.data.order_status == "delivered") {
                    $('#line3, #line4').css('stroke', '#FF4C00');
                    $("#circle1, #circle2").attr('fill', '#FF4C00');
                    $(".event3").removeClass("futureGray");
                    $("#bubble3").removeClass("futureOpacity");
                    $("#view-order-date-delivered").html(json.data.date_delivered);
                }
                if (json.data.order_status == "waiting") {
                    $("#view-order-date-picked").html(' ');
                    $("#view-order-date-delivered").html(' ');
                    $('.lines').css('stroke', 'rgba(162, 164, 163, 0.37)');
                    $("#circle1, #circle2").attr('fill', 'rgba(162, 164, 163, 0.37)');
                    $("#bubble2").addClass("futureOpacity");
                    $(".event2").addClass("futureGray");
                    $(".event3").addClass("futureGray");
                    $("#bubble3").addClass("futureOpacity");
                }
                $("#view-order-date-created").html(json.data.date_created);
                if (json.data.order_status == "picked" || json.data.order_status == "delivered") {
                    $("#circle1").attr('fill', '#FF4C00');
                    $('#line1, #line2').css('stroke', '#FF4C00');
                    $(".event2").removeClass("futureGray");
                    $("#bubble2").removeClass("futureOpacity");
                    $("#view-order-date-picked").html(json.data.date_picked);
                }

                var content = JSON.parse(json.data.content);
                if (content.success == true) {
                    $('#orderModal #order-content-details').html(' ');
                    var no_of_plates = 0;
                    var sub_total = 0;

                    $.each(content.data, function(key, value) {
                        var html = '<div class="media-con plate-container-class " style="border:1px solid #cccccc; border-radius:3px; margin-bottom:15px;padding:15px; background-color:white;padding-top:7px">';

                        html += '<p>Kitchen: ' + value.kitchen + '</p>';
                        $.each(value.items, function(index, item) {
                            html += '<div class="media" id="">';
                            html += '<div class="media-left">';
                            html += '<a href="#"></a>';
                            html += '</div>';
                            html += '<div class="media-body">';
                            html += '<h1 class="media-heading">' + item.name + '</h1>';
                            html += '<div class="lower-order-details">';
                            html += '<div class="lower-order-details-left">';
                            html += '<p style="margin-top:-10px;margin-bottom:-10px">Quantity : ' + item.quantity + ' </p>';
                            //html += '<p>Price : &#8358;' + item.price + ' </p>';
                            html += '</div>';
                            html += '<div class="lower-order-details-right">';
                            html += '<p style="text-align:right;margin-top:-10px"> Total : &#8358;' + item.item_total + '</p>';
                            html += '</div>';
                            html += '</div>';
                            html += '</div>';
                            html += '</div>';
                        })
                        html += '</div>';

                        $('#orderModal #order-content-details').append(html);
                        sub_total = sub_total + value.sub_total;
                        no_of_plates++;
                    })
                    var delivery_charge = 150 * no_of_plates;
                    var grand_total = sub_total + delivery_charge;

                    //$('#view-order-subtotal').html(sub_total);
                    //$('#view-order-deliverycharge').html(delivery_charge);
                    $('#view-order-grandtotal').html('&#8358;' + json.data.total);
                    var position = json.data.order_status;
                    $('.order-position').html(' ');
                    $('#' + position + '-position').html('<div class="now pulse">NOW</div>');

                    showPage('.view-order-page', 'Order Details');
                }
            }
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        toast('Connection Error. Try again');
    });
})

function getListOfOrders() {
    var auth_token = localStorage.getItem("auth_token");
    $('#get-list-of-order-form input').val(auth_token);
    $('#get-list-of-order-form').trigger('submit');
}
$('#get-list-of-order-form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
        url: "user/orders/list",
        type: "POST",
        data: new FormData(this),
        contentType: false,
        processData: false,
        //dataType: 'json',
        beforeSend: function() {

            showPage('.empty-page');

        },
        failure: function(data) {
            renderErrorPage('Sorry! Couldnt cook the requested page');
        },
        success: function(data) {
            if (data == "") {
                renderErrorPage('Sorry! Your plate is empty.');
                return;
            }
            var json = JSON.parse(data);
            console.log(data);
            if (json.success == true) {
                var html = '';
                $('.orders-page .container').html(' ');
                $.each(json.data, function(key, value) {
                    html += '<div class="col-md-12" style="background-color:white;box-shadow:0 3px 10px rgba(0,0,0,0.1), 0 3px 4px rgba(0,0,0,0.1);border-radius:3px;margin-bottom:15px">';
                    html += '<div class="row">';
                    html += '<p class="col-md-12" style="padding:15">';
                    var ref = value.transaction_ref || 'none';
                    html += '<span class="pull-left">ID: ' + ref.toUpperCase() + '</span>';
                    var color = '';
                    if (value.order_status == 'picked') color = 'warning';
                    if (value.order_status == 'waiting') color = 'danger';
                    if (value.order_status == 'delivered') color = 'success';

                    html += '<span class="pull-right text-' + color + '"><strong>' + value.order_status.toUpperCase() + '</strong></span>';
                    html += '</p>';
                    html += '<div class="col-md-12">';
                    html += '<hr/>';
                    html += '</div>';
                    html += '<p class="col-md-12" style="padding:15;margin-top:-15px">';
                    html += '<span class="pull-left">Total</span>';
                    html += '<span class="pull-right">&#8358;' + value.total + '</span>';
                    html += '</p>';
                    html += '<p class="col-md-12">';
                    html += '<span class="pull-left">DATE</span>';
                    html += '<span class="pull-right">' + value.date_created + '</span>';
                    html += '</p>';
                    html += '<div class="col-md-12">';
                    html += '<hr/>';
                    html += '</div>';
                    html += '<p class="col-md-12" style="padding:15;margin-top:-15px">';
                    if (value.order_status != "delivere") {
                        html += '<span class="text-center"><a href="#!/view-order/' + value.transaction_ref + '" class="center-block" style="text-align:center">TRACK &VIEW ORDER DETAILS</a></span>';

                    }
                    html += '</p>';
                    html += '</div>';

                    html += '</div>';

                    $('.orders-page .container').html(html);
                });
                showPage('.orders-page', 'My Orders');
            }
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        toast('Connection Error. Try again');
    });
})

function getPlatesForCheckout() {
    var form = $('form').get(0);
    var auth_token = localStorage.getItem("auth_token");
    $.ajax({
        url: "user/checkout/plates",
        type: "POST",
        data: new FormData(form),
        contentType: false,
        processData: false,
        //dataType: 'json',
        beforeSend: function() {

            showPage('.empty-page');

        },
        timeout: 5000,
        success: function(data) {
            if (data == "") {
                renderErrorPage('Sorry! Your plate is empty.');
                return;
            }
            var json = JSON.parse(data);
            console.log(data);
            if (json.success == true) {
                $('#media-con-new').html(' ');
                //var html

                $.each(json.data, function(key, value) {
                    //$.each(value, function(k, v) {
                    var html = '<div data-plate-id="' + value.id + '" class="media-con plate-container-class plate_' + value.id + '" style="box-shadow: 0 3px 10px rgba(0,0,0,0.1), 0 3px 4px rgba(0,0,0,0.1); border-radius:3px; margin-bottom:15px;padding:15px; background-color:white;padding-top:7px"><img style="margin-top:0" width="25" height="25" src="src/images/tray.png"><span data-plate-id="' + value.id + '" class="glyphicon glyphicon-trash delete-plate-btn" style="display:block;cursor:pointer;float:right; padding:4px 1px; zoom:130%"></span>';

                    html += '<p>Kitchen: ' + value.kitchen + '</p>';
                    $.each(value.items, function(index, item) {
                        html += '<div class="media" style="height:40" id="">';
                        html += '<div class="media-left">';
                        html += '<a href="#"></a>';
                        html += '</div>';
                        html += '<div class="media-body">';
                        html += '<h1 class="media-heading">' + item.name + '</h1>';
                        html += '<div class="lower-order-details">';
                        html += '<div class="lower-order-details-left">';
                        html += '<p style="margin-top:-10px;margin-bottom:-10px">Quantity : ' + item.quantity + ' </p>';
                        //html += '<p>Price : &#8358;' + item.price + ' </p>';
                        html += '</div>';
                        html += '<div class="lower-order-details-right">';
                        html += '<p style="text-align:right;margin-top:-10px"> Total : &#8358;' + item.item_total + '</p>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';

                    })
                    html += '<input type="text" class="sub_total_value valid" value="' + value.sub_total + '" hidden="hidden"></div>';
                    $('#media-con-new').append(html);
                    //})


                })
                getCharges();
                showPage('.checkout-page', 'Checkout');
            }
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        renderErrorPage('Sorry! Couldnt cook the requested page');
        //toast('Connection Error. Try again');
    });
}

function getNumberOfPlates() {
    var form = $('form').get(0);
    //var formData = new FormData(this);
    //formData.append('file', $('input[type=file]')[0].files[0]);
    //data:  formData
    $.ajax({
        url: "user/plates",
        type: "POST",
        data: new FormData(form),
        contentType: false,
        processData: false,
        failure: function(data) {},
        success: function(data) {
            if (data.length < 3)
                $('header #right').attr('data-content', data);
            else
                $('header #right').attr('data-content', '0');
        }
    });
}

function goBack() {
    window.history.back();
}

function showKitchenItems(id) {
    // send user back if id isnt integer
    if (isNaN(id)) {
        goBack();
        return;
    }
    var items_to_store, kitchen_banner_to_store;
    showPage('.empty-page', 'Add Items');

    // check if kitchen has been visited before 
    var theStore = localStorage.getItem("kitchen_" + id);

    try
    {
        theStore = JSON.parse(theStore);
        // if offline fetch from storage
        if (theStore) {
            //alert(theStore.kitchen_banner)
            $('#kitchen_id').attr("value", id);
            $('#kitchen-banner').html(theStore.kitchen_banner);
            $('#items-div-con').html(theStore.items);
            showPage('.items-page', 'Add Items');
            console.log('kitchen items fetched from localstorage');
            return;
        }
    }
    catch(e)
    {
        console.log('Error occured while trying to fetch kitchen items from cache: \n'+e);
    }
    

    var token = localStorage.getItem("auth_token");
    return fetch('kitchen/' + id + '/items', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
            //body: JSON.stringify(kitchen)
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Bad status code from server.');
            }
            return response.json();
        })
        .then(function(responseData) {
            if (!(responseData.data && responseData.success)) {
                
                console.log(responseData);
                throw new Error('Bad response from server.');
            }
            return responseData;
        })
        .then(function(json) {
            // clear the #items-div-con container first
            // so if checkout btn is plressed more than once
            // it wont repeat items
            $('#items-div-con').html('');
            console.log(json);
            var kit = '';
            var kitchen_id = json.kitchen.kitchen_id;
            $('#kitchen_id').attr("value", kitchen_id);
            kit += '<div style="background-color:white; box-shadow:0 3px 10px rgba(0, 0, 0, 0.1); border:1px solid #e2e6e9; height:275px; border-radius:2px;padding-bottom:15px;margin:15px 0">';
            kit += '<img style="width:100%" height="180" src="src/images/' + json.kitchen.description + '-in.jpeg" />';
            kit += '<div class="col-xs-12">';
            kit += '<h3 style="margin-top:15px">' + json.kitchen.kitchen + '</h3>';
            kit += '<address style="font-size:14px">'+ json.kitchen.address +'</address>';
            //kit += '<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span>';
            kit += '</div>';
            kit += '</div>';
            $('#kitchen-banner').html(kit);
            kitchen_banner_to_store = kit;
            items_to_store = '';
            $.each(json.data, function(key, value) {
                var html = '';
                html += '<div class="item-parent-'+value.category+' col-xs-4 col-l-4 item-parent" style="padding:2.5px">';
                html += '<div class="inner-item-con has-shadow">';
                html += '<img src="src/images/' + value.image + '" style="width:100%" height="70"/>';
                html += '<div class="price">' + value.food + '<span style="float:right">&#8358;' + value.price + '</span></div>';
                html += '<div class="qty">';
                html += '<span class="glyphicon glyphicon-minus"></span>';
                html += '<span data-item-id="' + value.id + '" data-val="0" class="item-qty-val">0</span>';
                html += '<span class="glyphicon glyphicon-plus"></span>';
                html += '</div>';
                html += '</div>';
                html += '</div>';

                $('#items-div-con').append(html);
                items_to_store += html;
            });
            showPage('.items-page', 'Add Items');
            // save kitchen details to storage
            var store = {
                kitchen_id: id,
                kitchen_banner: kitchen_banner_to_store,
                items: items_to_store
            }
            localStorage.setItem("kitchen_" + id, JSON.stringify(store));
        }).catch(function(error) {
            console.log(error);
            toast('An Error occured!')
            goBack();
        });
}

$('header #right').attr('data-content', '0');

$(window).on('hashchange', function() {
    // On every hash change the render function is called with the new hash
    // This is how the navigation of our app happens.

    route(decodeURI(window.location.hash));
});

function renderErrorPage(response) {
    // Shows the error page.
    $('.page-container.visible').removeClass('visible');
    $('.error-page').addClass('visible')
    $('.error-page h3').html(response)
}





function displayThankYouPage(orderId, total, method) {
    //$('#thank-you-total').html(total);
    $('#thank-you-order-id').html(orderId);
    $('#thank-you-total').html('&#8358;' + total);
    $('#thank-you-method').html(method);
    $('#thank-you-view-order').attr("href", "#!/view-order/" + orderId)
    showPage('.thank-you-page', 'Order Complete', true)
}

function fetchDetailsForCheckout() {
    if (user.detailsIsSet()) {
        var customer = user.getDetails();
        var name = document.querySelector("#checkout-name");
        var address = document.querySelector("#checkout-address");
        var phone = document.querySelector("#checkout-phone");
        //var coupone = document.querySelector("#coupone");


        name.setAttribute("value", customer.name);
        phone.setAttribute("value", customer.phone);
        //coupone.setAttribute("value", ' ');
        //address.setAttribute("value", user.address);
        address.textContent = customer.address;
    }
}

function redirectTo(location) {
    window.location.hash = '#!/' + location;
}

function setHeaderTitle(title) {
    if (arguments.length == 1) {
        headerTitle = document.querySelector("#header-title");
        headerTitle.textContent = title;
        document.title = title;
    } else {
        document.title = "ASAPFoods";
        headerTitle.textContent = 'ASAPFoods';
    }
}

function isOnline() {
    if (navigator.onLine)
        return true;
    else
        return false;
}

function logoutUser() {
    user.logout();
}

function displayEditProfile() {
    //populate form
    if (user.detailsIsSet()) {
        $('#update_profile_form').html(' ');
        form = document.querySelector('#update_profile_form');
        var method_input = document.createElement("input");
        method_input.setAttribute("type", "hidden");
        method_input.setAttribute("name", "_METHOD");
        method_input.setAttribute("value", "PUT");

        var auth_token = localStorage.getItem("auth_token");
        var token_input = document.createElement("input");
        token_input.setAttribute("type", "hidden");
        token_input.setAttribute("name", "auth_token");
        token_input.setAttribute("value", auth_token);
        form.appendChild(method_input);
        form.appendChild(token_input);

        var elements = {
            Fullname: {
                element: "input",
                type: "text",
                name: "fullname",
                id: "profile-name"
            },
            Username: {
                element: "input",
                type: "text",
                name: "username",
                id: "profile-username"
            },
            Phone: {
                element: "input",
                type: "number",
                name: "phone",
                id: "profile-phone"
            },
            Email: {
                element: "input",
                type: "email",
                name: "email",
                id: "profile-email"
            },
            Password: {
                element: "input",
                type: "password",
                name: "password",
                id: "pwd"
            },
            DeliveryAddress: {
                element: "textarea",
                name: "address",
                id: "profile-address"
            }
        }
        if (localStorage.getItem("log_type") !== "email") {
            delete elements.Username;
            delete elements.Password;
        }
        var customer = user.getDetails();
        $.each(elements, function(key, value) {
            var div, label, input;
            div = document.createElement("div");
            div.setAttribute("class", "form-group");
            label = document.createElement("label");
            label.setAttribute("for", value.name);
            label.appendChild(document.createTextNode(key + ':'));

            div.appendChild(label);

            if (value.element == "input") {
                input = document.createElement("input");
                input.setAttribute("type", value.type);
                prop = (value.name == "fullname") ? "name" : value.name;
                if (value.type != "password") input.setAttribute("value", customer[prop]);
            } else if (value.element == "textarea") {
                input = document.createElement("textarea");
                input.appendChild(document.createTextNode(customer[value.name]));
            }
            input.setAttribute("name", value.name);
            input.setAttribute("class", "form-control");
            input.setAttribute("id", value.id);

            div.appendChild(input);

            form.appendChild(div);
        });

        button = document.createElement('button');
        button.setAttribute("type", "submit");
        button.setAttribute("class", "btn btn-success");
        button.appendChild(document.createTextNode("Update"));

        form.appendChild(button);
    }
    $("#edit_profile_btn").trigger("click");
}



$('#create-plate-form').on('submit', function(e) {
    e.preventDefault();
    if (!isOnline()) {
        toast('Cant add items when offline');
        return;
    }
    var form = $(this);
    //form.prop('disabled', true);		 
    $.ajax({
        url: "plate/create",
        type: "POST",
        data: new FormData(this),
        contentType: false,
        processData: false,
        //dataType: 'json',
        /*beforeSend: function() {
            showPage('.empty-page');

        },*/
        beforeSend: function() {
            $('#create-plate-form button').attr("disabled", "disabled").html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>');

            //$('#load').show();
        },
        complete: function() {
            //$('#load').hide();
            $("#create-plate-form button").removeAttr("disabled").html('<span class="glyphicon glyphicon-plus"></span> Add Items to Plate');
        },
        success: function(data) {
            var json = $.parseJSON(data);
            console.log(json);
            checkForLogoutCommand(json);
            if (json.response == "1") {
                redirectTo('checkout');
            }
            if (json.response == "0") {
                toast('Please try again');
            }

        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        toast('Connection Error. Try again');
    });
});

$('#contact_us_form').on('submit', function(e) {
    e.preventDefault();
    if (!isOnline()) {
        toast('You are offline');
        return;
    }
    var form = $(this);
    //form.prop('disabled', true);		 
    $.ajax({
        url: "user/send-support-message",
        type: "POST",
        data: new FormData(this),
        contentType: false,
        processData: false,
        beforeSend: function() {
            //$('#load').show();
            $('#contact_us_form button').attr("disabled", "disabled").html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>');

        },
        complete: function() {
            //$('#load').hide();
            $("#contact_us_form button").removeAttr("disabled").html('Send Message');
        },
        timeout: 5000,
        success: function(data) {
            var json = $.parseJSON(data);
            console.log(json);
            if (json.response == "1") {
                toast('Message sent!');
                $('#contact_us_form input').val();
                $('#contact_us_form textarea').html();
            }
            if (json.response == "0") {
                toast('Please try again');
            }
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        toast('Connection Error. Try again');
    });
});
