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
}];

jQuery('document').ready( function ($) {
    var itemTemplate = Templates.item,
        resourceTemplate = Templates.resource,
        shareFormTemplate = Templates.shareform;
    $('.share-container').html(shareFormTemplate(sharers));
    $.ajax({
        url: serverUrl,
        success: function (articles) {
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
        var url = $(this).val();
        if (url === '') {
            $('.resource').empty();
            return;
        }
        $.ajax({
            url: serverUrl + '/extract/' + encodeURIComponent(url),
            success: function (data) {
                /*jshint camelcase: false */
                $('.resource').html(resourceTemplate(data));
                $(this).data('originalUrl', data.original_url);
                $(this).val(data.url);
            },
            error: function (xhr, status, err) {
                console.log(xhr);
                console.log(err);
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
