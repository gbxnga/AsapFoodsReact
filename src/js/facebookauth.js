   // This is called with the results from from FB.getLoginStatus().////
   function statusChangeCallback(response) {
       console.log('statusChangeCallback');
       console.log(response);
       // The response object is returned with a status field that lets the
       // app know the current login status of the person.
       // Full docs on the response object can be found in the documentation
       // for FB.getLoginStatus().
       if (response.status === 'connected') {
           // check if client logged, 
           // then skip
           if (!localStorage.getItem("user_details")) { // Logged into your app and Facebook.
               testAPI();


           } else
               console.log('Client side confirms user is already logged in');
           //redirectTo('pick-kitchen');
       } else {
           // The person is not logged into your app or we are unable to tell.
           console.log('Facebook says user isnt logged in');
           //toast('You are not logged in!');
           //redirectTo('login');
       }
   }

   // This function is called when someone finishes with the Login
   // Button.  See the onlogin handler attached to it in the sample
   // code below.
   function checkLoginState() {
       FB.getLoginStatus(function(response) {
           statusChangeCallback(response);
       });
   }


   window.fbAsyncInit = function() {
       FB.init({
           appId: '1996180800633192',
           cookie: true, // enable cookies to allow the server to access 
           // the session
           xfbml: true, // parse social plugins on this page
           version: 'v2.8' // use graph api version 2.8
       });

       // Now that we've initialized the JavaScript SDK, we call 
       // FB.getLoginStatus().  This function gets the state of the
       // person visiting this page and can return one of three states to
       // the callback you provide.  They can be:
       //
       // 1. Logged into your app ('connected')
       // 2. Logged into Facebook, but not your app ('not_authorized')
       // 3. Not logged into Facebook and can't tell if they are logged into
       //    your app or not.
       //
       // These three cases are handled in the callback function.


       FB.getLoginStatus(function(response) {
           statusChangeCallback(response);
       });

   };

   // Load the SDK asynchronously
   (function(d, s, id) {
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) return;
       js = d.createElement(s);
       js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

   // Here we run a very simple test of the Graph API after login is
   // successful.  See statusChangeCallback() for when this call is made.
   function testAPI() {
       FB.api('/me?fields=name,first_name,last_name,email,gender', function(response) {

           console.log('Successful login for: ' + response.name);
           console.log(response);
           $('.customerName').html(response.name);

           var res = JSON.stringify(response);
           if (response.id == null) {
               toast('Please relogin!');
               return;
           }
           //alert("auth/" + response.id + "/facebook/" + response.name);
           $.ajax({
               //url: "auth/loginfacebook.php?response=" + res,
               url: "auth/login",
               type: "POST",
               //data: JSON.stringify(response),
               data: {
                   fullname: response.name, // will be accessible in $_POST['fullname']
                   oauth_provider: "facebook",
                   oauth_uid: response.id
               },
               dataType: "html",
               success: function(data) {

                   var json = $.parseJSON(data);
                   console.log(json);
                   if (json.success == true) {
                       console.log('user FBK login status confimed on server side');
                       user.loginOnClientSide("facebook", json.token);
                       user.addDetails({ name: json.data.fullname, address: json.data.address, phone: json.data.phone, email: json.data.email });
                       user.setNumOfOrders(json.orders || 0);
                       user.updateModel();

                       redirectTo('pick-kitchen');
                       toast('Successfully Logged in!');
                   } else if (json.success == false) {
                       toast('Login failed. Try again');
                   }

               }
           });
       });
   }