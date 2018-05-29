var user = (function(exports) {
    'use strict';
    // Each user account has some default settings that 
    // get honored unless an override value is passed in:
    var userProto = {
        name: '',
        email: '',
        phone: '',
        address: '',
        username: ''
    };
    // extend Storage prototype so we can remove several items at once
    Storage.prototype.removeItems = function(arrays) {
        if (arrays) {
            arrays.forEach(function(element) {
                localStorage.removeItem(element);
            });
        }
    }
    Storage.prototype.setItems = function(object) {
        if (object) {
            for (var property in object) {
                localStorage.setItem(property, object[property]);
            }
        }
    }
    return {
        getDetails: function() {
            // get details from localstorage
            if (localStorage.getItem("user_details")) {
                var details = localStorage.getItem("user_details");
                details = JSON.parse(details);

                return {
                    name: details.name || userProto.name,
                    address: details.address || userProto.address,
                    phone: details.phone || userProto.phone,
                    email: details.email || userProto.email,
                    username: details.username || userProto.username
                }
            }
        },
        addDetails: function(options) {
            // Merge object2 into object1
            // update similar properties with that of object 2
            var createdUser = $.extend({}, userProto, options);
            localStorage.setItem("user_details", JSON.stringify(createdUser));
            console.log('DETAILS SAVED!!!')
        },

        loginOnClientSide: function(type, token) {
            localStorage.setItems({ logged_in: true, auth_token: token, log_type: type });
        },
        setNumOfOrders: function(num) {
            localStorage.setItem("orders", num);
        },
        incrementNumOfOrders: function() {
            var orders = localStorage.getItem("orders");
            orders++;
            this.updateModel();
        },

        updateModel: function() {
            var orders = 0;
            var cus = this.getDetails();
            // update the user view across all shells
            $('.customerName').html(cus.name);

            if (localStorage.getItem("log_type") != "email") {
                $('#prof-username-container').hide();
            } else {
                $('#prof-username-container').show();
                $('#prof-username').html(cus.username);
            }
            $('#prof-address').html(cus.address);
            $('#prof-email').html(cus.email);
            $('#prof-name').html(cus.name);
            $('#prof-phone').html(cus.phone);

            if (orders = localStorage.getItem("orders")) {
                $('.num-orders').html(orders);
            } else {
                $('.num-orders').html(orders);
            }

            console.log('model updated')
        },

        detailsIsSet: function() {
            if (localStorage.getItem("user_details"))
                return true;
            else
                return false;
        },

        logout: function() {
            // logout on client side
            if (localStorage.getItem("log_type") == 'facebook') {
                FB.logout(function(response) {
                    console.log(response);
                });
            }
            // logout on client side
            if (localStorage.getItem("log_type") == 'google') {

                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function() {
                    console.log('User signed out from GOOGLE.');
                });

            }
            localStorage.removeItems(["logged_in", "auth_token", "user_details", "log_type", "orders"]);
            toast('You are logged out');
            redirectTo('login');
        },

        isLoggedIn: function() {
            // check local storage
            if (localStorage.getItem("logged_in") && localStorage.getItem("auth_token")) {
                console.log('isLoggedIn(): user login status confimed on client side');
                return true;
            } else {
                return false;
            }
        }
    }

    //exports.user = user; //Make this method available in global
})(typeof window === 'undefined' ? module.exports : window);