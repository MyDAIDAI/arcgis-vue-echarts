// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.20/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/InfographicsConfig","../../declare dojo/_base/lang dojo/string ./_Wizard ./InfographicsOptions ./InfographicsMainPage ./DataBrowser ./lang dojo/i18n!../../nls/jsapi".split(" "),function(q,a,w,r,n,t,u,v,x){return q("esri.dijit.geoenrichment.InfographicsConfig",[r],{options:null,constructor:function(){this.pages.m=new t({onAddVariables:a.hitch(this,this._addVariables),onOK:a.hitch(this,this._onOK),onCancel:a.hitch(this,this._onCancel)})},startup:function(){this._started||
(this.inherited(arguments),this.options||this.set("options",new n),this.loadPage("m"))},_setOptionsAttr:function(c){this._set("options",c);this.pages.m.set("options",c)},_getCountryIDAttr:function(){return this.pages.m.get("countryID")},_setCountryIDAttr:function(c){this.pages.m.set("countryID",c)},_addVariables:function(){var c=this,d=this.get("countryID"),b=this.pages.db;b?b.set("countryID",d):(b=new u({countryID:d,countryBox:!1,multiSelect:!0,title:this.pages.m.nls.mainTitle}),b.on("back",a.hitch(this,
this.loadPage,"m")),b.on("cancel",a.hitch(this,this._onCancel)),b.on("ok",a.hitch(this,this._applyVariables)),this.pages.db=b);var h=[];this.options.getItems(d).then(function(g){for(var d=0;d<g.length;d++){var k=g[d];"OneVar"==k.type&&1==k.variables.length&&h.push(k.variables[0])}b.set("selection",h);c.loadPage("db")})},_applyVariables:function(){function c(d){for(var e=0;e<h.length;e++);return null[d]}for(var d=this,b=this.pages.m.get("countryID"),h=this.pages.db.dataCollections[b],g={},a=this.pages.db.get("selection"),
k=0;k<a.length;k++){var l=a[k];if(v.endsWith(l,".*"))for(var l=l.split(".")[0],p=c(null).variables,m=0;m<p.length;m++)g[l+"."+p[m].id]=!0;else g[l]=!0}this.options.getItems(b).then(function(b){var e,f;for(e=b.length-1;0<=e;e--)if(f=b[e],"OneVar"==f.type&&1==f.variables.length){var a=f.variables[0];g[a]?g[a]=!1:b.splice(e,1)}for(e=0;e<h.length;e++)for(var a=h[e].variables,c=0;c<a.length;c++)f=h[e].id+"."+a[c].id,g[f]&&(f=new n.Item("OneVar",[f]),f.title=a[c].alias,b.push(f));d.loadPage("m");d.pages.m.set("options",
d.options)})},_onOK:function(){this.emit("ok")},_onCancel:function(){this.emit("cancel")}})});