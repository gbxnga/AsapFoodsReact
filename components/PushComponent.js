import React, { Component } from 'react';
import axios from "axios";
import toast from '../modules/toast'
import { connect } from 'react-redux';

import {
    SAVE_PUSH_SUBSCRIPTION_API,
} from '../constants/api'

const mapStateToProps = state => {
    return {
        
      user: state.user
      
    }
}; 
class PushComponent extends Component {
    constructor(props)
    {
        super(props)
        this.initializeUI = this.initializeUI.bind(this)
        this.applicationServerPublicKey = 'BBqP8SNiEPK2acUC4DUB_Mm3Y0ZvVaaPP0qtfGoznSAwaeZjjlXbuXbDMyy6bkmKglbnYE1PYZ8X0F4JVHpzV2s';
        this.pushButton = document.querySelector("#push-notification-btn");
        this.swRegistration = '';
        this.isSubscribed = false;
    }

    componentDidMount(){
        // registring a service worker 
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            console.log('Service Worker and Push is supported');

            navigator.serviceWorker.register('sw.js')
                .then(function(swReg) {
                    console.log('Service Worker registered', swReg);

                    this.swRegistration = swReg;
                    this.initializeUI();
                }.bind(this))
                .catch(function(error) {
                    console.error('Service Worker Error', error);
                });
        } else {
            console.warn('Push messaging isnt supported');
            this.pushButton.textContent = 'Push Not Supported';
        };

    }



    // checks if user is currently subscribed
    initializeUI() {
        let pushButton = document.querySelector("#push-notification-btn");
        pushButton.addEventListener("click", function() {
            pushButton.disabled = true;
            if (this.isSubscribed) {
                // TODO: Unsubscribe user
                this.unsubscribeUser();
            } else {
                this.subscribeUser();
            }
        }.bind(this));
        // set initial sbscription value
        /*
            getSubscription() is a method that returns a promise 
            that resolves with the current subscription if there 
            is one, otherwise it'll return null.
        */
        this.swRegistration.pushManager.getSubscription()
            .then(function(subscription) {
                this.isSubscribed = !(subscription === null);

                if (this.isSubscribed)
                    console.log('User is Subscribed');
                else {
                    console.log('User is NOT subscribed');
                    //subscribeUser();
                }

                this.updateBtn();
            }.bind(this));
        //subscribeUser();
    };

    updateBtn() {
        let pushButton = document.querySelector("#push-notification-btn");

        // if user clicked the deny button
        if (Notification.permission === 'denied') {
            pushButton.textContent = 'Push Messaging Blocked.';
            pushButton.disabled = true;
            console.log('user denied push');
            updateSubscriptionOnServer(null);
            return;
        }

        if (this.isSubscribed) {
            pushButton.textContent = 'Disable Push Messaging';
        } else {
            pushButton.textContent = 'Enable Push Messaging';
        }

        pushButton.disabled = false;
    }

    subscribeUser() {
        console.log('subscribing..')
        const applicationServerKey = this.urlB64ToUint8Array(this.applicationServerPublicKey);

        /*
            Calling subscribe() returns a promise which will 
            resolve after the following steps:

            - The user has granted permission to display notifications.
            - The browser has sent a network request to a push service
            - to get the details to generate a PushSubscription.
        */
        this.swRegistration.pushManager.subscribe({

                //you will show a notification every time a push is sent.
                userVisibleOnly: true,

                applicationServerKey: applicationServerKey
            })
            .then(function(subscription) {
                console.log('User is subscribed.');
                console.log(subscription);

                //this.updateSubscriptionOnServer(subscription);
                this.sendSubscriptionToBackEnd(subscription);

                this.isSubscribed = true;

                this.updateBtn();
            }.bind(this))
            .catch(function(err) {
                console.log("failed to subscribe the user:", err);
                this.updateBtn();
            }.bind(this))
    }

    urlB64ToUint8Array(base64String) {
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

    unsubscribeUser() {
        this.swRegistration.pushManager.getSubscription()
            .then(function(subscription) {
                if (subscription) {
                    return subscription.unsubscribe();
                }
            })
            .catch(function(error) {
                console.log('Error unsubscribing', error);
            })
            .then(function() {
                //this.updateSubscriptionOnServer(null);
                this.sendSubscriptionToBackEnd(null)

                console.log('User is unsubscribed.');
                toast("Push notification unsubscribed!");
                this.isSubscribed = false;

                this.updateBtn();
            }.bind(this));
    }

    formEncode(obj) {
        var str = [];
        for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    }

    sendSubscriptionToBackEnd(subscription) {
        const { user } = this.props 
        var formData = new FormData();

        formData.append("token", user.details.auth_token);
        formData.append("object", JSON.stringify(subscription));
        formData.append("token", user.details.auth_token);

        axios.post(SAVE_PUSH_SUBSCRIPTION_API, formData)
        .then(response => {
          console.log(response)
          return response
        })
        .then(json => {

          if (!json.data.success) {
            toast('Failed to save subscription');
          } 
          
        })
        .catch((error) => {
            console.log(` ${error}`)
        });
    }


  render() {
    let {children} = this.props;
    return (
        <div>
            <div style={{display:"none"}} className="js-subscription-details"></div><div style={{display:"none"}} className="js-subscription-json"></div>
            <button type="button" onClick={()=>this.subscribeUser()} className="btn btn-success  btn-sm" style={{padding:7,border:"1px solid #cc3d00",backgroundColor:"#cc3d00" }}id="push-notification-btn" disabled>ENABLE PUSH NOTIFICATION</button>
        </div>
    );
  }
}

export default connect( mapStateToProps ) (PushComponent);