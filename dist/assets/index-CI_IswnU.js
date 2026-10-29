var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=c(o(((e,t,n)=>{(function(n,r){typeof e==`object`&&typeof t==`object`?t.exports=r():typeof define==`function`&&define.amd?define(`Navigo`,[],r):typeof e==`object`?e.Navigo=r():n.Navigo=r()})(typeof self<`u`?self:n,(function(){return function(){var e={407:function(e,t,n){n.d(t,{default:function(){return P}});var r=/([:*])(\w+)/g,i=/\*/g,a=/\/\?/g;function o(e){return e===void 0&&(e=`/`),h()?location.pathname+location.search+location.hash:e}function s(e){return e.replace(/\/+$/,``).replace(/^\/+/,``)}function c(e){return typeof e==`string`}function l(e){return e&&e.indexOf(`#`)>=0&&e.split(`#`).pop()||``}function u(e){var t=s(e).split(/\?(.*)?$/);return[s(t[0]),t.slice(1).join(``)]}function d(e){for(var t={},n=e.split(`&`),r=0;r<n.length;r++){var i=n[r].split(`=`);if(i[0]!==``){var a=decodeURIComponent(i[0]);t[a]?(Array.isArray(t[a])||(t[a]=[t[a]]),t[a].push(decodeURIComponent(i[1]||``))):t[a]=decodeURIComponent(i[1]||``)}}return t}function f(e,t){var n,o=u(s(e.currentLocationPath)),f=o[0],p=o[1],m=p===``?null:d(p),h=[];if(c(t.path)){if(n=`(?:/^|^)`+s(t.path).replace(r,(function(e,t,n){return h.push(n),`([^/]+)`})).replace(i,`?(?:.*)`).replace(a,`/?([^/]+|)`)+`$`,s(t.path)===``&&s(f)===``)return{url:f,queryString:p,hashString:l(e.to),route:t,data:null,params:m}}else n=t.path;var g=new RegExp(n,``),_=f.match(g);if(_){var v=c(t.path)?function(e,t){return t.length===0?null:e?e.slice(1,e.length).reduce((function(e,n,r){return e===null&&(e={}),e[t[r]]=decodeURIComponent(n),e}),null):null}(_,h):_.groups?_.groups:_.slice(1);return{url:s(f.replace(RegExp(`^`+e.instance.root),``)),queryString:p,hashString:l(e.to),route:t,data:v,params:m}}return!1}function p(){return!(typeof window>`u`||!window.history||!window.history.pushState)}function m(e,t){return e[t]===void 0||!0===e[t]}function h(){return typeof window<`u`}function g(e,t){return e===void 0&&(e=[]),t===void 0&&(t={}),e.filter((function(e){return e})).forEach((function(e){[`before`,`after`,`already`,`leave`].forEach((function(n){e[n]&&(t[n]||(t[n]=[]),t[n].push(e[n]))}))})),t}function _(e,t,n){var r=t||{},i=0;(function t(){e[i]?Array.isArray(e[i])?(e.splice.apply(e,[i,1].concat(e[i][0](r)?e[i][1]:e[i][2])),t()):e[i](r,(function(e){e===void 0||!0===e?(i+=1,t()):n&&n(r)})):n&&n(r)})()}function v(e,t){e.currentLocationPath===void 0&&(e.currentLocationPath=e.to=o(e.instance.root)),e.currentLocationPath=e.instance._checkForAHash(e.currentLocationPath),t()}function y(e,t){for(var n=0;n<e.instance.routes.length;n++){var r=f(e,e.instance.routes[n]);if(r&&(e.matches||=[],e.matches.push(r),e.resolveOptions.strategy===`ONE`))return void t()}t()}function b(e,t){e.navigateOptions&&(e.navigateOptions.shouldResolve!==void 0&&console.warn(`"shouldResolve" is deprecated. Please check the documentation.`),e.navigateOptions.silent!==void 0&&console.warn(`"silent" is deprecated. Please check the documentation.`)),t()}function x(e,t){!0===e.navigateOptions.force?(e.instance._setCurrent([e.instance._pathToMatchObject(e.to)]),t(!1)):t()}_.if=function(e,t,n){return Array.isArray(t)||(t=[t]),Array.isArray(n)||(n=[n]),[e,t,n]};var S=h(),C=p();function w(e,t){if(m(e.navigateOptions,`updateBrowserURL`)){var n=(`/`+e.to).replace(/\/\//g,`/`),r=S&&e.resolveOptions&&!0===e.resolveOptions.hash;C?(history[e.navigateOptions.historyAPIMethod||`pushState`](e.navigateOptions.stateObj||{},e.navigateOptions.title||``,r?`#`+n:n),location&&location.hash&&(e.instance.__freezeListening=!0,setTimeout((function(){if(!r){var t=location.hash;location.hash=``,location.hash=t}e.instance.__freezeListening=!1}),1))):S&&(window.location.href=e.to)}t()}function T(e,t){var n=e.instance;n.lastResolved()?_(n.lastResolved().map((function(t){return function(n,r){if(t.route.hooks&&t.route.hooks.leave){var i=!1,a=e.instance.matchLocation(t.route.path,e.currentLocationPath,!1);i=t.route.path===`*`?!(e.matches&&e.matches.find((function(e){return t.route.path===e.route.path}))):!a,m(e.navigateOptions,`callHooks`)&&i?_(t.route.hooks.leave.map((function(t){return function(n,r){return t((function(t){!1===t?e.instance.__markAsClean(e):r()}),e.matches&&e.matches.length>0?e.matches.length===1?e.matches[0]:e.matches:void 0)}})).concat([function(){return r()}])):r()}else r()}})),{},(function(){return t()})):t()}function E(e,t){m(e.navigateOptions,`updateState`)&&e.instance._setCurrent(e.matches),t()}var D=[function(e,t){var n=e.instance.lastResolved();if(n&&n[0]&&n[0].route===e.match.route&&n[0].url===e.match.url&&n[0].queryString===e.match.queryString)return n.forEach((function(t){t.route.hooks&&t.route.hooks.already&&m(e.navigateOptions,`callHooks`)&&t.route.hooks.already.forEach((function(t){return t(e.match)}))})),void t(!1);t()},function(e,t){e.match.route.hooks&&e.match.route.hooks.before&&m(e.navigateOptions,`callHooks`)?_(e.match.route.hooks.before.map((function(t){return function(n,r){return t((function(t){!1===t?e.instance.__markAsClean(e):r()}),e.match)}})).concat([function(){return t()}])):t()},function(e,t){m(e.navigateOptions,`callHandler`)&&e.match.route.handler(e.match),e.instance.updatePageLinks(),t()},function(e,t){e.match.route.hooks&&e.match.route.hooks.after&&m(e.navigateOptions,`callHooks`)&&e.match.route.hooks.after.forEach((function(t){return t(e.match)})),t()}],O=[T,function(e,t){var n=e.instance._notFoundRoute;if(n){e.notFoundHandled=!0;var r=u(e.currentLocationPath),i=r[0],a=r[1],o=l(e.to);n.path=s(i);var c={url:n.path,queryString:a,hashString:o,data:null,route:n,params:a===``?null:d(a)};e.matches=[c],e.match=c}t()},_.if((function(e){return e.notFoundHandled}),D.concat([E]),[function(e,t){e.resolveOptions&&!1!==e.resolveOptions.noMatchWarning&&e.resolveOptions.noMatchWarning!==void 0||console.warn(`Navigo: "`+e.currentLocationPath+`" didn't match any of the registered routes.`),t()},function(e,t){e.instance._setCurrent(null),t()}])];function k(){return(k=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function A(e,t){var n=0;T(e,(function r(){n===e.matches.length?E(e,t):_(D,k({},e,{match:e.matches[n]}),(function(){n+=1,r()}))}))}function j(e){e.instance.__markAsClean(e)}function M(){return(M=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var N=`[data-navigo]`;function P(e,t){var n,r=t||{strategy:`ONE`,hash:!1,noMatchWarning:!1,linksSelector:N},i=this,a=`/`,m=null,S=[],C=!1,T=p(),E=h();function D(e){return e.indexOf(`#`)>=0&&(e=!0===r.hash?e.split(`#`)[1]||`/`:e.split(`#`)[0]),e}function k(e){return s(a+`/`+s(e))}function P(e,t,n,r){return e=c(e)?k(e):e,{name:r||s(String(e)),path:e,handler:t,hooks:g(n)}}function F(e,t){if(!i.__dirty){i.__dirty=!0,e=e?s(a)+`/`+s(e):void 0;var n={instance:i,to:e,currentLocationPath:e,navigateOptions:{},resolveOptions:M({},r,t)};return _([v,y,_.if((function(e){var t=e.matches;return t&&t.length>0}),A,O)],n,j),!!n.matches&&n.matches}i.__waiting.push((function(){return i.resolve(e,t)}))}function I(e,t){if(i.__dirty)i.__waiting.push((function(){return i.navigate(e,t)}));else{i.__dirty=!0,e=s(a)+`/`+s(e);var n={instance:i,to:e,navigateOptions:t||{},resolveOptions:t&&t.resolveOptions?t.resolveOptions:r,currentLocationPath:D(e)};_([b,x,y,_.if((function(e){var t=e.matches;return t&&t.length>0}),A,O),w,j],n,j)}}function L(){if(E)return(E?[].slice.call(document.querySelectorAll(r.linksSelector||N)):[]).forEach((function(e){e.getAttribute(`data-navigo`)!==`false`&&e.getAttribute(`target`)!==`_blank`?e.hasListenerAttached||(e.hasListenerAttached=!0,e.navigoHandler=function(t){if((t.ctrlKey||t.metaKey)&&t.target.tagName.toLowerCase()===`a`)return!1;var n=e.getAttribute(`href`);if(n==null)return!1;if(n.match(/^(http|https)/)&&typeof URL<`u`)try{var r=new URL(n);n=r.pathname+r.search}catch{}var a=function(e){if(!e)return{};var t,n=e.split(`,`),r={};return n.forEach((function(e){var n=e.split(`:`).map((function(e){return e.replace(/(^ +| +$)/g,``)}));switch(n[0]){case`historyAPIMethod`:r.historyAPIMethod=n[1];break;case`resolveOptionsStrategy`:t||={},t.strategy=n[1];break;case`resolveOptionsHash`:t||={},t.hash=n[1]===`true`;break;case`updateBrowserURL`:case`callHandler`:case`updateState`:case`force`:r[n[0]]=n[1]===`true`}})),t&&(r.resolveOptions=t),r}(e.getAttribute(`data-navigo-options`));C||(t.preventDefault(),t.stopPropagation(),i.navigate(s(n),a))},e.addEventListener(`click`,e.navigoHandler)):e.hasListenerAttached&&e.removeEventListener(`click`,e.navigoHandler)})),i}function R(e,t,n){var r=S.find((function(t){return t.name===e})),i=null;if(r){if(i=r.path,t)for(var o in t)i=i.replace(`:`+o,t[o]);i=i.match(/^\//)?i:`/`+i}return i&&n&&!n.includeRoot&&(i=i.replace(RegExp(`^/`+a),``)),i}function z(e){var t=u(s(e)),r=t[0],i=t[1],a=i===``?null:d(i);return{url:r,queryString:i,hashString:l(e),route:P(r,(function(){}),[n],r),data:null,params:a}}function B(e,t,n){return typeof t==`string`&&(t=V(t)),t?(t.hooks[e]||(t.hooks[e]=[]),t.hooks[e].push(n),function(){t.hooks[e]=t.hooks[e].filter((function(e){return e!==n}))}):(console.warn(`Route doesn't exists: `+t),function(){})}function V(e){return typeof e==`string`?S.find((function(t){return t.name===k(e)})):S.find((function(t){return t.handler===e}))}e?a=s(e):console.warn(`Navigo requires a root path in its constructor. If not provided will use "/" as default.`),this.root=a,this.routes=S,this.destroyed=C,this.current=m,this.__freezeListening=!1,this.__waiting=[],this.__dirty=!1,this.__markAsClean=function(e){e.instance.__dirty=!1,e.instance.__waiting.length>0&&e.instance.__waiting.shift()()},this.on=function(e,t,r){var i=this;return typeof e!=`object`||e instanceof RegExp?(typeof e==`function`&&(r=t,t=e,e=a),S.push(P(e,t,[n,r])),this):(Object.keys(e).forEach((function(t){if(typeof e[t]==`function`)i.on(t,e[t]);else{var r=e[t],a=r.uses,o=r.as,s=r.hooks;S.push(P(t,a,[n,s],o))}})),this)},this.off=function(e){return this.routes=S=S.filter((function(t){return c(e)?s(t.path)!==s(e):typeof e==`function`?e!==t.handler:String(t.path)!==String(e)})),this},this.resolve=F,this.navigate=I,this.navigateByName=function(e,t,n){var r=R(e,t);return r!==null&&(I(r.replace(RegExp(`^/?`+a),``),n),!0)},this.destroy=function(){this.routes=S=[],T&&window.removeEventListener(`popstate`,this.__popstateListener),this.destroyed=C=!0},this.notFound=function(e,t){return i._notFoundRoute=P(`*`,e,[n,t],`__NOT_FOUND__`),this},this.updatePageLinks=L,this.link=function(e){return`/`+a+`/`+s(e)},this.hooks=function(e){return n=e,this},this.extractGETParameters=function(e){return u(D(e))},this.lastResolved=function(){return m},this.generate=R,this.getLinkPath=function(e){return e.getAttribute(`href`)},this.match=function(e){var t={instance:i,currentLocationPath:e,to:e,navigateOptions:{},resolveOptions:r};return y(t,(function(){})),!!t.matches&&t.matches},this.matchLocation=function(e,t,n){t===void 0||n!==void 0&&!n||(t=k(t));var r={instance:i,to:t,currentLocationPath:t};return v(r,(function(){})),typeof e==`string`&&(e=n===void 0||n?k(e):e),f(r,{name:String(e),path:e,handler:function(){},hooks:{}})||!1},this.getCurrentLocation=function(){return z(s(o(a)).replace(RegExp(`^`+a),``))},this.addBeforeHook=B.bind(this,`before`),this.addAfterHook=B.bind(this,`after`),this.addAlreadyHook=B.bind(this,`already`),this.addLeaveHook=B.bind(this,`leave`),this.getRoute=V,this._pathToMatchObject=z,this._clean=s,this._checkForAHash=D,this._setCurrent=function(e){return m=i.current=e},function(){T&&(this.__popstateListener=function(){i.__freezeListening||F()},window.addEventListener(`popstate`,this.__popstateListener))}.call(this),L.call(this)}}},t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}return n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n(407)}().default}))}))(),1),u=class{constructor(e,t){this.service=e,this.view=t}async init(){throw Error(`[BaseController Error]: Bạn chưa định nghĩa hàm init() cho Controller này!`)}},d=class{constructor(e=`#app-content`){this.containerSelector=e,this.container=document.querySelector(this.containerSelector)}getTemplate(e){return``}render(e={}){this.container||=document.querySelector(this.containerSelector),this.container?(this.container.innerHTML=this.getTemplate(e),this.run()):console.error(`[BaseView Error]: Không tìm thấy thẻ chứa ${this.containerSelector}`)}run(){}},f=`data:image/svg+xml,%3c!--%20@license%20lucide-static%20v1.61.0%20-%20ISC%20--%3e%3csvg%20class='lucide%20lucide-search'%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20%3e%3cpath%20d='m21%2021-4.34-4.34'%20/%3e%3ccircle%20cx='11'%20cy='11'%20r='8'%20/%3e%3c/svg%3e`,p=`data:image/svg+xml,%3c!--%20@license%20lucide-static%20v1.61.0%20-%20ISC%20--%3e%3csvg%20class='lucide%20lucide-calculator'%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20%3e%3crect%20width='16'%20height='20'%20x='4'%20y='2'%20rx='2'%20/%3e%3cline%20x1='8'%20x2='16'%20y1='6'%20y2='6'%20/%3e%3cline%20x1='16'%20x2='16'%20y1='14'%20y2='18'%20/%3e%3cpath%20d='M16%2010h.01'%20/%3e%3cpath%20d='M12%2010h.01'%20/%3e%3cpath%20d='M8%2010h.01'%20/%3e%3cpath%20d='M12%2014h.01'%20/%3e%3cpath%20d='M8%2014h.01'%20/%3e%3cpath%20d='M12%2018h.01'%20/%3e%3cpath%20d='M8%2018h.01'%20/%3e%3c/svg%3e`,m=`data:image/svg+xml,%3c!--%20@license%20lucide-static%20v1.61.0%20-%20ISC%20--%3e%3csvg%20class='lucide%20lucide-map-pin'%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20%3e%3cpath%20d='M20%2010c0%204.993-5.539%2010.193-7.399%2011.799a1%201%200%200%201-1.202%200C9.539%2020.193%204%2014.993%204%2010a8%208%200%200%201%2016%200'%20/%3e%3ccircle%20cx='12'%20cy='10'%20r='3'%20/%3e%3c/svg%3e`,h=`data:image/svg+xml,%3c!--%20@license%20lucide-static%20v1.61.0%20-%20ISC%20--%3e%3csvg%20class='lucide%20lucide-mailbox'%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20%3e%3cpath%20d='M22%2017a2%202%200%200%201-2%202H4a2%202%200%200%201-2-2V9.5C2%207%204%205%206.5%205H18c2.2%200%204%201.8%204%204v8Z'%20/%3e%3cpolyline%20points='15,9%2018,9%2018,11'%20/%3e%3cpath%20d='M6.5%205C9%205%2011%207%2011%209.5V17a2%202%200%200%201-2%202'%20/%3e%3cline%20x1='6'%20x2='7'%20y1='10'%20y2='10'%20/%3e%3c/svg%3e`,g=`data:image/svg+xml,%3c!--%20@license%20lucide-static%20v1.61.0%20-%20ISC%20--%3e%3csvg%20class='lucide%20lucide-package'%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20%3e%3cpath%20d='M11%2021.73a2%202%200%200%200%202%200l7-4A2%202%200%200%200%2021%2016V8a2%202%200%200%200-1-1.73l-7-4a2%202%200%200%200-2%200l-7%204A2%202%200%200%200%203%208v8a2%202%200%200%200%201%201.73z'%20/%3e%3cpath%20d='M12%2022V12'%20/%3e%3cpolyline%20points='3.29%207%2012%2012%2020.71%207'%20/%3e%3cpath%20d='m7.5%204.27%209%205.15'%20/%3e%3c/svg%3e`,_=`data:image/svg+xml,%3c!--%20@license%20lucide-static%20v1.61.0%20-%20ISC%20--%3e%3csvg%20class='lucide%20lucide-check-square'%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20%3e%3cpath%20d='M21%2010.656V19a2%202%200%200%201-2%202H5a2%202%200%200%201-2-2V5a2%202%200%200%201%202-2h12.344'%20/%3e%3cpath%20d='m9%2011%203%203L22%204'%20/%3e%3c/svg%3e`,v=`data:image/svg+xml,%3c!--%20@license%20lucide-static%20v1.61.0%20-%20ISC%20--%3e%3csvg%20class='lucide%20lucide-arrow-right'%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20%3e%3cpath%20d='M5%2012h14'%20/%3e%3cpath%20d='m12%205%207%207-7%207'%20/%3e%3c/svg%3e`,y=class{static getTemplate(){return`
      <section class="bg-[#f1f5f9] py-6 sm:py-10 lg:py-14 border-b border-gray-200 overflow-x-hidden">
        <div class="max-w-7xl mx-auto px-3.5 sm:px-4">
          
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            <!-- CỘT TRÁI: BANNER GIỚI THIỆU -->
            <div class="lg:col-span-7 flex flex-col gap-4 sm:gap-6">
              <div class="border-l-4 border-[#b91c1c] pl-3 sm:pl-4">
                <span class="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#b91c1c]">
                  Dịch vụ logistics toàn quốc
                </span>
                <h1 class="text-2xl sm:text-3xl lg:text-5xl font-bold font-['Oswald'] text-gray-900 leading-[1.15] uppercase tracking-wide mt-1">
                  KẾT NỐI CỘNG ĐỒNG BẰNG DỊCH VỤ GIAO HÀNG TIN CẬY
                </h1>
              </div>

              <p class="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed">
                Hạ tầng bưu chính thông minh kết hợp hệ sinh thái vật tư đóng gói hoàn chỉnh. Đảm bảo đúng hẹn, minh bạch và chính xác trên từng kiện hàng.
              </p>

              <div>
                <a href="#/shop" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-gray-900 font-['Oswald'] font-bold uppercase text-xs sm:text-sm px-5 sm:px-6 py-3 border-2 border-gray-900 shadow-[3px_3px_0px_0px_#0f172a] sm:shadow-[4px_4px_0px_0px_#0f172a] transition hover:translate-x-0.5 hover:translate-y-0.5">
                  <span>Khám phá kho vật tư đóng gói</span>
                  <img src="${v}" class="w-4 h-4" alt="" />
                </a>
              </div>
            </div>

            <!-- CỘT PHẢI: CHIẾC HỘP TRA CỨU BƯU GỬI VUÔNG VỨC -->
            <div class="lg:col-span-5 w-full">
              <div class="bg-white border-2 border-gray-900 shadow-[4px_4px_0px_0px_#b91c1c] sm:shadow-[6px_6px_0px_0px_#b91c1c] p-4 sm:p-6 flex flex-col gap-4 sm:gap-5 rounded-none">
                
                <div class="border-b-2 border-gray-100 pb-2.5 sm:pb-3 flex justify-between items-center">
                  <h2 class="font-['Oswald'] font-bold text-xl sm:text-2xl uppercase tracking-wider text-gray-900">
                    TRA CỨU BƯU GỬI
                  </h2>
                  <span class="bg-gray-100 text-gray-600 text-[9px] sm:text-[10px] font-mono px-2 py-0.5 border border-gray-300 uppercase font-bold">
                    SYSTEM
                  </span>
                </div>

                <!-- CỤM INPUT VÀ NÚT BẤM (IDs: tracking-input, tracking-btn) -->
                <div class="flex flex-col gap-1.5">
                  <label class="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-700">Mã vận đơn bưu cục:</label>
                  
                  <div class="flex flex-col sm:flex-row border-2 border-gray-900 focus-within:border-[#b91c1c] transition">
                    <input 
                      id="tracking-input" 
                      type="text" 
                      placeholder="VD: SP123456789VN..." 
                      class="w-full flex-1 px-3 py-2.5 text-xs sm:text-sm font-mono text-gray-900 outline-none uppercase bg-white rounded-none"
                    />
                    <button 
                      id="tracking-btn" 
                      type="button" 
                      class="bg-[#b91c1c] hover:bg-[#991b1b] text-white px-4 sm:px-5 py-2.5 text-xs font-['Oswald'] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer border-t-2 sm:border-t-0 sm:border-l-2 border-gray-900 whitespace-nowrap shrink-0 rounded-none"
                    >
                      <img src="${f}" class="w-3.5 h-3.5 invert brightness-0" alt="" />
                      <span>Tra cứu</span>
                    </button>
                  </div>
                </div>

                <!-- NƠI IN TIMELINE KẾT QUẢ TRA CỨU -->
                <div id="tracking-result" class="flex flex-col gap-2"></div>

                <!-- CÁC LINK TIỆN ÍCH -->
                <div class="grid grid-cols-1 gap-1.5 sm:gap-2 pt-2 border-t border-gray-200">
                  <a href="#/calculate-rates" class="flex items-center justify-between p-2.5 sm:p-3 border border-gray-200 hover:border-[#b91c1c] hover:bg-red-50/30 transition group rounded-none">
                    <div class="flex items-center gap-2.5 sm:gap-3">
                      <div class="bg-gray-100 p-1.5 group-hover:bg-[#b91c1c] transition">
                        <img src="${p}" class="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:invert group-hover:brightness-0" alt="" />
                      </div>
                      <span class="text-[11px] sm:text-xs font-bold uppercase tracking-wide text-gray-800">Tính cước vận chuyển</span>
                    </div>
                    <span class="text-gray-400 group-hover:text-[#b91c1c] text-xs font-bold">➔</span>
                  </a>

                  <a href="#/locate-us" class="flex items-center justify-between p-2.5 sm:p-3 border border-gray-200 hover:border-[#b91c1c] hover:bg-red-50/30 transition group rounded-none">
                    <div class="flex items-center gap-2.5 sm:gap-3">
                      <div class="bg-gray-100 p-1.5 group-hover:bg-[#b91c1c] transition">
                        <img src="${m}" class="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:invert group-hover:brightness-0" alt="" />
                      </div>
                      <span class="text-[11px] sm:text-xs font-bold uppercase tracking-wide text-gray-800">Tìm bưu cục gần nhất</span>
                    </div>
                    <span class="text-gray-400 group-hover:text-[#b91c1c] text-xs font-bold">➔</span>
                  </a>

                  <a href="#/find-postal-code" class="flex items-center justify-between p-2.5 sm:p-3 border border-gray-200 hover:border-[#b91c1c] hover:bg-red-50/30 transition group rounded-none">
                    <div class="flex items-center gap-2.5 sm:gap-3">
                      <div class="bg-gray-100 p-1.5 group-hover:bg-[#b91c1c] transition">
                        <img src="${h}" class="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:invert group-hover:brightness-0" alt="" />
                      </div>
                      <span class="text-[11px] sm:text-xs font-bold uppercase tracking-wide text-gray-800">Tra cứu mã bưu chính</span>
                    </div>
                    <span class="text-gray-400 group-hover:text-[#b91c1c] text-xs font-bold">➔</span>
                  </a>
                </div>

              </div>
            </div>

          </div>

          <!-- 2 KHỐI GỬI & NHẬN HÀNG GÓC CẠNH Ở DƯỚI -->
          <div class="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t-2 border-gray-200">
            <div class="p-4 sm:p-6 bg-white border-2 border-gray-300 flex flex-col gap-2 sm:gap-3 rounded-none">
              <div class="flex items-center gap-2">
                <img src="${g}" class="w-4 h-4 sm:w-5 sm:h-5 text-[#b91c1c]" alt="" />
                <h3 class="font-['Oswald'] font-bold text-base sm:text-lg uppercase text-gray-900">Gửi hàng bưu phẩm</h3>
              </div>
              <p class="text-[11px] sm:text-xs text-gray-600 leading-relaxed">
                Giải pháp gửi kiện hàng nội địa và quốc tế dứt khoát, an toàn với quy trình theo dõi mã vạch chính xác.
              </p>
              <a href="#/shop" class="text-xs font-bold uppercase text-[#b91c1c] hover:underline flex items-center gap-1 mt-1">
                Vật tư đóng gói ➔
              </a>
            </div>

            <div class="p-4 sm:p-6 bg-white border-2 border-gray-300 flex flex-col gap-2 sm:gap-3 rounded-none">
              <div class="flex items-center gap-2">
                <img src="${_}" class="w-4 h-4 sm:w-5 sm:h-5 text-[#f59e0b]" alt="" />
                <h3 class="font-['Oswald'] font-bold text-base sm:text-lg uppercase text-gray-900">Nhận hàng tại bưu cục</h3>
              </div>
              <p class="text-[11px] sm:text-xs text-gray-600 leading-relaxed">
                Chủ động nhận bưu gửi tại các điểm bưu cục trên toàn quốc với thời gian lưu kho linh hoạt.
              </p>
              <a href="#/locate-us" class="text-xs font-bold uppercase text-[#b91c1c] hover:underline flex items-center gap-1 mt-1">
                Xem điểm bưu cục ➔
              </a>
            </div>
          </div>

        </div>
      </section>
    `}},b=`data:image/svg+xml,%3c!--%20@license%20lucide-static%20v1.61.0%20-%20ISC%20--%3e%3csvg%20class='lucide%20lucide-truck'%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20%3e%3cpath%20d='M14%2018V6a2%202%200%200%200-2-2H4a2%202%200%200%200-2%202v11a1%201%200%200%200%201%201h2'%20/%3e%3cpath%20d='M15%2018H9'%20/%3e%3cpath%20d='M19%2018h2a1%201%200%200%200%201-1v-3.65a1%201%200%200%200-.22-.624l-3.48-4.35A1%201%200%200%200%2017.52%208H14'%20/%3e%3ccircle%20cx='17'%20cy='18'%20r='2'%20/%3e%3ccircle%20cx='7'%20cy='18'%20r='2'%20/%3e%3c/svg%3e`,x=`data:image/svg+xml,%3c!--%20@license%20lucide-static%20v1.61.0%20-%20ISC%20--%3e%3csvg%20class='lucide%20lucide-clock'%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20%3e%3ccircle%20cx='12'%20cy='12'%20r='10'%20/%3e%3cpath%20d='M12%206v6l4%202'%20/%3e%3c/svg%3e`,S=`data:image/svg+xml,%3c!--%20@license%20lucide-static%20v1.61.0%20-%20ISC%20--%3e%3csvg%20class='lucide%20lucide-alert-circle'%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20%3e%3ccircle%20cx='12'%20cy='12'%20r='10'%20/%3e%3cline%20x1='12'%20x2='12'%20y1='8'%20y2='12'%20/%3e%3cline%20x1='12'%20x2='12.01'%20y1='16'%20y2='16'%20/%3e%3c/svg%3e`,C=class extends d{constructor(){super(`#app-content`),this.onTrack=null}getTemplate(){return`
      <div class="home-page">
        ${y.getTemplate()}
        <!-- Sau này nếu có thêm Section nào khác thì chỉ việc nhét thêm vào đây -->
      </div>
    `}run(){let e=document.querySelector(`#tracking-input`),t=document.querySelector(`#tracking-btn`),n=()=>{let t=e?.value.trim()||``;this.onTrack&&this.onTrack(t)};t&&t.addEventListener(`click`,n),e&&e.addEventListener(`keydown`,e=>{e.key===`Enter`&&n()})}showLoading(){let e=document.querySelector(`#tracking-result`);e&&(e.innerHTML=`
        <div class="p-3 bg-gray-100 border border-gray-300 text-xs font-mono uppercase tracking-wider text-gray-600 rounded-none text-center">
          Đang truy xuất hệ thống bưu gửi...
        </div>
      `)}renderError(e){let t=document.querySelector(`#tracking-result`);t&&(t.innerHTML=`
        <div class="p-3 bg-red-50 border-2 border-[#b91c1c] text-xs font-bold uppercase tracking-wider text-[#b91c1c] rounded-none flex items-center gap-2">
          <img src="${S}" class="w-4 h-4 shrink-0 text-[#b91c1c]" alt="" />
          <span>${e}</span>
        </div>
      `)}renderTrackingResult(e){let t=document.querySelector(`#tracking-result`);t&&(e?t.innerHTML=`
      <div class="bg-gray-50 border-2 border-gray-900 p-3.5 flex flex-col gap-1.5 rounded-none mt-1">
        <div class="flex justify-between items-center border-b border-gray-200 pb-1.5">
          <span class="font-['Oswald'] font-bold text-sm text-[#b91c1c] uppercase tracking-wide">
            VẬN ĐƠN: ${e.id}
          </span>
          <span class="bg-gray-900 text-[#f59e0b] text-[10px] font-mono px-2 py-0.5 uppercase font-bold">
            ${e.serviceType}
          </span>
        </div>
        <div class="text-xs text-gray-700 flex flex-col gap-0.5 mt-1">
          <div><b class="text-gray-900 uppercase text-[10px]">Từ:</b> ${e.sender}</div>
          <div><b class="text-gray-900 uppercase text-[10px]">Đến:</b> ${e.receiver}</div>
          <div><b class="text-gray-900 uppercase text-[10px]">Cước phí:</b> ${new Intl.NumberFormat(`vi-VN`,{style:`currency`,currency:`VND`}).format(e.shippingFee||0)}</div>
        </div>
      </div>
    
      <div class="mt-2 border-2 border-gray-900 bg-white p-3.5 flex flex-col gap-3 rounded-none max-h-56 overflow-y-auto">
        <div class="font-['Oswald'] font-bold text-xs uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-1 flex items-center gap-1.5">
          <img src="${b}" class="w-3.5 h-3.5 text-[#b91c1c]" alt="" />
          <span>Lịch trình vận chuyển chi tiết</span>
        </div>
        
        <div class="flex flex-col gap-3.5 border-l-2 border-[#b91c1c] ml-2 pl-3 py-1">
          ${(e.events||[]).map(e=>`
            <div class="relative flex flex-col gap-0.5">
              <span class="absolute -left-[18px] top-1 w-2.5 h-2.5 bg-[#b91c1c] border-2 border-white ring-1 ring-gray-900"></span>
              <span class="text-xs font-bold text-gray-900 uppercase tracking-wide">${e.status}</span>
              <span class="text-[11px] text-gray-600">${e.location}</span>
              <span class="text-[10px] font-mono text-gray-400 flex items-center gap-1 mt-0.5">
                <img src="${x}" class="w-3 h-3 text-gray-400" alt="" />
                ${e.time}
              </span>
            </div>
          `).join(``)}
        </div>
      </div>
    `:this.renderError(`Không tìm thấy thông tin mã vận đơn trên hệ thống!`))}},w=`http://localhost:3000`,T=class{constructor(e){this.endpoint=e,this.baseURL=w}async#e(e,t={}){try{let n={"Content-Type":`application/json`,...t.headers},r=await fetch(e,{...t,headers:n});if(!r.ok){let e=await r.json();throw Error(e.message||`Lỗi HTTP: ${r.status}`)}return r.status===204?null:await r.json()}catch(e){throw console.error(`[BaseModel Error - ${this.endpoint}]:`,e.message),e}}async getAll(e=``){let t=`${this.baseURL}/${this.endpoint}${e?`?${e}`:``}`;return await this.#e(t,{method:`GET`})}async getOne(e){let t=`${this.baseURL}/${this.endpoint}/${e}`;return await this.#e(t,{method:`GET`})}async getBy(e,t){let n=`${this.baseURL}/${this.endpoint}?${e}=${t}`;return await this.#e(n,{method:`GET`})}async post(e){let t=`${this.baseURL}/${this.endpoint}`;return await this.#e(t,{method:`POST`,body:JSON.stringify(e)})}async put(e,t){let n=`${this.baseURL}/${this.endpoint}/${e}`;return await this.#e(n,{method:`PUT`,body:JSON.stringify(t)})}async patch(e,t){let n=`${this.baseURL}/${this.endpoint}/${e}`;return await this.#e(n,{method:`PATCH`,body:JSON.stringify(t)})}async deleteOne(e){let t=`${this.baseURL}/${this.endpoint}/${e}`;return await this.#e(t,{method:`DELETE`})}},E=class extends T{constructor(){super(`shipments`)}async getByCode(e){let t=await this.getBy(`id`,e);return t&&t.length>0?t[0]:null}},D=class{constructor(e){this.model=e}},O=class extends D{constructor(e){super(e)}async track(e){if(!e||!e.trim())throw Error(`Vui lòng nhập mã vận đơn!`);let t=e.trim().toUpperCase();return await this.model.getByCode(t)||null}},k=`data:image/svg+xml,%3c!--%20@license%20lucide-static%20v1.61.0%20-%20ISC%20--%3e%3csvg%20class='lucide%20lucide-user'%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20%3e%3cpath%20d='M19%2021v-2a4%204%200%200%200-4-4H9a4%204%200%200%200-4%204v2'%20/%3e%3ccircle%20cx='12'%20cy='7'%20r='4'%20/%3e%3c/svg%3e`,A=`data:image/svg+xml,%3c!--%20@license%20lucide-static%20v1.61.0%20-%20ISC%20--%3e%3csvg%20class='lucide%20lucide-menu'%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20%3e%3cpath%20d='M4%205h16'%20/%3e%3cpath%20d='M4%2012h16'%20/%3e%3cpath%20d='M4%2019h16'%20/%3e%3c/svg%3e`,j=`data:image/svg+xml,%3c!--%20@license%20lucide-static%20v1.61.0%20-%20ISC%20--%3e%3csvg%20class='lucide%20lucide-shopping-cart'%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20%3e%3cpath%20d='m2.05%202.05%201.099-.028a1%201%200%200%201%201.008.815l2.69%2014.347A1%201%200%200%200%207.83%2018H18'%20/%3e%3cpath%20d='M4.563%205h16.435a1%201%200%200%201%20.981%201.204l-1.026%206.226A2%202%200%200%201%2018.962%2014H6.25'%20/%3e%3ccircle%20cx='18'%20cy='20'%20r='2'%20/%3e%3ccircle%20cx='8'%20cy='20'%20r='2'%20/%3e%3c/svg%3e`,M=class{static getTemplate(){return`
      <header class="bg-white border-b-2 border-[#b91c1c] sticky top-0 z-50 shadow-sm">
        <div class="max-w-7xl mx-auto px-3.5 sm:px-4 h-16 sm:h-18 flex items-center justify-between">
          
          <!-- Logo -->
          <a href="#/" class="flex items-center gap-1.5 sm:gap-2">
            <div class="bg-[#b91c1c] p-1.5 sm:p-2 text-white flex items-center justify-center">
              <img src="${b}" alt="Logo" class="w-5 h-5 sm:w-6 sm:h-6 invert brightness-0" />
            </div>
            <span class="font-['Oswald'] font-bold text-xl sm:text-2xl uppercase tracking-wider text-gray-900">
              Quick<span class="text-[#b91c1c]">Ship</span>
            </span>
          </a>
          
          <!-- Menu Desktop -->
          <nav class="hidden md:flex items-center gap-1 font-semibold text-sm">
            <a href="#/" class="px-3.5 py-2 text-gray-800 hover:text-[#b91c1c] hover:bg-red-50/50 transition uppercase tracking-wide">Trang chủ</a>
            <a href="#/calculate-rates" class="px-3.5 py-2 text-gray-800 hover:text-[#b91c1c] hover:bg-red-50/50 transition uppercase tracking-wide">Tính cước</a>
            <a href="#/locate-us" class="px-3.5 py-2 text-gray-800 hover:text-[#b91c1c] hover:bg-red-50/50 transition uppercase tracking-wide">Bưu cục</a>
            <a href="#/shop" class="px-3.5 py-2 text-[#b91c1c] font-bold border border-[#b91c1c] hover:bg-[#b91c1c] hover:text-white transition uppercase tracking-wide ml-2">
              Cửa hàng Vật tư
            </a>
          </nav>

          <!-- Nút Đăng nhập & Nút Menu Mobile -->
          <div class="flex items-center gap-2">
            <a href="#/cart" aria-label="Giỏ hàng" class="relative p-2 border-2 border-gray-900 hover:border-[#b91c1c] transition">
              <img src="${j}" class="w-5 h-5" alt="" />
              <span data-role="cart-count" class="absolute -top-2 -right-2 min-w-5 h-5 px-1 bg-[#b91c1c] text-white text-[10px] font-bold flex items-center justify-center">0</span>
            </a>
            <a href="#/auth" class="bg-[#b91c1c] hover:bg-[#991b1b] text-white px-3.5 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider border-b-2 border-[#f59e0b] flex items-center gap-1.5 transition">
              <img src="${k}" class="w-3.5 h-3.5 invert brightness-0" alt="" />
              <span class="hidden xs:inline">Đăng nhập</span>
            </a>

            <!-- Nút Hamburger Mobile góc cạnh -->
            <button 
              id="mobile-menu-toggle" 
              class="md:hidden p-2 border-2 border-gray-900 bg-white hover:bg-gray-100 transition cursor-pointer"
              onclick="document.querySelector('#mobile-menu-drawer')?.classList.toggle('hidden')"
            >
              <img src="${A}" class="w-5 h-5 text-gray-900" alt="Menu" />
            </button>
          </div>

        </div>

        <!-- MENU MOBILE XỔ XUỐNG VUÔNG VỨC -->
        <div id="mobile-menu-drawer" class="hidden md:hidden border-t-2 border-gray-900 bg-white px-4 py-3 flex flex-col gap-2 font-['Oswald'] uppercase text-xs tracking-wider border-b-2 border-[#b91c1c]">
          <a href="#/" class="py-2 px-3 border-b border-gray-100 hover:bg-red-50 hover:text-[#b91c1c]">Trang chủ</a>
          <a href="#/calculate-rates" class="py-2 px-3 border-b border-gray-100 hover:bg-red-50 hover:text-[#b91c1c]">Tính cước vận chuyển</a>
          <a href="#/locate-us" class="py-2 px-3 border-b border-gray-100 hover:bg-red-50 hover:text-[#b91c1c]">Mạng lưới bưu cục</a>
          <a href="#/shop" class="py-2 px-3 bg-[#b91c1c] text-white font-bold text-center mt-1">Cửa hàng Vật tư</a>
        </div>
      </header>
    `}},N=`data:image/svg+xml,%3c!--%20@license%20lucide-static%20v1.61.0%20-%20ISC%20--%3e%3csvg%20class='lucide%20lucide-shopping-bag'%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20%3e%3cpath%20d='M16%2010a4%204%200%200%201-8%200'%20/%3e%3cpath%20d='M3.103%206.034h17.794'%20/%3e%3cpath%20d='M3.4%205.467a2%202%200%200%200-.4%201.2V20a2%202%200%200%200%202%202h14a2%202%200%200%200%202-2V6.667a2%202%200%200%200-.4-1.2l-2-2.667A2%202%200%200%200%2017%202H7a2%202%200%200%200-1.6.8z'%20/%3e%3c/svg%3e`,P=`data:image/svg+xml,%3c!--%20@license%20lucide-static%20v1.61.0%20-%20ISC%20--%3e%3csvg%20class='lucide%20lucide-arrow-left'%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20%3e%3cpath%20d='m12%2019-7-7%207-7'%20/%3e%3cpath%20d='M19%2012H5'%20/%3e%3c/svg%3e`,F=class{static getTemplate(){return`
      <header class="bg-white border-b-2 border-[#f59e0b] sticky top-0 z-50 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 h-18 flex items-center justify-between">
          
          <div class="flex items-center gap-4">
            <a href="#/shop" class="font-['Oswald'] font-bold text-2xl uppercase tracking-wider text-gray-900 flex items-center gap-2">
              <span class="bg-[#f59e0b] text-gray-900 px-2 py-0.5 text-lg font-extrabold">SHOP</span>
              QuickShip Store
            </a>
            <a href="#/" class="hidden sm:flex items-center gap-1 text-xs font-bold uppercase text-gray-500 hover:text-[#b91c1c] ml-4 transition border-l border-gray-300 pl-4">
              <img src="${P}" class="w-3.5 h-3.5" alt="" />
              Về trang vận chuyển
            </a>
          </div>

          <div class="flex items-center gap-3">
            <!-- Nút giỏ hàng góc vuông -->
            <a href="#/cart" class="border border-gray-300 px-4 py-2 flex items-center gap-2 hover:border-[#b91c1c] transition text-sm font-bold text-gray-800">
              <img src="${N}" class="w-4 h-4 text-gray-700" alt="" />
              <span>Giỏ hàng</span>
              <span data-role="cart-count" class="bg-[#b91c1c] text-white text-xs px-1.5 py-0.2 font-mono">0</span>
            </a>

            <!-- Nút Auth -->
            <a href="#/auth" class="bg-[#b91c1c] hover:bg-[#991b1b] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5">
              <img src="${k}" class="w-3.5 h-3.5 invert brightness-0" alt="" />
              <span>Tài khoản</span>
            </a>
          </div>

        </div>
      </header>
    `}},I=`data:image/svg+xml,%3c!--%20@license%20lucide-static%20v1.61.0%20-%20ISC%20--%3e%3csvg%20class='lucide%20lucide-phone-call'%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20%3e%3cpath%20d='M13%202a9%209%200%200%201%209%209'%20/%3e%3cpath%20d='M13%206a5%205%200%200%201%205%205'%20/%3e%3cpath%20d='M13.832%2016.568a1%201%200%200%200%201.213-.303l.355-.465A2%202%200%200%201%2017%2015h3a2%202%200%200%201%202%202v3a2%202%200%200%201-2%202A18%2018%200%200%201%202%204a2%202%200%200%201%202-2h3a2%202%200%200%201%202%202v3a2%202%200%200%201-.8%201.6l-.468.351a1%201%200%200%200-.292%201.233%2014%2014%200%200%200%206.392%206.384'%20/%3e%3c/svg%3e`,L=class{static getTemplate(){return`
      <footer class="bg-[#0f172a] text-gray-300 border-t-4 border-[#b91c1c] mt-auto">
        <div class="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div class="md:col-span-2 flex flex-col gap-3">
            <h3 class="font-['Oswald'] text-2xl font-bold text-white tracking-wider">
              QUICK<span class="text-[#f59e0b]">SHIP</span> LOGISTICS
            </h3>
            <p class="text-sm text-gray-400 leading-relaxed max-w-md">
              Hệ thống vận tải và giải pháp cung ứng vật tư đóng gói hàng đầu Việt Nam. Tốc độ dứt khoát, an toàn tuyệt đối và minh bạch hành trình.
            </p>
            <div class="flex items-center gap-3 mt-2 text-xs text-[#f59e0b] font-bold uppercase tracking-wider">
              <span class="flex items-center gap-1.5">
                <img src="${I}" class="w-4 h-4" alt="" /> Hotline: 1900 9999
              </span>
              <span>•</span>
              <span class="flex items-center gap-1.5">
                <img src="${m}" class="w-4 h-4" alt="" /> Toàn quốc
              </span>
            </div>
          </div>

          <div>
            <h4 class="font-['Oswald'] text-base font-bold text-white mb-4 tracking-wider uppercase border-l-2 border-[#b91c1c] pl-2.5">
              Dịch vụ bưu chính
            </h4>
            <ul class="flex flex-col gap-2.5 text-xs font-medium uppercase tracking-wide">
              <li><a href="#/track" class="hover:text-[#f59e0b] transition">Tra cứu bưu gửi</a></li>
              <li><a href="#/calculate-rates" class="hover:text-[#f59e0b] transition">Tính cước vận chuyển</a></li>
              <li><a href="#/locate-us" class="hover:text-[#f59e0b] transition">Mạng lưới bưu cục</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-['Oswald'] text-base font-bold text-white mb-4 tracking-wider uppercase border-l-2 border-[#f59e0b] pl-2.5">
              Hỗ trợ khách hàng
            </h4>
            <ul class="flex flex-col gap-2.5 text-xs font-medium uppercase tracking-wide">
              <li><a href="#/support" class="hover:text-[#f59e0b] transition">Quy chuẩn đóng gói</a></li>
              <li><a href="#/shop" class="hover:text-[#f59e0b] transition">Vật tư đóng hàng</a></li>
              <li><a href="#/support" class="hover:text-[#f59e0b] transition">Chính sách khiếu nại</a></li>
            </ul>
          </div>

        </div>

        <div class="max-w-7xl mx-auto px-4 py-4 border-t border-slate-800 text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>© 2026 QUICKSHIP ENTERPRISE. ALL RIGHTS RESERVED.</span>
          <span class="font-mono text-[11px] text-gray-600">INDUSTRIAL LOGISTICS SPECIFICATION</span>
        </div>
      </footer>
    `}},R=class extends T{constructor(){super(`carts`)}async getDefaultCart(){return this.getOne(1)}async updateItems(e){return this.patch(1,{items:e})}},z=99,B=class extends D{constructor(e){super(e),this.listeners=new Set,this.items=[],this.products=new Map,this.writeQueue=Promise.resolve()}async load(e){if(!Array.isArray(e))throw Error(`Danh sách sản phẩm không hợp lệ, không thể tải giỏ hàng.`);return this.#n(async()=>{this.products=new Map(e.map(e=>[Number(e.id),e]));let t=await this.model.getDefaultCart();if(!t||!Array.isArray(t.items))throw Error(`Dữ liệu giỏ hàng trong db.json không hợp lệ.`);let n=new Map;t.items.forEach(e=>{let t=Number(e?.productId),r=Math.floor(Number(e?.quantity)),i=this.products.get(t),a=i?Math.min(this.#t(i),z):0;!Number.isInteger(t)||!i||!Number.isFinite(r)||r<=0||!a||n.set(t,Math.min((n.get(t)??0)+r,a))});let r=Array.from(n,([e,t])=>this.#e(this.products.get(e),t)),i=r.map(({id:e,quantity:t})=>({productId:e,quantity:t}));return JSON.stringify(i)!==JSON.stringify(t.items)&&await this.model.updateItems(i),this.items=r,this.#i(),this.getItems()})}#e(e,t){return{id:Number(e.id),name:String(e.name??``),price:Number(e.price),image:String(e.image??``),stock:this.#t(e),quantity:t}}#t(e){let t=Number(e?.stock);return Number.isFinite(t)?Math.max(0,Math.floor(t)):z}#n(e){let t=this.writeQueue.then(e);return this.writeQueue=t.catch(()=>{}),t}async#r(e){let t=e.map(({id:e,quantity:t})=>({productId:e,quantity:t}));await this.model.updateItems(t),this.items=e,this.#i()}#i(){this.listeners.forEach(e=>{try{e(this.getItems())}catch(e){console.error(`[CartService Error]: Lỗi listener:`,e)}})}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}async addItem(e,t=1){let n=Number(e?.id),r=Number(t);if(!Number.isInteger(n)||n<=0)throw Error(`Sản phẩm không hợp lệ, không thể thêm vào giỏ hàng!`);if(!Number.isInteger(r)||r<=0)throw Error(`Số lượng phải là số nguyên lớn hơn 0!`);return this.#n(async()=>{let e=this.products.get(n);if(!e)throw Error(`Không tìm thấy sản phẩm. Vui lòng tải lại cửa hàng.`);let t=Math.min(this.#t(e),z);if(t===0)throw Error(`Sản phẩm hiện đã hết hàng.`);let i=this.items.find(e=>e.id===n),a=(i?.quantity??0)+r;if(a>t)throw Error(`Số lượng tối đa của sản phẩm này là ${t}.`);let o=i?this.items.map(t=>t.id===n?this.#e(e,a):t):[...this.items,this.#e(e,r)];await this.#r(o)})}async updateQuantity(e,t){let n=Number(e),r=Number(t);if(!Number.isInteger(n)||n<=0)throw Error(`Sản phẩm không hợp lệ.`);if(!Number.isInteger(r))throw Error(`Số lượng phải là số nguyên.`);if(r<=0)await this.removeItem(n);else return this.#n(async()=>{let e=this.items.find(e=>e.id===n);if(!e)return;let t=this.products.get(n),i=Math.min(t?this.#t(t):e.stock,z);if(i===0)throw Error(`Sản phẩm hiện đã hết hàng.`);let a=Math.min(r,i);a!==e.quantity&&await this.#r(this.items.map(e=>e.id===n?this.#e(t??e,a):e))})}async removeItem(e){let t=Number(e);if(!Number.isInteger(t)||t<=0)throw Error(`Sản phẩm không hợp lệ.`);return this.#n(async()=>{let e=this.items.filter(e=>e.id!==t);e.length!==this.items.length&&await this.#r(e)})}async clear(){return this.#n(async()=>{this.items.length&&await this.#r([])})}getItems(){return this.items.map(e=>({...e}))}getTotalQuantity(){return this.items.reduce((e,t)=>e+t.quantity,0)}getTotalPrice(){return this.items.reduce((e,t)=>e+t.price*t.quantity,0)}isEmpty(){return this.items.length===0}toOrderItems(){return this.items.map(e=>({productId:e.id,quantity:e.quantity,price:e.price}))}static formatPrice(e){return new Intl.NumberFormat(`vi-VN`,{style:`currency`,currency:`VND`}).format(e)}},V=new B(new R),H=class{static render(e=!1){let t=document.querySelector(`#app-header`),n=document.querySelector(`#app-footer`);t&&(t.innerHTML=e?F.getTemplate():M.getTemplate()),n&&(n.innerHTML=L.getTemplate()),this.unsubscribeCart?.(),this.unsubscribeCart=V.subscribe(e=>{this.updateCartCount(e)}),this.updateCartCount(V.getItems())}static updateCartCount(e){let t=e.reduce((e,t)=>e+t.quantity,0);document.querySelectorAll(`[data-role="cart-count"]`).forEach(e=>{e.textContent=String(t),e.setAttribute(`aria-label`,`${t} sản phẩm trong giỏ hàng`)})}static unsubscribeCart=null},U=class extends u{constructor(){let e=new O(new E),t=new C;super(e,t)}async init(){H.render(!1),this.view.render(),this.view.onTrack=async e=>{if(!e)this.view.renderError(`Vui lòng nhập mã vận đơn để tra cứu!`);else{this.view.showLoading();try{let t=await this.service.track(e);this.view.renderTrackingResult(t)}catch(e){this.view.renderError(e.message||`Lỗi truy xuất máy chủ dữ liệu!`)}}}}},W=class extends d{constructor(){super(`#app-content`),this.map=null,this.markersLayer=null,this.locations=[],this.onSearch=null}getTemplate(){return`
      <section class="max-w-7xl mx-auto px-4 py-8">
        
        <!-- TIÊU ĐỀ GÓC CẠNH VỚI DẢI ĐỎ THƯƠNG HIỆU -->
        <div class="border-l-4 border-[#b91c1c] pl-4 mb-8">
          <span class="text-xs font-bold uppercase tracking-widest text-[#b91c1c]">Hạ tầng giao nhận toàn quốc</span>
          <h1 class="text-3xl sm:text-4xl font-bold font-['Oswald'] text-gray-900 uppercase tracking-wide mt-0.5">
            MẠNG LƯỚI BƯU CỤC QUICKSHIP
          </h1>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- CỘT TRÁI (5 phần): Tìm kiếm & Danh sách vuông vức -->
          <div class="lg:col-span-5 flex flex-col gap-4 bg-white p-5 border-2 border-gray-900 shadow-[6px_6px_0px_0px_#0f172a] rounded-none">
            
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold uppercase tracking-wider text-gray-700">Tìm kiếm bưu cục gần nhất:</label>
              <div class="flex border-2 border-gray-900 focus-within:border-[#b91c1c] transition rounded-none">
                <input 
                  id="locate-search-input" 
                  type="text" 
                  placeholder="Nhập tên quận, thành phố hoặc địa chỉ..." 
                  class="flex-1 px-3.5 py-2.5 text-sm text-gray-900 outline-none bg-white rounded-none"
                />
                <button 
                  id="locate-search-btn" 
                  class="bg-[#b91c1c] hover:bg-[#991b1b] text-white px-5 py-2.5 text-xs font-['Oswald'] font-bold uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer border-l-2 border-gray-900 rounded-none shrink-0"
                >
                  <img src="${f}" class="w-4 h-4 invert brightness-0" alt="" />
                  <span>Tìm</span>
                </button>
              </div>
            </div>

            <!-- DANH SÁCH BƯU CỤC VUÔNG VỰC -->
            <div id="locate-list" class="flex flex-col gap-3 max-h-[460px] overflow-y-auto pr-1 mt-2">
              <div class="p-4 text-xs font-mono text-gray-500 uppercase tracking-wider border border-gray-200 text-center">
                Đang tải dữ liệu mạng lưới bưu cục...
              </div>
            </div>

          </div>

          <!-- CỘT PHẢI (7 phần): BẢN ĐỒ VUÔNG VỨC ĐỔ BÓNG ĐỎ ĐÔ -->
          <div class="lg:col-span-7 sticky top-4">
            <div class="border-2 border-gray-900 shadow-[6px_6px_0px_0px_#b91c1c] rounded-none overflow-hidden bg-gray-100">
              <div id="locate-map" class="h-[520px] w-full rounded-none z-0"></div>
            </div>
          </div>

        </div>
      </section>
    `}run(){setTimeout(()=>{let e=document.querySelector(`#locate-map`);window.L&&e&&!this.map&&(this.map=window.L.map(`locate-map`,{zoomControl:!0}).setView([10.7798,106.699],12),window.L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{attribution:`© OpenStreetMap contributors`}).addTo(this.map),this.markersLayer=window.L.layerGroup().addTo(this.map),this.map.invalidateSize(),this.drawMarkers())},50);let e=document.querySelector(`#locate-search-btn`),t=document.querySelector(`#locate-search-input`),n=()=>{let e=t?.value.trim()||``;this.onSearch&&this.onSearch(e)};e&&e.addEventListener(`click`,n),t&&t.addEventListener(`keydown`,e=>{e.key===`Enter`&&n()})}renderLocations(e){this.locations=e||[],this.renderList(),this.drawMarkers()}renderList(){let e=document.querySelector(`#locate-list`);e&&(e.innerHTML=``,this.locations.length===0?e.innerHTML=`
        <div class="p-6 text-center text-xs font-bold uppercase tracking-wider text-[#b91c1c] bg-red-50 border-2 border-[#b91c1c] rounded-none">
          Không tìm thấy bưu cục nào phù hợp!
        </div>
      `:this.locations.forEach(t=>{let n=document.createElement(`div`);n.className=`p-4 bg-white border-2 border-gray-200 hover:border-[#b91c1c] hover:shadow-[4px_4px_0px_0px_#b91c1c] transition-all cursor-pointer rounded-none flex flex-col gap-1.5 group`,n.innerHTML=`
        <div class="flex items-start justify-between gap-2">
          <h3 class="font-['Oswald'] font-bold text-sm tracking-wide text-gray-900 uppercase group-hover:text-[#b91c1c] transition">
            ${t.name}
          </h3>
          <span class="text-[10px] font-mono bg-gray-100 text-gray-700 px-1.5 py-0.5 border border-gray-300 font-bold uppercase shrink-0 rounded-none">
            BƯU CỤC
          </span>
        </div>
        <p class="text-xs text-gray-600 leading-relaxed">${t.address}</p>
        <div class="flex justify-between items-center text-[11px] text-gray-500 mt-2 pt-2 border-t border-gray-100">
          <span class="flex items-center gap-1.5 font-medium">
            <img src="${x}" class="w-3.5 h-3.5 text-gray-500" alt="" />
            ${t.operatingHours||`07:30 - 18:30`}
          </span>
          <span class="text-[#b91c1c] font-['Oswald'] font-bold uppercase text-xs tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition">
            Xem vị trí <img src="${v}" class="w-3 h-3" alt="" />
          </span>
        </div>
      `,n.addEventListener(`click`,()=>{this.map&&t.lat&&t.lng&&this.map.flyTo([t.lat,t.lng],16,{duration:1.2})}),e.appendChild(n)}))}drawMarkers(){this.map&&this.markersLayer&&this.locations.length!==0&&(this.markersLayer.clearLayers(),this.locations.forEach(e=>{e.lat&&e.lng&&window.L.marker([e.lat,e.lng]).addTo(this.markersLayer).bindPopup(`
          <div style="font-family: 'Asap', sans-serif; font-size: 12px; padding: 2px;">
            <div style="font-family: 'Oswald', sans-serif; font-weight: bold; font-size: 14px; color: #b91c1c; text-transform: uppercase;">
              ${e.name}
            </div>
            <p style="margin: 4px 0 6px 0; color: #334155;">${e.address}</p>
            <div style="font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 4px;">
              Hotline: <b>${e.phone||`1900 9999`}</b>
            </div>
          </div>
        `)}),this.locations[0]?.lat&&this.locations[0]?.lng&&this.map.setView([this.locations[0].lat,this.locations[0].lng],12))}},G=class extends D{constructor(e){super(e)}async getLocations(e=``){try{return(e?await this.model.search(e):await this.model.getAll()).map(e=>({...e,lat:parseFloat(e.lat),lng:parseFloat(e.lng)}))}catch(e){return console.error(`[LocationService Error]:`,e),[]}}},K=class extends T{constructor(){super(`locations`)}async search(e){let t=e?`q=${encodeURIComponent(e)}`:``;return await this.getAll(t)}},q=class extends u{constructor(){let e=new G(new K),t=new W;super(e,t)}async init(){H.render(!1),this.view.render();let e=await this.service.getLocations();this.view.renderLocations(e),this.view.onSearch=async e=>{let t=await this.service.getLocations(e);this.view.renderLocations(t)}}},J=`data:image/svg+xml,%3c!--%20@license%20lucide-static%20v1.61.0%20-%20ISC%20--%3e%3csvg%20class='lucide%20lucide-filter'%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20%3e%3cpath%20d='M10%2020a1%201%200%200%200%20.553.895l2%201A1%201%200%200%200%2014%2021v-7a2%202%200%200%201%20.517-1.341L21.74%204.67A1%201%200%200%200%2021%203H3a1%201%200%200%200-.742%201.67l7.225%207.989A2%202%200%200%201%2010%2014z'%20/%3e%3c/svg%3e`,ee={BOXES:`HỘP CARTON`,ENVELOPES:`BÌ THƯ`,PROTECTION:`CHỐNG SỐC`,TAPES:`BĂNG KEO`,BAGS:`TÚI ĐÓNG GÓI`},Y=e=>String(e).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#39;`),te=class extends d{constructor(){super(`#app-content`),this.onAddToCart=null}getTemplate({products:e=[],error:t=``}={}){return`
      <section class="max-w-7xl mx-auto px-4 py-8">
        
        <!-- HEADER TRANG CỬA HÀNG -->
        <div class="border-b-2 border-gray-900 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div class="border-l-4 border-[#b91c1c] pl-4">
            <span class="text-xs font-bold uppercase tracking-widest text-[#b91c1c]">Vật tư đóng gói bưu chính</span>
            <h1 class="text-3xl sm:text-4xl font-bold font-['Oswald'] text-gray-900 uppercase tracking-wide mt-0.5">
              CỬA HÀNG VẬT TƯ QUICKSHIP
            </h1>
            <p class="text-gray-600 text-xs sm:text-sm mt-1">
              Quy chuẩn đóng gói đồng bộ, bảo vệ kiện hàng an toàn tuyệt đối trên mọi hành trình.
            </p>
          </div>

          <!-- THANH LỌC DANH MỤC GÓC CẠNH -->
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="bg-gray-900 text-white text-[11px] font-['Oswald'] font-bold px-3 py-1.5 uppercase tracking-wider flex items-center gap-1 rounded-none">
              <img src="${J}" class="w-3.5 h-3.5 invert brightness-0" alt="" />
              Tất cả
            </span>
            <span class="bg-white border-2 border-gray-300 text-gray-700 text-[11px] font-['Oswald'] font-bold px-3 py-1.5 uppercase tracking-wider rounded-none hover:border-gray-900 cursor-pointer transition">
              Hộp Carton
            </span>
            <span class="bg-white border-2 border-gray-300 text-gray-700 text-[11px] font-['Oswald'] font-bold px-3 py-1.5 uppercase tracking-wider rounded-none hover:border-gray-900 cursor-pointer transition">
              Chống Sốc
            </span>
            <span class="bg-white border-2 border-gray-300 text-gray-700 text-[11px] font-['Oswald'] font-bold px-3 py-1.5 uppercase tracking-wider rounded-none hover:border-gray-900 cursor-pointer transition">
              Băng Keo & Túi
            </span>
          </div>
        </div>

        <!-- LƯỚI SẢN PHẨM VUÔNG VỨC CÔNG NGHIỆP (3 - 4 CỘT) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          ${t?`<p role="alert" class="sm:col-span-2 lg:col-span-3 text-center text-sm text-red-700">${Y(t)}</p>`:e.length?e.map(e=>this.#e(e)).join(``):`<p class="sm:col-span-2 lg:col-span-3 text-center text-sm text-gray-600">Chưa có sản phẩm nào.</p>`}
        </div>

        <!-- THÔNG BÁO TIÊU CHUẨN GÓC CẠNH PHÍA DƯỚI -->
        <div class="mt-12 p-6 bg-white border-2 border-gray-900 shadow-[4px_4px_0px_0px_#f59e0b] rounded-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="bg-[#b91c1c] p-2 text-white shrink-0">
              <img src="${g}" class="w-6 h-6 invert brightness-0" alt="" />
            </div>
            <div>
              <h4 class="font-['Oswald'] font-bold text-base text-gray-900 uppercase">
                Cam kết vật tư chính hãng QuickShip
              </h4>
              <p class="text-xs text-gray-600">
                Được kiểm định độ bền bỉ, chịu lực đạt chuẩn vận chuyển nội địa và đường hàng không quốc tế.
              </p>
            </div>
          </div>
          <span class="text-xs font-mono font-bold text-gray-500 uppercase shrink-0">
            ISO 9001:2015 CERTIFIED
          </span>
        </div>

      </section>
    `}#e(e){let t=Y(e.name),n=Y(e.image),r=Y(ee[e.category]??e.category??``),i=e.dimensions?`${e.dimensions.length} × ${e.dimensions.width} × ${e.dimensions.height} cm`:``,a=new Intl.NumberFormat(`vi-VN`,{style:`currency`,currency:`VND`}).format(e.price);return`
            <div class="bg-white border-2 border-gray-900 shadow-[4px_4px_0px_0px_#0f172a] hover:shadow-[6px_6px_0px_0px_#b91c1c] hover:border-[#b91c1c] transition-all rounded-none flex flex-col justify-between p-4 group">
              
              <div>
                <!-- Khung ảnh sắc nét góc vuông -->
                <div class="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden border-2 border-gray-900">
                  <img 
                    src="${n}" 
                    alt="${t}" 
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span class="absolute top-2 left-2 bg-[#0f172a] text-[#f59e0b] text-[10px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider">
                    ${r}
                  </span>
                </div>

                <!-- Tên sản phẩm & Quy cách -->
                <h3 class="font-['Oswald'] font-bold text-base text-gray-900 uppercase tracking-wide group-hover:text-[#b91c1c] transition mt-3 line-clamp-2">
                  ${t}
                </h3>
                <p class="text-xs font-mono text-gray-500 mt-1">
                  Quy cách: ${Y(i)}
                </p>
              </div>

              <!-- Giá tiền & Nút Thêm vào giỏ -->
              <div class="mt-4 pt-3 border-t-2 border-gray-100 flex flex-col gap-2.5">
                <div class="flex justify-between items-baseline">
                  <span class="text-[11px] uppercase tracking-wide text-gray-500">Đơn giá:</span>
                  <span class="text-2xl font-['Oswald'] font-bold text-[#b91c1c] tracking-wide">
                    ${a}
                  </span>
                </div>

                <!-- NÚT BẤM CÓ SẴN DATA ATTRIBUTES CHO TEAM GIỎ HÀNG BẮT SỰ KIỆN -->
                <button 
                  type="button"
                  data-product-id="${e.id}"
                  data-product-name="${t}"
                  data-product-price="${e.price}"
                  data-product-image="${n}"
                  class="btn-add-to-cart w-full bg-gray-900 hover:bg-[#b91c1c] text-white font-['Oswald'] font-bold text-xs uppercase tracking-wider py-2.5 px-4 flex items-center justify-center gap-2 transition cursor-pointer border-2 border-gray-900 shadow-[2px_2px_0px_0px_#f59e0b] active:translate-x-0.5 active:translate-y-0.5 rounded-none"
                >
                  <img src="${N}" class="w-4 h-4 invert brightness-0" alt="" />
                  <span>Thêm vào giỏ hàng</span>
                </button>
              </div>

            </div>
    `}run(){document.querySelectorAll(`.btn-add-to-cart`).forEach(e=>{e.addEventListener(`click`,async e=>{e.preventDefault();let t=e.currentTarget,n={id:t.dataset.productId,name:t.dataset.productName,price:Number(t.dataset.productPrice),image:t.dataset.productImage},r=t.innerHTML;t.disabled=!0;try{if(!this.onAddToCart)throw Error(`Chưa đăng ký xử lý thêm sản phẩm vào giỏ hàng.`);await this.onAddToCart(n),t.innerHTML=`<span>✓ Đã thêm vào giỏ</span>`}catch(e){console.error(`[ShopView Error]: Không lưu được giỏ hàng:`,e),t.innerHTML=`<span>Không thể thêm, thử lại</span>`}finally{t.classList.replace(`bg-gray-900`,`bg-[#b91c1c]`),setTimeout(()=>{t.innerHTML=r,t.classList.replace(`bg-[#b91c1c]`,`bg-gray-900`),t.disabled=!1},1200)}})})}},X=class extends T{constructor(){super(`products`)}},Z=class extends D{constructor(e){super(e)}async getProducts(){let e=await this.model.getAll();if(!Array.isArray(e))throw Error(`Dữ liệu sản phẩm trong db.json không hợp lệ.`);return e.map(e=>{let t={...e,id:Number(e?.id),name:String(e?.name??``),price:Number(e?.price),image:String(e?.image??``),stock:e?.stock===void 0?void 0:Number(e.stock)};if(!Number.isInteger(t.id)||t.id<=0||!t.name||!Number.isFinite(t.price)||t.price<0||t.stock!==void 0&&(!Number.isFinite(t.stock)||t.stock<0))throw Error(`Dữ liệu sản phẩm không hợp lệ (id: ${e?.id}).`);return t.stock!==void 0&&(t.stock=Math.floor(t.stock)),t})}},ne=class extends u{constructor(){let e=new te,t=new Z(new X);super(t,e,!0)}async init(){H.render(!0),this.view.onAddToCart=e=>V.addItem(e);try{let e=await this.service.getProducts();await V.load(e),this.view.render({products:e})}catch(e){console.error(`[ShopController Error]: Không tải được sản phẩm:`,e),this.view.render({error:`Không tải được danh sách sản phẩm. Vui lòng thử lại sau.`})}}},Q=`data:image/svg+xml,%3c!--%20@license%20lucide-static%20v1.61.0%20-%20ISC%20--%3e%3csvg%20class='lucide%20lucide-trash-2'%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20%3e%3cpath%20d='M10%2011v6'%20/%3e%3cpath%20d='M14%2011v6'%20/%3e%3cpath%20d='M19%206v14a2%202%200%200%201-2%202H7a2%202%200%200%201-2-2V6'%20/%3e%3cpath%20d='M3%206h18'%20/%3e%3cpath%20d='M8%206V4a2%202%200%200%201%202-2h4a2%202%200%200%201%202%202v2'%20/%3e%3c/svg%3e`,re=`data:image/svg+xml,%3c!--%20@license%20lucide-static%20v1.61.0%20-%20ISC%20--%3e%3csvg%20class='lucide%20lucide-minus'%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20%3e%3cpath%20d='M5%2012h14'%20/%3e%3c/svg%3e`,ie=`data:image/svg+xml,%3c!--%20@license%20lucide-static%20v1.61.0%20-%20ISC%20--%3e%3csvg%20class='lucide%20lucide-plus'%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20%3e%3cpath%20d='M5%2012h14'%20/%3e%3cpath%20d='M12%205v14'%20/%3e%3c/svg%3e`,$=e=>String(e).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#39;`),ae=class extends d{constructor(){super(`#app-content`),this.onUpdateQuantity=null,this.onRemove=null,this.onClear=null}getTemplate({items:e=[],totalQuantity:t=0,totalPrice:n=0,error:r=``}={}){return`
      <section class="max-w-7xl mx-auto px-4 py-8">

        <!-- TIÊU ĐỀ TRANG -->
        <div class="border-b-2 border-gray-900 pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div class="border-l-4 border-[#b91c1c] pl-4">
            <span class="text-xs font-bold uppercase tracking-widest text-[#b91c1c]">Vật tư đóng gói bưu chính</span>
            <h1 class="text-3xl sm:text-4xl font-bold font-['Oswald'] text-gray-900 uppercase tracking-wide mt-0.5">
              GIỎ HÀNG CỦA BẠN
            </h1>
          </div>
          <a href="#/shop" class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-700 hover:text-[#b91c1c] transition">
            <img src="${P}" class="w-3.5 h-3.5" alt="" />
            Tiếp tục mua sắm
          </a>
        </div>

        ${r?`<div role="alert" class="bg-red-50 border-2 border-red-700 p-4 mb-6 text-sm text-red-800">${$(r)}</div>`:``}
        ${e.length===0?this.#e():this.#t(e,t,n)}

      </section>
    `}#e(){return`
      <div class="bg-white border-2 border-gray-900 shadow-[6px_6px_0px_0px_#b91c1c] rounded-none p-10 sm:p-16 text-center">
        <div class="inline-flex bg-[#0f172a] p-4 text-[#f59e0b] mb-4">
          <img src="${j}" class="w-10 h-10 invert brightness-0" alt="" />
        </div>
        <h2 class="font-['Oswald'] text-2xl font-bold text-gray-900 uppercase tracking-wide">
          Giỏ hàng đang trống
        </h2>
        <p class="text-sm text-gray-600 mt-2 max-w-md mx-auto">
          Bạn chưa chọn vật tư đóng gói nào. Hãy ghé cửa hàng để chọn thùng carton, bì thư, băng keo và nhiều hơn nữa.
        </p>
        <a href="#/shop" class="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-[#b91c1c] hover:bg-[#991b1b] text-white font-['Oswald'] text-xs font-bold uppercase tracking-wider border-b-2 border-[#f59e0b] transition rounded-none">
          <img src="${g}" class="w-4 h-4 invert brightness-0" alt="" />
          Đến cửa hàng vật tư
        </a>
      </div>
    `}#t(e,t,n){return`
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        <!-- DANH SÁCH SẢN PHẨM -->
        <div class="lg:col-span-2 flex flex-col gap-4">
          ${e.map(e=>this.#n(e)).join(``)}

          <div class="flex justify-end">
            <button
              type="button"
              data-action="clear"
              class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#b91c1c] transition cursor-pointer"
            >
              <img src="${Q}" class="w-3.5 h-3.5" alt="" />
              Xóa toàn bộ giỏ hàng
            </button>
          </div>
        </div>

        <!-- TÓM TẮT ĐƠN HÀNG -->
        <aside class="bg-white border-2 border-gray-900 shadow-[4px_4px_0px_0px_#f59e0b] rounded-none p-5 lg:sticky lg:top-24">
          <h2 class="font-['Oswald'] text-lg font-bold text-gray-900 uppercase tracking-wide border-b-2 border-gray-900 pb-3">
            Tóm tắt đơn hàng
          </h2>

          <dl class="mt-4 flex flex-col gap-3 text-sm">
            <div class="flex justify-between">
              <dt class="text-gray-600">Số loại sản phẩm</dt>
              <dd class="font-mono font-bold text-gray-900">${e.length}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-gray-600">Tổng số lượng</dt>
              <dd class="font-mono font-bold text-gray-900" data-role="total-quantity">${t}</dd>
            </div>
            <div class="flex justify-between items-baseline border-t-2 border-gray-100 pt-3">
              <dt class="text-[11px] uppercase tracking-wide text-gray-500">Tạm tính</dt>
              <dd class="text-2xl font-['Oswald'] font-bold text-[#b91c1c] tracking-wide" data-role="total-price">
                ${B.formatPrice(n)}
              </dd>
            </div>
          </dl>

          <p class="text-[11px] text-gray-500 mt-3">
            Phí vận chuyển (nếu có) sẽ được tính ở bước thanh toán.
          </p>
        </aside>

      </div>
    `}#n(e){let t=$(e.name),n=B.formatPrice(e.price*e.quantity);return`
      <article
        data-item-id="${e.id}"
        class="bg-white border-2 border-gray-900 shadow-[4px_4px_0px_0px_#0f172a] rounded-none p-3 sm:p-4 flex gap-3 sm:gap-4"
      >
        <!-- Ảnh -->
        <div class="w-20 h-20 sm:w-28 sm:h-28 shrink-0 bg-gray-100 border-2 border-gray-900 overflow-hidden">
          <img src="${$(e.image)}" alt="${t}" class="w-full h-full object-cover" />
        </div>

        <!-- Thông tin -->
        <div class="flex-1 min-w-0 flex flex-col justify-between gap-3">
          <div class="flex justify-between items-start gap-3">
            <div class="min-w-0">
              <h3 class="font-['Oswald'] font-bold text-sm sm:text-base text-gray-900 uppercase tracking-wide line-clamp-2">
                ${t}
              </h3>
              <p class="text-xs font-mono text-gray-500 mt-1">
                Đơn giá: ${B.formatPrice(e.price)}
              </p>
              <p class="text-xs text-gray-500 mt-1">Tồn kho: ${e.stock}</p>
            </div>

            <button
              type="button"
              data-action="remove"
              data-id="${e.id}"
              aria-label="Xóa ${t} khỏi giỏ hàng"
              class="shrink-0 p-1.5 border-2 border-gray-300 hover:border-[#b91c1c] hover:bg-red-50 transition cursor-pointer rounded-none"
            >
              <img src="${Q}" class="w-4 h-4" alt="" />
            </button>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-3">
            <!-- Bộ chỉnh số lượng -->
            <div class="inline-flex items-stretch border-2 border-gray-900 rounded-none">
              <button
                type="button"
                data-action="decrease"
                data-id="${e.id}"
                aria-label="Giảm số lượng"
                class="px-2.5 bg-white hover:bg-gray-900 hover:text-white transition cursor-pointer flex items-center"
              >
                <img src="${re}" class="w-3.5 h-3.5" alt="" />
              </button>
              <input
                type="number"
                min="1"
                max="${Math.min(e.stock,99)}"
                value="${e.quantity}"
                data-action="quantity"
                data-id="${e.id}"
                aria-label="Số lượng"
                class="w-12 text-center font-mono font-bold text-sm border-x-2 border-gray-900 py-1.5 focus:outline-none focus:bg-amber-50 rounded-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <button
                type="button"
                data-action="increase"
                data-id="${e.id}"
                aria-label="Tăng số lượng"
                class="px-2.5 bg-white hover:bg-gray-900 hover:text-white transition cursor-pointer flex items-center"
              >
                <img src="${ie}" class="w-3.5 h-3.5" alt="" />
              </button>
            </div>

            <!-- Thành tiền -->
            <span class="font-['Oswald'] text-lg sm:text-xl font-bold text-[#b91c1c] tracking-wide">
              <span data-role="line-total">
                ${n}
              </span>
            </span>
          </div>
        </div>
      </article>
    `}run(){let e=this.container;e&&(e.querySelectorAll(`[data-action="increase"]`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.dataset.id,r=e.querySelector(`input[data-action="quantity"][data-id="${n}"]`),i=Number(r?.value)||1;this.onUpdateQuantity?.(n,i+1)})}),e.querySelectorAll(`[data-action="decrease"]`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.dataset.id,r=e.querySelector(`input[data-action="quantity"][data-id="${n}"]`),i=Number(r?.value)||1;this.onUpdateQuantity?.(n,Math.max(1,i-1))})}),e.querySelectorAll(`input[data-action="quantity"]`).forEach(e=>{e.addEventListener(`change`,()=>{let t=Math.floor(Number(e.value)),n=Number.isFinite(t)&&t>=1?t:1;this.onUpdateQuantity?.(e.dataset.id,n)})}),e.querySelectorAll(`[data-action="remove"]`).forEach(e=>{e.addEventListener(`click`,()=>this.onRemove?.(e.dataset.id))}),e.querySelector(`[data-action="clear"]`)?.addEventListener(`click`,()=>{window.confirm(`Bạn có chắc muốn xóa toàn bộ giỏ hàng?`)&&this.onClear?.()}))}updateItem(e,t,n){let r=this.container,i=r?.querySelector(`[data-item-id="${e.id}"]`);if(!i)return!1;let a=i.querySelector(`input[data-action="quantity"]`),o=i.querySelector(`[data-role="line-total"]`),s=r.querySelector(`[data-role="total-quantity"]`),c=r.querySelector(`[data-role="total-price"]`);return!a||!o||!s||!c?!1:(a.value=String(e.quantity),a.max=String(Math.min(e.stock,99)),o.textContent=B.formatPrice(e.price*e.quantity),s.textContent=String(t),c.textContent=B.formatPrice(n),!0)}},oe=class extends u{constructor(){super(V,new ae),this.productService=new Z(new X)}async init(){H.render(!0),this.view.onUpdateQuantity=async(e,t)=>{try{await this.service.updateQuantity(e,t);let n=this.service.getItems().find(t=>t.id===Number(e));(!n||!this.view.updateItem(n,this.service.getTotalQuantity(),this.service.getTotalPrice()))&&this.refresh()}catch(e){console.error(`[CartController Error]: Không cập nhật được giỏ hàng:`,e),this.refresh(`Không thể cập nhật giỏ hàng. Vui lòng thử lại.`)}},this.view.onRemove=async e=>{try{await this.service.removeItem(e),this.refresh()}catch(e){console.error(`[CartController Error]: Không xóa được sản phẩm:`,e),this.refresh(`Không thể xóa sản phẩm. Vui lòng thử lại.`)}},this.view.onClear=async()=>{try{await this.service.clear(),this.refresh()}catch(e){console.error(`[CartController Error]: Không thể xóa giỏ hàng:`,e),this.refresh(`Không thể xóa giỏ hàng. Vui lòng thử lại.`)}};try{let e=await this.productService.getProducts();await this.service.load(e),this.refresh()}catch(e){console.error(`[CartController Error]: Không tải được sản phẩm:`,e),this.view.render({error:`Không tải được dữ liệu sản phẩm. Vui lòng thử lại sau.`})}}refresh(e=``){this.view.render({items:this.service.getItems(),totalQuantity:this.service.getTotalQuantity(),totalPrice:this.service.getTotalPrice(),error:e})}},se=`data:image/svg+xml,%3c!--%20@license%20lucide-static%20v1.61.0%20-%20ISC%20--%3e%3csvg%20class='lucide%20lucide-mail'%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20%3e%3cpath%20d='m22%207-8.991%205.727a2%202%200%200%201-2.009%200L2%207'%20/%3e%3crect%20x='2'%20y='4'%20width='20'%20height='16'%20rx='2'%20/%3e%3c/svg%3e`,ce=class extends d{constructor(){super(`#app-content`),this.currentScope=`DOMESTIC`,this.currentItemType=`PACKAGE`,this.onCalculate=null}getTemplate(){return`
      <section class="max-w-4xl mx-auto px-4 py-8">
        
        <!-- TIÊU ĐỀ SECTION GÓC CẠNH -->
        <div class="border-l-4 border-[#b91c1c] pl-4 mb-8">
          <span class="text-xs font-bold uppercase tracking-widest text-[#b91c1c]">Dự toán chi phí vận chuyển</span>
          <h1 class="text-3xl sm:text-4xl font-bold font-['Oswald'] text-gray-900 uppercase tracking-wide mt-0.5">
            TÍNH CƯỚC BƯU GỬI
          </h1>
        </div>

        <!-- HỘP TÍNH CƯỚC VUÔNG VỨC ĐỔ BÓNG ĐỎ -->
        <div class="bg-white border-2 border-gray-900 shadow-[6px_6px_0px_0px_#b91c1c] rounded-none">
          
          <!-- TABS TRÊN CÙNG: NỘI ĐỊA / QUỐC TẾ -->
          <div class="grid grid-cols-2 border-b-2 border-gray-900">
            <button 
              id="tab-domestic" 
              type="button" 
              class="py-4 px-4 text-center font-['Oswald'] font-bold text-sm sm:text-base uppercase tracking-wider bg-[#b91c1c] text-white border-r-2 border-gray-900 transition cursor-pointer"
            >
              Trong nước (Domestic)
            </button>
            <button 
              id="tab-overseas" 
              type="button" 
              class="py-4 px-4 text-center font-['Oswald'] font-bold text-sm sm:text-base uppercase tracking-wider bg-gray-100 text-gray-700 hover:bg-gray-200 transition cursor-pointer"
            >
              Quốc tế (Overseas)
            </button>
          </div>

          <!-- FORM NHẬP THÔNG SỐ -->
          <div class="p-5 sm:p-8 flex flex-col gap-6">
            
            <!-- MỤC 1: CHỌN LOẠI HÀNG (PACKAGE VS MAIL) -->
            <div class="flex flex-col gap-2">
              <label class="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
                <span>1. Bạn muốn gửi loại hình nào?</span>
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button 
                  id="btn-type-package" 
                  type="button" 
                  class="py-3 px-4 border-2 border-gray-900 bg-red-50/50 text-[#b91c1c] font-['Oswald'] font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 cursor-pointer transition shadow-[2px_2px_0px_0px_#0f172a]"
                >
                  <img src="${g}" class="w-4 h-4" alt="" />
                  <span>Package (Bưu kiện đóng hộp)</span>
                </button>
                <button 
                  id="btn-type-mail" 
                  type="button" 
                  class="py-3 px-4 border-2 border-gray-300 bg-white text-gray-700 font-['Oswald'] font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 cursor-pointer transition hover:border-gray-900"
                >
                  <img src="${se}" class="w-4 h-4" alt="" />
                  <span>Mail (Thư từ / Tài liệu)</span>
                </button>
              </div>
            </div>

            <!-- MỤC 2: NHẬP KHỐI LƯỢNG (KG) -->
            <div class="flex flex-col gap-2">
              <label class="text-xs font-bold uppercase tracking-wider text-gray-800">
                2. Tổng khối lượng bưu kiện (Weight):
              </label>
              <div class="flex border-2 border-gray-900 focus-within:border-[#b91c1c] transition max-w-sm">
                <input 
                  id="calc-weight-input" 
                  type="number" 
                  step="0.1" 
                  min="0.1" 
                  value="1.0" 
                  class="flex-1 px-3.5 py-2.5 text-sm font-mono text-gray-900 outline-none bg-white font-bold"
                />
                <div class="bg-gray-100 border-l-2 border-gray-900 px-4 py-2.5 font-['Oswald'] font-bold text-sm text-gray-800 uppercase flex items-center">
                  KG
                </div>
              </div>
            </div>

            <!-- MỤC 3: CHỌN KÍCH CỠ HỘP (CHỈ HIỆN KHI LÀ PACKAGE) -->
            <div id="wrapper-calc-size" class="flex flex-col gap-2">
              <label class="text-xs font-bold uppercase tracking-wider text-gray-800">
                3. Quy chuẩn kích thước kiện hàng (Size Tier):
              </label>
              <div class="border-2 border-gray-900 focus-within:border-[#b91c1c] transition max-w-xl">
                <select 
                  id="calc-size-select" 
                  class="w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium text-gray-900 bg-white outline-none cursor-pointer"
                >
                  <option value="SMALL">Small — 32.4 × 22.9 × 6.5 cm (Hàng tiêu chuẩn)</option>
                  <option value="MEDIUM">Medium — 32 × 25 × 10 cm (Hộp linh kiện, thời trang)</option>
                  <option value="LARGE">Large — 60 × 40 × 30 cm (Kiện hàng lớn tiêu chuẩn)</option>
                  <option value="OVERSIZE">Oversize — Dài đến 1.5m, Dài + 2R + 2C &lt; 3m (Hàng cồng kềnh)</option>
                </select>
              </div>
            </div>

            <!-- HÀNG NÚT BẤM VÀ LINK THAM KHẢO -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t-2 border-gray-100">
              <button 
                id="btn-run-calculate" 
                type="button" 
                class="bg-[#b91c1c] hover:bg-[#991b1b] text-white px-8 py-3 text-xs sm:text-sm font-['Oswald'] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer border-2 border-gray-900 shadow-[3px_3px_0px_0px_#0f172a]"
              >
                <img src="${p}" class="w-4 h-4 invert brightness-0" alt="" />
                <span>Tính cước ngay</span>
              </button>

              <span class="text-xs font-mono text-gray-500 uppercase">
                * Bảng cước đồng bộ thời gian thực từ cơ sở dữ liệu QuickShip
              </span>
            </div>

            <!-- KHU VỰC IN KẾT QUẢ TÍNH CƯỚC -->
            <div id="calc-result-box" class="flex flex-col gap-2"></div>

          </div>

        </div>

      </section>
    `}run(){let e=document.querySelector(`#tab-domestic`),t=document.querySelector(`#tab-overseas`),n=n=>{this.currentScope=n,n===`DOMESTIC`?(e.className=`py-4 px-4 text-center font-['Oswald'] font-bold text-sm sm:text-base uppercase tracking-wider bg-[#b91c1c] text-white border-r-2 border-gray-900 transition cursor-pointer`,t.className=`py-4 px-4 text-center font-['Oswald'] font-bold text-sm sm:text-base uppercase tracking-wider bg-gray-100 text-gray-700 hover:bg-gray-200 transition cursor-pointer`):(t.className=`py-4 px-4 text-center font-['Oswald'] font-bold text-sm sm:text-base uppercase tracking-wider bg-[#b91c1c] text-white transition cursor-pointer`,e.className=`py-4 px-4 text-center font-['Oswald'] font-bold text-sm sm:text-base uppercase tracking-wider bg-gray-100 text-gray-700 hover:bg-gray-200 border-r-2 border-gray-900 transition cursor-pointer`)};e&&e.addEventListener(`click`,()=>n(`DOMESTIC`)),t&&t.addEventListener(`click`,()=>n(`OVERSEAS`));let r=document.querySelector(`#btn-type-package`),i=document.querySelector(`#btn-type-mail`),a=document.querySelector(`#wrapper-calc-size`),o=e=>{this.currentItemType=e,e===`PACKAGE`?(r.className=`py-3 px-4 border-2 border-gray-900 bg-red-50/50 text-[#b91c1c] font-['Oswald'] font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 cursor-pointer transition shadow-[2px_2px_0px_0px_#0f172a]`,i.className=`py-3 px-4 border-2 border-gray-300 bg-white text-gray-700 font-['Oswald'] font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 cursor-pointer transition hover:border-gray-900`,a&&(a.style.display=`flex`)):(i.className=`py-3 px-4 border-2 border-gray-900 bg-red-50/50 text-[#b91c1c] font-['Oswald'] font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 cursor-pointer transition shadow-[2px_2px_0px_0px_#0f172a]`,r.className=`py-3 px-4 border-2 border-gray-300 bg-white text-gray-700 font-['Oswald'] font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 cursor-pointer transition hover:border-gray-900`,a&&(a.style.display=`none`))};r&&r.addEventListener(`click`,()=>o(`PACKAGE`)),i&&i.addEventListener(`click`,()=>o(`MAIL`));let s=document.querySelector(`#btn-run-calculate`),c=document.querySelector(`#calc-weight-input`),l=document.querySelector(`#calc-size-select`);s&&s.addEventListener(`click`,()=>{this.onCalculate&&this.onCalculate({scope:this.currentScope,itemType:this.currentItemType,weightKg:c?.value||1,size:l?.value||`SMALL`})})}showLoading(){let e=document.querySelector(`#calc-result-box`);e&&(e.innerHTML=`
        <div class="p-4 bg-gray-100 border-2 border-gray-300 text-xs font-mono uppercase tracking-wider text-gray-600 rounded-none text-center mt-2">
          Hệ thống đang đối soát bảng cước...
        </div>
      `)}renderError(e){let t=document.querySelector(`#calc-result-box`);t&&(t.innerHTML=`
        <div class="p-4 bg-red-50 border-2 border-[#b91c1c] text-xs font-bold uppercase tracking-wider text-[#b91c1c] rounded-none flex items-center gap-2 mt-2">
          <img src="${S}" class="w-4 h-4 shrink-0" alt="" />
          <span>${e}</span>
        </div>
      `)}renderResult(e){let t=document.querySelector(`#calc-result-box`);t&&e&&(t.innerHTML=`
      <div class="mt-4 p-5 bg-[#0f172a] text-white border-2 border-gray-900 shadow-[4px_4px_0px_0px_#f59e0b] rounded-none flex flex-col gap-3">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-700 pb-2.5 gap-1">
          <span class="text-xs font-bold uppercase tracking-wider text-[#f59e0b] flex items-center gap-1.5">
            <img src="${_}" class="w-4 h-4 text-[#f59e0b]" alt="" />
            <span>KẾT QUẢ DỰ TOÁN CƯỚC PHÍ</span>
          </span>
          <span class="text-[11px] font-mono text-gray-400 uppercase">
            ${e.scopeText} • ${e.itemTypeText} • ${e.weightText}
          </span>
        </div>

        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 pt-1">
          <div>
            <div class="text-[11px] uppercase tracking-wide text-gray-400">Thời gian toàn trình dự kiến:</div>
            <div class="text-sm font-['Oswald'] font-bold text-gray-200 uppercase tracking-wide mt-0.5">
              ${e.estimatedDays}
            </div>
          </div>
          
          <div class="text-left sm:text-right">
            <div class="text-[11px] uppercase tracking-wide text-gray-400">Cước phí ước tính:</div>
            <div class="text-3xl font-['Oswald'] font-bold text-[#f59e0b] tracking-wider mt-0.5">
              ${e.formattedPrice}
            </div>
          </div>
        </div>
      </div>
    `)}},le=class extends T{constructor(){super(`shipping_rates`)}async getDefaultRates(){return await this.getOne(1)}},ue=class extends D{constructor(e){super(e)}async calculate({scope:e=`DOMESTIC`,itemType:t=`PACKAGE`,weightKg:n=1,size:r=`SMALL`}){let i=parseFloat(n)||0;if(i<=0)throw Error(`Khối lượng hàng gửi phải lớn hơn 0 kg!`);let a=await this.model.getDefaultRates();if(!a)throw Error(`Không thể truy xuất bảng cước từ hệ thống!`);let o=0,s=``;return t===`MAIL`?(o=e===`DOMESTIC`?a.mailBasePrice:a.mailBasePrice*a.overseasMultiplier,s=e===`DOMESTIC`?`1 - 2 ngày làm việc`:`5 - 7 ngày làm việc`):(o=a.packages[r]||a.packages.SMALL,i>1&&(o+=Math.ceil(i-1)*a.extraPerKg),e===`OVERSEAS`?(o*=a.overseasMultiplier,s=`5 - 10 ngày làm việc`):s=`2 - 3 ngày làm việc`),{price:o,formattedPrice:new Intl.NumberFormat(`vi-VN`,{style:`currency`,currency:`VND`}).format(o),estimatedDays:s,scopeText:e===`DOMESTIC`?`Vận chuyển Nội địa`:`Vận chuyển Quốc tế`,itemTypeText:t===`PACKAGE`?`Bưu kiện đóng hộp`:`Thư từ / Tài liệu`,weightText:`${i} kg`}}},de=class extends u{constructor(){let e=new ue(new le),t=new ce;super(e,t,!1)}async init(){H.render(!1),this.view.render(),this.view.onCalculate=async e=>{this.view.showLoading();try{let t=await this.service.calculate(e);this.view.renderResult(t)}catch(e){this.view.renderError(e.message||`Lỗi khi tính toán cước phí!`)}}}};new l.default(`/`,{hash:!0}).on(`/`,()=>{new U().init()}).on(`/locate-us`,()=>{new q().init()}).on(`/calculate-rates`,()=>{new de().init()}).on(`/shop`,()=>{new ne().init()}).on(`/cart`,()=>{new oe().init()}).notFound(()=>{let e=document.querySelector(`#app-content`);e&&(e.innerHTML=`
          <div class="max-w-7xl mx-auto px-4 py-24 text-center">
            <div class="inline-block p-8 bg-white border-2 border-gray-900 shadow-[6px_6px_0px_0px_#b91c1c] rounded-none">
              <h1 class="font-['Oswald'] text-5xl font-extrabold text-[#b91c1c] tracking-wider">404 ERROR</h1>
              <p class="font-['Oswald'] text-lg uppercase font-bold text-gray-900 mt-2">KHÔNG TÌM THẤY TRANG YÊU CẦU</p>
              <p class="text-xs text-gray-600 mt-1 max-w-sm">Đường dẫn bạn truy cập có thể đã thay đổi hoặc không tồn tại trong hệ thống.</p>
              <a href="#/" class="inline-block mt-6 px-6 py-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white font-['Oswald'] text-xs font-bold uppercase tracking-wider transition rounded-none">
                Quay về trang chủ
              </a>
            </div>
          </div>
        `)}).resolve();