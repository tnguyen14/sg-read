this.Templates=this.Templates||{},this.Templates.item=Handlebars.template(function(a,e,t,r,s){this.compilerInfo=[4,">= 1.0.0"],t=this.merge(t,a.helpers),s=s||{};var l,n,i,o="",m="function",c=this.escapeExpression,h=t.helperMissing;return o+='<div class="item">\n    <h4><a href="',(n=t.url)?l=n.call(e,{hash:{},data:s}):(n=e&&e.url,l=typeof n===m?n.call(e,{hash:{},data:s}):n),o+=c(l)+'">',(n=t.title)?l=n.call(e,{hash:{},data:s}):(n=e&&e.title,l=typeof n===m?n.call(e,{hash:{},data:s}):n),o+=c(l)+'</a></h4>\n    <p class="share-info">Shared <span class="share-time" data-timestamp="',(n=t.timestamp)?l=n.call(e,{hash:{},data:s}):(n=e&&e.timestamp,l=typeof n===m?n.call(e,{hash:{},data:s}):n),o+=c(l)+'">'+c((n=t.getDate||e&&e.getDate,i={hash:{},data:s},n?n.call(e,e&&e.timestamp,"ddd, MMM D, YY [at] h:mmA",i):h.call(e,"getDate",e&&e.timestamp,"ddd, MMM D, YY [at] h:mmA",i)))+'</span> by <span class="sharer">',(n=t.sharer)?l=n.call(e,{hash:{},data:s}):(n=e&&e.sharer,l=typeof n===m?n.call(e,{hash:{},data:s}):n),o+=c(l)+"</span></p>\n    <p>",(n=t.description)?l=n.call(e,{hash:{},data:s}):(n=e&&e.description,l=typeof n===m?n.call(e,{hash:{},data:s}):n),o+=c(l)+"</p>\n</div>\n"}),this.Templates=this.Templates||{},this.Templates.resource=Handlebars.template(function(a,e,t,r,s){this.compilerInfo=[4,">= 1.0.0"],t=this.merge(t,a.helpers),s=s||{};var l,n,i="",o="function",m=this.escapeExpression;return i+='<div class="form-group col-sm-12">\n    <label for="title">Title</label>\n    <input type="text" name="title" class="form-control" value="',(n=t.title)?l=n.call(e,{hash:{},data:s}):(n=e&&e.title,l=typeof n===o?n.call(e,{hash:{},data:s}):n),i+=m(l)+'" />\n</div>\n<div class="form-group col-sm-12">\n    <label for="description">Description</label>\n    <textarea name="description" class="form-control">',(n=t.description)?l=n.call(e,{hash:{},data:s}):(n=e&&e.description,l=typeof n===o?n.call(e,{hash:{},data:s}):n),i+=m(l)+"</textarea>\n</div>\n"}),this.Templates=this.Templates||{},this.Templates.shareform=Handlebars.template(function(a,e,t,r,s){function l(a,e){var r,s,l="";return l+='\n                    <option value="',(s=t.email)?r=s.call(a,{hash:{},data:e}):(s=a&&a.email,r=typeof s===o?s.call(a,{hash:{},data:e}):s),l+=m(r)+'">',(s=t.firstname)?r=s.call(a,{hash:{},data:e}):(s=a&&a.firstname,r=typeof s===o?s.call(a,{hash:{},data:e}):s),l+=m(r)+"</option>\n                "}this.compilerInfo=[4,">= 1.0.0"],t=this.merge(t,a.helpers),s=s||{};var n,i="",o="function",m=this.escapeExpression,c=this;return i+='<form role="form" class="form-horizontal" id="share-a-link">\n    <div class="form-group row">\n        <label for="url">A cool link you found?</label>\n        <div class="col-sm-12">\n            <input type="text" name="url" class="url form-control" placeholder="http://a-vegetable-name.io"/>\n        </div>\n    </div>\n    <div class="resource"></div>\n    <div class="form-group row">\n        <div><label for="sharer">And which awesome SG Dev are you?</label></div>\n        <div class="sharer-container col-sm-6">\n            <select name="sharer" class="form-control">\n                <option value=""></option>\n                ',n=t.each.call(e,e,{hash:{},inverse:c.noop,fn:c.program(1,l,s),data:s}),(n||0===n)&&(i+=n),i+='\n                <option value="other">Other</option>\n            </select>\n        </div>\n        <div class="sharer-email-container col-sm-6">\n            <input type="text" class="form-control" name="sharer_email" class="sharer-email col-sm-4" placeholder="Your email"/>\n        </div>\n    </div>\n    <div class="form-group">\n        <button type="submit" class="btn btn-primary">Share</button>\n    </div>\n</form>\n'});var serverUrl="http://inspired-read.herokuapp.com",sharers=[{firstname:"Tri",lastname:"Nguyen",email:"tnguyen@demandware.com"},{firstname:"Larry",lastname:"Gelberg",email:"lgelberg@demandware.com"},{firstname:"Alex",lastname:"Clark",email:"aclark@demandware.com"},{firstname:"Gilberte",lastname:"Houbart",email:"ghoubart@demandware.com"},{firstname:"Peter",lastname:"Pritchard",email:"ppritchard@demandware.com"},{firstname:"Aesh",lastname:"Verma",email:"averma@demandware.com"}];Handlebars.registerHelper("getDate",function(a,e){var t=moment(a),r=moment();return r.diff(t,"days")>7?"on "+t.format(e):t.fromNow()}),jQuery("document").ready(function(a){var e=Templates.item,t=Templates.resource,r=Templates.shareform,s=a(".shared-items");a(".share-container").html(r(sharers)),s.html('<div class="spinner"></div>'),a.ajax({url:serverUrl+"/sg/articles",success:function(t){s.empty(),_.each(t,function(t){a(".shared-items").append(e(t))})}}),a('[name="sharer"]').on("change",function(){"other"===a(this).val()?a(".sharer-email-container").show():a(".sharer-email-container").hide()}),a('[name="url"]').on("change",function(){var e=a(this).val(),r=a(".resource");return""===e?void a(".resource").empty():(r.html('<div class="spinner"></div>'),void a.ajax({url:serverUrl+"/extract/"+encodeURIComponent(e),success:function(e){r.html(t(e)),a(this).data("originalUrl",e.original_url),a(this).val(e.url)},error:function(){r.html('<p class="bg-warning">Unable to get details for your URL. You can still go ahead and share it.</p>'),r.append(t())}}))}),a("#share-a-link").on("submit",function(t){t.preventDefault();var r=a(t.target),s=r.serialize();a.ajax({url:serverUrl+"/sg/articles",type:"POST",data:s,success:function(t){a(".shared-items").prepend(e(t)),a(":input",r).val("")}})})});