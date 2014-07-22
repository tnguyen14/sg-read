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
                console.log(data);
                $('.resource').html(resourceTemplate(data));
            }
        });
    });
});
