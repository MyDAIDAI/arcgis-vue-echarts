// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.20/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/vectorTiles/renderers/TileInfoRenderer","require exports ../../webgl/Program ../../webgl/VertexArrayObject ../../webgl/BufferObject ../../webgl/Texture ../GeometryUtils ./vtShaderSnippets".split(" "),function(q,r,k,l,m,n,p,g){return function(){function c(){this._initialized=!1;this._maxWidth=0;this._color=new Float32Array([1,0,0,1])}c.prototype.render=function(a,b){this._initialized||this._initialize(a);a.bindVAO(this._outlineVertexArrayObject);a.bindProgram(this._outlineProgram);
this._outlineProgram.setUniformMatrix4fv("u_transformMatrix",b.tileTransform.transform);this._outlineProgram.setUniform2fv("u_normalized_origin",b.tileTransform.displayCoord);this._outlineProgram.setUniform1f("u_coord_range",b.coordRange);this._outlineProgram.setUniform1f("u_depth",0);this._outlineProgram.setUniform4fv("u_color",this._color);a.setLineWidth(2);a.drawArrays(3,0,4);a.bindVAO();var d=this._getTexture(a,b);d&&(a.bindVAO(this._tileInfoVertexArrayObject),a.bindProgram(this._tileInfoProgram),
a.bindTexture(d,0),this._tileInfoProgram.setUniformMatrix4fv("u_transformMatrix",b.tileTransform.transform),this._tileInfoProgram.setUniform2fv("u_normalized_origin",b.tileTransform.displayCoord),this._tileInfoProgram.setUniform1f("u_depth",0),this._tileInfoProgram.setUniform1f("u_coord_ratio",b.coordRange/512),this._tileInfoProgram.setUniform2f("u_delta",8,8),this._tileInfoProgram.setUniform2f("u_dimensions",d.descriptor.width,d.descriptor.height),a.drawArrays(5,0,4),a.bindVAO())};c.prototype._initialize=
function(a){if(this._initialized)return!0;var b={a_pos:0},d=new k(a,g.backgroundVS,g.backgroundFS,b),e=new k(a,g.tileInfoVS,g.tileInfoFS,b),h={geometry:[{name:"a_pos",count:2,type:5120,offset:0,stride:2,normalized:!1,divisor:0}]},f=new Int8Array([0,0,1,0,1,1,0,1]),f=m.createVertex(a,35044,f),f=new l(a,b,h,{geometry:f}),c=new Int8Array([0,0,1,0,0,1,1,1]),c=m.createVertex(a,35044,c);a=new l(a,b,h,{geometry:c});this._outlineProgram=d;this._tileInfoProgram=e;this._vertexAttributes=h;this._outlineVertexArrayObject=
f;this._tileInfoVertexArrayObject=a;return this._initialized=!0};c.prototype._getTexture=function(a,b){if(b.texture)return b.texture;this._canvas||(this._canvas=document.createElement("canvas"),this._canvas.setAttribute("id","canvas2d"),this._canvas.setAttribute("width","256"),this._canvas.setAttribute("height","32"),this._canvas.setAttribute("style","display:none"));var d=b.key.id,e=this._canvas.getContext("2d");e.font="24px sans-serif";e.textAlign="left";e.textBaseline="middle";var c=e.measureText(d),
c=Math.pow(2,Math.ceil(p.log2(c.width+2)));c>this._maxWidth&&(this._maxWidth=c);e.clearRect(0,0,this._maxWidth,32);e.fillStyle=b.key.level>b.refKey.level?"red":"blue";e.fillText(d,0,16);b.texture=new n(a,{target:3553,pixelFormat:6408,dataType:5121,samplingMode:9728},this._canvas);return b.texture};return c}()});