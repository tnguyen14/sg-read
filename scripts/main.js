this.Templates=this.Templates||{},this.Templates.item=Handlebars.template(function(a,e,t,s,l){this.compilerInfo=[4,">= 1.0.0"],t=this.merge(t,a.helpers),l=l||{};var h,r,c="",i="function",p=this.escapeExpression;return c+='<div class="item">\n    <h4><a href="',(r=t.url)?h=r.call(e,{hash:{},data:l}):(r=e&&e.url,h=typeof r===i?r.call(e,{hash:{},data:l}):r),c+=p(h)+'">',(r=t.title)?h=r.call(e,{hash:{},data:l}):(r=e&&e.title,h=typeof r===i?r.call(e,{hash:{},data:l}):r),c+=p(h)+"</a></h4>\n    <p>",(r=t.description)?h=r.call(e,{hash:{},data:l}):(r=e&&e.description,h=typeof r===i?r.call(e,{hash:{},data:l}):r),c+=p(h)+'</p>\n    <p class="sharer">--',(r=t.sharer)?h=r.call(e,{hash:{},data:l}):(r=e&&e.sharer,h=typeof r===i?r.call(e,{hash:{},data:l}):r),c+=p(h)+"</p>\n</div>\n"});var url="http://sg-read.herokuapp.com";jQuery("document").ready(function(a){var e=Templates.item;a.ajax({url:url,success:function(t){_.each(t,function(t){a(".shared-articles").append(e(t))})}})});