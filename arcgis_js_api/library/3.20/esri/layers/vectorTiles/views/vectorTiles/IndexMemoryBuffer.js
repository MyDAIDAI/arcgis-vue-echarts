// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.20/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/vectorTiles/IndexMemoryBuffer",["require","exports","../../core/tsSupport/extendsHelper","../../core/tsSupport/decorateHelper","./MemoryBuffer"],function(e,f,g,h,c){e=function(b){function a(){return b.call(this,12)||this}g(a,b);a.prototype.add=function(a,b,c){var d=this.array;d.push(a);d.push(b);d.push(c)};return a}(c);f.TriangleElementMemoryBuffer=e;c=function(b){function a(){return b.call(this,4)||this}g(a,b);a.prototype.add=function(a){this.array.push(a)};
return a}(c);f.PointElementMemoryBuffer=c});