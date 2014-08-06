/* global Templates, _ */

'use strict';

var serverUrl = '/* @echo url */' || 'http://localhost:3030';

var sharers = [{
    firstname: 'Tri',
    lastname: 'Nguyen',
    email: 'tnguyen@demandware.com'
}, {
    firstname: 'Larry',
    lastname: 'Gelberg',
    email: 'lgelberg@demandware.com'
}, {
    firstname: 'Alex',
    lastname: 'Clark',
    email: 'aclark@demandware.com'
}, {
    firstname: 'Gilberte',
    lastname: 'Houbart',
    email: 'ghoubart@demandware.com'
}, {
    firstname: 'Peter',
    lastname: 'Pritchard',
    email: 'ppritchard@demandware.com'
}];

jQuery('document').ready( function ($) {
    var itemTemplate = Templates.item,
        resourceTemplate = Templates.resource,
        shareFormTemplate = Templates.shareform,
        $sharedItems = $('.shared-items');
    $('.share-container').html(shareFormTemplate(sharers));
    $sharedItems.html('<div class="spinner"></div>');
    $.ajax({
        url: serverUrl,
        success: function (articles) {
            $sharedItems.empty();
            _.each(articles, function (article) {
                $('.shared-items').append(itemTemplate(article));
            });
        }
    });
    $('[name="sharer"]').on('change', function () {
        if ($(this).val() === 'other') {
            $('.sharer-email-container').show();
        } else {
            $('.sharer-email-container').hide();
        }
    });
    $('[name="url"]').on('change', function () {
        var url = $(this).val(),
            $resource = $('.resource');
        if (url === '') {
            $('.resource').empty();
            return;
        }
        $resource.html('<div class="spinner"></div>');
        $.ajax({
            url: serverUrl + '/extract/' + encodeURIComponent(url),
            success: function (data) {
                /*jshint camelcase: false */
                $resource.html(resourceTemplate(data));
                $(this).data('originalUrl', data.original_url);
                $(this).val(data.url);
            },
            error: function () {
                $resource.html('<p class="bg-warning">Unable to get details for your URL. You can still go ahead and share it.</p>');
                $resource.append(resourceTemplate());
            }
        });
    });
    // form submit
    $('#share-a-link').on('submit', function (e) {
        e.preventDefault();
        var $form = $(e.target),
            formData = $form.serialize();
        $.ajax({
            url: serverUrl,
            type: 'POST',
            data: formData,
            success: function (data) {
                $('.shared-items').prepend(itemTemplate(data));
                $(':input', $form).val('');
            }
            // Handle error
        });
    });
});
