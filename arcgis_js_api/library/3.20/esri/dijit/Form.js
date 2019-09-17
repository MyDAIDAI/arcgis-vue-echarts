// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.20/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/templates/Form.html":'\x3cdiv class\x3d"esriForm"\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/Form","require dojo/_base/declare dojo/_base/lang dojo/has ../kernel dojo/_base/array dojo/dom-style dojo/dom-construct dojo/dom-class dojo/query dijit/_Widget dijit/_TemplatedMixin dojo/text!./templates/Form.html".split(" "),function(q,e,m,r,t,h,u,n,p,k,v,w,x){e=e([v,w],{declaredClass:"esri.dijit.Form",widgetsInTemplate:!0,templateString:x,widgets:{},fieldTypes:{string:{widget:"dijit/form/TextBox"},date:{widget:"dijit/form/DateTextBox"},number:{widget:"dijit/form/NumberTextBox"},
"boolean":{widget:"dijit/form/Select",widgetParameters:{options:[{label:"True",value:"true"},{label:"False",value:"false"}]}}},fieldTemplate:"\x3cdiv\x3e\x3cdiv\x3e{label}\x3c/div\x3e\x3cdiv\x3e{widget}\x3c/div\x3e\x3c/div\x3e",constructor:function(a,b){this.fieldTypes=m.mixin(this.fieldTypes,a.fieldTypes)},postCreate:function(){this._fieldsLength=this.fields.length;h.forEach(this.fields,function(a){this.addField(a)},this)},destroy:function(){this.inherited(arguments);var a,b;for(a in this.widgets)this.widgets.hasOwnProperty(a)&&
(b=this.widgets[a],b.destroy());this.widgets=null},addField:function(a){var b,c,e,h,f,d=this;b=(a.template||this.fieldTemplate).replace("{label}",'\x3cspan class\x3d"esriFormFieldLabel"\x3e'+(a.label||a.name)+"\x3c/span\x3e");b=b.replace("{widget}",'\x3cdiv class\x3d"esriFormFieldWidget"\x3e\x3c/div\x3e');c=n.toDom(b);p.add(c,"esriFormField");e=k(".esriFormFieldWidget",c)[0];u.set(c,{display:!1===a.visible?"none":"block"});q([a.widget||this.fieldTypes[a.type].widget],function(b){h=a.widgetParameters||
d.fieldTypes[a.type].widgetParameters||{};f=new b(h,e);f.startup();p.add(f.domNode,"esriFormFieldWidget");f.fieldNode=c;f.initialState={value:a.value||null,visible:a.visible||!0,disabled:a.disabled||!1};d.domNode.appendChild(c);d.widgets[a.name]=f;d.setField(a);f.on("change",m.hitch(d,function(a,b){var c;b&&(c=b.value||b,b.target&&b.target.value&&(c=b.target.value),c={fieldName:a,value:c},d.emit("value-change",c))},a.name));d._fieldsLength--;var g,l;if(0===d._fieldsLength)for(b=k(".esriFormField",
d.domNode),g=0;g<b.length;g++)for(l=g;l<b.length;l++)(d.fields[g].label||d.fields[g].name)===k(".esriFormFieldLabel",b[l])[0].innerHTML&&n.place(b[l],d.domNode,g)})},removeField:function(a){m.isString(a)||(a=a.name);a=this.getWidget(a);a.fieldNode.parentNode.removeChild(a.fieldNode);a.destroy()},getWidget:function(a){return this.widgets[a]},reset:function(){var a,b;for(a in this.widgets)this.widgets.hasOwnProperty(a)&&(b=this.widgets[a].initialState,this.setField({name:a,value:b.value,visible:b.visible,
disabled:b.disabled}))},getField:function(a){var b=this.getWidget(a);return{label:k(".esriFormFieldLabel",b.parentNode)[0].innerHTML,name:a,value:b.value||b.getValue(),visible:b.visible,disabled:b.disabled}},setValues:function(a){for(var b in a)a.hasOwnProperty(b)&&this.setValue(b,a[b])},setValue:function(a,b){var c=this.getWidget(a);c.setValue?c.setValue(b):c.set&&c.set("value",b)},setFields:function(a){h.forEach(a,function(a){this.setField(a)})},setField:function(a){var b=this.getWidget(a.name);
k(".esriFormFieldLabel",b.fieldNode)[0].innerHTML=a.label||a.name;if(!0===a.visible||!1===a.visible)b.setVisibility?b.setVisibility(a.visible):b.set&&b.set("visible",a.visible);if(!0===a.disabled||!1===a.disabled)b.setDisabled?b.setDisabled(a.disabled):b.set&&b.set("disabled",a.disabled);if(void 0!==a.value||null!==a.value)b.setValue?b.setValue(a.value):b.set&&b.set("value",a.value)}});r("extend-esri")&&m.setObject("dijit.Form",e,t);return e});