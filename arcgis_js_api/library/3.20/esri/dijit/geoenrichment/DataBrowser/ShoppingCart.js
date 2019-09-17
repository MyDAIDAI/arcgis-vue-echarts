// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.20/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/geoenrichment/DataBrowser/templates/ShoppingCart.html":'\x3cdiv class\x3d"ShoppingCart" data-dojo-attach-event\x3d"mouseout:_hideListOnLeave"\x3e\r\n    \x3ctable data-dojo-attach-point\x3d"label" class\x3d"Label" data-dojo-attach-event\x3d"click:_toggleList"\x3e\r\n        \x3ctr\x3e\r\n            \x3ctd class\x3d"ShoppingCart_CounterTD"\x3e\r\n                \x3cdiv class\x3d"ShoppingCart_CounterDivLeftBorder"\x3e\x3c/div\x3e\x3cdiv data-dojo-attach-point\x3d"divCounter" class\x3d"ShoppingCart_CounterDiv"\x3e\x3c/div\x3e\x3cdiv class\x3d"ShoppingCart_CounterDivRightBorder"\x3e\x3c/div\x3e\r\n            \x3c/td\x3e\r\n            \x3ctd class\x3d"ShoppingCart_LabelTd"\x3e\r\n                \x3cdiv data-dojo-attach-point\x3d"selectedVariablesLabel"\x3e\x3c/div\x3e\r\n            \x3c/td\x3e\r\n            \x3ctd\x3e\r\n                \x3cdiv class\x3d"ShoppingCartOpener" data-dojo-attach-point\x3d"divShoppingCartOpener"\x3e\x26#x25bc;\x3c/div\x3e\r\n            \x3c/td\x3e\r\n        \x3c/tr\x3e\r\n    \x3c/table\x3e\r\n        \r\n    \x3cdiv data-dojo-attach-point\x3d"divOuter" class\x3d"ShoppingCart_OuterDiv"\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"divList" class\x3d"ShoppingCart_DivList"\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"divEmpty" class\x3d"ShoppingCart_DivEmpty"\x3e\r\n            \x3cdiv\x3e${nls.noVariables}\x3c/div\x3e\r\n        \x3c/div\x3e\r\n    \x3c/div\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/geoenrichment/DataBrowser/ShoppingCart","dojo/_base/lang dojo/_base/window dojo/dom-construct dojo/dom-attr dojo/on dojo/when dojox/mvc/Templated dgrid/List ../../../declare dojo/text!./templates/ShoppingCart.html dojo/i18n!../../../nls/jsapi ./VariableUtil ./VariableToggle".split(" "),function(g,u,f,v,k,l,m,n,p,q,h,r,t){h=h.geoenrichment.dijit.ShoppingCart;return p("esri.dijit.geoenrichment.ShoppingCart",m,{nls:h,templateString:q,variables:null,selection:null,allowToggles:!0,_list:null,
_content:null,postCreate:function(){this.inherited(arguments);this.selectedVariablesLabel.innerHTML=h.selectedVars;this.selection=[];this._content=[];this._list=new n({renderRow:g.hitch(this,this._renderVariable)},this.divList);k(this.divList,"click, touchend",g.hitch(this,this._stopPropagation));this._updateLabel();this.divOuter.style.display="none";var a=this;this.watch("selection",function(){l(a.variables.synchronize(),g.hitch(a,a._onSelectionChanged))})},_updateLabel:function(){this.divCounter.innerHTML=
this._content.length.toString()},_onSelectionChanged:function(){for(var a=[],b=Math.min(this._content.length,this.selection.length),c=0;c<b;c++){var e=this.selection[c],d=this._content[c];if(!d.hash[e])break;d.group.value=e;a.push(d)}b=this.selection.length;for(c=a.length;c<b;c++)e=this.selection[c],d={hash:{}},d.group=r.getToggleGroup(this.variables,e,d.hash),e=d.group.states&&this.allowToggles?d.group.states.ids[0]:d.group.value,d.title=this.variables.get(e).alias,a.push(d);this._content=a;this._updateLabel()},
_toggleList:function(a){this._stopPropagation(a);"none"===this.divOuter.style.display?this._displayList():this._hideList()},_stopPropagation:function(a){a.stopPropagation&&a.stopPropagation()},_displayList:function(){this.refresh();this.divShoppingCartOpener.innerHTML="\x26#x25b2;";this.divOuter.style.display=""},_hideList:function(){this.divShoppingCartOpener.innerHTML="\x26#x25bc;";this.divOuter.style.display="none"},_hideListOnLeave:function(a){if("none"!=this.divOuter.style.display){a=a.relatedTarget;
for(var b=!0;a;){if(a===this.label||a===this.divOuter){b=!1;break}a=a.parentNode}this._onMouseLeave(b)}},_onMouseLeave:function(a){a&&this._hideList()},_renderVariable:function(a){var b=f.create("div",{"class":"ShoppingCartRow"}),c=f.create("div",{"class":"ShoppingCartRowCloser ShoppingCartRowFloatEnd"},b);k(c,"click",g.hitch(this,this._onRemove,a));f.create("div",{"class":"dijitInline ShoppingCartRowSpacer ShoppingCartRowFloatEnd",innerHTML:"\x26nbsp;"},b);a.group.states&&this.allowToggles&&(c=new t(a.group,
f.create("div",{"class":"dijitInline ShoppingCartRowFloatEnd"},b)),k(c,"change",g.hitch(this,this._onToggleChange,c,a)),f.create("div",{"class":"dijitInline ShoppingCartRowSpacer ShoppingCartRowFloatEnd",innerHTML:"\x26nbsp;"},b));f.create("div",{"class":"TrimWithEllipses ShoppingCartRowLabel",innerHTML:this.variables.get(a.group.states&&this.allowToggles?a.group.states.ids[0]:a.group.value).alias},b);return b},_onRemove:function(a){for(var b=this.selection.slice(),c=b.length,e=0;e<c;e++)if(this._content[e]===
a){b.splice(e,1);this._content.splice(e,1);break}this.set("selection",b);this.refresh()},_onToggleChange:function(a,b){b.group.value=a.value;for(var c=this.selection.slice(),e=c.length,d=0;d<e;d++)if(this._content[d]===b){c[d]=a.value;break}this.set("selection",c)},refresh:function(){this._list.refresh();this._list.renderArray(this._content);this._updateLabel();this.divEmpty.style.visibility=this._content.length?"hidden":"visible"}})});