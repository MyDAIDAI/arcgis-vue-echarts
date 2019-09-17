// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.20/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/2d/layers/support/TileCoverage",["require","exports","../../../../core/ObjectPool","../../../../core/ArrayPool","./TileSpan"],function(a,f,d,b,e){a=function(){function a(a){this.lodInfo=a;this.spans=b.acquire()}a.prototype.release=function(){for(var a=0,c=this.spans;a<c.length;a++)e.pool.release(c[a]);b.release(this.spans)};return a}();a.pool=new d(a,!0);return a});