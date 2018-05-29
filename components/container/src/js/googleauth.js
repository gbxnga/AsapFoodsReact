 function onSignIn(googleUser) {
     if (localStorage.getItem("user_details")) { // Logged into your app and Facebook.
         console.log('Client side confirms user is already logged in GOOGLE');
         return;
     }
     var profile = googleUser.getBasicProfile();
     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
     console.log('Name: ' + profile.getName());
     console.log('Image URL: ' + profile.getImageUrl());
     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

     console.log('Successful login for: ' + profile.getName());
     //console.log(response);
     $('.customerName').html(profile.getName());

     //var res = JSON.stringify(response);

     $.ajax({
         url: "auth/login",
         type: "POST",
         //data: JSON.stringify(response),
         data: {
             fullname: profile.getName(), // will be accessible in $_POST['fullname']
             oauth_provider: "google",
             oauth_uid: profile.getId(),
         },
         dataType: "html",
         success: function(data) {

             var json = $.parseJSON(data);
             console.log(json);
             if (json.success == true) {
                 console.log('user GOOGLE login status confimed on server side');
                 user.loginOnClientSide("google", json.token);
                 user.addDetails({
                     name: json.data.fullname,
                     address: json.data.address,
                     phone: json.data.phone,
                     email: json.data.email
                 });
                 user.setNumOfOrders(json.orders || 0);
                 user.updateModel();

                 redirectTo('pick-kitchen');
                 toast('Successfully Logged in!');
             } else if (json.success == false) {
                 toast('Login failed. Try again');
             }

         }
     });
 }