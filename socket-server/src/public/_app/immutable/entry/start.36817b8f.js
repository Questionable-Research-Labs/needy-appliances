var ct=Object.defineProperty,lt=Object.defineProperties;var ft=Object.getOwnPropertyDescriptors;var de=Object.getOwnPropertySymbols;var Je=Object.prototype.hasOwnProperty,Ke=Object.prototype.propertyIsEnumerable;var Ve=(e,a,i)=>a in e?ct(e,a,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[a]=i,M=(e,a)=>{for(var i in a||(a={}))Je.call(a,i)&&Ve(e,i,a[i]);if(de)for(var i of de(a))Ke.call(a,i)&&Ve(e,i,a[i]);return e},G=(e,a)=>lt(e,ft(a));var ze=(e,a)=>{var i={};for(var s in e)Je.call(e,s)&&a.indexOf(s)<0&&(i[s]=e[s]);if(e!=null&&de)for(var s of de(e))a.indexOf(s)<0&&Ke.call(e,s)&&(i[s]=e[s]);return i};var A=(e,a,i)=>new Promise((s,d)=>{var h=m=>{try{f(i.next(m))}catch(y){d(y)}},R=m=>{try{f(i.throw(m))}catch(y){d(y)}},f=m=>m.done?s(m.value):Promise.resolve(m.value).then(h,R);f((i=i.apply(e,a)).next())});import{o as Be,t as he}from"../chunks/index.f99c9f29.js";import{S as at,a as rt,I as H,g as Ge,f as Ye,b as Ee,c as pe,s as J,i as We,d as ae,e as W,P as Xe,h as ut}from"../chunks/singletons.20413626.js";function dt(e,a){return e==="/"||a==="ignore"?e:a==="never"?e.endsWith("/")?e.slice(0,-1):e:a==="always"&&!e.endsWith("/")?e+"/":e}function ht(e){return e.split("%25").map(decodeURI).join("%25")}function pt(e){for(const a in e)e[a]=decodeURIComponent(e[a]);return e}const mt=["href","pathname","search","searchParams","toString","toJSON"];function gt(e,a){const i=new URL(e);for(const s of mt){let d=i[s];Object.defineProperty(i,s,{get(){return a(),d},enumerable:!0,configurable:!0})}return yt(i),i}function yt(e){Object.defineProperty(e,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}const wt="/__data.json";function _t(e){return e.replace(/\/$/,"")+wt}function ot(e){try{return JSON.parse(sessionStorage[e])}catch(a){}}function Ze(e,a){const i=JSON.stringify(a);try{sessionStorage[e]=i}catch(s){}}function bt(...e){let a=5381;for(const i of e)if(typeof i=="string"){let s=i.length;for(;s;)a=a*33^i.charCodeAt(--s)}else if(ArrayBuffer.isView(i)){const s=new Uint8Array(i.buffer,i.byteOffset,i.byteLength);let d=s.length;for(;d;)a=a*33^s[--d]}else throw new TypeError("value must be a string or TypedArray");return(a>>>0).toString(36)}const me=window.fetch;window.fetch=(e,a)=>((e instanceof Request?e.method:(a==null?void 0:a.method)||"GET")!=="GET"&&oe.delete(Le(e)),me(e,a));const oe=new Map;function vt(e,a){const i=Le(e,a),s=document.querySelector(i);if(s!=null&&s.textContent){const d=JSON.parse(s.textContent),{body:h}=d,R=ze(d,["body"]),f=s.getAttribute("data-ttl");return f&&oe.set(i,{body:h,init:R,ttl:1e3*Number(f)}),Promise.resolve(new Response(h,R))}return me(e,a)}function Et(e,a,i){if(oe.size>0){const s=Le(e,i),d=oe.get(s);if(d){if(performance.now()<d.ttl&&["default","force-cache","only-if-cached",void 0].includes(i==null?void 0:i.cache))return new Response(d.body,d.init);oe.delete(s)}}return me(a,i)}function Le(e,a){let s=`script[data-sveltekit-fetched][data-url=${JSON.stringify(e instanceof Request?e.url:e)}]`;if(a!=null&&a.headers||a!=null&&a.body){const d=[];a.headers&&d.push([...new Headers(a.headers)].join(",")),a.body&&(typeof a.body=="string"||ArrayBuffer.isView(a.body))&&d.push(a.body),s+=`[data-hash="${bt(...d)}"]`}return s}const kt=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function St(e){const a=[];return{pattern:e==="/"?/^\/$/:new RegExp(`^${Lt(e).map(s=>{const d=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(s);if(d)return a.push({name:d[1],matcher:d[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const h=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(s);if(h)return a.push({name:h[1],matcher:h[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!s)return;const R=s.split(/\[(.+?)\](?!\])/);return"/"+R.map((m,y)=>{if(y%2){if(m.startsWith("x+"))return ke(String.fromCharCode(parseInt(m.slice(2),16)));if(m.startsWith("u+"))return ke(String.fromCharCode(...m.slice(2).split("-").map(j=>parseInt(j,16))));const g=kt.exec(m);if(!g)throw new Error(`Invalid param: ${m}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,D,$,E,x]=g;return a.push({name:E,matcher:x,optional:!!D,rest:!!$,chained:$?y===1&&R[0]==="":!1}),$?"(.*?)":D?"([^/]*)?":"([^/]+?)"}return ke(m)}).join("")}).join("")}/?$`),params:a}}function Rt(e){return!/^\([^)]+\)$/.test(e)}function Lt(e){return e.slice(1).split("/").filter(Rt)}function It(e,a,i){const s={},d=e.slice(1);let h=0;for(let R=0;R<a.length;R+=1){const f=a[R],m=d[R-h];if(f.chained&&f.rest&&h){s[f.name]=d.slice(R-h,R+1).filter(y=>y).join("/"),h=0;continue}if(m===void 0){f.rest&&(s[f.name]="");continue}if(!f.matcher||i[f.matcher](m)){s[f.name]=m;const y=a[R+1],g=d[R+1];y&&!y.rest&&y.optional&&g&&(h=0);continue}if(f.optional&&f.chained){h++;continue}return}if(!h)return s}function ke(e){return e.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function At({nodes:e,server_loads:a,dictionary:i,matchers:s}){const d=new Set(a);return Object.entries(i).map(([f,[m,y,g]])=>{const{pattern:D,params:$}=St(f),E={id:f,exec:x=>{const j=D.exec(x);if(j)return It(j,$,s)},errors:[1,...g||[]].map(x=>e[x]),layouts:[0,...y||[]].map(R),leaf:h(m)};return E.errors.length=E.layouts.length=Math.max(E.errors.length,E.layouts.length),E});function h(f){const m=f<0;return m&&(f=~f),[m,e[f]]}function R(f){return f===void 0?f:[d.has(f),e[f]]}}let re=class{constructor(a,i){this.status=a,typeof i=="string"?this.body={message:i}:i?this.body=i:this.body={message:`Error: ${a}`}}toString(){return JSON.stringify(this.body)}},Qe=class{constructor(a,i){this.status=a,this.location=i}};function Ot(e){return A(this,null,function*(){var a;for(const i in e)if(typeof((a=e[i])==null?void 0:a.then)=="function")return Object.fromEntries(yield Promise.all(Object.entries(e).map(h=>A(this,[h],function*([s,d]){return[s,yield d]}))));return e})}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");const Pt=-1,Ut=-2,jt=-3,Nt=-4,$t=-5,xt=-6;function Tt(e,a){if(typeof e=="number")return d(e,!0);if(!Array.isArray(e)||e.length===0)throw new Error("Invalid input");const i=e,s=Array(i.length);function d(h,R=!1){if(h===Pt)return;if(h===jt)return NaN;if(h===Nt)return 1/0;if(h===$t)return-1/0;if(h===xt)return-0;if(R)throw new Error("Invalid input");if(h in s)return s[h];const f=i[h];if(!f||typeof f!="object")s[h]=f;else if(Array.isArray(f))if(typeof f[0]=="string"){const m=f[0],y=a==null?void 0:a[m];if(y)return s[h]=y(d(f[1]));switch(m){case"Date":s[h]=new Date(f[1]);break;case"Set":const g=new Set;s[h]=g;for(let E=1;E<f.length;E+=1)g.add(d(f[E]));break;case"Map":const D=new Map;s[h]=D;for(let E=1;E<f.length;E+=2)D.set(d(f[E]),d(f[E+1]));break;case"RegExp":s[h]=new RegExp(f[1],f[2]);break;case"Object":s[h]=Object(f[1]);break;case"BigInt":s[h]=BigInt(f[1]);break;case"null":const $=Object.create(null);s[h]=$;for(let E=1;E<f.length;E+=2)$[f[E]]=d(f[E+1]);break;default:throw new Error(`Unknown type ${m}`)}}else{const m=new Array(f.length);s[h]=m;for(let y=0;y<f.length;y+=1){const g=f[y];g!==Ut&&(m[y]=d(g))}}else{const m={};s[h]=m;for(const y in f){const g=f[y];m[y]=d(g)}}return s[h]}return d(0)}function Dt(e){return e.filter(a=>a!=null)}var tt;const Y=(tt=ot(at))!=null?tt:{};var nt;const ne=(nt=ot(rt))!=null?nt:{};function Se(e){Y[e]=ae()}function Ct(e,a){var Fe;const i=At(e),s=e.nodes[0],d=e.nodes[1];s(),d();const h=document.documentElement,R=[],f=[];let m=null;const y={before_navigate:[],after_navigate:[]};let g={branch:[],error:null,url:null},D=!1,$=!1,E=!0,x=!1,j=!1,X=!1,K=!1,V,T=(Fe=history.state)==null?void 0:Fe[H];T||(T=Date.now(),history.replaceState(G(M({},history.state),{[H]:T}),"",location.href));const ge=Y[T];ge&&(history.scrollRestoration="manual",scrollTo(ge.x,ge.y));let z,Ie,ie;function Ae(){return A(this,null,function*(){ie=ie||Promise.resolve(),yield ie,ie=null;const n=new URL(location.href),t=Q(n,!0);m=null,yield Ne(t,n,[])})}function Oe(n){f.some(t=>t==null?void 0:t.snapshot)&&(ne[n]=f.map(t=>{var o;return(o=t==null?void 0:t.snapshot)==null?void 0:o.capture()}))}function Pe(n){var t;(t=ne[n])==null||t.forEach((o,r)=>{var l,c;(c=(l=f[r])==null?void 0:l.snapshot)==null||c.restore(o)})}function Ue(){Se(T),Ze(at,Y),Oe(T),Ze(rt,ne)}function ye(_,v,k,w){return A(this,arguments,function*(n,{noScroll:t=!1,replaceState:o=!1,keepFocus:r=!1,state:l={},invalidateAll:c=!1},p,L){return typeof n=="string"&&(n=new URL(n,Ge(document))),fe({url:n,scroll:t?ae():null,keepfocus:r,redirect_chain:p,details:{state:l,replaceState:o},nav_token:L,accepted:()=>{c&&(K=!0)},blocked:()=>{},type:"goto"})})}function je(n){return A(this,null,function*(){return m={id:n.id,promise:Te(n).then(t=>(t.type==="loaded"&&t.state.error&&(m=null),t))},m.promise})}function se(...n){return A(this,null,function*(){const o=i.filter(r=>n.some(l=>r.exec(l))).map(r=>Promise.all([...r.layouts,r.leaf].map(l=>l==null?void 0:l[1]())));yield Promise.all(o)})}function Ne(L,_,v,k,w){return A(this,arguments,function*(n,t,o,r,l,c={},p){var q,N,I;Ie=c;let b=n&&(yield Te(n));if(b||(b=yield qe(t,{id:null},yield te(new Error(`Not found: ${t.pathname}`),{url:t,params:{},route:{id:null}}),404)),t=(n==null?void 0:n.url)||t,Ie!==c)return!1;if(b.type==="redirect")if(o.length>10||o.includes(t.pathname))b=yield ce({status:500,error:yield te(new Error("Redirect loop"),{url:t,params:{},route:{id:null}}),url:t,route:{id:null}});else return ye(new URL(b.location,t).href,{},[...o,t.pathname],c),!1;else((q=b.props.page)==null?void 0:q.status)>=400&&(yield J.updated.check())&&(yield ee(t));if(R.length=0,K=!1,x=!0,r&&(Se(r),Oe(r)),(N=b.props.page)!=null&&N.url&&b.props.page.url.pathname!==t.pathname&&(t.pathname=(I=b.props.page)==null?void 0:I.url.pathname),l&&l.details){const{details:O}=l,F=O.replaceState?0:1;if(O.state[H]=T+=F,history[O.replaceState?"replaceState":"pushState"](O.state,"",t),!O.replaceState){let C=T+1;for(;ne[C]||Y[C];)delete ne[C],delete Y[C],C+=1}}if(m=null,$?(g=b.state,b.props.page&&(b.props.page.url=t),V.$set(b.props)):$e(b),l){const{scroll:O,keepfocus:F}=l,{activeElement:C}=document;if(yield he(),E){const u=t.hash&&document.getElementById(decodeURIComponent(t.hash.slice(1)));O?scrollTo(O.x,O.y):u?u.scrollIntoView():scrollTo(0,0)}const ue=document.activeElement!==C&&document.activeElement!==document.body;!F&&!ue&&(yield Re())}else yield he();E=!0,b.props.page&&(z=b.props.page),p&&p(),x=!1})}function $e(n){var r,l;g=n.state;const t=document.querySelector("style[data-sveltekit]");t&&t.remove(),z=n.props.page,V=new e.root({target:a,props:G(M({},n.props),{stores:J,components:f}),hydrate:!0}),Pe(T);const o={from:null,to:{params:g.params,route:{id:(l=(r=g.route)==null?void 0:r.id)!=null?l:null},url:new URL(location.href)},willUnload:!1,type:"enter"};y.after_navigate.forEach(c=>c(o)),$=!0}function Z(L){return A(this,arguments,function*({url:n,params:t,branch:o,status:r,error:l,route:c,form:p}){var N;let _="never";for(const I of o)(I==null?void 0:I.slash)!==void 0&&(_=I.slash);n.pathname=dt(n.pathname,_),n.search=n.search;const v={type:"loaded",state:{url:n,params:t,branch:o,error:l,route:c},props:{constructors:Dt(o).map(I=>I.node.component)}};p!==void 0&&(v.props.form=p);let k={},w=!z,b=0;for(let I=0;I<Math.max(o.length,g.branch.length);I+=1){const O=o[I],F=g.branch[I];(O==null?void 0:O.data)!==(F==null?void 0:F.data)&&(w=!0),O&&(k=M(M({},k),O.data),w&&(v.props[`data_${b}`]=k),b+=1)}return(!g.url||n.href!==g.url.href||g.error!==l||p!==void 0&&p!==z.form||w)&&(v.props.page={error:l,params:t,route:{id:(N=c==null?void 0:c.id)!=null?N:null},status:r,url:new URL(n),form:p!=null?p:null,data:w?k:z.data}),v})}function we(p){return A(this,arguments,function*({loader:n,parent:t,url:o,params:r,route:l,server_data_node:c}){var k,w,b,q,N,I,O;let L=null;const _={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1},v=yield n();if((k=v.universal)!=null&&k.load){let F=function(...u){for(const P of u){const{href:S}=new URL(P,o);_.dependencies.add(S)}},ue;const C={route:{get id(){return _.route=!0,l.id}},params:new Proxy(r,{get:(u,P)=>(_.params.add(P),u[P])}),data:(w=c==null?void 0:c.data)!=null?w:null,url:gt(o,()=>{_.url=!0}),fetch(u,P){return A(this,null,function*(){let S;u instanceof Request?(S=u.url,P=M({body:u.method==="GET"||u.method==="HEAD"?void 0:yield u.blob(),cache:u.cache,credentials:u.credentials,headers:u.headers,integrity:u.integrity,keepalive:u.keepalive,method:u.method,mode:u.mode,redirect:u.redirect,referrer:u.referrer,referrerPolicy:u.referrerPolicy,signal:u.signal},P)):S=u;const U=new URL(S,o);return F(U.href),U.origin===o.origin&&(S=U.href.slice(o.origin.length)),$?Et(S,U.href,P):vt(S,P)})},setHeaders:()=>{},depends:F,parent(){return _.parent=!0,t()}};L=(b=yield v.universal.load.call(null,C))!=null?b:null,L=L?yield Ot(L):null}return{node:v,loader:n,server:c,universal:(q=v.universal)!=null&&q.load?{type:"data",data:L,uses:_}:null,data:(N=L!=null?L:c==null?void 0:c.data)!=null?N:null,slash:(O=(I=v.universal)==null?void 0:I.trailingSlash)!=null?O:c==null?void 0:c.slash}})}function xe(n,t,o,r,l){if(K)return!0;if(!r)return!1;if(r.parent&&n||r.route&&t||r.url&&o)return!0;for(const c of r.params)if(l[c]!==g.params[c])return!0;for(const c of r.dependencies)if(R.some(p=>p(new URL(c))))return!0;return!1}function _e(n,t){return(n==null?void 0:n.type)==="data"?n:(n==null?void 0:n.type)==="skip"&&t!=null?t:null}function Te(c){return A(this,arguments,function*({id:n,invalidating:t,url:o,params:r,route:l}){var ue;if((m==null?void 0:m.id)===n)return m.promise;const{errors:p,layouts:L,leaf:_}=l,v=[...L,_];p.forEach(u=>u==null?void 0:u().catch(()=>{})),v.forEach(u=>u==null?void 0:u[1]().catch(()=>{}));let k=null;const w=g.url?n!==g.url.pathname+g.url.search:!1,b=g.route?l.id!==g.route.id:!1;let q=!1;const N=v.map((u,P)=>{var B;const S=g.branch[P],U=!!(u!=null&&u[0])&&((S==null?void 0:S.loader)!==u[1]||xe(q,b,w,(B=S.server)==null?void 0:B.uses,r));return U&&(q=!0),U});if(N.some(Boolean)){try{k=yield et(o,N)}catch(u){return ce({status:u instanceof re?u.status:500,error:yield te(u,{url:o,params:r,route:{id:l.id}}),url:o,route:l})}if(k.type==="redirect")return k}const I=k==null?void 0:k.nodes;let O=!1;const F=v.map((u,P)=>A(this,null,function*(){var be;if(!u)return;const S=g.branch[P],U=I==null?void 0:I[P];if((!U||U.type==="skip")&&u[1]===(S==null?void 0:S.loader)&&!xe(O,b,w,(be=S.universal)==null?void 0:be.uses,r))return S;if(O=!0,(U==null?void 0:U.type)==="error")throw U;return we({loader:u[1],url:o,params:r,route:l,parent:()=>A(this,null,function*(){var He;const Me={};for(let ve=0;ve<P;ve+=1)Object.assign(Me,(He=yield F[ve])==null?void 0:He.data);return Me}),server_data_node:_e(U===void 0&&u[0]?{type:"skip"}:U!=null?U:null,u[0]?S==null?void 0:S.server:void 0)})}));for(const u of F)u.catch(()=>{});const C=[];for(let u=0;u<v.length;u+=1)if(v[u])try{C.push(yield F[u])}catch(P){if(P instanceof Qe)return{type:"redirect",location:P.location};let S=500,U;if(I!=null&&I.includes(P))S=(ue=P.status)!=null?ue:S,U=P.error;else if(P instanceof re)S=P.status,U=P.body;else{if(yield J.updated.check())return yield ee(o);U=yield te(P,{params:r,url:o,route:{id:l.id}})}const B=yield De(u,C,p);return B?yield Z({url:o,params:r,branch:C.slice(0,B.idx).concat(B.node),status:S,error:U,route:l}):yield qe(o,{id:l.id},U,S)}else C.push(void 0);return yield Z({url:o,params:r,branch:C,status:200,error:null,route:l,form:t?void 0:null})})}function De(n,t,o){return A(this,null,function*(){for(;n--;)if(o[n]){let r=n;for(;!t[r];)r-=1;try{return{idx:r+1,node:{node:yield o[n](),loader:o[n],data:{},server:null,universal:null}}}catch(l){continue}}})}function ce(l){return A(this,arguments,function*({status:n,error:t,url:o,route:r}){var k;const c={};let p=null;if(e.server_loads[0]===0)try{const w=yield et(o,[!0]);if(w.type!=="data"||w.nodes[0]&&w.nodes[0].type!=="data")throw 0;p=(k=w.nodes[0])!=null?k:null}catch(w){(o.origin!==location.origin||o.pathname!==location.pathname||D)&&(yield ee(o))}const _=yield we({loader:s,url:o,params:c,route:r,parent:()=>Promise.resolve({}),server_data_node:_e(p)}),v={node:yield d(),loader:d,universal:null,server:null,data:null};return yield Z({url:o,params:c,branch:[_,v],status:n,error:t,route:null})})}function Q(n,t){if(We(n,W))return;const o=le(n);for(const r of i){const l=r.exec(o);if(l)return{id:n.pathname+n.search,invalidating:t,route:r,params:pt(l),url:n}}}function le(n){return ht(n.pathname.slice(W.length)||"/")}function Ce({url:n,type:t,intent:o,delta:r}){var L,_,v,k,w;let l=!1;const c={from:{params:g.params,route:{id:(_=(L=g.route)==null?void 0:L.id)!=null?_:null},url:g.url},to:{params:(v=o==null?void 0:o.params)!=null?v:null,route:{id:(w=(k=o==null?void 0:o.route)==null?void 0:k.id)!=null?w:null},url:n},willUnload:!o,type:t};r!==void 0&&(c.delta=r);const p=G(M({},c),{cancel:()=>{l=!0}});return j||y.before_navigate.forEach(b=>b(p)),l?null:c}function fe(k){return A(this,arguments,function*({url:n,scroll:t,keepfocus:o,redirect_chain:r,details:l,type:c,delta:p,nav_token:L,accepted:_,blocked:v}){const w=Q(n,!1),b=Ce({url:n,type:c,delta:p,intent:w});if(!b){v();return}const q=T;_(),j=!0,$&&J.navigating.set(b),yield Ne(w,n,r,q,{scroll:t,keepfocus:o,details:l},L,()=>{j=!1,y.after_navigate.forEach(N=>N(b)),J.navigating.set(null)})})}function qe(n,t,o,r){return A(this,null,function*(){return n.origin===location.origin&&n.pathname===location.pathname&&!D?yield ce({status:r,error:o,url:n,route:t}):yield ee(n)})}function ee(n){return location.href=n.href,new Promise(()=>{})}function st(){let n;h.addEventListener("mousemove",c=>{const p=c.target;clearTimeout(n),n=setTimeout(()=>{r(p,2)},20)});function t(c){r(c.composedPath()[0],1)}h.addEventListener("mousedown",t),h.addEventListener("touchstart",t,{passive:!0});const o=new IntersectionObserver(c=>{for(const p of c)p.isIntersecting&&(se(le(new URL(p.target.href))),o.unobserve(p.target))},{threshold:0});function r(c,p){const L=Ye(c,h);if(!L)return;const{url:_,external:v}=Ee(L,W);if(v)return;const k=pe(L);if(!k.reload)if(p<=k.preload_data){const w=Q(_,!1);w&&je(w)}else p<=k.preload_code&&se(le(_))}function l(){o.disconnect();for(const c of h.querySelectorAll("a")){const{url:p,external:L}=Ee(c,W);if(L)continue;const _=pe(c);_.reload||(_.preload_code===Xe.viewport&&o.observe(c),_.preload_code===Xe.eager&&se(le(p)))}}y.after_navigate.push(l),l()}function te(n,t){var o;return n instanceof re?n.body:(o=e.hooks.handleError({error:n,event:t}))!=null?o:{message:t.route.id!=null?"Internal Error":"Not Found"}}return{after_navigate:n=>{Be(()=>(y.after_navigate.push(n),()=>{const t=y.after_navigate.indexOf(n);y.after_navigate.splice(t,1)}))},before_navigate:n=>{Be(()=>(y.before_navigate.push(n),()=>{const t=y.before_navigate.indexOf(n);y.before_navigate.splice(t,1)}))},disable_scroll_handling:()=>{(x||!$)&&(E=!1)},goto:(n,t={})=>ye(n,t,[]),invalidate:n=>{if(typeof n=="function")R.push(n);else{const{href:t}=new URL(n,location.href);R.push(o=>o.href===t)}return Ae()},invalidateAll:()=>(K=!0,Ae()),preload_data:n=>A(this,null,function*(){const t=new URL(n,Ge(document)),o=Q(t,!1);if(!o)throw new Error(`Attempted to preload a URL that does not belong to this app: ${t}`);yield je(o)}),preload_code:se,apply_action:n=>A(this,null,function*(){var t;if(n.type==="error"){const o=new URL(location.href),{branch:r,route:l}=g;if(!l)return;const c=yield De(g.branch.length,r,l.errors);if(c){const p=yield Z({url:o,params:g.params,branch:r.slice(0,c.idx).concat(c.node),status:(t=n.status)!=null?t:500,error:n.error,route:l});g=p.state,V.$set(p.props),he().then(Re)}}else n.type==="redirect"?ye(n.location,{invalidateAll:!0},[]):(V.$set({form:null,page:G(M({},z),{form:n.data,status:n.status})}),yield he(),V.$set({form:n.data}),n.type==="success"&&Re())}),_start_router:()=>{var n;history.scrollRestoration="manual",addEventListener("beforeunload",t=>{var r,l;let o=!1;if(Ue(),!j){const c={from:{params:g.params,route:{id:(l=(r=g.route)==null?void 0:r.id)!=null?l:null},url:g.url},to:null,willUnload:!0,type:"leave",cancel:()=>o=!0};y.before_navigate.forEach(p=>p(c))}o?(t.preventDefault(),t.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Ue()}),(n=navigator.connection)!=null&&n.saveData||st(),h.addEventListener("click",t=>{if(t.button||t.which!==1||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.defaultPrevented)return;const o=Ye(t.composedPath()[0],h);if(!o)return;const{url:r,external:l,target:c}=Ee(o,W);if(!r)return;if(c==="_parent"||c==="_top"){if(window.parent!==window)return}else if(c&&c!=="_self")return;const p=pe(o);if(!(o instanceof SVGAElement)&&r.protocol!==location.protocol&&!(r.protocol==="https:"||r.protocol==="http:"))return;if(l||p.reload){Ce({url:r,type:"link"})?j=!0:t.preventDefault();return}const[_,v]=r.href.split("#");if(v!==void 0&&_===location.href.split("#")[0]){X=!0,Se(T),g.url=r,J.page.set(G(M({},z),{url:r})),J.page.notify();return}fe({url:r,scroll:p.noscroll?ae():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:r.href===location.href},accepted:()=>t.preventDefault(),blocked:()=>t.preventDefault(),type:"link"})}),h.addEventListener("submit",t=>{var w;if(t.defaultPrevented)return;const o=HTMLFormElement.prototype.cloneNode.call(t.target),r=t.submitter;if(((r==null?void 0:r.formMethod)||o.method)!=="get")return;const c=new URL((r==null?void 0:r.hasAttribute("formaction"))&&(r==null?void 0:r.formAction)||o.action);if(We(c,W))return;const p=t.target,{noscroll:L,reload:_}=pe(p);if(_)return;t.preventDefault(),t.stopPropagation();const v=new FormData(p),k=r==null?void 0:r.getAttribute("name");k&&v.append(k,(w=r==null?void 0:r.getAttribute("value"))!=null?w:""),c.search=new URLSearchParams(v).toString(),fe({url:c,scroll:L?ae():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:!1},nav_token:{},accepted:()=>{},blocked:()=>{},type:"form"})}),addEventListener("popstate",t=>A(this,null,function*(){var o;if((o=t.state)!=null&&o[H]){if(t.state[H]===T)return;const r=Y[t.state[H]];if(g.url.href.split("#")[0]===location.href.split("#")[0]){Y[T]=ae(),T=t.state[H],scrollTo(r.x,r.y);return}const l=t.state[H]-T;let c=!1;yield fe({url:new URL(location.href),scroll:r,keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{T=t.state[H]},blocked:()=>{history.go(-l),c=!0},type:"popstate",delta:l}),c||Pe(T)}})),addEventListener("hashchange",()=>{X&&(X=!1,history.replaceState(G(M({},history.state),{[H]:++T}),"",location.href))});for(const t of document.querySelectorAll("link"))t.rel==="icon"&&(t.href=t.href);addEventListener("pageshow",t=>{t.persisted&&J.navigating.set(null)})},_hydrate:L=>A(this,[L],function*({status:n=200,error:t,node_ids:o,params:r,route:l,data:c,form:p}){var k;D=!0;const _=new URL(location.href);({params:r={},route:l={id:null}}=Q(_,!1)||{});let v;try{const w=o.map((b,q)=>A(this,null,function*(){const N=c[q];return N!=null&&N.uses&&(N.uses=it(N.uses)),we({loader:e.nodes[b],url:_,params:r,route:l,parent:()=>A(this,null,function*(){const I={};for(let O=0;O<q;O+=1)Object.assign(I,(yield w[O]).data);return I}),server_data_node:_e(N)})}));v=yield Z({url:_,params:r,branch:yield Promise.all(w),status:n,error:t,form:p,route:(k=i.find(({id:b})=>b===l.id))!=null?k:null})}catch(w){if(w instanceof Qe){yield ee(new URL(w.location,location.href));return}v=yield ce({status:w instanceof re?w.status:500,error:yield te(w,{url:_,params:r,route:l}),url:_,route:l})}$e(v)})}}function et(e,a){return A(this,null,function*(){const i=new URL(e);i.pathname=_t(e.pathname),i.searchParams.append("x-sveltekit-invalidated",a.map(d=>d?"1":"").join("_"));const s=yield me(i.href);if(!s.ok)throw new re(s.status,yield s.json());return new Promise(d=>A(this,null,function*(){var g;const h=new Map,R=s.body.getReader(),f=new TextDecoder;function m(D){return Tt(D,{Promise:$=>new Promise((E,x)=>{h.set($,{fulfil:E,reject:x})})})}let y="";for(;;){const{done:D,value:$}=yield R.read();if(D&&!y)break;for(y+=!$&&y?`
`:f.decode($);;){const E=y.indexOf(`
`);if(E===-1)break;const x=JSON.parse(y.slice(0,E));if(y=y.slice(E+1),x.type==="redirect")return d(x);if(x.type==="data")(g=x.nodes)==null||g.forEach(j=>{(j==null?void 0:j.type)==="data"&&(j.uses=it(j.uses),j.data=m(j.data))}),d(x);else if(x.type==="chunk"){const{id:j,data:X,error:K}=x,V=h.get(j);h.delete(j),K?V.reject(m(K)):V.fulfil(m(X))}}}}))})}function it(e){var a,i;return{dependencies:new Set((a=e==null?void 0:e.dependencies)!=null?a:[]),params:new Set((i=e==null?void 0:e.params)!=null?i:[]),parent:!!(e!=null&&e.parent),route:!!(e!=null&&e.route),url:!!(e!=null&&e.url)}}function Re(){const e=document.querySelector("[autofocus]");if(e)e.focus();else{const a=document.body,i=a.getAttribute("tabindex");return a.tabIndex=-1,a.focus({preventScroll:!0}),i!==null?a.setAttribute("tabindex",i):a.removeAttribute("tabindex"),new Promise(s=>{setTimeout(()=>{var d;s((d=getSelection())==null?void 0:d.removeAllRanges())})})}}function Jt(e,a,i){return A(this,null,function*(){const s=Ct(e,a);ut({client:s}),i?yield s._hydrate(i):s.goto(location.href,{replaceState:!0}),s._start_router()})}export{Jt as start};