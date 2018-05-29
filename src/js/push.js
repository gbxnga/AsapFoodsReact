const applicationServerPublicKey = 'BBqP8SNiEPK2acUC4DUB_Mm3Y0ZvVaaPP0qtfGoznSAwaeZjjlXbuXbDMyy6bkmKglbnYE1PYZ8X0F4JVHpzV2s';
var pushButton = document.querySelector("#push-notification-btn");

// registring a service worker 
if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');

    navigator.serviceWorker.register('sw.js')
        .then(function(swReg) {
            console.log('Service Worker registered', swReg);

            swRegistration = swReg;
            initializeUI();
        })
        .catch(function(error) {
            console.error('Service Worker Error', error);
        });
} else {
    console.warn('Push messaging isnt supported');
    pushButton.textContent = 'Push Not Supported';
};

// checks if user is currently subscribed
function initializeUI() {
    pushButton.addEventListener("click", function() {
        pushButton.disabled = true;
        if (isSubscribed) {
            // TODO: Unsubscribe user
            unsubscribeUser();
        } else {
            subscribeUser();
        }
    });
    // set initial sbscription value
    /*
        getSubscription() is a method that returns a promise 
        that resolves with the current subscription if there 
        is one, otherwise it'll return null.
    */
    swRegistration.pushManager.getSubscription()
        .then(function(subscription) {
            isSubscribed = !(subscription === null);

            if (isSubscribed)
                console.log('User is Subscribed');
            else {
                console.log('User is NOT subscribed');
                //subscribeUser();
            }

            updateBtn();
        });
    //subscribeUser();
};

function updateBtn() {

    // if user clicked the deny button
    if (Notification.permission === 'denied') {
        pushButton.textContent = 'Push Messaging Blocked.';
        pushButton.disabled = true;
        console.log('user denied push');
        updateSubscriptionOnServer(null);
        return;
    }

    if (isSubscribed) {
        pushButton.textContent = 'Disable Push Messaging';
    } else {
        pushButton.textContent = 'Enable Push Messaging';
    }

    pushButton.disabled = false;
};

function subscribeUser() {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);

    /*
        Calling subscribe() returns a promise which will 
        resolve after the following steps:

        - The user has granted permission to display notifications.
        - The browser has sent a network request to a push service
        - to get the details to generate a PushSubscription.
    */
    swRegistration.pushManager.subscribe({

            //you will show a notification every time a push is sent.
            userVisibleOnly: true,

            applicationServerKey: applicationServerKey
        })
        .then(function(subscription) {
            console.log('User is subscribed.');
            console.log(subscription);

            updateSubscriptionOnServer(subscription);
            sendSubscriptionToBackEnd(subscription);

            isSubscribed = true;

            updateBtn();
        })
        .catch(function(err) {
            console.log("failed to subscribe the user:", err);
            updateBtn();
        })
};

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function updateSubscriptionOnServer(subscription) {
    // TODO: Send subscription to application server

    const subscriptionJson = document.querySelector('.js-subscription-json');
    const subscriptionDetails =
        document.querySelector('.js-subscription-details');

    if (subscription) {
        subscriptionJson.textContent = JSON.stringify(subscription);
        subscriptionDetails.classList.remove('is-invisible');
        alert("Push notification activated!");
    } else {
        subscriptionDetails.classList.add('is-invisible');
    }
}

function unsubscribeUser() {
    swRegistration.pushManager.getSubscription()
        .then(function(subscription) {
            if (subscription) {
                return subscription.unsubscribe();
            }
        })
        .catch(function(error) {
            console.log('Error unsubscribing', error);
        })
        .then(function() {
            updateSubscriptionOnServer(null);

            console.log('User is unsubscribed.');
            alert("Push notification unsubscribed!");
            isSubscribed = false;

            updateBtn();
        });
};

function formEncode(obj) {
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}

function sendSubscriptionToBackEnd(subscription) {
    var auth_token = localStorage.getItem("auth_token");
    $('#auth_token_push').val(auth_token);
    $('#object_push').val(JSON.stringify(subscription));
    /*return fetch('push/' + subscription + '/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            //body: JSON.stringify(subscription)
            body: {
                auth_token: auth_token, // will be accessible in $_POST['fullname']
                object: JSON.stringify(subscription)
            }
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Bad status code from server(PUSH).');
            }

            return response.json();
        })
        .then(function(responseData) {
            if (!(responseData.data && responseData.data.success)) {
                throw new Error('Bad response from server.(PUSH)');
            }
            console.log(responseData.data.body.endpoint);
        });*/
    // alert(auth_token + JSON.stringify(subscription))

    /*$.ajax({
        //url: "auth/loginfacebook.php?response=" + res,
        url: "push/save",
        type: "POST",
        body: {
            auth_token: auth_token, // will be accessible in $_POST['fullname']
            object: JSON.stringify(subscription)
        },
        dataType: "html",
        success: function(data) {
            try {
                var json = $.parseJSON(data);
            } catch (e) {
                console.log('Error svaing subscription:' + e);
                console.log(data);
            }
            console.log(json);
            if (json.success == true) {
                console.log('SAVED ON SERVER!!');
            } else if (json.success == false) {
                console.log('NOT SAVED ON SERVER!!');
            }

        }
    });*/
    $('#send_endpoint').trigger('submit');
}

$('#send_endpoint').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
        //url: "auth/loginfacebook.php?response=" + res,
        url: "push/save",
        type: "POST",
        data: new FormData(this),
        contentType: false,
        processData: false,
        success: function(data) {
            try {
                var json = $.parseJSON(data);
            } catch (e) {
                console.log('Error svaing subscription:' + e);
                console.log(data);
            }
            console.log(json);
            if (json.success == true) {
                console.log('SAVED ON SERVER!!');
            } else if (json.success == false) {
                console.log('NOT SAVED ON SERVER!!');
            }

        }
    });
});