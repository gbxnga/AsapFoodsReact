
    'use strict';

    var toastContainer = document.querySelector('.toast__container');

    //To show notification
    function toast(msg, options) {
        if (!msg) return;

        options = options || 2000;

        /*var toastMsg = document.createElement('div');

        toastMsg.className = 'toast__msg';
        toastMsg.textContent = msg;*/

        /* toastContainer.textContent = msg;
         //toastContainer.appendChild(toastMsg);
         toastContainer.classList.add('visible');
         toastContainer.classList.remove('invisible');
         toastContainer.classList.remove('toast__msg--hide');
*/
        //Show toast for 3secs and hide it

        $('.toast__container').html(msg);
        $('.toast__container').addClass('visible');
        $('.toast__container').removeClass('invisible');
        $('.toast__container').removeClass('toast__msg--hide');
        $('.toast__container').animate({
            "left": "+15"
        }, 700);
        setTimeout(function() {
            $('.toast__container').animate({
                "left": "-285"
            }, 700);
            $('.toast__container').addClass('toast__msg--hide');
        }, options);

        //Remove the element after hiding
        /*toastContainer.addEventListener('transitionend', function(event) {
            event.target.parentNode.removeChild(event.target);
        });*/
    }

    module.exports = toast; //Make this method available in global
