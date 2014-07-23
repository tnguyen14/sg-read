/* global Templates, _ */

'use strict';

var serverUrl = '/* @echo url */' || 'http://localhost:3030';

jQuery('document').ready( function ($) {
    var itemTemplate = Templates.item,
        resourceTemplate = Templates.resource;
    $.ajax({
        url: serverUrl,
        success: function (articles) {
            _.each(articles, function (article) {
                $('.shared-articles').append(itemTemplate(article));
            });
        }
    });
    $('[name="sharer"]').on('change', function () {
        if ($(this).val() === 'other') {
            $('.sharer-container').removeClass('col-sm-6').addClass('col-sm-6');
            $('.sharer-name-container').show();
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
        var formData = $(e.target).serialize();
        $.ajax({
            url: serverUrl,
            type: 'POST',
            data: formData,
            success: function (data) {
                console.log(data);
            }
        });
    });
});
