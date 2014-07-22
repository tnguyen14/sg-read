/* global Templates */

'use strict';

var url = '/* @echo URL */' || 'http://localhost:3030';

jQuery('document').ready( function ($) {
    var template = Templates.item();
    $.ajax({
        url: url,
        success: function (data) {
            console.log(data);
        }
    })
});
