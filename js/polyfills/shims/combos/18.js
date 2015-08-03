/*! respimage - v0.9.5 - 2014-10-22
 Licensed MIT */
!function(a,b,c){"use strict";function d(a){return a.trim?a.trim():a.replace(/^\s+|\s+$/g,"")}function e(){J=!1,u.vW=a.innerWidth||Math.max(A.offsetWidth||0,A.clientWidth||0),I=a.innerHeight||Math.max(A.offsetHeight||0,A.clientHeight||0)}function f(a){if(!(a in S)){var b={val:1,type:"x"},c=d(a||"");c&&(c.match(T)?(b.val=1*RegExp.$1,b.type=RegExp.$2):b=!1),S[a]=b}return S[a]}function g(a,b,c){return a/c>.2&&(a+=b*Y,b>$&&(a+=X)),a>c}function h(a){if(!a.getBoundingClientRect)return!0;var b,c,d,e,f=a.getBoundingClientRect();return!!((b=f.bottom)>=-9&&(e=f.top)<=I+9&&(c=f.right)>=-9&&(d=f.left)<=u.vW+9&&(b||c||d||e))}function i(a){var b,c=u.getSet(a),d=!1;"pending"!=c&&(d=!0,c&&(b=u.setRes(c),d=u.applySetCandidate(b,a))),a[u.ns].evaled=d}function j(a,b){return a.res-b.res}function k(a,b,c){var d;return!c&&b&&(c=a[u.ns].sets,c=c&&c[c.length-1]),d=l(b,c),d&&(b=u.makeUrl(b),a[u.ns].curSrc=b,a[u.ns].curCan=d,s||(a.currentSrc=b),d.res||p(d,d.set.sizes)),d}function l(a,b){var c,d,e;if(a&&b)for(e=u.parseSet(b),a=u.makeUrl(a),c=0;c<e.length;c++)if(a==u.makeUrl(e[c].url)){d=e[c];break}return d}function m(a){var b,c,d,e;if(a)for(d=u.parseSet(a),b=0;b<d.length;b++)if(e=d[b].desc,"x"==e.type&&1==e.val){c=!0;break}return c}function n(a){if(!a)return!1;var b=u.parseSet(a);return b[0]&&"w"==b[0].desc.type}function o(a,b){var c,d,e,f,g=a.getElementsByTagName("source");for(c=0,d=g.length;d>c;c++)e=g[c],e[u.ns]=!0,f=e.getAttribute("srcset"),f&&b.push({srcset:f,media:e.getAttribute("media"),type:e.getAttribute("type"),sizes:e.getAttribute("sizes")})}function p(a,b){var c=a.desc;return"w"==c.type?(a.cWidth=u.calcListLength(b||"100vw"),a.res=c.val/a.cWidth):a.res=c.val,a}b.createElement("picture");var q,r,s,t,u={},v=function(){},w=b.createElement("img"),x=w.getAttribute,y=w.setAttribute,z=w.removeAttribute,A=b.documentElement,B={},C={addSize:!1,xQuant:1,tLow:.1,tHigh:.5,tLazy:.1,greed:.32},D="data-risrc",E=D+"set";u.ns=("ri"+(new Date).getTime()).substr(0,9),s="currentSrc"in w,t=s?"currentSrc":"src",u.supSrcset="srcset"in w,u.supSizes="sizes"in w,u.selShort="picture > img, img[srcset]",u.sel=u.selShort,u.cfg=C,u.supSrcset&&(u.sel+=", img["+E+"]");var F=b.createElement("a");u.makeUrl=function(a){return F.href=a,F.href},u.qsa=function(a,b){return a.querySelectorAll(b)};var G=(a.console&&"function"==typeof console.warn?function(a){console.warn(a)}:v,function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d||!1):a.attachEvent&&a.attachEvent("on"+b,c)}),H=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d||!1):a.detachEvent&&a.detachEvent("on"+b,c)};"https:"==location.protocol,u.matchesMedia=function(){return u.matchesMedia=a.matchMedia&&(matchMedia("(min-width: 0.1em)")||{}).matches?function(a){return!a||matchMedia(a).matches}:u.mMQ,u.matchesMedia.apply(this,arguments)},u.vW=0;var I,J=!0,K={minw:/\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,maxw:/\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/},L={};u.mMQ=function(a){var b,c,d=!1;return a?(L[a]||(b=a.match(K.minw)&&parseFloat(RegExp.$1)+(RegExp.$2||""),c=a.match(K.maxw)&&parseFloat(RegExp.$1)+(RegExp.$2||""),b&&(b=parseFloat(b,10)*(b.indexOf("em")>0?u.getEmValue():1)),c&&(c=parseFloat(c,10)*(c.indexOf("em")>0?u.getEmValue():1)),L[a]={min:b,max:c}),b=L[a].min,c=L[a].max,(b&&u.vW>=b||c&&u.vW<=c)&&(d=!0),d):!0},u.DPR=a.devicePixelRatio||1;var M={},N=/^([\d\.]+)(em|vw|px)$/,O="position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;";u.calcLength=function(a){var c,d,e=a,f=!1;if(!(e in M)){if(d=a.match(N))d[1]=parseFloat(d[1],10),f=d[1]?"vw"==d[2]?u.vW*d[1]/100:"em"==d[2]?u.getEmValue()*d[1]:d[1]:!1;else if(a.indexOf("calc")>-1||parseInt(a,10)){a=a.replace("vw","%"),r||(r=b.createElement("div"),r.style.cssText=O),q||(q=!0,A.insertBefore(r,A.firstChild)),r.style.width="0px";try{r.style.width=a}catch(g){c=!0}f=r.offsetWidth,c&&(f=!1)}0>=f&&(f=!1),M[e]=f}return M[e]},u.types=B,B["image/jpeg"]=!0,B["image/gif"]=!0,B["image/png"]=!0,B["image/svg+xml"]=b.implementation.hasFeature("http://wwwindow.w3.org/TR/SVG11/feature#Image","1.1"),u.supportsType=function(a){return a?B[a]:!0};var P=/(\([^)]+\))?\s*(.+)/,Q={};u.parseSize=function(a){var b;return Q[a]||(b=(a||"").match(P),Q[a]={media:b&&b[1],length:b&&b[2]}),Q[a]},u.parseSet=function(a){if(!a.cands){var b,c,d,e,g,h=a.srcset;for(a.cands=[];h;)h=h.replace(/^\s+/g,""),b=h.search(/\s/g),d=null,-1!=b?(c=h.slice(0,b),e=c.charAt(c.length-1),","!=e&&c||(c=c.replace(/,+$/,""),d=""),h=h.slice(b+1),null==d&&(g=h.indexOf(","),-1!=g?(d=h.slice(0,g),h=h.slice(g+1)):(d=h,h=""))):(c=h,h=""),c&&(d=f(d))&&a.cands.push({url:c.replace(/^,+/,""),desc:d,set:a})}return a.cands};var R,S={},T=/^([\+eE\d\.]+)(w|x)$/,U="font-size:100% !important;";u.getEmValue=function(){var a;if(!R&&(a=b.body)){var c=b.createElement("div"),d=A.style.cssText,e=a.style.cssText;c.style.cssText=O,A.style.cssText=U,a.style.cssText=U,a.appendChild(c),R=c.offsetWidth,a.removeChild(c),R=parseFloat(R,10),A.style.cssText=d,a.style.cssText=e}return R||16};var V={};u.calcListLength=function(a){if(!(a in V)||C.uT){var b,c,e,f,g,h,i=d(a).split(/\s*,\s*/),j=!1;for(g=0,h=i.length;h>g&&(b=i[g],c=u.parseSize(b),e=c.length,f=c.media,!e||!u.matchesMedia(f)||(j=u.calcLength(e))===!1);g++);V[a]=j?j:u.vW}return V[a]},u.setRes=function(a){var b,c;if(a){b=u.parseSet(a);for(var d=0,e=b.length;e>d;d++)c=b[d],c.descriptor||p(c,a.sizes)}return b};var W,X,Y,Z,$,_,ab;u.applySetCandidate=function(a,b){if(a.length){var c,d,e,f,i,l,m,n,o,p,q,r=b[u.ns],v=!0;if(n=r.curSrc||b[t],o=r.curCan||k(b,n,a[0].set),d=u.getX(a,o),n&&(o&&(o.res+=Z),p=!r.pic||o&&o.set==a[0].set,o&&p&&o.res>=d&&_>o.res-d?m=o:b.complete||r.src!=x.call(b,"src")||b.lazyload||(p||!ab&&!h(b))&&(m=o,q=n,v="lazy",ab&&db(b))),!m)for(a.sort(j),l=a.length,m=a[l-1],e=0;l>e;e++)if(c=a[e],c.res>=d){f=e-1,m=a[f]&&(i=c.res-d)&&n!=u.makeUrl(c.url)&&g(a[f].res,i,d)?a[f]:c;break}return n&&o&&(o.res-=Z),m&&(q=u.makeUrl(m.url),s||(b.currentSrc=q),r.curSrc=q,r.curCan=m,q!=n?u.setSrc(b,m):u.setSize(b)),v}},u.getX=function(){return u.DPR*C.xQuant},u.setSrc=function(a,b){var c;a.src=b.url,"image/svg+xml"==b.set.type&&(c=a.style.width,a.style.width=a.offsetWidth+1+"px",a.offsetWidth+1&&(a.style.width=c))};var bb=function(){H(this,"load",bb),u.setSize(this)};u.setSize=function(a){var b,c=a[u.ns].curCan;C.addSize&&c&&!a[u.ns].dims&&(a.complete||(H(a,"load",bb),G(a,"load",bb)),b=a.naturalWidth,b&&("x"==c.desc.type?y.call(a,"width",parseInt(b/c.res/C.xQuant,10)):"w"==c.desc.type&&y.call(a,"width",parseInt(c.cWidth*(b/c.desc.val),10))))},b.addEventListener&&"naturalWidth"in w&&"complete"in w||(u.setSize=v),u.getSet=function(a){var b,c,d,e=!1,f=a[u.ns].sets;for(b=0;b<f.length&&!e;b++)if(c=f[b],c.srcset&&u.matchesMedia(c.media)&&(d=u.supportsType(c.type))){"pending"==d&&(c=d),e=c;break}return e};var cb=u.supSrcset&&!u.supSizes;u.parseSets=function(a,b){var d,e,f,g,h="PICTURE"==b.nodeName.toUpperCase(),i=a[u.ns];i.src===c&&(i.src=x.call(a,"src"),i.src?y.call(a,D,i.src):z.call(a,D)),i.srcset===c&&(d=x.call(a,"srcset"),i.srcset=d,g=!0),i.dims===c&&(i.dims=x.call(a,"height")&&x.call(a,"width")),i.sets=[],h&&(i.pic=!0,o(b,i.sets)),i.srcset?(e={srcset:i.srcset,sizes:x.call(a,"sizes")},i.sets.push(e),f=cb||i.src?n(e):!1,f||!i.src||l(i.src,e)||m(e)||(e.srcset+=", "+i.src,e.cands=!1)):i.src&&i.sets.push({srcset:i.src,sizes:null}),i.curCan=null,i.supported=!(h||e&&!u.supSrcset||f),g&&u.supSrcset&&!i.supported&&(d?(y.call(a,E,d),a.srcset=""):z.call(a,E)),i.parsed=!0};var db=function(){var a=function(){H(this,"load",a),u.fillImgs({elements:[this]})};return function(b){H(b,"load",a),G(b,"load",a)}}();u.fillImg=function(a,b){var c,d,e=b.reparse||b.reevaluate;if(a[u.ns]||(a[u.ns]={}),d=a[u.ns],"lazy"==d.evaled&&(ab||a.complete)&&(d.evaled=!1),e||!d.evaled){if(!d.parsed||b.reparse){if(c=a.parentNode,!c)return;u.parseSets(a,c,b)}d.supported?d.evaled=!0:i(a)}};var eb;u.setupRun=function(b){(!fb||b.reevaluate||J)&&(C.uT||(u.DPR=a.devicePixelRatio||1),W=Math.min(Math.max(u.DPR*C.xQuant,1),2.5),X=C.tLow*W,Z=C.tLazy*W,Y=C.greed*W,$=C.tHigh,_=.6+.4*W+Z),J&&(M={},V={},e(),b.elements||b.context||clearTimeout(eb))},u.teardownRun=function(){var a;q&&(q=!1,a=r.parentNode,a&&a.removeChild(r))};var fb=!1,gb=function(a){var c,d,e,f=a||{};if(f.elements&&1==f.elements.nodeType&&("IMG"==f.elements.nodeName.toUpperCase()?f.elements=[f.elements]:(f.context=f.elements,f.elements=null)),c=f.elements||u.qsa(f.context||b,f.reevaluate||f.reparse?u.sel:u.selShort),e=c.length){for(u.setupRun(f),fb=!0,d=0;e>d;d++)u.fillImg(c[d],f);u.teardownRun(f)}};u.fillImgs=gb,a.HTMLPictureElement?(gb=v,u.fillImg=v):!function(){var c=/^loade|^c/,d=function(){clearTimeout(g),g=setTimeout(d,3e3),b.body&&(c.test(b.readyState||"")&&(ab=!0,clearTimeout(g),H(b,"readystatechange",d)),u.fillImgs())},e=function(){u.fillImgs({reevaluate:!0})},f=function(){clearTimeout(eb),J=!0,eb=setTimeout(e,99)},g=setTimeout(d,b.body?9:99);G(a,"resize",f),G(b,"readystatechange",d)}(),gb._=u,gb.config=function(a,b,c){if("addType"==a){if(B[b]=c,"pending"==c)return}else C[a]=b;fb&&u.fillImgs({reevaluate:!0})},a.respimage=gb}(window,document),function(a){"use strict";var b,c=0,d=function(){window.respimage&&a(window.respimage),(window.respimage||c>9999)&&clearInterval(b),c++};b=setInterval(d,8),d()}(function(a){"use strict";var b=a._,c=0,d=function(a,c){var d;for(d=0;d<a.length;d++)b.types[a[d]]=c};return window.HTMLPictureElement&&!b.cfg.uT?void(a.testTypeSupport=function(){}):(b.types["image/bmp"]=!0,b.types["image/x-bmp"]=!0,a.testTypeSupport=function(b,e,f,g){"string"==typeof b&&(b=b.split(/\s*\,*\s+/g));var h,i="pending",j=document.createElement("img"),k=function(){c--,d(b,i),1>c&&a({reevaluate:!0})};return g&&(h=document.createElement("canvas"),!h.getContext)?void d(b,!1):(j.onload=function(){var a;i=!0,f&&(i=j.width==f),g&&(a=h.getContext("2d"),a.drawImage(j,0,0),i=0===a.getImageData(0,0,1,1).data[3]),k()},j.onerror=function(){i=!1,k()},c++,d(b,"pending"),void(j.src=e))},a.testTypeSupport("image/webp","data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==",1),a.testTypeSupport("image/jp2 image/jpx image/jpm","data:image/jp2;base64,AAAADGpQICANCocKAAAAFGZ0eXBqcDIgAAAAAGpwMiAAAABHanAyaAAAABZpaGRyAAAAAQAAAAEAAQAHAAAAAAAPY29scgEAAAAAABEAAAAacmVzIAAAABJyZXNjAGAA/gBgAP4EBAAAAABqcDJj/0//UQApAAAAAAABAAAAAQAAAAAAAAAAAAAAAQAAAAEAAAAAAAAAAAABAAEB/1wADUAIEBAYEBAYEBAY/1IADAAAAAEAAwQEAAH/ZAAPAAFMV0ZfSlAyXzIxMf+QAAoAAAAAABIAAf+TgICAgP/Z",1),a.testTypeSupport("image/vnd.ms-photo","data:image/vnd.ms-photo;base64,SUm8AQgAAAAFAAG8AQAQAAAASgAAAIC8BAABAAAAAQAAAIG8BAABAAAAAQAAAMC8BAABAAAAWgAAAMG8BAABAAAAHwAAAAAAAAAkw91vA07+S7GFPXd2jckNV01QSE9UTwAZAYBxAAAAABP/gAAEb/8AAQAAAQAAAA==",1),void a.testTypeSupport("video/png video/apng video/x-mng video/x-png","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACGFjVEwAAAABAAAAAcMq2TYAAAANSURBVAiZY2BgYPgPAAEEAQB9ssjfAAAAGmZjVEwAAAAAAAAAAQAAAAEAAAAAAAAAAAD6A+gBAbNU+2sAAAARZmRBVAAAAAEImWNgYGBgAAAABQAB6MzFdgAAAABJRU5ErkJggg==",!1,!0))}),function(){webshim.isReady("picture",!0);var a="picture, img[srcset]";webshim.addReady(function(b){b.querySelector(a)&&window.respimage()})}(),/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */
window.matchMedia||(window.matchMedia=function(){"use strict";var a=window.styleMedia||window.media;if(!a){var b=document.createElement("style"),c=document.getElementsByTagName("script")[0],d=null;b.type="text/css",b.id="matchmediajs-test",c.parentNode.insertBefore(b,c),d="getComputedStyle"in window&&window.getComputedStyle(b,null)||b.currentStyle,a={matchMedium:function(a){var c="@media "+a+"{ #matchmediajs-test { width: 1px; } }";return b.styleSheet?b.styleSheet.cssText=c:b.textContent=c,"1px"===d.width}}}return function(b){return{matches:a.matchMedium(b||"all"),media:b||"all"}}}()),/*! matchMedia() polyfill addListener/removeListener extension. Author & copyright (c) 2012: Scott Jehl. Dual MIT/BSD license */
function(){if(window.matchMedia&&window.matchMedia("all").addListener)return!1;var a=window.matchMedia,b=a("only all").matches,c=!1,d=0,e=[],f=function(){clearTimeout(d),d=setTimeout(function(){for(var b=0,c=e.length;c>b;b++){var d=e[b].mql,f=e[b].listeners||[],g=a(d.media).matches;if(g!==d.matches){d.matches=g;for(var h=0,i=f.length;i>h;h++)f[h].call(window,d)}}},30)};window.matchMedia=function(d){var g=a(d),h=[],i=0;return g.addListener=function(a){b&&(c||(c=!0,window.addEventListener("resize",f,!0)),0===i&&(i=e.push({mql:g,listeners:h})),h.push(a))},g.removeListener=function(a){for(var b=0,c=h.length;c>b;b++)h[b]===a&&h.splice(b,1)},g}}(),webshim.isReady("matchMedia",!0);