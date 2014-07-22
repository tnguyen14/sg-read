/* global Templates, _ */

'use strict';

var url = '/* @echo url */' || 'http://localhost:3030';

jQuery('document').ready( function ($) {
    var template = Templates.item;
    $.ajax({
        url: url,
        success: function (articles) {
            _.each(articles, function (article) {
                $('.shared-articles').append(template(article));
            });
        }
    });
    $('[name="sharer"]').on('change', function () {
        if ($(this).val() === 'other') {
            $('.sharer-container').removeClass('col-sm-12').addClass('col-sm-6');
            $('.sharer-name-container').show();
        }
    });
});
