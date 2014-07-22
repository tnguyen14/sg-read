/* global Templates */

'use strict';

var url = '/* @echo url */' || 'http://localhost:3030';

jQuery('document').ready( function ($) {
    var template = Templates.item();
    console.log(template);
    $.ajax({
        url: url,
        success: function (data) {
            console.log(data);
        }
    });
});
