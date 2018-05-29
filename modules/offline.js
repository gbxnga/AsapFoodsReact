//(function() {
    import toast from './toast'
    'use strict';
    console.log('ofline js active')

    
    // var menuHeader = document.querySelector('.menu__header');

    //After DOM Loaded
    document.addEventListener('DOMContentLoaded', function(event) {
        //On initial load to check connectivity
        if (!navigator.onLine) {
            updateNetworkStatus();
        }

        window.addEventListener('online', updateNetworkStatus, false);
        window.addEventListener('offline', updateNetworkStatus, false);
    });

    //To update network status
    function updateNetworkStatus() {
        var header = document.querySelector('header');
        var toastContainer = document.querySelector('.toast__container');
        if (navigator.onLine) {
            header.classList.remove('app__offline');
            header.style.background = '#FF4C00';
            toastContainer.style.background = '#FF4C00';
            toast('You are now Online :)');
        } else {
            toast('You are now offline..');
            header.classList.add('app__offline');
            header.style.background = '#9E9E9E';
            toastContainer.style.background = '#9E9E9E';

        }
    }
//})();