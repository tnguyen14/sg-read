this.Templates=this.Templates||{},this.Templates.item=Handlebars.template(function(e,a,t,r,s){this.compilerInfo=[4,">= 1.0.0"],t=this.merge(t,e.helpers),s=s||{};var l,n,i,o="",c="function",h=this.escapeExpression,m=t.helperMissing;return o+='<div class="item">\n    <h4><a href="',(n=t.url)?l=n.call(a,{hash:{},data:s}):(n=a&&a.url,l=typeof n===c?n.call(a,{hash:{},data:s}):n),o+=h(l)+'">',(n=t.title)?l=n.call(a,{hash:{},data:s}):(n=a&&a.title,l=typeof n===c?n.call(a,{hash:{},data:s}):n),o+=h(l)+'</a></h4>\n    <p class="share-info">Shared on '+h((n=t.getDate||a&&a.getDate,i={hash:{},data:s},n?n.call(a,a&&a.timestamp,"ddd, MMM D, YY at h:mmA",i):m.call(a,"getDate",a&&a.timestamp,"ddd, MMM D, YY at h:mmA",i)))+' by <span class="sharer">',(n=t.sharer)?l=n.call(a,{hash:{},data:s}):(n=a&&a.sharer,l=typeof n===c?n.call(a,{hash:{},data:s}):n),o+=h(l)+"</span></p>\n    <p>",(n=t.description)?l=n.call(a,{hash:{},data:s}):(n=a&&a.description,l=typeof n===c?n.call(a,{hash:{},data:s}):n),o+=h(l)+"</p>\n</div>\n"}),this.Templates=this.Templates||{},this.Templates.resource=Handlebars.template(function(e,a,t,r,s){this.compilerInfo=[4,">= 1.0.0"],t=this.merge(t,e.helpers),s=s||{};var l,n,i="",o="function",c=this.escapeExpression;return i+='<div class="form-group col-sm-12">\n    <label for="title">Title</label>\n    <input type="text" name="title" class="form-control" value="',(n=t.title)?l=n.call(a,{hash:{},data:s}):(n=a&&a.title,l=typeof n===o?n.call(a,{hash:{},data:s}):n),i+=c(l)+'" />\n</div>\n<div class="form-group col-sm-12">\n    <label for="description">Description</label>\n    <textarea name="description" class="form-control">',(n=t.description)?l=n.call(a,{hash:{},data:s}):(n=a&&a.description,l=typeof n===o?n.call(a,{hash:{},data:s}):n),i+=c(l)+"</textarea>\n</div>\n"}),this.Templates=this.Templates||{},this.Templates.shareform=Handlebars.template(function(e,a,t,r,s){function l(e,a){var r,s,l="";return l+='\n                    <option value="',(s=t.email)?r=s.call(e,{hash:{},data:a}):(s=e&&e.email,r=typeof s===o?s.call(e,{hash:{},data:a}):s),l+=c(r)+'">',(s=t.firstname)?r=s.call(e,{hash:{},data:a}):(s=e&&e.firstname,r=typeof s===o?s.call(e,{hash:{},data:a}):s),l+=c(r)+"</option>\n                "}this.compilerInfo=[4,">= 1.0.0"],t=this.merge(t,e.helpers),s=s||{};var n,i="",o="function",c=this.escapeExpression,h=this;return i+='<form role="form" class="form-horizontal" id="share-a-link">\n    <div class="form-group row">\n        <label for="url">A cool link you found?</label>\n        <div class="col-sm-12">\n            <input type="text" name="url" class="url form-control" placeholder="http://a-vegetable-name.io"/>\n        </div>\n    </div>\n    <div class="resource"></div>\n    <div class="form-group row">\n        <div><label for="sharer">And which awesome SG Dev are you?</label></div>\n        <div class="sharer-container col-sm-6">\n            <select name="sharer" class="form-control">\n                <option value=""></option>\n                ',n=t.each.call(a,a,{hash:{},inverse:h.noop,fn:h.program(1,l,s),data:s}),(n||0===n)&&(i+=n),i+='\n                <option value="other">Other</option>\n            </select>\n        </div>\n        <div class="sharer-email-container col-sm-6">\n            <input type="text" class="form-control" name="sharer_email" class="sharer-email col-sm-4" placeholder="Your email"/>\n        </div>\n    </div>\n    <div class="form-group">\n        <button type="submit" class="btn btn-primary">Share</button>\n    </div>\n</form>\n'});var serverUrl="http://sg-read.herokuapp.com",sharers=[{firstname:"Tri",lastname:"Nguyen",email:"tnguyen@demandware.com"},{firstname:"Larry",lastname:"Gelberg",email:"lgelberg@demandware.com"},{firstname:"Alex",lastname:"Clark",email:"aclark@demandware.com"},{firstname:"Gilberte",lastname:"Houbart",email:"ghoubart@demandware.com"},{firstname:"Peter",lastname:"Pritchard",email:"ppritchard@demandware.com"}];Handlebars.registerHelper("getDate",function(e,a){return moment(e).format(a)}),jQuery("document").ready(function(e){var a=Templates.item,t=Templates.resource,r=Templates.shareform,s=e(".shared-items");e(".share-container").html(r(sharers)),s.html('<div class="spinner"></div>'),e.ajax({url:serverUrl,success:function(t){s.empty(),_.each(t,function(t){e(".shared-items").append(a(t))})}}),e('[name="sharer"]').on("change",function(){"other"===e(this).val()?e(".sharer-email-container").show():e(".sharer-email-container").hide()}),e('[name="url"]').on("change",function(){var a=e(this).val(),r=e(".resource");return""===a?void e(".resource").empty():(r.html('<div class="spinner"></div>'),void e.ajax({url:serverUrl+"/extract/"+encodeURIComponent(a),success:function(a){r.html(t(a)),e(this).data("originalUrl",a.original_url),e(this).val(a.url)},error:function(){r.html('<p class="bg-warning">Unable to get details for your URL. You can still go ahead and share it.</p>'),r.append(t())}}))}),e("#share-a-link").on("submit",function(t){t.preventDefault();var r=e(t.target),s=r.serialize();e.ajax({url:serverUrl,type:"POST",data:s,success:function(t){e(".shared-items").prepend(a(t)),e(":input",r).val("")}})})});