(function() {

    var header = $('header');

    $(window).scroll(function(e) {
        if (header.offset().top !== 0) {
            if (!header.hasClass('shadow')) {
                header.addClass('shadow');
            }
        } else {
            header.removeClass('shadow');
        }
    });
})();

(function() {
    'use strict';
    var kitchens_to_store;

    var theStore = localStorage.getItem("kitchens-list-cache");
    // if offline fetch from storage
    if (theStore) {
        //alert(theStore);
        $('#kitchen-con-new').html(theStore);
        console.log('kitchens list fetched from localstorage');
        return;
    }
    var kitchen = '';
    return fetch('kitchens/list', {

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
            console.log(responseData.data);
            var count = 0;
            String.prototype.replaceAll = function(search, replacement) {
                var target = this;
                return target.split(search).join(replacement);
            };
            kitchens_to_store = '';
            $.each(responseData.data, function(key, value) {
                var html = '';

                html += '<a style="color:#666666;" class="kitchen-link" href="#!/kitchen/' + value.id + '/' + value.name.replaceAll(' ', '-') + '">'
                html += '<div class="has-shadow" style="background-color:white;border:1px solid #e2e6e9; height:80px;margin-bottom:2px; border-radius:4px; padding:4px">';
                html += '<img width="75" style="float:left" height="70" src="src/images/' + value.description + '-out.jpeg" />';
                html += '<div class="name-n-review" style="float:left; margin-left:15px">';
                html += ' <h4 style="margin-top:0">' + value.name + '</h4>';
                html += ' <span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span>';

                html += '</div>';
                html += '<div class="forward" style="float:right; margin-left:15px; margin-right:5px;padding-top:30px">';
                html += '<span style="color:#FF4C00" class="glyphicon glyphicon-menu-right"></span>';
                html += '</div>';

                html += ' </div></a>';

                $('#kitchen-con-new').append(html);
                kitchens_to_store += html;
            });

            localStorage.setItem("kitchens-list-cache", kitchens_to_store);
        });
})();