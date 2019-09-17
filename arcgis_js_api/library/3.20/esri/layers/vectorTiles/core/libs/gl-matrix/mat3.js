// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.20/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/core/libs/gl-matrix/mat3",["./common"],function(t){var k={create:function(){var a=new t.ARRAY_TYPE(9);a[0]=1;a[1]=0;a[2]=0;a[3]=0;a[4]=1;a[5]=0;a[6]=0;a[7]=0;a[8]=1;return a},fromMat4:function(a,b){a[0]=b[0];a[1]=b[1];a[2]=b[2];a[3]=b[4];a[4]=b[5];a[5]=b[6];a[6]=b[8];a[7]=b[9];a[8]=b[10];return a},clone:function(a){var b=new t.ARRAY_TYPE(9);b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];b[4]=a[4];b[5]=a[5];b[6]=a[6];b[7]=a[7];b[8]=a[8];return b},copy:function(a,b){a[0]=b[0];
a[1]=b[1];a[2]=b[2];a[3]=b[3];a[4]=b[4];a[5]=b[5];a[6]=b[6];a[7]=b[7];a[8]=b[8];return a},fromValues:function(a,b,c,d,e,f,g,l,m){var h=new t.ARRAY_TYPE(9);h[0]=a;h[1]=b;h[2]=c;h[3]=d;h[4]=e;h[5]=f;h[6]=g;h[7]=l;h[8]=m;return h},set:function(a,b,c,d,e,f,g,l,m,h){a[0]=b;a[1]=c;a[2]=d;a[3]=e;a[4]=f;a[5]=g;a[6]=l;a[7]=m;a[8]=h;return a},identity:function(a){a[0]=1;a[1]=0;a[2]=0;a[3]=0;a[4]=1;a[5]=0;a[6]=0;a[7]=0;a[8]=1;return a},transpose:function(a,b){if(a===b){var c=b[1],d=b[2],e=b[5];a[1]=b[3];a[2]=
b[6];a[3]=c;a[5]=b[7];a[6]=d;a[7]=e}else a[0]=b[0],a[1]=b[3],a[2]=b[6],a[3]=b[1],a[4]=b[4],a[5]=b[7],a[6]=b[2],a[7]=b[5],a[8]=b[8];return a},invert:function(a,b){var c=b[0],d=b[1],e=b[2],f=b[3],g=b[4],l=b[5],m=b[6],h=b[7],n=b[8],p=n*g-l*h,k=-n*f+l*m,q=h*f-g*m,r=c*p+d*k+e*q;if(!r)return null;r=1/r;a[0]=p*r;a[1]=(-n*d+e*h)*r;a[2]=(l*d-e*g)*r;a[3]=k*r;a[4]=(n*c-e*m)*r;a[5]=(-l*c+e*f)*r;a[6]=q*r;a[7]=(-h*c+d*m)*r;a[8]=(g*c-d*f)*r;return a},adjoint:function(a,b){var c=b[0],d=b[1],e=b[2],f=b[3],g=b[4],
l=b[5],m=b[6],h=b[7],n=b[8];a[0]=g*n-l*h;a[1]=e*h-d*n;a[2]=d*l-e*g;a[3]=l*m-f*n;a[4]=c*n-e*m;a[5]=e*f-c*l;a[6]=f*h-g*m;a[7]=d*m-c*h;a[8]=c*g-d*f;return a},determinant:function(a){var b=a[3],c=a[4],d=a[5],e=a[6],f=a[7],g=a[8];return a[0]*(g*c-d*f)+a[1]*(-g*b+d*e)+a[2]*(f*b-c*e)},multiply:function(a,b,c){var d=b[0],e=b[1],f=b[2],g=b[3],l=b[4],m=b[5],h=b[6],n=b[7];b=b[8];var p=c[0],k=c[1],q=c[2],r=c[3],t=c[4],v=c[5],u=c[6],w=c[7];c=c[8];a[0]=p*d+k*g+q*h;a[1]=p*e+k*l+q*n;a[2]=p*f+k*m+q*b;a[3]=r*d+t*g+
v*h;a[4]=r*e+t*l+v*n;a[5]=r*f+t*m+v*b;a[6]=u*d+w*g+c*h;a[7]=u*e+w*l+c*n;a[8]=u*f+w*m+c*b;return a}};k.mul=k.multiply;k.translate=function(a,b,c){var d=b[0],e=b[1],f=b[2],g=b[3],l=b[4],m=b[5],h=b[6],n=b[7];b=b[8];var p=c[0];c=c[1];a[0]=d;a[1]=e;a[2]=f;a[3]=g;a[4]=l;a[5]=m;a[6]=p*d+c*g+h;a[7]=p*e+c*l+n;a[8]=p*f+c*m+b;return a};k.rotate=function(a,b,c){var d=b[0],e=b[1],f=b[2],g=b[3],l=b[4],m=b[5],h=b[6],n=b[7];b=b[8];var p=Math.sin(c);c=Math.cos(c);a[0]=c*d+p*g;a[1]=c*e+p*l;a[2]=c*f+p*m;a[3]=c*g-p*
d;a[4]=c*l-p*e;a[5]=c*m-p*f;a[6]=h;a[7]=n;a[8]=b;return a};k.scale=function(a,b,c){var d=c[0];c=c[1];a[0]=d*b[0];a[1]=d*b[1];a[2]=d*b[2];a[3]=c*b[3];a[4]=c*b[4];a[5]=c*b[5];a[6]=b[6];a[7]=b[7];a[8]=b[8];return a};k.fromTranslation=function(a,b){a[0]=1;a[1]=0;a[2]=0;a[3]=0;a[4]=1;a[5]=0;a[6]=b[0];a[7]=b[1];a[8]=1;return a};k.fromRotation=function(a,b){var c=Math.sin(b),d=Math.cos(b);a[0]=d;a[1]=c;a[2]=0;a[3]=-c;a[4]=d;a[5]=0;a[6]=0;a[7]=0;a[8]=1;return a};k.fromScaling=function(a,b){a[0]=b[0];a[1]=
0;a[2]=0;a[3]=0;a[4]=b[1];a[5]=0;a[6]=0;a[7]=0;a[8]=1;return a};k.fromMat2d=function(a,b){a[0]=b[0];a[1]=b[1];a[2]=0;a[3]=b[2];a[4]=b[3];a[5]=0;a[6]=b[4];a[7]=b[5];a[8]=1;return a};k.fromQuat=function(a,b){var c=b[0],d=b[1],e=b[2],f=b[3],g=c+c,l=d+d,m=e+e,c=c*g,h=d*g,d=d*l,n=e*g,p=e*l,e=e*m,g=f*g,l=f*l,f=f*m;a[0]=1-d-e;a[3]=h-f;a[6]=n+l;a[1]=h+f;a[4]=1-c-e;a[7]=p-g;a[2]=n-l;a[5]=p+g;a[8]=1-c-d;return a};k.normalFromMat4=function(a,b){var c=b[0],d=b[1],e=b[2],f=b[3],g=b[4],l=b[5],m=b[6],h=b[7],n=b[8],
p=b[9],k=b[10],q=b[11],r=b[12],t=b[13],v=b[14],u=b[15],w=c*l-d*g,x=c*m-e*g,y=c*h-f*g,G=d*m-e*l,z=d*h-f*l,A=e*h-f*m,B=n*t-p*r,C=n*v-k*r,n=n*u-q*r,D=p*v-k*t,p=p*u-q*t,k=k*u-q*v,q=w*k-x*p+y*D+G*n-z*C+A*B;if(!q)return null;q=1/q;a[0]=(l*k-m*p+h*D)*q;a[1]=(m*n-g*k-h*C)*q;a[2]=(g*p-l*n+h*B)*q;a[3]=(e*p-d*k-f*D)*q;a[4]=(c*k-e*n+f*C)*q;a[5]=(d*n-c*p-f*B)*q;a[6]=(t*A-v*z+u*G)*q;a[7]=(v*y-r*A-u*x)*q;a[8]=(r*z-t*y+u*w)*q;return a};k.str=function(a){return"mat3("+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+", "+a[4]+
", "+a[5]+", "+a[6]+", "+a[7]+", "+a[8]+")"};k.frob=function(a){return Math.sqrt(Math.pow(a[0],2)+Math.pow(a[1],2)+Math.pow(a[2],2)+Math.pow(a[3],2)+Math.pow(a[4],2)+Math.pow(a[5],2)+Math.pow(a[6],2)+Math.pow(a[7],2)+Math.pow(a[8],2))};k.add=function(a,b,c){a[0]=b[0]+c[0];a[1]=b[1]+c[1];a[2]=b[2]+c[2];a[3]=b[3]+c[3];a[4]=b[4]+c[4];a[5]=b[5]+c[5];a[6]=b[6]+c[6];a[7]=b[7]+c[7];a[8]=b[8]+c[8];return a};k.subtract=function(a,b,c){a[0]=b[0]-c[0];a[1]=b[1]-c[1];a[2]=b[2]-c[2];a[3]=b[3]-c[3];a[4]=b[4]-c[4];
a[5]=b[5]-c[5];a[6]=b[6]-c[6];a[7]=b[7]-c[7];a[8]=b[8]-c[8];return a};k.sub=k.subtract;k.multiplyScalar=function(a,b,c){a[0]=b[0]*c;a[1]=b[1]*c;a[2]=b[2]*c;a[3]=b[3]*c;a[4]=b[4]*c;a[5]=b[5]*c;a[6]=b[6]*c;a[7]=b[7]*c;a[8]=b[8]*c;return a};k.multiplyScalarAndAdd=function(a,b,c,d){a[0]=b[0]+c[0]*d;a[1]=b[1]+c[1]*d;a[2]=b[2]+c[2]*d;a[3]=b[3]+c[3]*d;a[4]=b[4]+c[4]*d;a[5]=b[5]+c[5]*d;a[6]=b[6]+c[6]*d;a[7]=b[7]+c[7]*d;a[8]=b[8]+c[8]*d;return a};k.exactEquals=function(a,b){return a[0]===b[0]&&a[1]===b[1]&&
a[2]===b[2]&&a[3]===b[3]&&a[4]===b[4]&&a[5]===b[5]&&a[6]===b[6]&&a[7]===b[7]&&a[8]===b[8]};k.equals=function(a,b){var c=a[0],d=a[1],e=a[2],f=a[3],g=a[4],k=a[5],m=a[6],h=a[7],n=a[8],p=b[0],E=b[1],q=b[2],r=b[3],F=b[4],v=b[5],u=a[6],w=b[7],x=b[8];return Math.abs(c-p)<=t.EPSILON*Math.max(1,Math.abs(c),Math.abs(p))&&Math.abs(d-E)<=t.EPSILON*Math.max(1,Math.abs(d),Math.abs(E))&&Math.abs(e-q)<=t.EPSILON*Math.max(1,Math.abs(e),Math.abs(q))&&Math.abs(f-r)<=t.EPSILON*Math.max(1,Math.abs(f),Math.abs(r))&&Math.abs(g-
F)<=t.EPSILON*Math.max(1,Math.abs(g),Math.abs(F))&&Math.abs(k-v)<=t.EPSILON*Math.max(1,Math.abs(k),Math.abs(v))&&Math.abs(m-u)<=t.EPSILON*Math.max(1,Math.abs(m),Math.abs(u))&&Math.abs(h-w)<=t.EPSILON*Math.max(1,Math.abs(h),Math.abs(w))&&Math.abs(n-x)<=t.EPSILON*Math.max(1,Math.abs(n),Math.abs(x))};return k});