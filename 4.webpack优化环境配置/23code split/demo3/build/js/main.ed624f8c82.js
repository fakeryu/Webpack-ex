!function(){"use strict";var e,t,r={},n={};function o(e){var t=n[e];if(void 0!==t)return t.exports;var i=n[e]={exports:{}};return r[e](i,i.exports,o),i.exports}o.m=r,o.d=function(e,t){for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.f={},o.e=function(e){return Promise.all(Object.keys(o.f).reduce((function(t,r){return o.f[r](e,t),t}),[]))},o.u=function(e){return"js/test.0bb9c1fba5.js"},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},e={},t="webpack-t:",o.l=function(r,n,i,u){if(e[r])e[r].push(n);else{var c,a;if(void 0!==i)for(var l=document.getElementsByTagName("script"),s=0;s<l.length;s++){var f=l[s];if(f.getAttribute("src")==r||f.getAttribute("data-webpack")==t+i){c=f;break}}c||(a=!0,(c=document.createElement("script")).charset="utf-8",c.timeout=120,o.nc&&c.setAttribute("nonce",o.nc),c.setAttribute("data-webpack",t+i),c.src=r),e[r]=[n];var p=function(t,n){c.onerror=c.onload=null,clearTimeout(d);var o=e[r];if(delete e[r],c.parentNode&&c.parentNode.removeChild(c),o&&o.forEach((function(e){return e(n)})),t)return t(n)},d=setTimeout(p.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=p.bind(null,c.onerror),c.onload=p.bind(null,c.onload),a&&document.head.appendChild(c)}},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},function(){var e;o.g.importScripts&&(e=o.g.location+"");var t=o.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=e+"../"}(),function(){var e={179:0};o.f.j=function(t,r){var n=o.o(e,t)?e[t]:void 0;if(0!==n)if(n)r.push(n[2]);else{var i=new Promise((function(r,o){n=e[t]=[r,o]}));r.push(n[2]=i);var u=o.p+o.u(t),c=new Error;o.l(u,(function(r){if(o.o(e,t)&&(0!==(n=e[t])&&(e[t]=void 0),n)){var i=r&&("load"===r.type?"missing":r.type),u=r&&r.target&&r.target.src;c.message="Loading chunk "+t+" failed.\n("+i+": "+u+")",c.name="ChunkLoadError",c.type=i,c.request=u,n[1](c)}}),"chunk-"+t,t)}};var t=function(t,r){var n,i,u=r[0],c=r[1],a=r[2],l=0;for(n in c)o.o(c,n)&&(o.m[n]=c[n]);for(a&&a(o),t&&t(r);l<u.length;l++)i=u[l],o.o(e,i)&&e[i]&&e[i][0](),e[u[l]]=0},r=self.webpackChunkwebpack_t=self.webpackChunkwebpack_t||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}(),o.e(43).then(o.bind(o,411)).then((({mul:e,count:t})=>{console.log(e(2,6))})).catch((()=>{console.log("文件加载失败！")})),console.log([1,2,3,4].reduce(((e,t)=>e+t),0))}();