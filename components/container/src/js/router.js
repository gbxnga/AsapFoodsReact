(function(exports) {
    'use strict';


    function route(url) {
        $('#close_edit_profile').trigger("click");
        $('#view-order-close-btn').trigger("click");

        // Get the keyword from the url.
        var temp = url.split('/')[1];

        // if user is trying to access pages that need auth
        if (temp != 'login' && temp != 'login-index' && temp != 'register' && temp != 'logout') {
            // check login status
            if (!user.isLoggedIn()) {
                toast('Please Login');
                redirectTo('login');
                return;
            }
        } else if (temp == 'login' || temp == 'login-index' || temp == 'register' || temp == 'logout') {
            if (user.isLoggedIn()) {
                toast('You are already logged in');
                redirectTo('home');
                return;
            }

        }

        // no resource address was provided?
        // redirect to home
        if (url.length < 1) redirectTo('home');

        // Hide whatever page is currently shown.
        $('.main-content .page-container').removeClass('visible');

        // show header
        $('header').show();
        getNumberOfPlates();

        var map = {
            // Single Products page.
            'kitchen': function() {
                setHeaderTitle('Add Items');
                // Get the index of which product we want to show and call the appropriate function.
                var id = url.split('/')[2].trim();
                showKitchenItems(id);
            },
            'view-order': function() {
                if (!user.isLoggedIn()) {
                    redirectTo('login');
                } else {
                    var id = url.split('/')[2].trim();
                    showOrderDetails(id);
                }
            },
            'profile': function() {
                user.updateModel();
                showPage('.profile-page', 'Profile');
            },
            'pick-kitchen': function() {
                showPage('.pick-kitchen-page', 'Pick Kitchen');
            },
            'logout': function() {
                if (!user.isLoggedIn())
                    redirectTo('login');
                else
                    logoutUser();
            },
            'register': function() {
                showPage('.register-page', 'Register', true);
            },
            'login': function() {
                alert('hjkslj');
                
                showPage('.login-with-page', 'Login', true);
            },
            'login-index': function() {
                alert('hjkslj');
                showPage('.login-with-page', 'Login', true);
            },
            'contact-us': function() {
                showPage('.contact-page', 'Get In Touch');
            },
            // Page with filtered products
            'checkout': function() {
                //$('header').css('position', 'relative');
                fetchDetailsForCheckout();
                getPlatesForCheckout();
            },
            'my-orders': function() {
                getListOfOrders();

            },
            'home': function() {
                showPage('.home-page', 'Checkout', true);
                $('.home-page').css('margin-top', '0px');
            },
            '': function() {
                redirectTo('home');
            }
        };

        // Execute the needed function depending on the url keyword (stored in temp).
        if (map[temp]) {
            map[temp]();
        }
        // If the keyword isn't listed in the above - render the error page.
        else {
            renderErrorPage('Sorry! We could\'t cook this page');
        }

    }

    exports.route = route; //Make this method available in global
})(typeof window === 'undefined' ? module.exports : window);