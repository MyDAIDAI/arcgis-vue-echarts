//>>built
define("dojox/gfx/_gfxBidiSupport","./_base dojo/_base/lang dojo/_base/sniff dojo/dom dojo/_base/html dojo/_base/array ./utils ./shape ./path dojox/string/BidiEngine".split(" "),function(b,k,m,q,n,r,h,f,u,t){function p(a,d){var g=l(d);g&&b.utils.forEach(a,function(a){if(a instanceof b.Surface||a instanceof b.Group)a.textDir=g;a instanceof b.Text&&a.setShape({textDir:g});a instanceof b.TextPath&&a.setText({textDir:g})},a);return a}function l(a){var b=["ltr","rtl","auto"];return a&&(a=a.toLowerCase(),
0>r.indexOf(b,a))?null:a}k.getObject("dojox.gfx._gfxBidiSupport",!0);switch(b.renderer){case "vml":b.isVml=!0;break;case "svg":b.isSvg=!0;b.svg.useSvgWeb&&(b.isSvgWeb=!0);break;case "silverlight":b.isSilverlight=!0;break;case "canvas":case "canvasWithEvents":b.isCanvas=!0}var e=new t;k.extend(b.shape.Surface,{textDir:"",setTextDir:function(a){p(this,a)},getTextDir:function(){return this.textDir}});k.extend(b.Group,{textDir:"",setTextDir:function(a){p(this,a)},getTextDir:function(){return this.textDir}});
k.extend(b.Text,{textDir:"",formatText:function(a,d){if(d&&a&&1<a.length){var g="ltr",c=d;if("auto"==c){if(b.isVml)return a;c=e.checkContextual(a)}if(b.isVml)return g=e.checkContextual(a),c!=g?"rtl"==c?e.hasBidiChar(a)?"\u200f\u200f"+a:e.bidiTransform(a,"IRNNN","ILNNN"):"\u200e"+a:a;if(b.isSvgWeb)return"rtl"==c?e.bidiTransform(a,"IRNNN","ILNNN"):a;if(b.isSilverlight)return"rtl"==c?e.bidiTransform(a,"IRNNN","VLYNN"):e.bidiTransform(a,"ILNNN","VLYNN");if(b.isCanvas)return"rtl"==c?"\u202b"+a+"\u202c":
"\u202a"+a+"\u202c";if(b.isSvg)return 4>m("ff")?"rtl"==c?e.bidiTransform(a,"IRYNN","VLNNN"):e.bidiTransform(a,"ILYNN","VLNNN"):"\u200e"+("rtl"==c?"\u202b":"\u202a")+a+"\u202c"}return a},bidiPreprocess:function(a){return a}});k.extend(b.TextPath,{textDir:"",formatText:function(a,d){if(d&&a&&1<a.length){var g="ltr",c=d;if("auto"==c){if(b.isVml)return a;c=e.checkContextual(a)}if(b.isVml)return g=e.checkContextual(a),c!=g?"rtl"==c?e.hasBidiChar(a)?"\u200f\u200f"+a:e.bidiTransform(a,"IRNNN","ILNNN"):"\u200e"+
a:a;if(b.isSvgWeb)return"rtl"==c?e.bidiTransform(a,"IRNNN","ILNNN"):a;b.isSvg&&(a=m("opera")||4<=m("ff")?"\u200e"+("rtl"==c?"\u202b":"\u202a")+a+"\u202c":"rtl"==c?e.bidiTransform(a,"IRYNN","VLNNN"):e.bidiTransform(a,"ILYNN","VLNNN"))}return a},bidiPreprocess:function(a){a&&"string"==typeof a&&(this.origText=a,a=this.formatText(a,this.textDir));return a}});h=function(a,b,g,c){var d=a.prototype[b];a.prototype[b]=function(){var a;g&&(a=g.apply(this,arguments));a=d.call(this,a);c&&(a=c.call(this,a,arguments));
return a}};f=function(a){a&&(a.textDir&&(a.textDir=l(a.textDir)),a.text&&a.text instanceof Array&&(a.text=a.text.join(",")));!a||void 0==a.text&&!a.textDir||this.textDir==a.textDir&&a.text==this.origText||(this.origText=void 0!=a.text?a.text:this.origText,a.textDir&&(this.textDir=a.textDir),a.text=this.formatText(this.origText,this.textDir));return this.bidiPreprocess(a)};h(b.Text,"setShape",f,null);h(b.TextPath,"setText",f,null);f=function(a){(a=k.clone(a))&&this.origText&&(a.text=this.origText);
return a};h(b.Text,"getShape",null,f);h(b.TextPath,"getText",null,f);f=function(a,b){var d;b&&b[0]&&(d=l(b[0]));a.setTextDir(d?d:this.textDir);return a};h(b.Surface,"createGroup",null,f);h(b.Group,"createGroup",null,f);f=function(a){if(a){var b=a.textDir?l(a.textDir):this.textDir;b&&(a.textDir=b)}return a};h(b.Surface,"createText",f,null);h(b.Surface,"createTextPath",f,null);h(b.Group,"createText",f,null);h(b.Group,"createTextPath",f,null);b.createSurface=function(a,d,e,c){d=b[b.renderer].createSurface(a,
d,e);c=l(c);if(b.isSvgWeb)return d.textDir=c?c:n.style(q.byId(a),"direction"),d;if(b.isVml||b.isSvg||b.isCanvas)d.textDir=c?c:n.style(d.rawNode,"direction");b.isSilverlight&&(d.textDir=c?c:n.style(d._nodes[1],"direction"));return d};return b});