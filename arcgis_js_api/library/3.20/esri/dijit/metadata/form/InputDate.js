// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.20/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/metadata/form/templates/InputDate.html":'\x3cdiv class\x3d"gxeInput gxeInputText"\x3e\r\n  \x3cinput class\x3d"gxeEditOnly" type\x3d"text" size\x3d"${size}" maxlength\x3d"${maxlength}"\r\n    data-dojo-attach-point\x3d"focusNode"\r\n    data-dojo-attach-event\x3d"onchange: _onChange, onkeyup: _onKeyup"/\x3e\r\n  \x3cspan class\x3d"gxeClickableText gxeEditOnly" data-dojo-attach-point\x3d"calendarNode" tabindex\x3d"0" role\x3d"button"\r\n    data-dojo-attach-event\x3d"onclick: _onCalendarClick"\x3e${i18nBase.calendar.button}\x3c/span\x3e\r\n  \x3cspan class\x3d"gxeClickableText gxeEditOnly" data-dojo-attach-point\x3d"stampNode" tabindex\x3d"0" role\x3d"button"\r\n    data-dojo-attach-event\x3d"onclick: _onStampClick"\x3e${i18nBase.general.now}\x3c/span\x3e\r\n  \x3cdiv class\x3d"gxeViewOnlyText gxeViewOnly" data-dojo-attach-point\x3d"viewOnlyNode"\x3e\x3c/div\x3e\r\n  \x3cdiv class\x3d"gxeContainer" data-dojo-attach-point\x3d"containerNode"\x3e\x3c/div\x3e\r\n  \x3cdiv class\x3d"gxeHint gxeEditOnly" data-dojo-attach-point\x3d"hintNode"\x3e\x3c/div\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/metadata/form/InputDate","dojo/_base/declare dojo/_base/lang dojo/date/locale dojo/dom-class dojo/dom-construct dojo/has ../base/etc/dateUtil ./InputText dojo/text!./templates/InputDate.html dojo/i18n!../nls/i18nBase dijit/Dialog ../editor/util/OkCancelBar ../../../kernel dijit/Calendar".split(" "),function(d,c,m,l,h,n,e,p,q,g,r,t,u,v){d=d([p],{_isGxeInputDate:!0,templateString:q,allowTime:!1,forceTime:!1,hint:g.hints.date,size:40,useNow:!1,showNow:!0,postCreate:function(){this.inherited(arguments);
this.connectAriaClickable(this.calendarNode,c.hitch(this,this._onCalendarClick));this.connectAriaClickable(this.stampNode,c.hitch(this,this._onStampClick))},postMixInProperties:function(){this.inherited(arguments);this.forceTime&&this.hint===g.hints.date?this.hint=g.hints.dateTime:this.allowTime&&this.hint===g.hints.date&&(this.hint=g.hints.dateOrDateTime)},connectXNode:function(b,a){this.inherited(arguments);!this.showNow&&this.stampNode&&(this.stampNode.style.display="none");!a&&this.useNow&&(this.forceTime?
this.setInputValue(this.formatDateTime(new Date)):this.setInputValue(this.formatDate(new Date)))},formatDate:function(b){return e.formatDate(b)},_onCalendarClick:function(){this.showCalendar()},_onStampClick:function(){var b=new Date;this.allowTime?this.setInputValue(e.formatDateTime(b)):this.setInputValue(e.formatDate(b))},_getDateForCalendar:function(){var b="yyyy-MM-dd",a=this.getInputValue();if(null===a)return null;a=c.trim(a);if(0===a.length)return null;var a=a.split("Z")[0].split("T")[0],f=
a.split("-");1===f.length?b="yyyy":2===f.length&&(b="yyyy-MM");return m.parse(a,{datePattern:b,selector:"date"})},showCalendar:function(){var b=null,a=g.calendar.title,f=this._getDateForCalendar();null===f&&(f=new Date);var d=h.create("div",{}),e=new v({"class":"gxeCenteredCalendar",value:f,onChange:c.hitch(this,function(a){a=this.formatDate(a);this.forceTime&&(a+="T00:00:00+00:00");this.setInputValue(a);b&&b.hide()})},h.create("div",{},d));e.startup();var k=new t({onOkClick:c.hitch(this,function(){var a=
e.get("value");null!==a&&(a=this.formatDate(a),this.forceTime&&(a+="T00:00:00"),this.setInputValue(a),b&&b.hide())}),onCancelClick:c.hitch(this,function(){b&&b.hide()})},h.create("div",{},d));l.add(k.workingNode,"gxeSmallText");k.showWorking(this.formatDate(f),!1);b=new r({"class":"gxeDialog gxePopupDialog",title:a,content:d});this.isLeftToRight()||l.add(b.domNode,"gxeRtl");this.own(b.on("hide",c.hitch(this,function(){setTimeout(c.hitch(this,function(){k.destroyRecursive(!1);b.destroyRecursive(!1);
e.destroyRecursive(!1)}),300)})));b.show()}});n("extend-esri")&&c.setObject("dijit.metadata.form.InputDate",d,u);return d});