import{a as e,i as t,n,o as r,r as i,t as a}from"./phaser-h7GCY5wB.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var o=null,s=!1,c=1,l=null,u=Symbol(`SIGNAL`);function d(e){let t=o;return o=e,t}function f(){return o}var p={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:`unknown`,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function m(e){if(s)throw Error(``);if(o===null)return;o.consumerOnSignalRead(e);let t=o.producersTail;if(t!==void 0&&t.producer===e)return;let n,r=o.recomputing;if(r&&(n=t===void 0?o.producers:t.nextProducer,n!==void 0&&n.producer===e)){o.producersTail=n,n.lastReadVersion=e.version,n.knownValidAtEpoch=c;return}let i=e.consumersTail;if(i!==void 0&&i.consumer===o&&(!r||i.knownValidAtEpoch===c))return;let a=me(o),l={producer:e,consumer:o,nextProducer:n,prevConsumer:void 0,knownValidAtEpoch:c,lastReadVersion:e.version,nextConsumer:void 0};o.producersTail=l,t===void 0?o.producers=l:t.nextProducer=l,a&&fe(e,l)}function ee(){c++}function te(e){if(!(me(e)&&!e.dirty)&&!(!e.dirty&&e.lastCleanEpoch===c)){if(!e.producerMustRecompute(e)&&!ue(e)){ae(e);return}e.producerRecomputeValue(e),ae(e)}}function ne(e){if(e.consumers===void 0)return;let t=s;s=!0;try{for(let t=e.consumers;t!==void 0;t=t.nextConsumer){let e=t.consumer;e.dirty||ie(e)}}finally{s=t}}function re(){return o?.consumerAllowSignalWrites!==!1}function ie(e){e.dirty=!0,ne(e),e.consumerMarkedDirty?.(e)}function ae(e){e.dirty=!1,e.lastCleanEpoch=c}function oe(e){return e&&se(e),d(e)}function se(e){if(e.producersTail?.knownValidAtEpoch===c){let t=e.producers;for(;t!==void 0;)t.knownValidAtEpoch=null,t=t.nextProducer}e.producersTail=void 0,e.recomputing=!0}function ce(e,t){d(t),e&&le(e)}function le(e){e.recomputing=!1;let t=e.producersTail,n=t===void 0?e.producers:t.nextProducer;if(n!==void 0){if(me(e))do n=pe(n);while(n!==void 0);t===void 0?e.producers=void 0:t.nextProducer=void 0}}function ue(e){for(let t=e.producers;t!==void 0;t=t.nextProducer){let e=t.producer,n=t.lastReadVersion;if(n!==e.version||(te(e),n!==e.version))return!0}return!1}function de(e){if(me(e)){let t=e.producers;for(;t!==void 0;)t=pe(t)}e.producers=void 0,e.producersTail=void 0,e.consumers=void 0,e.consumersTail=void 0}function fe(e,t){let n=e.consumersTail,r=me(e);if(n===void 0?(t.nextConsumer=void 0,e.consumers=t):(t.nextConsumer=n.nextConsumer,n.nextConsumer=t),t.prevConsumer=n,e.consumersTail=t,!r)for(let t=e.producers;t!==void 0;t=t.nextProducer)fe(t.producer,t)}function pe(e){let t=e.producer,n=e.nextProducer,r=e.nextConsumer,i=e.prevConsumer;if(e.nextConsumer=void 0,e.prevConsumer=void 0,r===void 0?t.consumersTail=i:r.prevConsumer=i,i!==void 0)i.nextConsumer=r;else if(t.consumers=r,!me(t)){let e=t.producers;for(;e!==void 0;)e=pe(e)}return n}function me(e){return e.consumerIsAlwaysLive||e.consumers!==void 0}function he(e){l?.(e)}function ge(e,t){return Object.is(e,t)}function _e(e,t){let n=Object.create(xe);n.computation=e,t!==void 0&&(n.equal=t);let r=()=>{if(te(n),m(n),n.value===be)throw n.error;return n.value};return r[u]=n,he(n),r}var ve=Symbol(`UNSET`),ye=Symbol(`COMPUTING`),be=Symbol(`ERRORED`),xe={...p,value:ve,dirty:!0,error:null,equal:ge,kind:`computed`,producerMustRecompute(e){return e.value===ve||e.value===ye},producerRecomputeValue(e){if(e.value===ye)throw Error(``);let t=e.value;e.value=ye;let n=oe(e),r,i=!1;try{r=e.computation(),d(null),i=t!==ve&&t!==be&&r!==be&&e.equal(t,r)}catch(t){r=be,e.error=t}finally{ce(e,n)}if(i){e.value=t;return}e.value=r,e.version++}};function Se(){throw Error()}var Ce=Se;function we(e){Ce(e)}function Te(e){Ce=e}var Ee=null;function De(e,t){let n=Object.create(je);n.value=e,t!==void 0&&(n.equal=t);let r=()=>Oe(n);return r[u]=n,he(n),[r,e=>ke(n,e),e=>Ae(n,e)]}function Oe(e){return m(e),e.value}function ke(e,t){re()||we(e),e.equal(e.value,t)||(e.value=t,Me(e))}function Ae(e,t){re()||we(e),ke(e,t(e.value))}var je={...p,equal:ge,value:void 0,kind:`signal`};function Me(e){e.version++,ee(),ne(e),Ee?.(e)}var Ne={...p,consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,kind:`effect`};function Pe(e){if(e.dirty=!1,e.version>0&&!ue(e))return;e.version++;let t=oe(e);try{e.cleanup(),e.fn()}finally{ce(e,t)}}var Fe=void 0;function Ie(){return Fe}function Le(e){let t=Fe;return Fe=e,t}var Re=Symbol(`NotFound`);function ze(e){return e===Re||e?.name===`ɵNotFound`}var Be=function(e,t){return Be=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},Be(e,t)};function Ve(e,t){if(typeof t!=`function`&&t!==null)throw TypeError(`Class extends value `+String(t)+` is not a constructor or null`);Be(e,t);function n(){this.constructor=e}e.prototype=t===null?Object.create(t):(n.prototype=t.prototype,new n)}function He(e,t,n,r){function i(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||=Promise)(function(n,a){function o(e){try{c(r.next(e))}catch(e){a(e)}}function s(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){e.done?n(e.value):i(e.value).then(o,s)}c((r=r.apply(e,t||[])).next())})}function Ue(e,t){var n={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},r,i,a,o=Object.create((typeof Iterator==`function`?Iterator:Object).prototype);return o.next=s(0),o.throw=s(1),o.return=s(2),typeof Symbol==`function`&&(o[Symbol.iterator]=function(){return this}),o;function s(e){return function(t){return c([e,t])}}function c(s){if(r)throw TypeError(`Generator is already executing.`);for(;o&&(o=0,s[0]&&(n=0)),n;)try{if(r=1,i&&(a=s[0]&2?i.return:s[0]?i.throw||((a=i.return)&&a.call(i),0):i.next)&&!(a=a.call(i,s[1])).done)return a;switch(i=0,a&&(s=[s[0]&2,a.value]),s[0]){case 0:case 1:a=s;break;case 4:return n.label++,{value:s[1],done:!1};case 5:n.label++,i=s[1],s=[0];continue;case 7:s=n.ops.pop(),n.trys.pop();continue;default:if((a=n.trys,!(a=a.length>0&&a[a.length-1]))&&(s[0]===6||s[0]===2)){n=0;continue}if(s[0]===3&&(!a||s[1]>a[0]&&s[1]<a[3])){n.label=s[1];break}if(s[0]===6&&n.label<a[1]){n.label=a[1],a=s;break}if(a&&n.label<a[2]){n.label=a[2],n.ops.push(s);break}a[2]&&n.ops.pop(),n.trys.pop();continue}s=t.call(e,n)}catch(e){s=[6,e],i=0}finally{r=a=0}if(s[0]&5)throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}}function We(e){var t=typeof Symbol==`function`&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&typeof e.length==`number`)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw TypeError(t?`Object is not iterable.`:`Symbol.iterator is not defined.`)}function Ge(e,t){var n=typeof Symbol==`function`&&e[Symbol.iterator];if(!n)return e;var r=n.call(e),i,a=[],o;try{for(;(t===void 0||t-->0)&&!(i=r.next()).done;)a.push(i.value)}catch(e){o={error:e}}finally{try{i&&!i.done&&(n=r.return)&&n.call(r)}finally{if(o)throw o.error}}return a}function Ke(e,t,n){if(n||arguments.length===2)for(var r=0,i=t.length,a;r<i;r++)(a||!(r in t))&&(a||=Array.prototype.slice.call(t,0,r),a[r]=t[r]);return e.concat(a||Array.prototype.slice.call(t))}function qe(e){return this instanceof qe?(this.v=e,this):new qe(e)}function Je(e,t,n){if(!Symbol.asyncIterator)throw TypeError(`Symbol.asyncIterator is not defined.`);var r=n.apply(e,t||[]),i,a=[];return i=Object.create((typeof AsyncIterator==`function`?AsyncIterator:Object).prototype),s(`next`),s(`throw`),s(`return`,o),i[Symbol.asyncIterator]=function(){return this},i;function o(e){return function(t){return Promise.resolve(t).then(e,d)}}function s(e,t){r[e]&&(i[e]=function(t){return new Promise(function(n,r){a.push([e,t,n,r])>1||c(e,t)})},t&&(i[e]=t(i[e])))}function c(e,t){try{l(r[e](t))}catch(e){f(a[0][3],e)}}function l(e){e.value instanceof qe?Promise.resolve(e.value.v).then(u,d):f(a[0][2],e)}function u(e){c(`next`,e)}function d(e){c(`throw`,e)}function f(e,t){e(t),a.shift(),a.length&&c(a[0][0],a[0][1])}}function Ye(e){if(!Symbol.asyncIterator)throw TypeError(`Symbol.asyncIterator is not defined.`);var t=e[Symbol.asyncIterator],n;return t?t.call(e):(e=typeof We==`function`?We(e):e[Symbol.iterator](),n={},r(`next`),r(`throw`),r(`return`),n[Symbol.asyncIterator]=function(){return this},n);function r(t){n[t]=e[t]&&function(n){return new Promise(function(r,a){n=e[t](n),i(r,a,n.done,n.value)})}}function i(e,t,n,r){Promise.resolve(r).then(function(t){e({value:t,done:n})},t)}}function h(e){return typeof e==`function`}function Xe(e){var t=e(function(e){Error.call(e),e.stack=Error().stack});return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var Ze=Xe(function(e){return function(t){e(this),this.message=t?t.length+` errors occurred during unsubscription:
`+t.map(function(e,t){return t+1+`) `+e.toString()}).join(`
  `):``,this.name=`UnsubscriptionError`,this.errors=t}});function Qe(e,t){if(e){var n=e.indexOf(t);0<=n&&e.splice(n,1)}}var $e=function(){function e(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}return e.prototype.unsubscribe=function(){var e,t,n,r,i;if(!this.closed){this.closed=!0;var a=this._parentage;if(a)if(this._parentage=null,Array.isArray(a))try{for(var o=We(a),s=o.next();!s.done;s=o.next())s.value.remove(this)}catch(t){e={error:t}}finally{try{s&&!s.done&&(t=o.return)&&t.call(o)}finally{if(e)throw e.error}}else a.remove(this);var c=this.initialTeardown;if(h(c))try{c()}catch(e){i=e instanceof Ze?e.errors:[e]}var l=this._finalizers;if(l){this._finalizers=null;try{for(var u=We(l),d=u.next();!d.done;d=u.next()){var f=d.value;try{nt(f)}catch(e){i??=[],e instanceof Ze?i=Ke(Ke([],Ge(i)),Ge(e.errors)):i.push(e)}}}catch(e){n={error:e}}finally{try{d&&!d.done&&(r=u.return)&&r.call(u)}finally{if(n)throw n.error}}}if(i)throw new Ze(i)}},e.prototype.add=function(t){if(t&&t!==this)if(this.closed)nt(t);else{if(t instanceof e){if(t.closed||t._hasParent(this))return;t._addParent(this)}(this._finalizers=this._finalizers??[]).push(t)}},e.prototype._hasParent=function(e){var t=this._parentage;return t===e||Array.isArray(t)&&t.includes(e)},e.prototype._addParent=function(e){var t=this._parentage;this._parentage=Array.isArray(t)?(t.push(e),t):t?[t,e]:e},e.prototype._removeParent=function(e){var t=this._parentage;t===e?this._parentage=null:Array.isArray(t)&&Qe(t,e)},e.prototype.remove=function(t){var n=this._finalizers;n&&Qe(n,t),t instanceof e&&t._removeParent(this)},e.EMPTY=(function(){var t=new e;return t.closed=!0,t})(),e}(),et=$e.EMPTY;function tt(e){return e instanceof $e||e&&`closed`in e&&h(e.remove)&&h(e.add)&&h(e.unsubscribe)}function nt(e){h(e)?e():e.unsubscribe()}var rt={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1},it={setTimeout:function(e,t){var n=[...arguments].slice(2),r=it.delegate;return r?.setTimeout?r.setTimeout.apply(r,Ke([e,t],Ge(n))):setTimeout.apply(void 0,Ke([e,t],Ge(n)))},clearTimeout:function(e){return(it.delegate?.clearTimeout||clearTimeout)(e)},delegate:void 0};function at(e){it.setTimeout(function(){var t=rt.onUnhandledError;if(t)t(e);else throw e})}function ot(){}var st=(function(){return ut(`C`,void 0,void 0)})();function ct(e){return ut(`E`,void 0,e)}function lt(e){return ut(`N`,e,void 0)}function ut(e,t,n){return{kind:e,value:t,error:n}}var dt=null;function ft(e){if(rt.useDeprecatedSynchronousErrorHandling){var t=!dt;if(t&&(dt={errorThrown:!1,error:null}),e(),t){var n=dt,r=n.errorThrown,i=n.error;if(dt=null,r)throw i}}else e()}function pt(e){rt.useDeprecatedSynchronousErrorHandling&&dt&&(dt.errorThrown=!0,dt.error=e)}var mt=function(e){Ve(t,e);function t(t){var n=e.call(this)||this;return n.isStopped=!1,t?(n.destination=t,tt(t)&&t.add(n)):n.destination=St,n}return t.create=function(e,t,n){return new vt(e,t,n)},t.prototype.next=function(e){this.isStopped?xt(lt(e),this):this._next(e)},t.prototype.error=function(e){this.isStopped?xt(ct(e),this):(this.isStopped=!0,this._error(e))},t.prototype.complete=function(){this.isStopped?xt(st,this):(this.isStopped=!0,this._complete())},t.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,e.prototype.unsubscribe.call(this),this.destination=null)},t.prototype._next=function(e){this.destination.next(e)},t.prototype._error=function(e){try{this.destination.error(e)}finally{this.unsubscribe()}},t.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},t}($e),ht=Function.prototype.bind;function gt(e,t){return ht.call(e,t)}var _t=function(){function e(e){this.partialObserver=e}return e.prototype.next=function(e){var t=this.partialObserver;if(t.next)try{t.next(e)}catch(e){yt(e)}},e.prototype.error=function(e){var t=this.partialObserver;if(t.error)try{t.error(e)}catch(e){yt(e)}else yt(e)},e.prototype.complete=function(){var e=this.partialObserver;if(e.complete)try{e.complete()}catch(e){yt(e)}},e}(),vt=function(e){Ve(t,e);function t(t,n,r){var i=e.call(this)||this,a;if(h(t)||!t)a={next:t??void 0,error:n??void 0,complete:r??void 0};else{var o;i&&rt.useDeprecatedNextContext?(o=Object.create(t),o.unsubscribe=function(){return i.unsubscribe()},a={next:t.next&&gt(t.next,o),error:t.error&&gt(t.error,o),complete:t.complete&&gt(t.complete,o)}):a=t}return i.destination=new _t(a),i}return t}(mt);function yt(e){rt.useDeprecatedSynchronousErrorHandling?pt(e):at(e)}function bt(e){throw e}function xt(e,t){var n=rt.onStoppedNotification;n&&it.setTimeout(function(){return n(e,t)})}var St={closed:!0,next:ot,error:bt,complete:ot},Ct=(function(){return typeof Symbol==`function`&&Symbol.observable||`@@observable`})();function wt(e){return e}function Tt(e){return e.length===0?wt:e.length===1?e[0]:function(t){return e.reduce(function(e,t){return t(e)},t)}}var g=function(){function e(e){e&&(this._subscribe=e)}return e.prototype.lift=function(t){var n=new e;return n.source=this,n.operator=t,n},e.prototype.subscribe=function(e,t,n){var r=this,i=Ot(e)?e:new vt(e,t,n);return ft(function(){var e=r,t=e.operator,n=e.source;i.add(t?t.call(i,n):n?r._subscribe(i):r._trySubscribe(i))}),i},e.prototype._trySubscribe=function(e){try{return this._subscribe(e)}catch(t){e.error(t)}},e.prototype.forEach=function(e,t){var n=this;return t=Et(t),new t(function(t,r){var i=new vt({next:function(t){try{e(t)}catch(e){r(e),i.unsubscribe()}},error:r,complete:t});n.subscribe(i)})},e.prototype._subscribe=function(e){return this.source?.subscribe(e)},e.prototype[Ct]=function(){return this},e.prototype.pipe=function(){return Tt([...arguments])(this)},e.prototype.toPromise=function(e){var t=this;return e=Et(e),new e(function(e,n){var r;t.subscribe(function(e){return r=e},function(e){return n(e)},function(){return e(r)})})},e.create=function(t){return new e(t)},e}();function Et(e){return e??rt.Promise??Promise}function Dt(e){return e&&h(e.next)&&h(e.error)&&h(e.complete)}function Ot(e){return e&&e instanceof mt||Dt(e)&&tt(e)}function kt(e){return h(e?.lift)}function At(e){return function(t){if(kt(t))return t.lift(function(t){try{return e(t,this)}catch(e){this.error(e)}});throw TypeError(`Unable to lift unknown Observable type`)}}function jt(e,t,n,r,i){return new Mt(e,t,n,r,i)}var Mt=function(e){Ve(t,e);function t(t,n,r,i,a,o){var s=e.call(this,t)||this;return s.onFinalize=a,s.shouldUnsubscribe=o,s._next=n?function(e){try{n(e)}catch(e){t.error(e)}}:e.prototype._next,s._error=i?function(e){try{i(e)}catch(e){t.error(e)}finally{this.unsubscribe()}}:e.prototype._error,s._complete=r?function(){try{r()}catch(e){t.error(e)}finally{this.unsubscribe()}}:e.prototype._complete,s}return t.prototype.unsubscribe=function(){var t;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){var n=this.closed;e.prototype.unsubscribe.call(this),!n&&((t=this.onFinalize)==null||t.call(this))}},t}(mt),Nt=Xe(function(e){return function(){e(this),this.name=`ObjectUnsubscribedError`,this.message=`object unsubscribed`}}),Pt=function(e){Ve(t,e);function t(){var t=e.call(this)||this;return t.closed=!1,t.currentObservers=null,t.observers=[],t.isStopped=!1,t.hasError=!1,t.thrownError=null,t}return t.prototype.lift=function(e){var t=new Ft(this,this);return t.operator=e,t},t.prototype._throwIfClosed=function(){if(this.closed)throw new Nt},t.prototype.next=function(e){var t=this;ft(function(){var n,r;if(t._throwIfClosed(),!t.isStopped){t.currentObservers||=Array.from(t.observers);try{for(var i=We(t.currentObservers),a=i.next();!a.done;a=i.next())a.value.next(e)}catch(e){n={error:e}}finally{try{a&&!a.done&&(r=i.return)&&r.call(i)}finally{if(n)throw n.error}}}})},t.prototype.error=function(e){var t=this;ft(function(){if(t._throwIfClosed(),!t.isStopped){t.hasError=t.isStopped=!0,t.thrownError=e;for(var n=t.observers;n.length;)n.shift().error(e)}})},t.prototype.complete=function(){var e=this;ft(function(){if(e._throwIfClosed(),!e.isStopped){e.isStopped=!0;for(var t=e.observers;t.length;)t.shift().complete()}})},t.prototype.unsubscribe=function(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null},Object.defineProperty(t.prototype,"observed",{get:function(){return this.observers?.length>0},enumerable:!1,configurable:!0}),t.prototype._trySubscribe=function(t){return this._throwIfClosed(),e.prototype._trySubscribe.call(this,t)},t.prototype._subscribe=function(e){return this._throwIfClosed(),this._checkFinalizedStatuses(e),this._innerSubscribe(e)},t.prototype._innerSubscribe=function(e){var t=this,n=this,r=n.hasError,i=n.isStopped,a=n.observers;return r||i?et:(this.currentObservers=null,a.push(e),new $e(function(){t.currentObservers=null,Qe(a,e)}))},t.prototype._checkFinalizedStatuses=function(e){var t=this,n=t.hasError,r=t.thrownError,i=t.isStopped;n?e.error(r):i&&e.complete()},t.prototype.asObservable=function(){var e=new g;return e.source=this,e},t.create=function(e,t){return new Ft(e,t)},t}(g),Ft=function(e){Ve(t,e);function t(t,n){var r=e.call(this)||this;return r.destination=t,r.source=n,r}return t.prototype.next=function(e){var t,n;(n=(t=this.destination)?.next)==null||n.call(t,e)},t.prototype.error=function(e){var t,n;(n=(t=this.destination)?.error)==null||n.call(t,e)},t.prototype.complete=function(){var e,t;(t=(e=this.destination)?.complete)==null||t.call(e)},t.prototype._subscribe=function(e){return this.source?.subscribe(e)??et},t}(Pt),It=function(e){Ve(t,e);function t(t){var n=e.call(this)||this;return n._value=t,n}return Object.defineProperty(t.prototype,"value",{get:function(){return this.getValue()},enumerable:!1,configurable:!0}),t.prototype._subscribe=function(t){var n=e.prototype._subscribe.call(this,t);return!n.closed&&t.next(this._value),n},t.prototype.getValue=function(){var e=this,t=e.hasError,n=e.thrownError,r=e._value;if(t)throw n;return this._throwIfClosed(),r},t.prototype.next=function(t){e.prototype.next.call(this,this._value=t)},t}(Pt),Lt=new g(function(e){return e.complete()});function Rt(e){return e&&h(e.schedule)}function zt(e){return e[e.length-1]}function Bt(e){return Rt(zt(e))?e.pop():void 0}function Vt(e,t){return typeof zt(e)==`number`?e.pop():t}var Ht=(function(e){return e&&typeof e.length==`number`&&typeof e!=`function`});function Ut(e){return h(e?.then)}function Wt(e){return h(e[Ct])}function Gt(e){return Symbol.asyncIterator&&h(e?.[Symbol.asyncIterator])}function Kt(e){return TypeError(`You provided `+(typeof e==`object`&&e?`an invalid object`:`'`+e+`'`)+` where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function qt(){return typeof Symbol!=`function`||!Symbol.iterator?`@@iterator`:Symbol.iterator}var Jt=qt();function Yt(e){return h(e?.[Jt])}function Xt(e){return Je(this,arguments,function(){var t,n,r,i;return Ue(this,function(a){switch(a.label){case 0:t=e.getReader(),a.label=1;case 1:a.trys.push([1,,9,10]),a.label=2;case 2:return[4,qe(t.read())];case 3:return n=a.sent(),r=n.value,i=n.done,i?[4,qe(void 0)]:[3,5];case 4:return[2,a.sent()];case 5:return[4,qe(r)];case 6:return[4,a.sent()];case 7:return a.sent(),[3,2];case 8:return[3,10];case 9:return t.releaseLock(),[7];case 10:return[2]}})})}function Zt(e){return h(e?.getReader)}function Qt(e){if(e instanceof g)return e;if(e!=null){if(Wt(e))return $t(e);if(Ht(e))return en(e);if(Ut(e))return tn(e);if(Gt(e))return rn(e);if(Yt(e))return nn(e);if(Zt(e))return an(e)}throw Kt(e)}function $t(e){return new g(function(t){var n=e[Ct]();if(h(n.subscribe))return n.subscribe(t);throw TypeError(`Provided object does not correctly implement Symbol.observable`)})}function en(e){return new g(function(t){for(var n=0;n<e.length&&!t.closed;n++)t.next(e[n]);t.complete()})}function tn(e){return new g(function(t){e.then(function(e){t.closed||(t.next(e),t.complete())},function(e){return t.error(e)}).then(null,at)})}function nn(e){return new g(function(t){var n,r;try{for(var i=We(e),a=i.next();!a.done;a=i.next()){var o=a.value;if(t.next(o),t.closed)return}}catch(e){n={error:e}}finally{try{a&&!a.done&&(r=i.return)&&r.call(i)}finally{if(n)throw n.error}}t.complete()})}function rn(e){return new g(function(t){on(e,t).catch(function(e){return t.error(e)})})}function an(e){return rn(Xt(e))}function on(e,t){var n,r,i,a;return He(this,void 0,void 0,function(){var o,s;return Ue(this,function(c){switch(c.label){case 0:c.trys.push([0,5,6,11]),n=Ye(e),c.label=1;case 1:return[4,n.next()];case 2:if(r=c.sent(),r.done)return[3,4];if(o=r.value,t.next(o),t.closed)return[2];c.label=3;case 3:return[3,1];case 4:return[3,11];case 5:return s=c.sent(),i={error:s},[3,11];case 6:return c.trys.push([6,,9,10]),r&&!r.done&&(a=n.return)?[4,a.call(n)]:[3,8];case 7:c.sent(),c.label=8;case 8:return[3,10];case 9:if(i)throw i.error;return[7];case 10:return[7];case 11:return t.complete(),[2]}})})}function sn(e,t,n,r,i){r===void 0&&(r=0),i===void 0&&(i=!1);var a=t.schedule(function(){n(),i?e.add(this.schedule(null,r)):this.unsubscribe()},r);if(e.add(a),!i)return a}function cn(e,t){return t===void 0&&(t=0),At(function(n,r){n.subscribe(jt(r,function(n){return sn(r,e,function(){return r.next(n)},t)},function(){return sn(r,e,function(){return r.complete()},t)},function(n){return sn(r,e,function(){return r.error(n)},t)}))})}function ln(e,t){return t===void 0&&(t=0),At(function(n,r){r.add(e.schedule(function(){return n.subscribe(r)},t))})}function un(e,t){return Qt(e).pipe(ln(t),cn(t))}function dn(e,t){return Qt(e).pipe(ln(t),cn(t))}function fn(e,t){return new g(function(n){var r=0;return t.schedule(function(){r===e.length?n.complete():(n.next(e[r++]),n.closed||this.schedule())})})}function pn(e,t){return new g(function(n){var r;return sn(n,t,function(){r=e[Jt](),sn(n,t,function(){var e,t,i;try{e=r.next(),t=e.value,i=e.done}catch(e){n.error(e);return}i?n.complete():n.next(t)},0,!0)}),function(){return h(r?.return)&&r.return()}})}function mn(e,t){if(!e)throw Error(`Iterable cannot be null`);return new g(function(n){sn(n,t,function(){var r=e[Symbol.asyncIterator]();sn(n,t,function(){r.next().then(function(e){e.done?n.complete():n.next(e.value)})},0,!0)})})}function hn(e,t){return mn(Xt(e),t)}function gn(e,t){if(e!=null){if(Wt(e))return un(e,t);if(Ht(e))return fn(e,t);if(Ut(e))return dn(e,t);if(Gt(e))return mn(e,t);if(Yt(e))return pn(e,t);if(Zt(e))return hn(e,t)}throw Kt(e)}function _n(e,t){return t?gn(e,t):Qt(e)}function vn(e,t){return At(function(n,r){var i=0;n.subscribe(jt(r,function(n){r.next(e.call(t,n,i++))}))})}function yn(e,t,n,r,i,a,o,s){var c=[],l=0,u=0,d=!1,f=function(){d&&!c.length&&!l&&t.complete()},p=function(e){return l<r?m(e):c.push(e)},m=function(e){a&&t.next(e),l++;var s=!1;Qt(n(e,u++)).subscribe(jt(t,function(e){i?.(e),a?p(e):t.next(e)},function(){s=!0},void 0,function(){if(s)try{l--;for(var e=function(){var e=c.shift();o?sn(t,o,function(){return m(e)}):m(e)};c.length&&l<r;)e();f()}catch(e){t.error(e)}}))};return e.subscribe(jt(t,p,function(){d=!0,f()})),function(){s?.()}}function bn(e,t,n){return n===void 0&&(n=1/0),h(t)?bn(function(n,r){return vn(function(e,i){return t(n,e,r,i)})(Qt(e(n,r)))},n):(typeof t==`number`&&(n=t),At(function(t,r){return yn(t,r,e,n)}))}function xn(e){return e===void 0&&(e=1/0),bn(wt,e)}function Sn(){var e=[...arguments],t=Bt(e),n=Vt(e,1/0),r=e;return r.length?r.length===1?Qt(r[0]):xn(n)(_n(r,t)):Lt}var Cn=`https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss`,_=class extends Error{code;constructor(e,t){super(Tn(e,t)),this.code=e}};function wn(e){return`NG0${Math.abs(e)}`}function Tn(e,t){return`${wn(e)}${t?`: `+t:``}`}function v(e){for(let t in e)if(e[t]===v)return t;throw Error(``)}function En(e){if(typeof e==`string`)return e;if(Array.isArray(e))return`[${e.map(En).join(`, `)}]`;if(e==null)return``+e;let t=e.overriddenName||e.name;if(t)return`${t}`;let n=e.toString();if(n==null)return``+n;let r=n.indexOf(`
`);return r>=0?n.slice(0,r):n}function Dn(e,t){return e?t?`${e} ${t}`:e:t||``}var On=v({__forward_ref__:v});function kn(e){return e.__forward_ref__=kn,e}function An(e){return jn(e)?e():e}function jn(e){return typeof e==`function`&&e.hasOwnProperty(On)&&e.__forward_ref__===kn}function y(e){return{token:e.token,providedIn:e.providedIn||null,factory:e.factory,value:void 0}}function Mn(e){return Nn(e,In)}function Nn(e,t){return e.hasOwnProperty(t)&&e[t]||null}function Pn(e){return(e?.[In]??null)||null}function Fn(e){return e&&e.hasOwnProperty(Ln)?e[Ln]:null}var In=v({ɵprov:v}),Ln=v({ɵinj:v}),b=class{_desc;ngMetadataName=`InjectionToken`;ɵprov;constructor(e,t){this._desc=e,this.ɵprov=void 0,typeof t==`number`?this.__NG_ELEMENT_ID__=t:t!==void 0&&(this.ɵprov=y({token:this,providedIn:t.providedIn||`root`,factory:t.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function Rn(e){return e&&!!e.ɵproviders}var zn=v({ɵcmp:v}),Bn=v({ɵdir:v}),Vn=v({ɵpipe:v}),Hn=v({ɵfac:v}),Un=v({__NG_ELEMENT_ID__:v}),Wn=v({__NG_ENV_ID__:v});function Gn(e){return Jn(e,`@Component`),e[zn]||null}function Kn(e){return Jn(e,`@Directive`),e[Bn]||null}function qn(e){return Jn(e,`@Pipe`),e[Vn]||null}function Jn(e,t){if(e==null)throw new _(-919,!1)}function Yn(e){return typeof e==`string`?e:e==null?``:String(e)}var Xn=v({ngErrorCode:v}),Zn=v({ngErrorMessage:v}),Qn=v({ngTokenPath:v});function $n(e,t){return tr(``,-200,t)}function er(e,t){throw new _(-201,!1)}function tr(e,t,n){let r=new _(t,e);return r[Xn]=t,r[Zn]=e,n&&(r[Qn]=n),r}function nr(e){return e[Xn]}var rr;function ir(){return rr}function x(e){let t=rr;return rr=e,t}function ar(e,t,n){let r=Mn(e);if(r&&r.providedIn==`root`)return r.value===void 0?r.value=r.factory():r.value;if(n&8)return null;if(t!==void 0)return t;er(e,``)}var or={},sr=`__NG_DI_FLAG__`,cr=class{injector;constructor(e){this.injector=e}retrieve(e,t){let n=ur(t)||0;try{return this.injector.get(e,n&8?null:or,n)}catch(e){if(ze(e))return e;throw e}}};function lr(e,t=0){let n=Ie();if(n===void 0)throw new _(-203,!1);if(n===null)return ar(e,void 0,t);{let r=dr(t),i=n.retrieve(e,r);if(ze(i)){if(r.optional)return null;throw i}return i}}function S(e,t=0){return(ir()||lr)(An(e),t)}function C(e,t){return S(e,ur(t))}function ur(e){return e===void 0||typeof e==`number`?e:0|(e.optional&&8)|(e.host&&1)|(e.self&&2)|(e.skipSelf&&4)}function dr(e){return{optional:!!(e&8),host:!!(e&1),self:!!(e&2),skipSelf:!!(e&4)}}function fr(e){let t=[];for(let n=0;n<e.length;n++){let r=An(e[n]);if(Array.isArray(r)){if(r.length===0)throw new _(900,!1);let e,n=0;for(let t=0;t<r.length;t++){let i=r[t],a=pr(i);typeof a==`number`?a===-1?e=i.token:n|=a:e=i}t.push(S(e,n))}else t.push(S(r))}return t}function pr(e){return e[sr]}function mr(e,t){return e.hasOwnProperty(Hn)?e[Hn]:null}function hr(e,t){e.forEach(e=>Array.isArray(e)?hr(e,t):t(e))}function gr(e,t,n){t>=e.length?e.push(n):e.splice(t,0,n)}function _r(e,t){return t>=e.length-1?e.pop():e.splice(t,1)[0]}function vr(e,t,n,r){let i=e.length;if(i==t)e.push(n,r);else if(i===1)e.push(r,e[0]),e[0]=n;else{for(i--,e.push(e[i-1],e[i]);i>t;)e[i]=e[i-2],i--;e[t]=n,e[t+1]=r}}function yr(e,t,n){let r=xr(e,t);return r>=0?e[r|1]=n:(r=~r,vr(e,r,t,n)),r}function br(e,t){let n=xr(e,t);if(n>=0)return e[n|1]}function xr(e,t){return Sr(e,t,1)}function Sr(e,t,n){let r=0,i=e.length>>n;for(;i!==r;){let a=r+(i-r>>1),o=e[a<<n];if(t===o)return a<<n;o>t?i=a:r=a+1}return~(i<<n)}var Cr={},wr=[],Tr=new b(``),Er=new b(``,-1),Dr=new b(``),Or=class{get(e,t=or){if(t===or){let e=tr(``,-201);throw e.name=`ɵNotFound`,e}return t}};function kr(e){return{ɵproviders:e}}function Ar(...e){return{ɵproviders:jr(!0,e),ɵfromNgModule:!0}}function jr(e,...t){let n=[],r=new Set,i,a=e=>{n.push(e)};return hr(t,e=>{let t=e;Nr(t,a,[],r)&&(i||=[],i.push(t))}),i!==void 0&&Mr(i,a),n}function Mr(e,t){for(let n=0;n<e.length;n++){let{ngModule:r,providers:i}=e[n];Pr(i,e=>{t(e,r)})}}function Nr(e,t,n,r){if(e=An(e),!e)return!1;let i=null,a=Fn(e),o=!a&&Gn(e);if(!a&&!o){let t=e.ngModule;if(a=Fn(t),a)i=t;else return!1}else if(o&&!o.standalone)return!1;else i=e;let s=r.has(i);if(o){if(s)return!1;if(r.add(i),o.dependencies){let e=typeof o.dependencies==`function`?o.dependencies():o.dependencies;for(let i of e)Nr(i,t,n,r)}}else if(a){if(a.imports!=null&&!s){r.add(i);let e;try{hr(a.imports,i=>{Nr(i,t,n,r)&&(e||=[],e.push(i))})}finally{}e!==void 0&&Mr(e,t)}if(!s){let e=mr(i)||(()=>new i);t({provide:i,useFactory:e,deps:wr},i),t({provide:Dr,useValue:i,multi:!0},i),t({provide:Tr,useValue:()=>S(i),multi:!0},i)}let o=a.providers;if(o!=null&&!s){let n=e;Pr(o,e=>{t(e,n)})}}else return!1;return i!==e&&e.providers!==void 0}function Pr(e,t){for(let n of e)Rn(n)&&(n=n.ɵproviders),Array.isArray(n)?Pr(n,t):t(n)}var Fr=v({provide:String,useValue:v});function Ir(e){return typeof e==`object`&&!!e&&Fr in e}function Lr(e){return!!(e&&e.useExisting)}function Rr(e){return!!(e&&e.useFactory)}function zr(e){return typeof e==`function`}var Br=new b(``),Vr={},Hr={},Ur=void 0;function Wr(){return Ur===void 0&&(Ur=new Or),Ur}var Gr=class{},Kr=class extends Gr{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(e,t,n,r){super(),this.parent=t,this.source=n,this.scopes=r,ni(e,e=>this.processProvider(e)),this.records.set(Er,Qr(void 0,this)),r.has(`environment`)&&this.records.set(Gr,Qr(void 0,this));let i=this.records.get(Br);i!=null&&typeof i.value==`string`&&this.scopes.add(i.value),this.injectorDefTypes=new Set(this.get(Dr,wr,{self:!0}))}retrieve(e,t){let n=ur(t)||0;try{return this.get(e,or,n)}catch(e){if(ze(e))return e;throw e}}destroy(){Zr(this),this._destroyed=!0;let e=d(null);try{for(let e of this._ngOnDestroyHooks)e.ngOnDestroy();let e=this._onDestroyHooks;this._onDestroyHooks=[];for(let t of e)t()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),d(e)}}onDestroy(e){return Zr(this),this._onDestroyHooks.push(e),()=>this.removeOnDestroy(e)}runInContext(e){Zr(this);let t=Le(this),n=x(void 0);try{return e()}finally{Le(t),x(n)}}get(e,t=or,n){if(Zr(this),e.hasOwnProperty(Wn))return e[Wn](this);let r=ur(n),i=Le(this),a=x(void 0);try{if(!(r&4)){let t=this.records.get(e);if(t===void 0){let n=ti(e)&&Mn(e);t=n&&this.injectableDefInScope(n)?Qr(qr(e),Vr):null,this.records.set(e,t)}if(t!=null)return this.hydrate(e,t,r)}let n=r&2?Wr():this.parent;return t=r&8&&t===or?null:t,n.get(e,t)}catch(e){let t=nr(e);throw t===-200||t===-201?new _(t,null):e}finally{x(a),Le(i)}}resolveInjectorInitializers(){let e=d(null),t=Le(this),n=x(void 0);try{let e=this.get(Tr,wr,{self:!0});for(let t of e)t()}finally{Le(t),x(n),d(e)}}toString(){return`R3Injector[...]`}processProvider(e){e=An(e);let t=zr(e)?e:An(e&&e.provide),n=Yr(e);if(!zr(e)&&e.multi===!0){let n=this.records.get(t);n||(n=Qr(void 0,Vr,!0),n.factory=()=>fr(n.multi),this.records.set(t,n)),t=e,n.multi.push(e)}this.records.set(t,n)}hydrate(e,t,n){let r=d(null);try{if(t.value===Hr)throw $n(``);return t.value===Vr&&(t.value=Hr,t.value=t.factory(void 0,n)),typeof t.value==`object`&&t.value&&ei(t.value)&&this._ngOnDestroyHooks.add(t.value),t.value}finally{d(r)}}injectableDefInScope(e){if(!e.providedIn)return!1;let t=An(e.providedIn);return typeof t==`string`?t===`any`||this.scopes.has(t):this.injectorDefTypes.has(t)}removeOnDestroy(e){let t=this._onDestroyHooks.indexOf(e);t!==-1&&this._onDestroyHooks.splice(t,1)}};function qr(e){let t=Mn(e),n=t===null?mr(e):t.factory;if(n!==null)return n;if(e instanceof b)throw new _(-204,!1);if(e instanceof Function)return Jr(e);throw new _(-204,!1)}function Jr(e){if(e.length>0)throw new _(-204,!1);let t=Pn(e);return t===null?()=>new e:()=>t.factory(e)}function Yr(e){return Ir(e)?Qr(void 0,e.useValue):Qr(Xr(e),Vr)}function Xr(e,t,n){let r;if(zr(e)){let t=An(e);return mr(t)||qr(t)}else if(Ir(e))r=()=>An(e.useValue);else if(Rr(e))r=()=>e.useFactory(...fr(e.deps||[]));else if(Lr(e))r=(t,n)=>S(An(e.useExisting),n!==void 0&&n&8?8:void 0);else{let t=An(e&&(e.useClass||e.provide));if($r(e))r=()=>new t(...fr(e.deps));else return mr(t)||qr(t)}return r}function Zr(e){if(e.destroyed)throw new _(-205,!1)}function Qr(e,t,n=!1){return{factory:e,value:t,multi:n?[]:void 0}}function $r(e){return!!e.deps}function ei(e){return typeof e==`object`&&!!e&&typeof e.ngOnDestroy==`function`}function ti(e){return typeof e==`function`||typeof e==`object`&&e.ngMetadataName===`InjectionToken`}function ni(e,t){for(let n of e)Array.isArray(n)?ni(n,t):n&&Rn(n)?ni(n.ɵproviders,t):t(n)}function ri(e,t){let n;e instanceof Kr?(Zr(e),n=e):n=new cr(e);let r=Le(n),i=x(void 0);try{return t()}finally{Le(r),x(i)}}function ii(){return ir()!==void 0||Ie()!=null}var ai=1;function oi(e){return Array.isArray(e)&&typeof e[ai]==`object`}function si(e){return Array.isArray(e)&&e[ai]===!0}function ci(e){return(e.flags&4)!=0}function li(e){return e.componentOffset>-1}function ui(e){return(e.flags&1)==1}function di(e){return!!e.template}function fi(e){return(e[2]&512)!=0}function pi(e){return(e[2]&256)==256}var mi=`math`;function hi(e){for(;Array.isArray(e);)e=e[0];return e}function gi(e,t){return hi(t[e])}function _i(e,t){return hi(t[e.index])}function vi(e,t){return e.data[t]}function yi(e,t){let n=t[e];return oi(n)?n:n[0]}function bi(e){return(e[2]&128)==128}function xi(e,t){return t==null?null:e[t]}function Si(e){e[17]=0}function Ci(e){e[2]&1024||(e[2]|=1024,bi(e)&&Di(e))}function wi(e,t){for(;e>0;)t=t[14],e--;return t}function Ti(e){return!!(e[2]&9216||e[24]?.dirty)}function Ei(e){e[10].changeDetectionScheduler?.notify(8),e[2]&64&&(e[2]|=1024),Ti(e)&&Di(e)}function Di(e){e[10].changeDetectionScheduler?.notify(0);let t=Ai(e);for(;t!==null&&!(t[2]&8192||(t[2]|=8192,!bi(t)));)t=Ai(t)}function Oi(e,t){if(pi(e))throw new _(911,!1);e[21]===null&&(e[21]=[]),e[21].push(t)}function ki(e,t){if(e[21]===null)return;let n=e[21].indexOf(t);n!==-1&&e[21].splice(n,1)}function Ai(e){let t=e[3];return si(t)?t[3]:t}function ji(e){return e[7]??=[]}function Mi(e){return e.cleanup??=[]}var w={lFrame:ca(null),bindingsEnabled:!0,skipHydrationRootTNode:null},Ni=!1;function Pi(){return w.lFrame.elementDepthCount}function Fi(){w.lFrame.elementDepthCount++}function Ii(){w.lFrame.elementDepthCount--}function Li(){return w.bindingsEnabled}function Ri(){return w.skipHydrationRootTNode!==null}function zi(e){return w.skipHydrationRootTNode===e}function Bi(){w.skipHydrationRootTNode=null}function T(){return w.lFrame.lView}function E(){return w.lFrame.tView}function D(e){return w.lFrame.contextLView=e,e[8]}function O(e){return w.lFrame.contextLView=null,e}function Vi(){let e=Hi();for(;e!==null&&e.type===64;)e=e.parent;return e}function Hi(){return w.lFrame.currentTNode}function Ui(){let e=w.lFrame,t=e.currentTNode;return e.isParent?t:t.parent}function Wi(e,t){let n=w.lFrame;n.currentTNode=e,n.isParent=t}function Gi(){return w.lFrame.isParent}function Ki(){w.lFrame.isParent=!1}function qi(){return Ni}function Ji(e){let t=Ni;return Ni=e,t}function Yi(e){return w.lFrame.bindingIndex=e}function Xi(){return w.lFrame.bindingIndex++}function Zi(e){let t=w.lFrame,n=t.bindingIndex;return t.bindingIndex+=e,n}function Qi(){return w.lFrame.inI18n}function $i(e,t){let n=w.lFrame;n.bindingIndex=n.bindingRootIndex=e,ta(t)}function ea(){return w.lFrame.currentDirectiveIndex}function ta(e){w.lFrame.currentDirectiveIndex=e}function na(e){let t=w.lFrame.currentDirectiveIndex;return t===-1?null:e[t]}function ra(e){w.lFrame.currentQueryIndex=e}function ia(e){let t=e[1];return t.type===2?t.declTNode:t.type===1?e[5]:null}function aa(e,t,n){if(n&4){let r=t,i=e;for(;(r=r.parent,r===null&&!(n&1))&&(r=ia(i),!(r===null||(i=i[14],r.type&10))););if(r===null)return!1;t=r,e=i}let r=w.lFrame=sa();return r.currentTNode=t,r.lView=e,!0}function oa(e){let t=sa(),n=e[1];w.lFrame=t,t.currentTNode=n.firstChild,t.lView=e,t.tView=n,t.contextLView=e,t.bindingIndex=n.bindingStartIndex,t.inI18n=!1}function sa(){let e=w.lFrame,t=e===null?null:e.child;return t===null?ca(e):t}function ca(e){let t={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:e,child:null,inI18n:!1};return e!==null&&(e.child=t),t}function la(){let e=w.lFrame;return w.lFrame=e.parent,e.currentTNode=null,e.lView=null,e}var ua=la;function da(){let e=la();e.isParent=!0,e.tView=null,e.selectedIndex=-1,e.contextLView=null,e.elementDepthCount=0,e.currentDirectiveIndex=-1,e.currentNamespace=null,e.bindingRootIndex=-1,e.bindingIndex=-1,e.currentQueryIndex=0}function fa(e){return(w.lFrame.contextLView=wi(e,w.lFrame.contextLView))[8]}function pa(){return w.lFrame.selectedIndex}function ma(e){w.lFrame.selectedIndex=e}function ha(){let e=w.lFrame;return vi(e.tView,e.selectedIndex)}function ga(){return w.lFrame.currentNamespace}var _a=!0;function va(){return _a}function ya(e){_a=e}function ba(e,t=null,n=null,r){let i=xa(e,t,n,r);return i.resolveInjectorInitializers(),i}function xa(e,t=null,n=null,r,i=new Set){return new Kr([n||wr,Ar(e)],t||Wr(),null,i)}var Sa=class e{static THROW_IF_NOT_FOUND=or;static NULL=new Or;static create(e,t){if(Array.isArray(e))return ba({name:``},t,e,``);{let t=e.name??``;return ba({name:t},e.parent,e.providers,t)}}static ɵprov=y({token:e,providedIn:`any`,factory:()=>S(Er)});static __NG_ELEMENT_ID__=-1},Ca=new b(``),wa=(()=>{class e{static __NG_ELEMENT_ID__=Ea;static __NG_ENV_ID__=e=>e}return e})(),Ta=class extends wa{_lView;constructor(e){super(),this._lView=e}get destroyed(){return pi(this._lView)}onDestroy(e){let t=this._lView;return Oi(t,e),()=>ki(t,e)}};function Ea(){return new Ta(T())}var Da=new b(``),Oa=(()=>{class e{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new It(!1);debugTaskTracker=C(Da,{optional:!0});get hasPendingTasks(){return!this.destroyed&&this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new g(e=>{e.next(!1),e.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let e=this.taskId++;return this.pendingTasks.add(e),this.debugTaskTracker?.add(e),e}has(e){return this.pendingTasks.has(e)}remove(e){this.pendingTasks.delete(e),this.debugTaskTracker?.remove(e),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static ɵprov=y({token:e,providedIn:`root`,factory:()=>new e})}return e})(),ka=class extends Pt{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(e=!1){super(),this.__isAsync=e,ii()&&(this.destroyRef=C(wa,{optional:!0})??void 0,this.pendingTasks=C(Oa,{optional:!0})??void 0)}emit(e){let t=d(null);try{super.next(e)}finally{d(t)}}subscribe(e,t,n){let r=e,i=t||(()=>null),a=n;if(e&&typeof e==`object`){let t=e;r=t.next?.bind(t),i=t.error?.bind(t),a=t.complete?.bind(t)}this.__isAsync&&(i=this.wrapInTimeout(i),r&&=this.wrapInTimeout(r),a&&=this.wrapInTimeout(a));let o=super.subscribe({next:r,error:i,complete:a});return e instanceof $e&&e.add(o),o}wrapInTimeout(e){return t=>{let n=this.pendingTasks?.add();setTimeout(()=>{try{e(t)}finally{n!==void 0&&this.pendingTasks?.remove(n)}})}}};function Aa(...e){}function ja(e){let t,n;function r(){e=Aa;try{n!==void 0&&typeof cancelAnimationFrame==`function`&&cancelAnimationFrame(n),t!==void 0&&clearTimeout(t)}catch{}}return t=setTimeout(()=>{e(),r()}),typeof requestAnimationFrame==`function`&&(n=requestAnimationFrame(()=>{e(),r()})),()=>r()}function Ma(e){return queueMicrotask(()=>e()),()=>{e=Aa}}var Na=`isAngularZone`,Pa=`isAngularZone_ID`,Fa=0,Ia=class e{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new ka(!1);onMicrotaskEmpty=new ka(!1);onStable=new ka(!1);onError=new ka(!1);constructor(e){let{enableLongStackTrace:t=!1,shouldCoalesceEventChangeDetection:n=!1,shouldCoalesceRunChangeDetection:r=!1,scheduleInRootZone:i=!1}=e;if(typeof Zone>`u`)throw new _(908,!1);Zone.assertZonePatched();let a=this;a._nesting=0,a._outer=a._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(a._inner=a._inner.fork(new Zone.TaskTrackingZoneSpec)),t&&Zone.longStackTraceZoneSpec&&(a._inner=a._inner.fork(Zone.longStackTraceZoneSpec)),a.shouldCoalesceEventChangeDetection=!r&&n,a.shouldCoalesceRunChangeDetection=r,a.callbackScheduled=!1,a.scheduleInRootZone=i,Ba(a)}static isInAngularZone(){return typeof Zone<`u`&&Zone.current.get(Na)===!0}static assertInAngularZone(){if(!e.isInAngularZone())throw new _(909,!1)}static assertNotInAngularZone(){if(e.isInAngularZone())throw new _(909,!1)}run(e,t,n){return this._inner.run(e,t,n)}runTask(e,t,n,r){let i=this._inner,a=i.scheduleEventTask(`NgZoneEvent: `+r,e,La,Aa,Aa);try{return i.runTask(a,t,n)}finally{i.cancelTask(a)}}runGuarded(e,t,n){return this._inner.runGuarded(e,t,n)}runOutsideAngular(e){return this._outer.run(e)}},La={};function Ra(e){if(e._nesting==0&&!e.hasPendingMicrotasks&&!e.isStable)try{e._nesting++,e.onMicrotaskEmpty.emit(null)}finally{if(e._nesting--,!e.hasPendingMicrotasks)try{e.runOutsideAngular(()=>e.onStable.emit(null))}finally{e.isStable=!0}}}function za(e){if(e.isCheckStableRunning||e.callbackScheduled)return;e.callbackScheduled=!0;function t(){ja(()=>{e.callbackScheduled=!1,Va(e),e.isCheckStableRunning=!0,Ra(e),e.isCheckStableRunning=!1})}e.scheduleInRootZone?Zone.root.run(()=>{t()}):e._outer.run(()=>{t()}),Va(e)}function Ba(e){let t=()=>{za(e)},n=Fa++;e._inner=e._inner.fork({name:`angular`,properties:{[Na]:!0,[Pa]:n,[Pa+n]:!0},onInvokeTask:(n,r,i,a,o,s)=>{if(Ga(s))return n.invokeTask(i,a,o,s);try{return Ha(e),n.invokeTask(i,a,o,s)}finally{(e.shouldCoalesceEventChangeDetection&&a.type===`eventTask`||e.shouldCoalesceRunChangeDetection)&&t(),Ua(e)}},onInvoke:(n,r,i,a,o,s,c)=>{try{return Ha(e),n.invoke(i,a,o,s,c)}finally{e.shouldCoalesceRunChangeDetection&&!e.callbackScheduled&&!Ka(s)&&t(),Ua(e)}},onHasTask:(t,n,r,i)=>{t.hasTask(r,i),n===r&&(i.change==`microTask`?(e._hasPendingMicrotasks=i.microTask,Va(e),Ra(e)):i.change==`macroTask`&&(e.hasPendingMacrotasks=i.macroTask))},onHandleError:(t,n,r,i)=>(t.handleError(r,i),e.runOutsideAngular(()=>e.onError.emit(i)),!1)})}function Va(e){e._hasPendingMicrotasks||(e.shouldCoalesceEventChangeDetection||e.shouldCoalesceRunChangeDetection)&&e.callbackScheduled===!0?e.hasPendingMicrotasks=!0:e.hasPendingMicrotasks=!1}function Ha(e){e._nesting++,e.isStable&&(e.isStable=!1,e.onUnstable.emit(null))}function Ua(e){e._nesting--,Ra(e)}var Wa=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new ka;onMicrotaskEmpty=new ka;onStable=new ka;onError=new ka;run(e,t,n){return e.apply(t,n)}runGuarded(e,t,n){return e.apply(t,n)}runOutsideAngular(e){return e()}runTask(e,t,n,r){return e.apply(t,n)}};function Ga(e){return qa(e,`__ignore_ng_zone__`)}function Ka(e){return qa(e,`__scheduler_tick__`)}function qa(e,t){return!Array.isArray(e)||e.length!==1?!1:e[0]?.data?.[t]===!0}var Ja=class{_console=console;handleError(e){this._console.error(`ERROR`,e)}},Ya=new b(``,{factory:()=>{let e=C(Ia),t=C(Gr),n;return r=>{e.runOutsideAngular(()=>{t.destroyed&&!n?setTimeout(()=>{throw r}):(n??=t.get(Ja),n.handleError(r))})}}}),Xa={provide:Tr,useValue:()=>{C(Ja,{optional:!0})},multi:!0};function k(e,t){let[n,r,i]=De(e,t?.equal),a=n;return a[u],a.set=r,a.update=i,a.asReadonly=Za.bind(a),a}function Za(){let e=this[u];if(e.readonlyFn===void 0){let t=()=>this();t[u]=e,e.readonlyFn=t}return e.readonlyFn}var Qa=new b(``,{factory:()=>$a}),$a=`ng`,eo=new b(``),to=new b(``,{providedIn:`platform`,factory:()=>`unknown`}),no=new b(``,{factory:()=>C(Ca).body?.querySelector(`[ngCspNonce]`)?.getAttribute(`ngCspNonce`)||null}),ro=(()=>{class e{view;node;constructor(e,t){this.view=e,this.node=t}static __NG_ELEMENT_ID__=io}return e})();function io(){return new ro(T(),Vi())}var ao=class{},oo=new b(``,{factory:()=>!0}),so=new b(``),co=(()=>{class e{static ɵprov=y({token:e,providedIn:`root`,factory:()=>new lo})}return e})(),lo=class{dirtyEffectCount=0;queues=new Map;add(e){this.enqueue(e),this.schedule(e)}schedule(e){e.dirty&&this.dirtyEffectCount++}remove(e){let t=e.zone,n=this.queues.get(t);n.has(e)&&(n.delete(e),e.dirty&&this.dirtyEffectCount--)}enqueue(e){let t=e.zone;this.queues.has(t)||this.queues.set(t,new Set);let n=this.queues.get(t);n.has(e)||n.add(e)}flush(){for(;this.dirtyEffectCount>0;){let e=!1;for(let[t,n]of this.queues)t===null?e||=this.flushQueue(n):e||=t.run(()=>this.flushQueue(n));e||(this.dirtyEffectCount=0)}}flushQueue(e){let t=!1;for(let n of e)n.dirty&&(this.dirtyEffectCount--,t=!0,n.run());return t}},uo=class{[u];constructor(e){this[u]=e}destroy(){this[u].destroy()}};function fo(e,t){let n=t?.injector??C(Sa),r=t?.manualCleanup===!0?null:n.get(wa),i,a=n.get(ro,null,{optional:!0}),o=n.get(ao);return a===null?i=_o(e,n.get(co),o):(i=go(a.view,o,e),r instanceof Ta&&r._lView===a.view&&(r=null)),i.injector=n,r!==null&&(i.onDestroyFns=[r.onDestroy(()=>i.destroy())]),new uo(i)}var po={...Ne,cleanupFns:void 0,zone:null,onDestroyFns:null,run(){let e=Ji(!1);try{Pe(this)}finally{Ji(e)}},cleanup(){if(!this.cleanupFns?.length)return;let e=d(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[],d(e)}}},mo={...po,consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){if(de(this),this.onDestroyFns!==null)for(let e of this.onDestroyFns)e();this.cleanup(),this.scheduler.remove(this)}},ho={...po,consumerMarkedDirty(){this.view[2]|=8192,Di(this.view),this.notifier.notify(13)},destroy(){if(de(this),this.onDestroyFns!==null)for(let e of this.onDestroyFns)e();this.cleanup(),this.view[23]?.delete(this)}};function go(e,t,n){let r=Object.create(ho);return r.view=e,r.zone=typeof Zone<`u`?Zone.current:null,r.notifier=t,r.fn=vo(r,n),e[23]??=new Set,e[23].add(r),r.consumerMarkedDirty(r),r}function _o(e,t,n){let r=Object.create(mo);return r.fn=vo(r,e),r.scheduler=t,r.notifier=n,r.zone=typeof Zone<`u`?Zone.current:null,r.scheduler.add(r),r.notifier.notify(12),r}function vo(e,t){return()=>{t(t=>(e.cleanupFns??=[]).push(t))}}function yo(e){return{toString:e}.toString()}var A=function(e){return e[e.TemplateCreateStart=0]=`TemplateCreateStart`,e[e.TemplateCreateEnd=1]=`TemplateCreateEnd`,e[e.TemplateUpdateStart=2]=`TemplateUpdateStart`,e[e.TemplateUpdateEnd=3]=`TemplateUpdateEnd`,e[e.LifecycleHookStart=4]=`LifecycleHookStart`,e[e.LifecycleHookEnd=5]=`LifecycleHookEnd`,e[e.OutputStart=6]=`OutputStart`,e[e.OutputEnd=7]=`OutputEnd`,e[e.BootstrapApplicationStart=8]=`BootstrapApplicationStart`,e[e.BootstrapApplicationEnd=9]=`BootstrapApplicationEnd`,e[e.BootstrapComponentStart=10]=`BootstrapComponentStart`,e[e.BootstrapComponentEnd=11]=`BootstrapComponentEnd`,e[e.ChangeDetectionStart=12]=`ChangeDetectionStart`,e[e.ChangeDetectionEnd=13]=`ChangeDetectionEnd`,e[e.ChangeDetectionSyncStart=14]=`ChangeDetectionSyncStart`,e[e.ChangeDetectionSyncEnd=15]=`ChangeDetectionSyncEnd`,e[e.AfterRenderHooksStart=16]=`AfterRenderHooksStart`,e[e.AfterRenderHooksEnd=17]=`AfterRenderHooksEnd`,e[e.ComponentStart=18]=`ComponentStart`,e[e.ComponentEnd=19]=`ComponentEnd`,e[e.DeferBlockStateStart=20]=`DeferBlockStateStart`,e[e.DeferBlockStateEnd=21]=`DeferBlockStateEnd`,e[e.DynamicComponentStart=22]=`DynamicComponentStart`,e[e.DynamicComponentEnd=23]=`DynamicComponentEnd`,e[e.HostBindingsUpdateStart=24]=`HostBindingsUpdateStart`,e[e.HostBindingsUpdateEnd=25]=`HostBindingsUpdateEnd`,e}(A||{});function bo(e,t,n,r){t===null?e[n]=r:t.applyValueToInputSignal(t,r)}var xo=null;function So(){return xo}var Co=[],j=function(e,t=null,n){for(let r=0;r<Co.length;r++){let i=Co[r];i(e,t,n)}};function wo(e,t,n){let{ngOnChanges:r,ngOnInit:i,ngDoCheck:a}=t.type.prototype;if(r){let r=So()(t);(n.preOrderHooks??=[]).push(e,r),(n.preOrderCheckHooks??=[]).push(e,r)}i&&(n.preOrderHooks??=[]).push(0-e,i),a&&((n.preOrderHooks??=[]).push(e,a),(n.preOrderCheckHooks??=[]).push(e,a))}function To(e,t){for(let n=t.directiveStart,r=t.directiveEnd;n<r;n++){let{ngAfterContentInit:t,ngAfterContentChecked:r,ngAfterViewInit:i,ngAfterViewChecked:a,ngOnDestroy:o}=e.data[n].type.prototype;t&&(e.contentHooks??=[]).push(-n,t),r&&((e.contentHooks??=[]).push(n,r),(e.contentCheckHooks??=[]).push(n,r)),i&&(e.viewHooks??=[]).push(-n,i),a&&((e.viewHooks??=[]).push(n,a),(e.viewCheckHooks??=[]).push(n,a)),o!=null&&(e.destroyHooks??=[]).push(n,o)}}function Eo(e,t,n){ko(e,t,3,n)}function Do(e,t,n,r){(e[2]&3)===n&&ko(e,t,n,r)}function Oo(e,t){let n=e[2];(n&3)===t&&(n&=16383,n+=1,e[2]=n)}function ko(e,t,n,r){let i=r===void 0?0:e[17]&65535,a=r??-1,o=t.length-1,s=0;for(let c=i;c<o;c++)if(typeof t[c+1]==`number`){if(s=t[c],r!=null&&s>=r)break}else t[c]<0&&(e[17]+=65536),(s<a||a==-1)&&(jo(e,n,t,c),e[17]=(e[17]&4294901760)+c+2),c++}function Ao(e,t){j(A.LifecycleHookStart,e,t);let n=d(null);try{t.call(e)}finally{d(n),j(A.LifecycleHookEnd,e,t)}}function jo(e,t,n,r){let i=n[r]<0,a=n[r+1],o=e[i?-n[r]:n[r]];i?e[2]>>14<e[17]>>16&&(e[2]&3)===t&&(e[2]+=16384,Ao(o,a)):Ao(o,a)}var Mo=-1,No=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(e,t,n,r){this.factory=e,this.name=r,this.canSeeViewProviders=t,this.injectImpl=n}};function Po(e){return(e.flags&8)!=0}function Fo(e){return(e.flags&16)!=0}function Io(e,t,n){let r=0;for(;r<n.length;){let i=n[r];if(typeof i==`number`){if(i!==0)break;r++;let a=n[r++],o=n[r++],s=n[r++];e.setAttribute(t,o,s,a)}else{let a=i,o=n[++r];Ro(a)?e.setProperty(t,a,o):e.setAttribute(t,a,o),r++}}return r}function Lo(e){return e===3||e===4||e===6}function Ro(e){return e.charCodeAt(0)===64}function zo(e,t){if(!(t===null||t.length===0))if(e===null||e.length===0)e=t.slice();else{let n=-1;for(let r=0;r<t.length;r++){let i=t[r];typeof i==`number`?n=i:n===0||(n===-1||n===2?Bo(e,n,i,null,t[++r]):Bo(e,n,i,null,null))}}return e}function Bo(e,t,n,r,i){let a=0,o=e.length;if(t===-1)o=-1;else for(;a<e.length;){let n=e[a++];if(typeof n==`number`){if(n===t){o=-1;break}else if(n>t){o=a-1;break}}}for(;a<e.length;){let t=e[a];if(typeof t==`number`)break;if(t===n){i!==null&&(e[a+1]=i);return}a++,i!==null&&a++}o!==-1&&(e.splice(o,0,t),a=o+1),e.splice(a++,0,n),i!==null&&e.splice(a++,0,i)}function Vo(e){return e!==Mo}function Ho(e){return e&32767}function Uo(e){return e>>16}function Wo(e,t){let n=Uo(e),r=t;for(;n>0;)r=r[14],n--;return r}var Go=!0;function Ko(e){let t=Go;return Go=e,t}var qo=255,Jo=5,Yo=0,Xo={};function Zo(e,t,n){let r;typeof n==`string`?r=n.charCodeAt(0)||0:n.hasOwnProperty(Un)&&(r=n[Un]),r??=n[Un]=Yo++;let i=r&qo,a=1<<i;t.data[e+(i>>Jo)]|=a}function Qo(e,t){let n=es(e,t);if(n!==-1)return n;let r=t[1];r.firstCreatePass&&(e.injectorIndex=t.length,$o(r.data,e),$o(t,null),$o(r.blueprint,null));let i=ts(e,t),a=e.injectorIndex;if(Vo(i)){let e=Ho(i),n=Wo(i,t),r=n[1].data;for(let i=0;i<8;i++)t[a+i]=n[e+i]|r[e+i]}return t[a+8]=i,a}function $o(e,t){e.push(0,0,0,0,0,0,0,0,t)}function es(e,t){return e.injectorIndex===-1||e.parent&&e.parent.injectorIndex===e.injectorIndex||t[e.injectorIndex+8]===null?-1:e.injectorIndex}function ts(e,t){if(e.parent&&e.parent.injectorIndex!==-1)return e.parent.injectorIndex;let n=0,r=null,i=t;for(;i!==null;){if(r=gs(i),r===null)return Mo;if(n++,i=i[14],r.injectorIndex!==-1)return r.injectorIndex|n<<16}return Mo}function ns(e,t,n){Zo(e,t,n)}function rs(e,t,n){if(n&8||e!==void 0)return e;er(t,`NodeInjector`)}function is(e,t,n,r){if(n&8&&r===void 0&&(r=null),!(n&3)){let i=e[9],a=x(void 0);try{return i?i.get(t,r,n&8):ar(t,r,n&8)}finally{x(a)}}return rs(r,t,n)}function as(e,t,n,r=0,i){if(e!==null){if(t[2]&2048&&!(r&2)){let i=hs(e,t,n,r,Xo);if(i!==Xo)return i}let i=os(e,t,n,r,Xo);if(i!==Xo)return i}return is(t,n,r,i)}function os(e,t,n,r,i){let a=us(n);if(typeof a==`function`){if(!aa(t,e,r))return r&1?rs(i,n,r):is(t,n,r,i);try{let e;if(e=a(r),e==null&&!(r&8))er(n);else return e}finally{ua()}}else if(typeof a==`number`){let i=null,o=es(e,t),s=Mo,c=r&1?t[15][5]:null;for((o===-1||r&4)&&(s=o===-1?ts(e,t):t[o+8],s===Mo||!fs(r,!1)?o=-1:(i=t[1],o=Ho(s),t=Wo(s,t)));o!==-1;){let e=t[1];if(ds(a,o,e.data)){let e=ss(o,t,n,i,r,c);if(e!==Xo)return e}s=t[o+8],s!==Mo&&fs(r,t[1].data[o+8]===c)&&ds(a,o,t)?(i=e,o=Ho(s),t=Wo(s,t)):o=-1}}return i}function ss(e,t,n,r,i,a){let o=t[1],s=o.data[e+8],c=cs(s,o,n,r==null?li(s)&&Go:r!=o&&(s.type&3)!=0,i&1&&a===s);return c===null?Xo:ls(t,o,c,s,i)}function cs(e,t,n,r,i){let a=e.providerIndexes,o=t.data,s=a&1048575,c=e.directiveStart,l=e.directiveEnd,u=a>>20,d=r?s:s+u,f=i?s+u:l;for(let e=d;e<f;e++){let t=o[e];if(e<c&&n===t||e>=c&&t.type===n)return e}if(i){let e=o[c];if(e&&di(e)&&e.type===n)return c}return null}function ls(e,t,n,r,i){let a=e[n],o=t.data;if(a instanceof No){let s=a;if(s.resolving)throw $n(``);let c=Ko(s.canSeeViewProviders);s.resolving=!0,o[n].type||o[n];let l=s.injectImpl?x(s.injectImpl):null;aa(e,r,0);try{a=e[n]=s.factory(void 0,i,o,e,r),t.firstCreatePass&&n>=r.directiveStart&&wo(n,o[n],t)}finally{l!==null&&x(l),Ko(c),s.resolving=!1,ua()}}return a}function us(e){if(typeof e==`string`)return e.charCodeAt(0)||0;let t=e.hasOwnProperty(Un)?e[Un]:void 0;return typeof t==`number`?t>=0?t&qo:ms:t}function ds(e,t,n){let r=1<<e;return!!(n[t+(e>>Jo)]&r)}function fs(e,t){return!(e&2)&&!(e&1&&t)}var ps=class{_tNode;_lView;constructor(e,t){this._tNode=e,this._lView=t}get(e,t,n){return as(this._tNode,this._lView,e,ur(n),t)}};function ms(){return new ps(Vi(),T())}function hs(e,t,n,r,i){let a=e,o=t;for(;a!==null&&o!==null&&o[2]&2048&&!fi(o);){let e=os(a,o,n,r|2,Xo);if(e!==Xo)return e;let t=a.parent;if(!t){let e=o[20];if(e){let t=e.get(n,Xo,r&-5);if(t!==Xo)return t}t=gs(o),o=o[14]}a=t}return i}function gs(e){let t=e[1],n=t.type;return n===2?t.declTNode:n===1?e[5]:null}function _s(e){return{token:e.token,providedIn:e.autoProvided===!1?null:`root`,factory:e.factory,value:void 0}}function vs(){return ys(Vi(),T())}function ys(e,t){return new bs(_i(e,t))}var bs=(()=>{class e{nativeElement;constructor(e){this.nativeElement=e}static __NG_ELEMENT_ID__=vs}return e})();function xs(e){return(e.flags&128)==128}var Ss=function(e){return e[e.OnPush=0]=`OnPush`,e[e.Eager=1]=`Eager`,e[e.Default=1]=`Default`,e}(Ss||{}),Cs=new Map,ws=0;function Ts(){return ws++}function Es(e){Cs.set(e[19],e)}function Ds(e){Cs.delete(e[19])}var Os=`__ngContext__`;function ks(e,t){oi(t)?(e[Os]=t[19],Es(t)):e[Os]=t}function As(e){return Ms(e[12])}function js(e){return Ms(e[4])}function Ms(e){for(;e!==null&&!si(e);)e=e[4];return e}var Ns=void 0;function Ps(e){Ns=e}function Fs(){if(Ns!==void 0)return Ns;if(typeof document<`u`)return document;throw new _(210,!1)}var Is=!1,Ls=new b(``,{factory:()=>Is}),Rs=new WeakMap;function zs(e,t){if(typeof e!=`object`||!e)return;let n=Rs.get(e);n||(n=new WeakSet,Rs.set(e,n)),n.add(t)}function Bs(e){return(e.flags&32)==32}var Vs=()=>null;function Hs(e,t,n=!1){return Vs(e,t,n)}function Us(e,t){let n=e.contentQueries;if(n!==null){let r=d(null);try{for(let r=0;r<n.length;r+=2){let i=n[r],a=n[r+1];if(a!==-1){let n=e.data[a];ra(i),n.contentQueries(2,t[a],a)}}}finally{d(r)}}}function Ws(e,t,n){ra(0);let r=d(null);try{t(e,n)}finally{d(r)}}function Gs(e,t,n){if(ci(t)){let r=d(null);try{let r=t.directiveStart,i=t.directiveEnd;for(let t=r;t<i;t++){let r=e.data[t];if(r.contentQueries){let e=n[t];r.contentQueries(1,e,t)}}}finally{d(r)}}}var Ks=function(e){return e[e.Emulated=0]=`Emulated`,e[e.None=2]=`None`,e[e.ShadowDom=3]=`ShadowDom`,e[e.ExperimentalIsolatedShadowDom=4]=`ExperimentalIsolatedShadowDom`,e}(Ks||{}),qs=class{changingThisBreaksApplicationSecurity;constructor(e){this.changingThisBreaksApplicationSecurity=e}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Cn})`}};function Js(e){return e instanceof qs?e.changingThisBreaksApplicationSecurity:e}function Ys(e,t){let n=Xs(e);if(n!=null&&n!==t){if(n===`ResourceURL`&&t===`URL`)return!0;throw Error(`Required a safe ${t}, got a ${n} (see ${Cn})`)}return n===t}function Xs(e){return e instanceof qs&&e.getTypeName()||null}var Zs=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function Qs(e){return e=String(e),e.match(Zs)?e:`unsafe:`+e}function $s(e,t){return e.createText(t)}function ec(e,t,n){e.setValue(t,n)}function tc(e,t,n){return e.createElement(t,n)}function nc(e,t,n,r,i){e.insertBefore(t,n,r,i)}function rc(e,t,n){e.appendChild(t,n)}function ic(e,t,n,r,i){r===null?rc(e,t,n):nc(e,t,n,r,i)}function ac(e,t,n,r){e.removeChild(null,t,n,r)}function oc(e,t,n){e.setAttribute(t,`style`,n)}function sc(e,t,n){n===``?e.removeAttribute(t,`class`):e.setAttribute(t,`class`,n)}function cc(e,t,n){let{mergedAttrs:r,classes:i,styles:a}=n;r!==null&&Io(e,t,r),i!==null&&sc(e,t,i),a!==null&&oc(e,t,a)}var lc=function(e){return e[e.NONE=0]=`NONE`,e[e.HTML=1]=`HTML`,e[e.STYLE=2]=`STYLE`,e[e.SCRIPT=3]=`SCRIPT`,e[e.URL=4]=`URL`,e[e.RESOURCE_URL=5]=`RESOURCE_URL`,e[e.ATTRIBUTE_NO_BINDING=6]=`ATTRIBUTE_NO_BINDING`,e}(lc||{});function uc(e){let t=dc();return t?t.sanitize(lc.URL,e)||``:Ys(e,`URL`)?Js(e):Qs(Yn(e))}function dc(){let e=T();return e&&e[10].sanitizer}function fc(e){return e.ownerDocument}function pc(e,t,n){let r=e.length;for(;;){let i=e.indexOf(t,n);if(i===-1)return i;if(i===0||e.charCodeAt(i-1)<=32){let n=t.length;if(i+n===r||e.charCodeAt(i+n)<=32)return i}n=i+1}}var mc=`ng-template`;function hc(e,t,n,r){let i=0;if(r){for(;i<t.length&&typeof t[i]==`string`;i+=2)if(t[i]===`class`&&pc(t[i+1].toLowerCase(),n,0)!==-1)return!0}else if(gc(e))return!1;if(i=t.indexOf(1,i),i>-1){let e;for(;++i<t.length&&typeof(e=t[i])==`string`;)if(e.toLowerCase()===n)return!0}return!1}function gc(e){return e.type===4&&e.value!==mc}function _c(e,t,n){return t===(e.type===4&&!n?mc:e.value)}function vc(e,t,n){let r=4,i=e.attrs,a=i===null?0:Sc(i),o=!1;for(let s=0;s<t.length;s++){let c=t[s];if(typeof c==`number`){if(!o&&!yc(r)&&!yc(c))return!1;if(o&&yc(c))continue;o=!1,r=c|r&1;continue}if(!o)if(r&4){if(r=2|r&1,c!==``&&!_c(e,c,n)||c===``&&t.length===1){if(yc(r))return!1;o=!0}}else if(r&8){if(i===null||!hc(e,i,c,n)){if(yc(r))return!1;o=!0}}else{let l=t[++s],u=bc(c,i,gc(e),n);if(u===-1){if(yc(r))return!1;o=!0;continue}if(l!==``){let e;if(e=u>a?``:i[u+1].toLowerCase(),r&2&&l!==e){if(yc(r))return!1;o=!0}}}}return yc(r)||o}function yc(e){return(e&1)==0}function bc(e,t,n,r){if(t===null)return-1;let i=0;if(r||!n){let n=!1;for(;i<t.length;){let r=t[i];if(r===e)return i;if(r===3||r===6)n=!0;else if(r===1||r===2){let e=t[++i];for(;typeof e==`string`;)e=t[++i];continue}else if(r===4)break;else if(r===0){i+=4;continue}i+=n?1:2}return-1}else return Cc(t,e)}function xc(e,t,n=!1){for(let r=0;r<t.length;r++)if(vc(e,t[r],n))return!0;return!1}function Sc(e){for(let t=0;t<e.length;t++){let n=e[t];if(Lo(n))return t}return e.length}function Cc(e,t){let n=e.indexOf(4);if(n>-1)for(n++;n<e.length;){let r=e[n];if(typeof r==`number`)return-1;if(r===t)return n;n++}return-1}function wc(e,t){return e?`:not(`+t.trim()+`)`:t}function Tc(e){let t=e[0],n=1,r=2,i=``,a=!1;for(;n<e.length;){let o=e[n];if(typeof o==`string`)if(r&2){let t=e[++n];i+=`[`+o+(t.length>0?`="`+t+`"`:``)+`]`}else r&8?i+=`.`+o:r&4&&(i+=` `+o);else i!==``&&!yc(o)&&(t+=wc(a,i),i=``),r=o,a||=!yc(r);n++}return i!==``&&(t+=wc(a,i)),t}function Ec(e){return e.map(Tc).join(`,`)}function Dc(e){let t=[],n=[],r=1,i=2;for(;r<e.length;){let a=e[r];if(typeof a==`string`)i===2?a!==``&&t.push(a,e[++r]):i===8&&n.push(a);else{if(!yc(i))break;i=a}r++}return n.length&&t.push(1,...n),t}var Oc={},kc=function(e){return e[e.Important=1]=`Important`,e[e.DashCase=2]=`DashCase`,e}(kc||{}),Ac;function jc(e,t){return Ac(e,t)}typeof document<`u`&&document?.documentElement?.getAnimations;var Mc=new WeakMap;function Nc(e){return e?e[14]??e:null}var Pc=new WeakSet;function Fc(e,t,n){let r=Mc.get(e);if(!r||r.length===0)return;let i=t.parentNode,a=t.previousSibling,o=Nc(n);for(let e=r.length-1;e>=0;e--){let{el:n,declarationView:s}=r[e],c=n.parentNode;n===t?(r.splice(e,1),Pc.add(n),n.dispatchEvent(new CustomEvent(`animationend`,{detail:{cancel:!0}}))):(a&&n===a||c&&i&&c!==i&&(o===null||s===null||o===s))&&(r.splice(e,1),n.dispatchEvent(new CustomEvent(`animationend`,{detail:{cancel:!0}})),n.parentNode?.removeChild(n))}}function Ic(e,t,n){let r=Nc(n),i=Mc.get(e);i?i.some(e=>e.el===t)||i.push({el:t,declarationView:r}):Mc.set(e,[{el:t,declarationView:r}])}var Lc=new Set,Rc=function(e){return e[e.CHANGE_DETECTION=0]=`CHANGE_DETECTION`,e[e.AFTER_NEXT_RENDER=1]=`AFTER_NEXT_RENDER`,e}(Rc||{}),zc=new b(``),Bc=new Set;function Vc(e){Bc.has(e)||(Bc.add(e),performance?.mark?.(`mark_feature_usage`,{detail:{feature:e}}))}var Hc=(()=>{class e{impl=null;execute(){this.impl?.execute()}static ɵprov=y({token:e,providedIn:`root`,factory:()=>new e})}return e})(),Uc=new b(``,{factory:()=>{let e=C(Gr),t=new Set;return e.onDestroy(()=>t.clear()),{queue:t,isScheduled:!1,scheduler:null,injector:e}}});function Wc(e,t,n){let r=e.get(Uc);if(Array.isArray(t))for(let e of t)r.queue.add(e),n?.detachedLeaveAnimationFns?.push(e);else r.queue.add(t),n?.detachedLeaveAnimationFns?.push(t);r.scheduler&&r.scheduler(e)}function Gc(e,t){let n=e.get(Uc);if(Array.isArray(t))for(let e of t)n.queue.delete(e);else n.queue.delete(t)}function Kc(e,t){let n=e.get(Uc);if(t.detachedLeaveAnimationFns){for(let e of t.detachedLeaveAnimationFns)n.queue.delete(e);t.detachedLeaveAnimationFns=void 0}}function qc(e,t){for(let[n,r]of t)Wc(e,r.animateFns)}function Jc(e,t,n,r){let i=e?.[26]?.enter;t!==null&&i&&i.has(n.index)&&qc(r,i)}function Yc(e,t,n,r){try{n.get(Er)}catch{return r(!1)}let i=e?.[26];i?.enter?.has(t.index)&&Gc(n,i.enter.get(t.index).animateFns);let a=Xc(e,t,i);if(a.size===0){let n=!1;if(e){let r=[];Qc(e,t,r),n=r.length>0}if(!n)return r(!1)}e&&Lc.add(e[19]),Wc(n,()=>Zc(e,t,i||void 0,a,r),i||void 0)}function Xc(e,t,n){let r=new Map,i=n?.leave;if(i&&i.has(t.index)&&r.set(t.index,i.get(t.index)),e&&i)for(let[n,a]of i){if(r.has(n))continue;let i=e[1].data[n].parent;for(;i;){if(i===t){r.set(n,a);break}i=i.parent}}return r}function Zc(e,t,n,r,i){let a=[];if(n&&n.leave)for(let[e]of r){if(!n.leave.has(e))continue;let t=n.leave.get(e);for(let e of t.animateFns){let{promise:t}=e();a.push(t)}n.detachedLeaveAnimationFns=void 0}if(e&&Qc(e,t,a),a.length>0){let t=n||e?.[26];if(t){let n=t.running;n&&a.push(n),t.running=Promise.allSettled(a),el(e,t.running,i)}else Promise.allSettled(a).then(()=>{e&&Lc.delete(e[19]),i(!0)})}else e&&Lc.delete(e[19]),i(!1)}function Qc(e,t,n){if(t.type&12){let r=e[t.index];if(si(r))for(let e=10;e<r.length;e++){let t=r[e];t[1].type===2&&$c(t,n)}}let r=t.child;for(;r;)Qc(e,r,n),r=r.next}function $c(e,t){let n=e[26];if(n&&n.leave)for(let e of n.leave.values())for(let n of e.animateFns){let{promise:e}=n();t.push(e)}let r=e[1].firstChild;for(;r;)Qc(e,r,t),r=r.next}function el(e,t,n){t.then(()=>{e[26]?.running===t&&(e[26].running=void 0,Lc.delete(e[19])),n(!0)})}function tl(e,t,n,r,i,a,o,s){if(i!=null){let c,l=!1;si(i)?c=i:oi(i)&&(l=!0,i=i[0]);let u=hi(i);e===0&&r!==null?(Jc(s,r,a,n),o==null?rc(t,r,u):nc(t,r,u,o||null,!0)):e===1&&r!==null?(Jc(s,r,a,n),nc(t,r,u,o||null,!0),Fc(a,u,s)):e===2?(s?.[26]?.leave?.has(a.index)&&Ic(a,u,s),Pc.delete(u),Yc(s,a,n,e=>{if(Pc.has(u)){Pc.delete(u);return}ac(t,u,l,e)})):e===3&&(Pc.delete(u),Yc(s,a,n,()=>{t.destroyNode(u)})),c!=null&&wl(t,e,n,c,a,r,o)}}function nl(e,t){il(e,t),t[0]=null,t[5]=null}function rl(e,t,n,r,i,a){r[0]=i,r[5]=t,Sl(e,r,n,1,i,a)}function il(e,t){t[10].changeDetectionScheduler?.notify(9),Sl(e,t,t[11],2,null,null)}function al(e){let t=e[12];if(!t)return cl(e[1],e);for(;t;){let n=null;if(oi(t))n=t[12];else{let e=t[10];e&&(n=e)}if(!n){for(;t&&!t[4]&&t!==e;)oi(t)&&cl(t[1],t),t=t[3];t===null&&(t=e),oi(t)&&cl(t[1],t),n=t&&t[4]}t=n}}function ol(e,t){let n=e[9],r=n.indexOf(t);n.splice(r,1)}function sl(e,t){if(pi(t))return;let n=t[11];n.destroyNode&&Sl(e,t,n,3,null,null),al(t)}function cl(e,t){if(pi(t))return;let n=d(null);try{t[2]&=-129,t[2]|=256,t[24]&&de(t[24]),ul(e,t),ll(e,t),t[1].type===1&&t[11].destroy();let n=t[16];if(n!==null&&si(t[3])){n!==t[3]&&ol(n,t);let r=t[18];r!==null&&r.detachView(e)}Ds(t)}finally{d(n)}}function ll(e,t){let n=e.cleanup,r=t[7];if(n!==null)for(let e=0;e<n.length-1;e+=2)if(typeof n[e]==`string`){let t=n[e+3];t>=0?r[t]():r[-t].unsubscribe(),e+=2}else{let t=r[n[e+1]];n[e].call(t)}r!==null&&(t[7]=null);let i=t[21];if(i!==null){t[21]=null;for(let e=0;e<i.length;e++){let t=i[e];t()}}let a=t[23];if(a!==null){t[23]=null;for(let e of a)e.destroy()}}function ul(e,t){let n;if(e!=null&&(n=e.destroyHooks)!=null)for(let e=0;e<n.length;e+=2){let r=t[n[e]];if(!(r instanceof No)){let t=n[e+1];if(Array.isArray(t))for(let e=0;e<t.length;e+=2){let n=r[t[e]],i=t[e+1];j(A.LifecycleHookStart,n,i);try{i.call(n)}finally{j(A.LifecycleHookEnd,n,i)}}else{j(A.LifecycleHookStart,r,t);try{t.call(r)}finally{j(A.LifecycleHookEnd,r,t)}}}}}function dl(e,t,n){return fl(e,t.parent,n)}function fl(e,t,n){let r=t;for(;r!==null&&r.type&168;)t=r,r=t.parent;if(r===null)return n[0];if(li(r)){let{encapsulation:t}=e.data[r.directiveStart+r.componentOffset];if(t===Ks.None||t===Ks.Emulated)return null}return _i(r,n)}function pl(e,t,n){return hl(e,t,n)}function ml(e,t,n){return e.type&40?_i(e,n):null}var hl=ml,gl;function _l(e,t,n,r){let i=dl(e,r,t),a=t[11],o=pl(r.parent||t[5],r,t);if(i!=null)if(Array.isArray(n))for(let e=0;e<n.length;e++)ic(a,i,n[e],o,!1);else ic(a,i,n,o,!1);gl!==void 0&&gl(a,r,t,n,i)}function vl(e,t){if(t!==null){let n=t.type;if(n&3)return _i(t,e);if(n&4)return bl(-1,e[t.index]);if(n&8){let n=t.child;if(n!==null)return vl(e,n);{let n=e[t.index];return si(n)?bl(-1,n):hi(n)}}else if(n&128)return vl(e,t.next);else if(n&32)return jc(t,e)()||hi(e[t.index]);else{let n=yl(e,t);return n===null?vl(e,t.next):Array.isArray(n)?n[0]:vl(Ai(e[15]),n)}}return null}function yl(e,t){if(t!==null){let n=e[15][5],r=t.projection;return n.projection[r]}return null}function bl(e,t){let n=10+e+1;if(n<t.length){let e=t[n],r=e[1].firstChild;if(r!==null)return vl(e,r)}return t[7]}function xl(e,t,n,r,i,a,o){for(;n!=null;){let s=r[9];if(n.type===128){n=n.next;continue}let c=r[n.index],l=n.type;if(o&&t===0&&(c&&ks(hi(c),r),n.flags|=2),!Bs(n))if(l&8)xl(e,t,n.child,r,i,a,!1),tl(t,e,s,i,c,n,a,r);else if(l&32){let o=jc(n,r),l;for(;l=o();)tl(t,e,s,i,l,n,a,r);tl(t,e,s,i,c,n,a,r)}else l&16?Cl(e,t,r,n,i,a):tl(t,e,s,i,c,n,a,r);n=o?n.projectionNext:n.next}}function Sl(e,t,n,r,i,a){xl(n,r,e.firstChild,t,i,a,!1)}function Cl(e,t,n,r,i,a){let o=n[15],s=o[5].projection[r.projection];if(Array.isArray(s))for(let o=0;o<s.length;o++){let c=s[o];tl(t,e,n[9],i,c,r,a,n)}else{let n=s,c=o[3];xs(r)&&(n.flags|=128),xl(e,t,n,c,i,a,!0)}}function wl(e,t,n,r,i,a,o){let s=r[7];s!==hi(r)&&tl(t,e,n,a,s,i,o);for(let n=10;n<r.length;n++){let i=r[n];Sl(i[1],i,e,t,a,s)}}function Tl(e,t,n,r,i){if(t)i?e.addClass(n,r):e.removeClass(n,r);else{let t=r.indexOf(`-`)===-1?void 0:kc.DashCase;i==null?e.removeStyle(n,r,t):(typeof i==`string`&&i.endsWith(`!important`)&&(i=i.slice(0,-10),t|=kc.Important),e.setStyle(n,r,i,t))}}function El(e,t,n,r,i,a,o,s,c,l,u){let d=27+r,f=d+i,p=Dl(d,f),m=typeof l==`function`?l():l;return p[1]={type:e,blueprint:p,template:n,queries:null,viewQuery:s,declTNode:t,data:p.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:f,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof a==`function`?a():a,pipeRegistry:typeof o==`function`?o():o,firstChild:null,schemas:c,consts:m,incompleteFirstPass:!1,ssrId:u}}function Dl(e,t){let n=[];for(let r=0;r<t;r++)n.push(r<e?null:Oc);return n}function Ol(e){let t=e.tView;return t===null||t.incompleteFirstPass?e.tView=El(1,null,e.template,e.decls,e.vars,e.directiveDefs,e.pipeDefs,e.viewQuery,e.schemas,e.consts,e.id):t}function kl(e,t,n,r,i,a,o,s,c,l,u){let d=t.blueprint.slice();return d[0]=i,d[2]=r|1228,(l!==null||e&&e[2]&2048)&&(d[2]|=2048),Si(d),d[3]=d[14]=e,d[8]=n,d[10]=o||e&&e[10],d[11]=s||e&&e[11],d[9]=c||e&&e[9]||null,d[5]=a,d[19]=Ts(),d[6]=u,d[20]=l,d[15]=t.type==2?e[15]:d,d}function Al(e,t,n){let r=_i(t,e),i=Ol(n),a=e[10].rendererFactory,o=Nl(e,kl(e,i,null,jl(n),r,t,null,a.createRenderer(r,n),null,null,null));return e[t.index]=o}function jl(e){let t=16;return e.signals?t=4096:e.onPush&&(t=64),t}function Ml(e,t,n,r){if(n===0)return-1;let i=t.length;for(let i=0;i<n;i++)t.push(r),e.blueprint.push(r),e.data.push(null);return i}function Nl(e,t){return e[12]?e[13][4]=t:e[12]=t,e[13]=t,t}function M(e=1){Pl(E(),T(),pa()+e,!1)}function Pl(e,t,n,r){if(!r)if((t[2]&3)==3){let r=e.preOrderCheckHooks;r!==null&&Eo(t,r,n)}else{let r=e.preOrderHooks;r!==null&&Do(t,r,0,n)}ma(n)}var Fl=function(e){return e[e.None=0]=`None`,e[e.SignalBased=1]=`SignalBased`,e[e.HasDecoratorInputTransform=2]=`HasDecoratorInputTransform`,e}(Fl||{});function Il(e,t,n,r){let i=d(null);try{let[i,a,o]=e.inputs[n],s=null;(a&Fl.SignalBased)!==0&&(s=t[i][u]),s!==null&&s.transformFn!==void 0?r=s.transformFn(r):o!==null&&(r=o.call(t,r)),e.setInput===null?bo(t,s,i,r):e.setInput(t,s,r,n,i)}finally{d(i)}}function Ll(e,t,n,r,i){let a=pa(),o=r&2;try{ma(-1),o&&t.length>27&&Pl(e,t,27,!1),j(o?A.TemplateUpdateStart:A.TemplateCreateStart,i,n),n(r,i)}finally{ma(a),j(o?A.TemplateUpdateEnd:A.TemplateCreateEnd,i,n)}}function Rl(e,t,n){Gl(e,t,n),(n.flags&64)==64&&Kl(e,t,n)}function zl(e,t,n=_i){let r=t.localNames;if(r!==null){let i=t.index+1;for(let a=0;a<r.length;a+=2){let o=r[a+1],s=o===-1?n(t,e):e[o];e[i++]=s}}}function Bl(e,t,n,r){let i=r.get(Ls,Is)||n===Ks.ShadowDom||n===Ks.ExperimentalIsolatedShadowDom;return e.selectRootElement(t,i)}function Vl(e){return e===`class`?`className`:e===`for`?`htmlFor`:e===`formaction`?`formAction`:e===`innerHtml`?`innerHTML`:e===`readonly`?`readOnly`:e===`tabindex`?`tabIndex`:e}function Hl(e,t,n,r,i,a){let o=t[1];if(tu(e,o,t,n,r)){li(e)&&Wl(t,e.index);return}e.type&3&&(n=Vl(n)),Ul(e,t,n,r,i,a)}function Ul(e,t,n,r,i,a){if(e.type&3){let o=_i(e,t);r=a==null?r:a(r,e.value||``,n),i.setProperty(o,n,r)}else e.type&12}function Wl(e,t){let n=yi(t,e);n[2]&16||(n[2]|=64)}function Gl(e,t,n){let r=n.directiveStart,i=n.directiveEnd;li(n)&&Al(t,n,e.data[r+n.componentOffset]),e.firstCreatePass||Qo(n,t);let a=n.initialInputs;for(let o=r;o<i;o++){let i=e.data[o],s=ls(t,e,o,n);if(ks(s,t),a!==null&&Zl(t,o-r,s,i,n,a),di(i)){let r=yi(n.index,t);r[8]=ls(t,e,o,n)}}}function Kl(e,t,n){let r=n.directiveStart,i=n.directiveEnd,a=n.index,o=ea();try{ma(a);for(let n=r;n<i;n++){let r=e.data[n],i=t[n];ta(n),(r.hostBindings!==null||r.hostVars!==0||r.hostAttrs!==null)&&ql(r,i)}}finally{ma(-1),ta(o)}}function ql(e,t){e.hostBindings!==null&&e.hostBindings(1,t)}function Jl(e,t){let n=e.directiveRegistry,r=null;if(n)for(let e=0;e<n.length;e++){let i=n[e];xc(t,i.selectors,!1)&&(r??=[],di(i)?r.unshift(i):r.push(i))}return r}function Yl(e,t,n,r,i,a){let o=_i(e,t);Xl(t[11],o,a,e.value,n,r,i)}function Xl(e,t,n,r,i,a,o){if(a==null)o?.(a,r||``,i),e.removeAttribute(t,i,n);else{let s=o==null?Yn(a):o(a,r||``,i);e.setAttribute(t,i,s,n)}}function Zl(e,t,n,r,i,a){let o=a[t];if(o!==null)for(let e=0;e<o.length;e+=2){let t=o[e],i=o[e+1];Il(r,n,t,i)}}function Ql(e,t,n,r,i){let a=27+n,o=t[1],s=i(o,t,e,r,n);t[a]=s,Wi(e,!0);let c=e.type===2;return c?(cc(t[11],s,e),(Pi()===0||ui(e))&&ks(s,t),Fi()):ks(s,t),va()&&(!c||!Bs(e))&&_l(o,t,s,e),e}function $l(e){let t=e;return Gi()?Ki():(t=t.parent,Wi(t,!1)),t}function eu(e,t){let n=e[9];if(!n)return;let r;try{r=n.get(Ya,null)}catch{r=null}r?.(t)}function tu(e,t,n,r,i){let a=e.inputs?.[r],o=e.hostDirectiveInputs?.[r],s=!1;if(o)for(let e=0;e<o.length;e+=2){let r=o[e],a=o[e+1],c=t.data[r];Il(c,n[r],a,i),s=!0}if(a)for(let e of a){let a=n[e],o=t.data[e];Il(o,a,r,i),s=!0}return s}function nu(e,t){let n=yi(t,e),r=n[1];ru(r,n);let i=n[0];i!==null&&n[6]===null&&(n[6]=Hs(i,n[9])),j(A.ComponentStart);try{iu(r,n,n[8])}finally{j(A.ComponentEnd,n[8])}}function ru(e,t){for(let n=t.length;n<e.blueprint.length;n++)t.push(e.blueprint[n])}function iu(e,t,n){oa(t);try{let r=e.viewQuery;r!==null&&Ws(1,r,n);let i=e.template;i!==null&&Ll(e,t,i,1,n),e.firstCreatePass&&=!1,t[18]?.finishViewCreation(e),e.staticContentQueries&&Us(e,t),e.staticViewQueries&&Ws(2,e.viewQuery,n);let a=e.components;a!==null&&au(t,a)}catch(t){throw e.firstCreatePass&&=(e.incompleteFirstPass=!0,!1),t}finally{t[2]&=-5,da()}}function au(e,t){for(let n=0;n<t.length;n++)nu(e,t[n])}function ou(e,t,n,r){let i=d(null);try{let i=t.tView,a=kl(e,i,n,e[2]&4096?4096:16,null,t,null,null,r?.injector??null,r?.embeddedViewInjector??null,r?.dehydratedView??null);a[16]=e[t.index];let o=e[18];return o!==null&&(a[18]=o.createEmbeddedView(i)),iu(i,a,n),a}finally{d(i)}}function su(e,t){return!t||t.firstChild===null||xs(e)}function cu(e,t,n,r,i=!1){for(;n!==null;){if(n.type===128){n=i?n.projectionNext:n.next;continue}let a=t[n.index];a!==null&&r.push(hi(a)),si(a)&&lu(a,r);let o=n.type;if(o&8)cu(e,t,n.child,r);else if(o&32){let e=jc(n,t),i;for(;i=e();)r.push(i)}else if(o&16){let e=yl(t,n);if(Array.isArray(e))r.push(...e);else{let n=Ai(t[15]);cu(n[1],n,e,r,!0)}}n=i?n.projectionNext:n.next}return r}function lu(e,t){for(let n=10;n<e.length;n++){let r=e[n],i=r[1].firstChild;i!==null&&cu(r[1],r,i,t)}e[7]!==e[0]&&t.push(e[7])}function uu(e){if(e[25]!==null){for(let t of e[25])t.impl.addSequence(t);e[25].length=0}}var du=[];function fu(e){return e[24]??pu(e)}function pu(e){let t=du.pop()??Object.create(hu);return t.lView=e,t}function mu(e){e.lView[24]!==e&&(e.lView=null,du.push(e))}var hu={...p,consumerIsAlwaysLive:!0,kind:`template`,consumerMarkedDirty:e=>{Di(e.lView)},consumerOnSignalRead(){this.lView[24]=this}};function gu(e){let t=e[24]??Object.create(_u);return t.lView=e,t}var _u={...p,consumerIsAlwaysLive:!0,kind:`template`,consumerMarkedDirty:e=>{let t=Ai(e.lView);for(;t&&!vu(t[1]);)t=Ai(t);t&&Ci(t)},consumerOnSignalRead(){this.lView[24]=this}};function vu(e){return e.type!==2}function yu(e){if(e[23]===null)return;let t=!0;for(;t;){let n=!1;for(let t of e[23])t.dirty&&(n=!0,t.zone===null||Zone.current===t.zone?t.run():t.zone.run(()=>t.run()));t=n&&!!(e[2]&8192)}}var bu=100;function xu(e,t=0){let n=e[10].rendererFactory;n.begin?.();try{Su(e,t)}finally{n.end?.()}}function Su(e,t){let n=qi();try{Ji(!0),Ou(e,t);let n=0;for(;Ti(e);){if(n===bu)throw new _(103,!1);n++,Ou(e,1)}}finally{Ji(n)}}function Cu(e,t,n,r){if(pi(t))return;let i=t[2];oa(t);let a=!0,o=null,s=null;vu(e)?(s=fu(t),o=oe(s)):f()===null?(a=!1,s=gu(t),o=oe(s)):t[24]&&=(de(t[24]),null);try{Si(t),Yi(e.bindingStartIndex),n!==null&&Ll(e,t,n,2,r);let a=(i&3)==3;if(a){let n=e.preOrderCheckHooks;n!==null&&Eo(t,n,null)}else{let n=e.preOrderHooks;n!==null&&Do(t,n,0,null),Oo(t,0)}if(Tu(t),yu(t),wu(t,0),e.contentQueries!==null&&Us(e,t),a){let n=e.contentCheckHooks;n!==null&&Eo(t,n)}else{let n=e.contentHooks;n!==null&&Do(t,n,1),Oo(t,1)}Au(e,t);let o=e.components;o!==null&&ku(t,o,0);let s=e.viewQuery;if(s!==null&&Ws(2,s,r),a){let n=e.viewCheckHooks;n!==null&&Eo(t,n)}else{let n=e.viewHooks;n!==null&&Do(t,n,2),Oo(t,2)}if(e.firstUpdatePass===!0&&(e.firstUpdatePass=!1),t[22]){for(let e of t[22])e();t[22]=null}uu(t),t[2]&=-73}catch(e){throw Di(t),e}finally{s!==null&&(ce(s,o),a&&mu(s)),da()}}function wu(e,t){for(let n=As(e);n!==null;n=js(n))for(let e=10;e<n.length;e++){let r=n[e];Du(r,t)}}function Tu(e){for(let t=As(e);t!==null;t=js(t)){if(!(t[2]&2))continue;let e=t[9];for(let t=0;t<e.length;t++){let n=e[t];Ci(n)}}}function Eu(e,t,n){j(A.ComponentStart);let r=yi(t,e);try{Du(r,n)}finally{j(A.ComponentEnd,r[8])}}function Du(e,t){bi(e)&&Ou(e,t)}function Ou(e,t){let n=e[1],r=e[2],i=e[24],a=!!(t===0&&r&16);if(a||=!!(r&64&&t===0),a||=!!(r&1024),a||=!!(i?.dirty&&ue(i)),a||=!1,i&&(i.dirty=!1),e[2]&=-9217,a)Cu(n,e,n.template,e[8]);else if(r&8192){let t=d(null);try{yu(e),wu(e,1);let t=n.components;t!==null&&ku(e,t,1),uu(e)}finally{d(t)}}}function ku(e,t,n){for(let r=0;r<t.length;r++)Eu(e,t[r],n)}function Au(e,t){let n=e.hostBindingOpCodes;if(n!==null)try{for(let e=0;e<n.length;e++){let r=n[e];if(r<0)ma(~r);else{let i=r,a=n[++e],o=n[++e];$i(a,i);let s=t[i];j(A.HostBindingsUpdateStart,s);try{o(2,s)}finally{j(A.HostBindingsUpdateEnd,s)}}}}finally{ma(-1)}}function ju(e,t){let n=qi()?64:1088;for(e[10].changeDetectionScheduler?.notify(t);e;){e[2]|=n;let t=Ai(e);if(fi(e)&&!t)return e;e=t}return null}function Mu(e,t,n,r){return[e,!0,0,t,null,r,null,n,null,null]}function Nu(e,t){let n=10+t;if(n<e.length)return e[n]}function Pu(e,t,n,r=!0){let i=t[1];if(Lu(i,t,e,n),r){let r=bl(n,e),a=t[11],o=a.parentNode(e[7]);o!==null&&rl(i,e[5],a,t,o,r)}let a=t[6];a!==null&&a.firstChild!==null&&(a.firstChild=null)}function Fu(e,t){let n=Iu(e,t);return n!==void 0&&sl(n[1],n),n}function Iu(e,t){if(e.length<=10)return;let n=10+t,r=e[n];if(r){let i=r[16];i!==null&&i!==e&&ol(i,r),t>0&&(e[n-1][4]=r[4]);let a=_r(e,10+t);nl(r[1],r);let o=a[18];o!==null&&o.detachView(a[1]),r[3]=null,r[4]=null,r[2]&=-129}return r}function Lu(e,t,n,r){let i=10+r,a=n.length;r>0&&(n[i-1][4]=t),r<a-10?(t[4]=n[i],gr(n,10+r,t)):(n.push(t),t[4]=null),t[3]=n;let o=t[16];o!==null&&n!==o&&Ru(o,t);let s=t[18];s!==null&&s.insertView(e),Ei(t),t[2]|=128}function Ru(e,t){let n=e[9],r=t[3];if(oi(r))e[2]|=2;else{let n=r[3][15];t[15]!==n&&(e[2]|=2)}n===null?e[9]=[t]:n.push(t)}var zu=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let e=this._lView,t=e[1];return cu(t,e,t.firstChild,[])}constructor(e,t){this._lView=e,this._cdRefInjectingView=t}get context(){return this._lView[8]}set context(e){this._lView[8]=e}get destroyed(){return pi(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let e=this._lView[3];if(si(e)){let t=e[8],n=t?t.indexOf(this):-1;n>-1&&(Iu(e,n),_r(t,n))}this._attachedToViewContainer=!1}sl(this._lView[1],this._lView)}onDestroy(e){Oi(this._lView,e)}markForCheck(){ju(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[2]&=-129}reattach(){Ei(this._lView),this._lView[2]|=128}detectChanges(){this._lView[2]|=1024,xu(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new _(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let e=fi(this._lView),t=this._lView[16];t!==null&&!e&&ol(t,this._lView),il(this._lView[1],this._lView)}attachToAppRef(e){if(this._attachedToViewContainer)throw new _(902,!1);this._appRef=e;let t=fi(this._lView),n=this._lView[16];n!==null&&!t&&Ru(n,this._lView),Ei(this._lView)}};function Bu(e,t,n,r,i){let a=e.data[t];if(a===null)a=Vu(e,t,n,r,i),Qi()&&(a.flags|=32);else if(a.type&64){a.type=n,a.value=r,a.attrs=i;let e=Ui();a.injectorIndex=e===null?-1:e.injectorIndex}return Wi(a,!0),a}function Vu(e,t,n,r,i){let a=Hi(),o=Gi(),s=o?a:a&&a.parent,c=e.data[t]=Uu(e,s,n,t,r,i);return Hu(e,c,a,o),c}function Hu(e,t,n,r){e.firstChild===null&&(e.firstChild=t),n!==null&&(r?n.child==null&&t.parent!==null&&(n.child=t):n.next===null&&(n.next=t,t.prev=n))}function Uu(e,t,n,r,i,a){let o=t?t.injectorIndex:-1,s=0;return Ri()&&(s|=128),{type:n,index:r,insertBeforeIndex:null,injectorIndex:o,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:s,providerIndexes:0,value:i,namespace:ga(),attrs:a,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:t,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function Wu(e){let t=e[6]??[],n=e[3][11],r=[];for(let e of t)e.data.di===void 0?Gu(e,n):r.push(e);e[6]=r}function Gu(e,t){let n=0,r=e.firstChild;if(r){let i=e.data.r;for(;n<i;){let e=r.nextSibling;ac(t,r,!1),r=e,n++}}}var Ku=()=>null,qu=()=>null;function Ju(e,t){return Ku(e,t)}function Yu(e,t,n){return qu(e,t,n)}var Xu=class{},Zu=class{},Qu=(()=>{class e{static ɵprov=y({token:e,providedIn:`root`,factory:()=>null})}return e})();function $u(e){return e.debugInfo?.className||e.type.name||null}var ed={},td=class{injector;parentInjector;constructor(e,t){this.injector=e,this.parentInjector=t}get(e,t,n){let r=this.injector.get(e,ed,n);return r!==ed||t===ed?r:this.parentInjector.get(e,t,n)}};function nd(e,t,n){if(n===Oc)return!1;let r=e[t];return Object.is(r,n)?!1:(e[t]=n,!0)}function rd(e,t,n){return function r(i){let a=r.__ngNativeEl__;a!==void 0&&zs(i,a),ju(li(e)?yi(e.index,t):t,5);let o=t[8],s=id(t,o,n,i),c=r.__ngNextListenerFn__;for(;c;)s=id(t,o,c,i)&&s,c=c.__ngNextListenerFn__;return s}}function id(e,t,n,r){let i=d(null);try{return j(A.OutputStart,t,n),n(r)!==!1}catch(t){return eu(e,t),!1}finally{j(A.OutputEnd,t,n),d(i)}}function ad(e,t,n,r,i,a,o,s){let c=ui(e),l=!1,u=null;if(!r&&c&&(u=sd(t,n,a,e.index)),u!==null){let e=u.__ngLastListenerFn__||u;e.__ngNextListenerFn__=o,u.__ngLastListenerFn__=o,l=!0}else{let o=_i(e,n),c=r?r(o):o;r||(s.__ngNativeEl__=o);let l=i.listen(c,a,s);od(a)||cd(r?t=>r(hi(t[e.index])):e.index,t,n,a,s,l,!1)}return l}function od(e){return e.startsWith(`animation`)||e.startsWith(`transition`)}function sd(e,t,n,r){let i=e.cleanup;if(i!=null)for(let e=0;e<i.length-1;e+=2){let a=i[e];if(a===n&&i[e+1]===r){let n=t[7],r=i[e+2];return n&&n.length>r?n[r]:null}typeof a==`string`&&(e+=2)}return null}function cd(e,t,n,r,i,a,o){let s=t.firstCreatePass?Mi(t):null,c=ji(n),l=c.length;c.push(i,a),s&&s.push(r,e,l,(l+1)*(o?-1:1))}function ld(e,t,n,r,i,a){let o=t[n],s=t[1],c=o[s.data[n].outputs[r]].subscribe(a);cd(e.index,s,t,i,a,c,!0)}var ud=Symbol(`BINDING`),dd=new b(``);function fd(e,t,n){let r=n?e.styles:null,i=n?e.classes:null,a=0;if(t!==null)for(let e=0;e<t.length;e++){let n=t[e];if(typeof n==`number`)a=n;else if(a==1)i=Dn(i,n);else if(a==2){let i=n,a=t[++e];r=Dn(r,i+`: `+a+`;`)}}n?e.styles=r:e.stylesWithoutHost=r,n?e.classes=i:e.classesWithoutHost=i}function pd(e,t=0){let n=T();return n===null?S(e,t):as(Vi(),n,An(e),t)}function md(e,t,n,r,i){let a=r===null?null:{"":-1},o=i(e,n);if(o!==null){let r=o,i=null,s=null;for(let e of o)if(e.resolveHostDirectives!==null){[r,i,s]=e.resolveHostDirectives(o);break}_d(e,t,n,r,a,i,s)}a!==null&&r!==null&&hd(n,r,a)}function hd(e,t,n){let r=e.localNames=[];for(let e=0;e<t.length;e+=2){let i=n[t[e+1]];if(i==null)throw new _(-301,!1);r.push(t[e],i)}}function gd(e,t,n){t.componentOffset=n,(e.components??=[]).push(t.index)}function _d(e,t,n,r,i,a,o){let s=r.length,c=null;for(let i=0;i<s;i++){let a=r[i];c===null&&di(a)&&(c=a,gd(e,n,i)),ns(Qo(n,t),e,a.type)}Dd(n,e.data.length,s),c?.viewProvidersResolver&&c.viewProvidersResolver(c);for(let e=0;e<s;e++){let t=r[e];t.providersResolver&&t.providersResolver(t)}let l=!1,u=!1,d=Ml(e,t,s,null);s>0&&(n.directiveToIndex=new Map);for(let c=0;c<s;c++){let s=r[c];if(n.mergedAttrs=zo(n.mergedAttrs,s.hostAttrs),Cd(e,n,t,d,s),Ed(d,s,i),o!==null&&o.has(s)){let[e,t]=o.get(s);n.directiveToIndex.set(s.type,[d,e+n.directiveStart,t+n.directiveStart])}else(a===null||!a.has(s))&&n.directiveToIndex.set(s.type,d);s.contentQueries!==null&&(n.flags|=4),(s.hostBindings!==null||s.hostAttrs!==null||s.hostVars!==0)&&(n.flags|=64);let f=s.type.prototype;!l&&(f.ngOnChanges||f.ngOnInit||f.ngDoCheck)&&((e.preOrderHooks??=[]).push(n.index),l=!0),!u&&(f.ngOnChanges||f.ngDoCheck)&&((e.preOrderCheckHooks??=[]).push(n.index),u=!0),d++}vd(e,n,a)}function vd(e,t,n){for(let r=t.directiveStart;r<t.directiveEnd;r++){let i=e.data[r];if(n===null||!n.has(i))yd(0,t,i,r),yd(1,t,i,r),Sd(t,r,!1);else{let e=n.get(i);bd(0,t,e,r),bd(1,t,e,r),Sd(t,r,!0)}}}function yd(e,t,n,r){let i=e===0?n.inputs:n.outputs;for(let n in i)if(i.hasOwnProperty(n)){let i;i=e===0?t.inputs??={}:t.outputs??={},i[n]??=[],i[n].push(r),xd(t,n)}}function bd(e,t,n,r){let i=e===0?n.inputs:n.outputs;for(let n in i)if(i.hasOwnProperty(n)){let a=i[n],o;o=e===0?t.hostDirectiveInputs??={}:t.hostDirectiveOutputs??={},o[a]??=[],o[a].push(r,n),xd(t,a)}}function xd(e,t){t===`class`?e.flags|=8:t===`style`&&(e.flags|=16)}function Sd(e,t,n){let{attrs:r,inputs:i,hostDirectiveInputs:a}=e;if(r===null||!n&&i===null||n&&a===null||gc(e)){e.initialInputs??=[],e.initialInputs.push(null);return}let o=null,s=0;for(;s<r.length;){let e=r[s];if(e===0){s+=4;continue}else if(e===5){s+=2;continue}else if(typeof e==`number`)break;if(!n&&i.hasOwnProperty(e)){let n=i[e];for(let i of n)if(i===t){o??=[],o.push(e,r[s+1]);break}}else if(n&&a.hasOwnProperty(e)){let n=a[e];for(let e=0;e<n.length;e+=2)if(n[e]===t){o??=[],o.push(n[e+1],r[s+1]);break}}s+=2}e.initialInputs??=[],e.initialInputs.push(o)}function Cd(e,t,n,r,i){e.data[r]=i;let a=new No(i.factory||=mr(i.type,!0),di(i),pd,null);e.blueprint[r]=a,n[r]=a,wd(e,t,r,Ml(e,n,i.hostVars,Oc),i)}function wd(e,t,n,r,i){let a=i.hostBindings;if(a){let i=e.hostBindingOpCodes;i===null&&(i=e.hostBindingOpCodes=[]);let o=~t.index;Td(i)!=o&&i.push(o),i.push(n,r,a)}}function Td(e){let t=e.length;for(;t>0;){let n=e[--t];if(typeof n==`number`&&n<0)return n}return 0}function Ed(e,t,n){if(n){if(t.exportAs)for(let r=0;r<t.exportAs.length;r++)n[t.exportAs[r]]=e;di(t)&&(n[``]=e)}}function Dd(e,t,n){e.flags|=1,e.directiveStart=t,e.directiveEnd=t+n,e.providerIndexes=t}function Od(e,t,n,r,i,a,o,s){let c=t[1],l=c.consts,u=Bu(c,e,n,r,xi(l,o));return a&&md(c,t,u,xi(l,s),i),u.mergedAttrs=zo(u.mergedAttrs,u.attrs),u.attrs!==null&&fd(u,u.attrs,!1),u.mergedAttrs!==null&&fd(u,u.mergedAttrs,!0),c.queries!==null&&c.queries.elementStart(c,u),u}function kd(e,t){To(e,t),ci(t)&&e.queries.elementEnd(t)}function Ad(e,t,n,r,i,a){let o=t.consts,s=Bu(t,e,n,r,xi(o,i));if(s.mergedAttrs=zo(s.mergedAttrs,s.attrs),a!=null){let e=xi(o,a);s.localNames=[];for(let t=0;t<e.length;t+=2)s.localNames.push(e[t],-1)}return s.attrs!==null&&fd(s,s.attrs,!1),s.mergedAttrs!==null&&fd(s,s.mergedAttrs,!0),t.queries!==null&&t.queries.elementStart(t,s),s}var jd=typeof ShadowRoot<`u`,Md=typeof Document<`u`;function Nd(e){return Object.keys(e).map(t=>{let[n,r,i]=e[t],a={propName:n,templateName:t,isSignal:(r&Fl.SignalBased)!==0};return i&&(a.transform=i),a})}function Pd(e){return Object.keys(e).map(t=>({propName:e[t],templateName:t}))}function Fd(e,t,n){let r=t instanceof Gr?t:t?.injector;return r&&e.getStandaloneInjector!==null&&(r=e.getStandaloneInjector(r)||r),r?new td(n,r):n}function Id(e){let t=e.get(Zu,null);if(t===null)throw new _(407,!1);return{rendererFactory:t,sanitizer:e.get(Qu,null),changeDetectionScheduler:e.get(ao,null),ngReflect:!1,tracingService:e.get(zc,null,{optional:!0})}}function Ld(e,t){let n=zd(e);return tc(t,n,n===`svg`?`svg`:n===`math`?mi:null)}function Rd(e){if(e?.toLowerCase()===`script`)throw new _(905,!1)}function zd(e){return(e.selectors[0][0]||`div`).toLowerCase()}var Bd=class{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=Nd(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=Pd(this.componentDef.outputs),this.cachedOutputs}constructor(e,t){this.componentDef=e,this.ngModule=t,this.componentType=e.type,this.selector=Ec(e.selectors),this.ngContentSelectors=e.ngContentSelectors??[],this.isBoundToModule=!!t}create(e,t,n,r,i,a){j(A.DynamicComponentStart);let o=d(null);try{let o=this.componentDef,s=Fd(o,r||this.ngModule,e),c=Id(s),l=c.tracingService;return l&&l.componentCreate?l.componentCreate($u(o),()=>this.createComponentRef(c,s,t,n,i,a)):this.createComponentRef(c,s,t,n,i,a)}finally{d(o)}}createComponentRef(e,t,n,r,i,a){let o=this.componentDef,s=Vd(r,o,a,i),c=e.rendererFactory.createRenderer(null,o),l=r?Bl(c,r,o.encapsulation,t):Ld(o,c);Rd(l?.tagName);let u=t.get(dd,null),d=Hd(l,()=>t.get(Ca,null)??Fs());u&&u.addHost(d);let f=a?.some(Wd)||i?.some(e=>typeof e!=`function`&&e.bindings.some(Wd)),p=kl(null,s,null,512|jl(o),null,null,e,c,t,null,Hs(l,t,!0));u&&jd&&d instanceof ShadowRoot&&Oi(p,()=>{u.removeHost(d)}),p[27]=l,oa(p);let m=null;try{let e=Od(27,p,2,`#host`,()=>s.directiveRegistry,!0,0);cc(c,l,e),ks(l,p),Rl(s,p,e),Gs(s,e,p),kd(s,e),n!==void 0&&Kd(e,this.ngContentSelectors,n),m=yi(e.index,p),p[8]=m[8],iu(s,p,null)}catch(e){throw m!==null&&Ds(m),Ds(p),e}finally{j(A.DynamicComponentEnd),da()}return new Gd(this.componentType,p,!!f)}};function Vd(e,t,n,r){let i=e?[`ng-version`,`22.0.8`]:Dc(t.selectors[0]),a=null,o=null,s=0;if(n)for(let e of n)s+=e[ud].requiredVars,e.create&&(e.targetIdx=0,(a??=[]).push(e)),e.update&&(e.targetIdx=0,(o??=[]).push(e));if(r)for(let e=0;e<r.length;e++){let t=r[e];if(typeof t!=`function`)for(let n of t.bindings){s+=n[ud].requiredVars;let t=e+1;n.create&&(n.targetIdx=t,(a??=[]).push(n)),n.update&&(n.targetIdx=t,(o??=[]).push(n))}}let c=[t];if(r)for(let e of r){let t=Kn(typeof e==`function`?e:e.type);c.push(t)}return El(0,null,Ud(a,o),1,s,c,null,null,null,[i],null)}function Hd(e,t){let n=e.getRootNode?.();return Md&&n instanceof Document?n.head:n&&jd&&n instanceof ShadowRoot?n:t().head}function Ud(e,t){return!e&&!t?null:n=>{if(n&1&&e)for(let t of e)t.create();if(n&2&&t)for(let e of t)e.update()}}function Wd(e){let t=e[ud].kind;return t===`input`||t===`twoWay`}var Gd=class extends Xu{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(e,t,n){super(),this._rootLView=t,this._hasInputBindings=n,this._tNode=vi(t[1],27),this.location=ys(this._tNode,t),this.instance=yi(this._tNode.index,t)[8],this.hostView=this.changeDetectorRef=new zu(t,void 0),this.componentType=e}setInput(e,t){this._hasInputBindings;let n=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(e)&&Object.is(this.previousInputValues.get(e),t))return;let r=this._rootLView;tu(n,r[1],r,e,t),this.previousInputValues.set(e,t),ju(yi(n.index,r),1)}get injector(){return new ps(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(e){this.hostView.onDestroy(e)}};function Kd(e,t,n){let r=e.projection=[];for(let e=0;e<t.length;e++){let t=n[e];r.push(t!=null&&t.length?Array.from(t):null)}}var qd=()=>!1;function Jd(e,t,n){return qd(e,t,n)}function Yd(e){return!!e&&typeof e.then==`function`}function Xd(e){return!!e&&typeof e.subscribe==`function`}var Zd=class{},Qd=class extends Zd{injector;instance=null;constructor(e){super();let t=new Kr([...e.providers,{provide:Zd,useValue:this}],e.parent||Wr(),e.debugName,new Set([`environment`]));this.injector=t,e.runEnvironmentInitializers&&t.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(e){this.injector.onDestroy(e)}};function $d(e,t,n=null){return new Qd({providers:e,parent:t,debugName:n,runEnvironmentInitializers:!0}).injector}var ef=(()=>{class e{_injector;cachedInjectors=new Map;constructor(e){this._injector=e}getOrCreateStandaloneInjector(e){if(!e.standalone)return null;if(!this.cachedInjectors.has(e)){let t=jr(!1,e.type),n=t.length>0?$d([t],this._injector,``):null;this.cachedInjectors.set(e,n)}return this.cachedInjectors.get(e)}ngOnDestroy(){try{for(let e of this.cachedInjectors.values())e!==null&&e.destroy()}finally{this.cachedInjectors.clear()}}static ɵprov=y({token:e,providedIn:`environment`,factory:()=>new e(S(Gr))})}return e})();function tf(e){return yo(()=>{let t=of(e),n={...t,decls:e.decls,vars:e.vars,template:e.template,consts:e.consts||null,ngContentSelectors:e.ngContentSelectors,onPush:e.changeDetection!==Ss.Eager,directiveDefs:null,pipeDefs:null,dependencies:t.standalone&&e.dependencies||null,getStandaloneInjector:t.standalone?e=>e.get(ef).getOrCreateStandaloneInjector(n):null,getExternalStyles:null,signals:e.signals??!1,data:e.data||{},encapsulation:e.encapsulation||Ks.Emulated,styles:e.styles||wr,_:null,schemas:e.schemas||null,tView:null,id:``};t.standalone&&Vc(`NgStandalone`),sf(n);let r=e.dependencies;return n.directiveDefs=cf(r,nf),n.pipeDefs=cf(r,qn),n.id=lf(n),n})}function nf(e){return Gn(e)||Kn(e)}function rf(e,t){if(e==null)return Cr;let n={};for(let r in e)if(e.hasOwnProperty(r)){let i=e[r],a,o,s,c;Array.isArray(i)?(s=i[0],a=i[1],o=i[2]??a,c=i[3]||null):(a=i,o=i,s=Fl.None,c=null),n[a]=[r,s,c],t[a]=o}return n}function af(e){if(e==null)return Cr;let t={};for(let n in e)e.hasOwnProperty(n)&&(t[e[n]]=n);return t}function of(e){let t={};return{type:e.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:e.hostBindings||null,hostVars:e.hostVars||0,hostAttrs:e.hostAttrs||null,contentQueries:e.contentQueries||null,declaredInputs:t,inputConfig:e.inputs||Cr,exportAs:e.exportAs||null,standalone:e.standalone??!0,signals:e.signals===!0,selectors:e.selectors||wr,viewQuery:e.viewQuery||null,features:e.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,signalFormsInputPresence:null,inputs:rf(e.inputs,t),outputs:af(e.outputs),debugInfo:null}}function sf(e){e.features?.forEach(t=>t(e))}function cf(e,t){return e?()=>{let n=typeof e==`function`?e():e,r=[];for(let e of n){let n=t(e);n!==null&&r.push(n)}return r}:null}function lf(e){let t=0,n=typeof e.consts==`function`?``:e.consts,r=[e.selectors,e.ngContentSelectors,e.hostVars,e.hostAttrs,n,e.vars,e.decls,e.encapsulation,e.standalone,e.signals,e.exportAs,JSON.stringify(e.inputs),JSON.stringify(e.outputs),Object.getOwnPropertyNames(e.type.prototype),!!e.contentQueries,!!e.viewQuery];for(let e of r.join(`|`))t=Math.imul(31,t)+e.charCodeAt(0)<<0;return t+=2147483648,`c`+t}var uf=new b(``),df=(()=>{class e{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((e,t)=>{this.resolve=e,this.reject=t});appInits=C(uf,{optional:!0})??[];injector=C(Sa);constructor(){}runInitializers(){if(this.initialized)return;let e=[];for(let t of this.appInits){let n=ri(this.injector,t);if(Yd(n))e.push(n);else if(Xd(n)){let t=new Promise((e,t)=>{n.subscribe({complete:e,error:t})});e.push(t)}}let t=()=>{this.done=!0,this.resolve()};Promise.all(e).then(()=>{t()}).catch(e=>{this.reject(e)}),e.length===0&&t(),this.initialized=!0}static ɵfac=function(t){return new(t||e)};static ɵprov=_s({token:e,factory:e.ɵfac})}return e})();function ff(e,t,n,r,i,a,o,s){if(n.firstCreatePass){e.mergedAttrs=zo(e.mergedAttrs,e.attrs);let t=e.tView=El(2,e,i,a,o,n.directiveRegistry,n.pipeRegistry,null,n.schemas,n.consts,null);n.queries!==null&&(n.queries.template(n,e),t.queries=n.queries.embeddedTView(e))}s&&(e.flags|=s),Wi(e,!1);let c=mf(n,t,e,r);va()&&_l(n,t,c,e),ks(c,t);let l=Mu(c,t,c,e);t[r+27]=l,Nl(t,l),Jd(l,e,t)}function pf(e,t,n,r,i,a,o,s,c,l,u){let d=n+27,f;if(t.firstCreatePass){if(f=Bu(t,d,4,o||null,s||null),l!=null){let e=xi(t.consts,l);f.localNames=[];for(let t=0;t<e.length;t+=2)f.localNames.push(e[t],-1)}}else f=t.data[d];return ff(f,e,t,n,r,i,a,c),l!=null&&zl(e,f,u),f}var mf=hf;function hf(e,t,n,r){return ya(!0),t[11].createComment(``)}var gf=new b(``),_f=new b(``);function vf(){Te(()=>{throw new _(600,``)})}var yf=10,bf=(()=>{class e{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=C(Ya);afterRenderManager=C(Hc);zonelessEnabled=C(oo);rootEffectScheduler=C(co);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new Pt;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=C(Oa);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(vn(e=>!e))}constructor(){C(zc,{optional:!0})}whenStable(){let e;return new Promise(t=>{e=this.isStable.subscribe({next:e=>{e&&t()}})}).finally(()=>{e.unsubscribe()})}_injector=C(Gr);_rendererFactory=null;get injector(){return this._injector}bootstrap(e,t){return this.bootstrapImpl(e,t)}bootstrapImpl(e,t,n=Sa.NULL){return this._injector.get(Ia).run(()=>{if(j(A.BootstrapComponentStart),!this._injector.get(df).done)throw new _(405,``);let r=Gn(e),i=this._injector.get(Zd),a=new Bd(r,i);this.componentTypes.push(e);let{hostElement:o,directives:s,bindings:c}=xf(t),l=o||a.selector,u=a.create(n,[],l,i.injector,s,c),d=u.location.nativeElement,f=u.injector.get(gf,null);return f?.registerApplication(d),u.onDestroy(()=>{this.detachView(u.hostView),Sf(this.components,u),f?.unregisterApplication(d)}),this._loadComponent(u),j(A.BootstrapComponentEnd,u),u})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){j(A.ChangeDetectionStart),this.tracingSnapshot===null?this.tickImpl():this.tracingSnapshot.run(Rc.CHANGE_DETECTION,this.tickImpl)}tickImpl=()=>{if(this._runningTick)throw j(A.ChangeDetectionEnd),new _(101,!1);let e=d(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,d(e),this.afterTick.next(),j(A.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(Zu,null,{optional:!0}));let e=0;for(;this.dirtyFlags!==0&&e++<yf;){j(A.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{j(A.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let e=!1;if(this.dirtyFlags&7){let t=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:n}of this.allViews)!t&&!Ti(n)||(xu(n,t&&!this.zonelessEnabled?0:1),e=!0);if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}e||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:e})=>Ti(e))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(e){let t=e;this._views.push(t),t.attachToAppRef(this)}detachView(e){let t=e;Sf(this._views,t),t.detachFromAppRef()}_loadComponent(e){this.attachView(e.hostView);try{this.tick()}catch(e){this.internalErrorHandler(e)}this.components.push(e),this._injector.get(_f,[]).forEach(t=>t(e))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(e=>e()),this._views.slice().forEach(e=>e.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(e){return this._destroyListeners.push(e),()=>Sf(this._destroyListeners,e)}destroy(){if(this._destroyed)throw new _(406,!1);let e=this._injector;e.destroy&&!e.destroyed&&e.destroy()}get viewCount(){return this._views.length}static ɵfac=function(t){return new(t||e)};static ɵprov=_s({token:e,factory:e.ɵfac})}return e})();function xf(e){return e===void 0||typeof e==`string`||e instanceof Element?{hostElement:e}:e}function Sf(e,t){let n=e.indexOf(t);n>-1&&e.splice(n,1)}function Cf(e,t,n,r){let i=T();return nd(i,Xi(),t)&&(E(),Yl(ha(),i,e,t,n,r)),Cf}var wf=class{destroy(e){}updateValue(e,t){}swap(e,t){let n=Math.min(e,t),r=Math.max(e,t),i=this.detach(r);if(r-n>1){let e=this.detach(n);this.attach(n,i),this.attach(r,e)}else this.attach(n,i)}move(e,t){this.attach(t,this.detach(e))}};function Tf(e,t,n,r,i){return e===n&&Object.is(t,r)?1:Object.is(i(e,t),i(n,r))?-1:0}function Ef(e,t,n,r){let i,a,o=0,s=e.length-1;if(Array.isArray(t)){d(r);let c=t.length-1;for(d(null);o<=s&&o<=c;){let r=e.at(o),l=t[o],u=Tf(o,r,o,l,n);if(u!==0){u<0&&e.updateValue(o,l),o++;continue}let d=e.at(s),f=t[c],p=Tf(s,d,c,f,n);if(p!==0){p<0&&e.updateValue(s,f),s--,c--;continue}let m=n(o,r),ee=n(s,d),te=n(o,l);if(Object.is(te,ee)){let t=n(c,f);Object.is(t,m)?(e.swap(o,s),e.updateValue(s,f),c--,s--):e.move(s,o),e.updateValue(o,l),o++;continue}if(i??=new Af,a??=kf(e,o,s,n),Df(e,i,o,te))e.updateValue(o,l),o++,s++;else if(a.has(te))i.set(m,e.detach(o)),s--;else{let n=e.create(o,t[o]);e.attach(o,n),o++,s++}}for(;o<=c;)Of(e,i,n,o,t[o]),o++}else if(t!=null){d(r);let c=t[Symbol.iterator]();d(null);let l=c.next();for(;!l.done&&o<=s;){let t=e.at(o),r=l.value,u=Tf(o,t,o,r,n);if(u!==0)u<0&&e.updateValue(o,r),o++,l=c.next();else{i??=new Af,a??=kf(e,o,s,n);let u=n(o,r);if(Df(e,i,o,u))e.updateValue(o,r),o++,s++,l=c.next();else if(!a.has(u))e.attach(o,e.create(o,r)),o++,s++,l=c.next();else{let r=n(o,t);i.set(r,e.detach(o)),s--}}}for(;!l.done;)Of(e,i,n,e.length,l.value),l=c.next()}for(;o<=s;)e.destroy(e.detach(s--));i?.forEach(t=>{e.destroy(t)})}function Df(e,t,n,r){return t!==void 0&&t.has(r)?(e.attach(n,t.get(r)),t.delete(r),!0):!1}function Of(e,t,n,r,i){if(Df(e,t,r,n(r,i)))e.updateValue(r,i);else{let t=e.create(r,i);e.attach(r,t)}}function kf(e,t,n,r){let i=new Set;for(let a=t;a<=n;a++)i.add(r(a,e.at(a)));return i}var Af=class{kvMap=new Map;_vMap=void 0;has(e){return this.kvMap.has(e)}delete(e){if(!this.has(e))return!1;let t=this.kvMap.get(e);return this._vMap!==void 0&&this._vMap.has(t)?(this.kvMap.set(e,this._vMap.get(t)),this._vMap.delete(t)):this.kvMap.delete(e),!0}get(e){return this.kvMap.get(e)}set(e,t){if(this.kvMap.has(e)){let n=this.kvMap.get(e);this._vMap===void 0&&(this._vMap=new Map);let r=this._vMap;for(;r.has(n);)n=r.get(n);r.set(n,t)}else this.kvMap.set(e,t)}forEach(e){for(let[t,n]of this.kvMap)if(e(n,t),this._vMap!==void 0){let r=this._vMap;for(;r.has(n);)n=r.get(n),e(n,t)}}};function N(e,t,n,r,i,a,o,s){Vc(`NgControlFlow`);let c=T(),l=E();return pf(c,l,e,t,n,r,i,xi(l.consts,a),256,o,s),jf}function jf(e,t,n,r,i,a,o,s){Vc(`NgControlFlow`);let c=T(),l=E();return pf(c,l,e,t,n,r,i,xi(l.consts,a),512,o,s),jf}function P(e,t){Vc(`NgControlFlow`);let n=T(),r=Xi(),i=n[r]===Oc?-1:n[r],a=i===-1?void 0:Lf(n,27+i);if(nd(n,r,e)){let r=d(null);try{if(a!==void 0&&Fu(a,0),e!==-1){let r=27+e,i=Lf(n,r),a=Hf(n[1],r),o=Yu(i,a,n);Pu(i,ou(n,a,t,{dehydratedView:o}),0,su(a,o))}}finally{d(r)}}else if(a!==void 0){let e=Nu(a,0);e!==void 0&&(e[8]=t)}}var Mf=class{lContainer;$implicit;$index;constructor(e,t,n){this.lContainer=e,this.$implicit=t,this.$index=n}get $count(){return this.lContainer.length-10}};function Nf(e){return e}function Pf(e,t){return t}var Ff=class{hasEmptyBlock;trackByFn;liveCollection;constructor(e,t,n){this.hasEmptyBlock=e,this.trackByFn=t,this.liveCollection=n}};function F(e,t,n,r,i,a,o,s,c,l,u,d,f){Vc(`NgControlFlow`);let p=T(),m=E(),ee=c!==void 0,te=T(),ne=new Ff(ee,s?o.bind(te[15][8]):o);te[27+e]=ne,pf(p,m,e+1,t,n,r,i,xi(m.consts,a),256),ee&&pf(p,m,e+2,c,l,u,d,xi(m.consts,f),512)}var If=class extends wf{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=!1;constructor(e,t,n){super(),this.lContainer=e,this.hostLView=t,this.templateTNode=n}get length(){return this.lContainer.length-10}at(e){return this.getLView(e)[8].$implicit}attach(e,t){let n=t[6];this.needsIndexUpdate||=e!==this.length,Pu(this.lContainer,t,e,su(this.templateTNode,n)),Rf(this.lContainer,e)}detach(e){return this.needsIndexUpdate||=e!==this.length-1,zf(this.lContainer,e),Bf(this.lContainer,e)}create(e,t){let n=Ju(this.lContainer,this.templateTNode.tView.ssrId);return ou(this.hostLView,this.templateTNode,new Mf(this.lContainer,t,e),{dehydratedView:n})}destroy(e){sl(e[1],e)}updateValue(e,t){this.getLView(e)[8].$implicit=t}reset(){this.needsIndexUpdate=!1}updateIndexes(){if(this.needsIndexUpdate)for(let e=0;e<this.length;e++)this.getLView(e)[8].$index=e}getLView(e){return Vf(this.lContainer,e)}};function I(e){let t=d(null),n=pa();try{let r=T(),i=r[1],a=r[n],o=n+1,s=Lf(r,o);a.liveCollection===void 0?a.liveCollection=new If(s,r,Hf(i,o)):a.liveCollection.reset();let c=a.liveCollection;if(Ef(c,e,a.trackByFn,t),c.updateIndexes(),a.hasEmptyBlock){let e=Xi(),t=c.length===0;if(nd(r,e,t)){let e=n+2,a=Lf(r,e);if(t){let t=Hf(i,e),n=Yu(a,t,r);Pu(a,ou(r,t,void 0,{dehydratedView:n}),0,su(t,n))}else i.firstUpdatePass&&Wu(a),Fu(a,0)}}}finally{d(t)}}function Lf(e,t){return e[t]}function Rf(e,t){if(e.length<=10)return;let n=e[10+t],r=n?n[26]:void 0;if(n&&r&&r.detachedLeaveAnimationFns&&r.detachedLeaveAnimationFns.length>0){let e=n[9];Kc(e,r),Lc.delete(n[19]),r.detachedLeaveAnimationFns=void 0}}function zf(e,t){if(e.length<=10)return;let n=e[10+t],r=n?n[26]:void 0;r&&r.leave&&r.leave.size>0&&(r.detachedLeaveAnimationFns=[])}function Bf(e,t){return Iu(e,t)}function Vf(e,t){return Nu(e,t)}function Hf(e,t){return vi(e,t)}function Uf(e,t,n){let r=T();return nd(r,Xi(),t)&&(E(),Hl(ha(),r,e,t,r[11],n)),Uf}function Wf(e,t,n,r,i){tu(t,e,n,i?`class`:`style`,r)}function L(e,t,n,r){let i=T(),a=i[1],o=e+27,s=a.firstCreatePass?Od(o,i,2,t,Jl,Li(),n,r):a.data[o];if(li(s)){let n=i[10].tracingService;if(n&&n.componentCreate){let o=a.data[s.directiveStart+s.componentOffset];return n.componentCreate($u(o),()=>(Gf(e,t,i,s,r),L))}}return Gf(e,t,i,s,r),L}function Gf(e,t,n,r,i){if(Ql(r,n,e,t,Jf),ui(r)){let e=n[1];Rl(e,n,r),Gs(e,r,n)}i!=null&&zl(n,r)}function R(){let e=E(),t=$l(Vi());return e.firstCreatePass&&kd(e,t),zi(t)&&Bi(),Ii(),t.classesWithoutHost!=null&&Po(t)&&Wf(e,t,T(),t.classesWithoutHost,!0),t.stylesWithoutHost!=null&&Fo(t)&&Wf(e,t,T(),t.stylesWithoutHost,!1),R}function Kf(e,t,n,r){return L(e,t,n,r),R(),Kf}function z(e,t,n,r){let i=T(),a=i[1],o=e+27,s=a.firstCreatePass?Ad(o,a,2,t,n,r):a.data[o];return Ql(s,i,e,t,Jf),r!=null&&zl(i,s),z}function B(){return zi($l(Vi()))&&Bi(),Ii(),B}function qf(e,t,n,r){return z(e,t,n,r),B(),qf}var Jf=(e,t,n,r,i)=>(ya(!0),tc(t[11],r,ga()));function Yf(){return T()}function Xf(e,t,n){let r=T();return nd(r,Xi(),t)&&(E(),Ul(ha(),r,e,t,r[11],n)),Xf}function Zf(e){typeof e==`string`&&e.toLowerCase().replace(/_/g,`-`)}function V(e,t,n){let r=T(),i=E(),a=Vi();return Qf(i,r,r[11],a,e,t,n),V}function H(e,t,n){let r=T(),i=E(),a=Vi();return(a.type&3||n)&&ad(a,i,r,n,r[11],e,t,rd(a,r,t)),H}function Qf(e,t,n,r,i,a,o){let s=!0,c=null;if((r.type&3||o)&&(c??=rd(r,t,a),ad(r,e,t,o,n,i,a,c)&&(s=!1)),s){let e=r.outputs?.[i],n=r.hostDirectiveOutputs?.[i];if(n&&n.length)for(let e=0;e<n.length;e+=2){let o=n[e],s=n[e+1];c??=rd(r,t,a),ld(r,t,o,s,i,c)}if(e&&e.length)for(let n of e)c??=rd(r,t,a),ld(r,t,n,i,i,c)}}function U(e=1){return fa(e)}function $f(e,t){return e<<17|t<<2}function ep(e){return e>>17&32767}function tp(e){return(e&2)==2}function np(e,t){return e&131071|t<<17}function rp(e){return e|2}function ip(e){return(e&131068)>>2}function ap(e,t){return e&-131069|t<<2}function op(e){return(e&1)==1}function sp(e){return e|1}function cp(e,t,n,r,i,a){let o=a?t.classBindings:t.styleBindings,s=ep(o),c=ip(o);e[r]=n;let l=!1,u;if(Array.isArray(n)){let e=n;u=e[1],(u===null||xr(e,u)>0)&&(l=!0)}else u=n;if(i)if(c!==0){let t=ep(e[s+1]);e[r+1]=$f(t,s),t!==0&&(e[t+1]=ap(e[t+1],r)),e[s+1]=np(e[s+1],r)}else e[r+1]=$f(s,0),s!==0&&(e[s+1]=ap(e[s+1],r)),s=r;else e[r+1]=$f(c,0),s===0?s=r:e[c+1]=ap(e[c+1],r),c=r;l&&(e[r+1]=rp(e[r+1])),up(e,u,r,!0),up(e,u,r,!1),lp(t,u,e,r,a),o=$f(s,c),a?t.classBindings=o:t.styleBindings=o}function lp(e,t,n,r,i){let a=i?e.residualClasses:e.residualStyles;a!=null&&typeof t==`string`&&xr(a,t)>=0&&(n[r+1]=sp(n[r+1]))}function up(e,t,n,r){let i=e[n+1],a=t===null,o=r?ep(i):ip(i),s=!1;for(;o!==0&&(s===!1||a);){let n=e[o],i=e[o+1];dp(n,t)&&(s=!0,e[o+1]=r?sp(i):rp(i)),o=r?ep(i):ip(i)}s&&(e[n+1]=r?rp(i):sp(i))}function dp(e,t){return e===null||t==null||(Array.isArray(e)?e[1]:e)===t?!0:Array.isArray(e)&&typeof t==`string`?xr(e,t)>=0:!1}var fp={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function pp(e){return e.substring(fp.key,fp.keyEnd)}function mp(e){return gp(e),hp(e,_p(e,0,fp.textEnd))}function hp(e,t){let n=fp.textEnd;return n===t?-1:(t=fp.keyEnd=vp(e,fp.key=t,n),_p(e,t,n))}function gp(e){fp.key=0,fp.keyEnd=0,fp.value=0,fp.valueEnd=0,fp.textEnd=e.length}function _p(e,t,n){for(;t<n&&e.charCodeAt(t)<=32;)t++;return t}function vp(e,t,n){for(;t<n&&e.charCodeAt(t)>32;)t++;return t}function yp(e,t,n){return Sp(e,t,n,!1),yp}function W(e,t){return Sp(e,t,null,!0),W}function bp(e){Cp(Np,xp,e,!0)}function xp(e,t){for(let n=mp(t);n>=0;n=hp(t,n))yr(e,pp(t),!0)}function Sp(e,t,n,r){let i=T(),a=E(),o=Zi(2);if(a.firstUpdatePass&&Tp(a,e,o,r),t!==Oc&&nd(i,o,t)){let s=a.data[pa()];Fp(a,s,i,i[11],e,i[o+1]=Rp(t,n),r,o)}}function Cp(e,t,n,r){let i=E(),a=Zi(2);i.firstUpdatePass&&Tp(i,null,a,r);let o=T();if(n!==Oc&&nd(o,a,n)){let s=i.data[pa()];if(zp(s,r)&&!wp(i,a)){let e=r?s.classesWithoutHost:s.stylesWithoutHost;e!==null&&(n=Dn(e,n||``)),Wf(i,s,o,n,r)}else Pp(i,s,o,o[11],o[a+1],o[a+1]=Mp(e,t,n),r,a)}}function wp(e,t){return t>=e.expandoStartIndex}function Tp(e,t,n,r){let i=e.data;if(i[n+1]===null){let a=i[pa()],o=wp(e,n);zp(a,r)&&t===null&&!o&&(t=!1),t=Ep(i,a,t,r),cp(i,a,t,n,o,r)}}function Ep(e,t,n,r){let i=na(e),a=r?t.residualClasses:t.residualStyles;if(i===null)(r?t.classBindings:t.styleBindings)===0&&(n=Ap(null,e,t,n,r),n=jp(n,t.attrs,r),a=null);else{let o=t.directiveStylingLast;if(o===-1||e[o]!==i)if(n=Ap(i,e,t,n,r),a===null){let n=Dp(e,t,r);n!==void 0&&Array.isArray(n)&&(n=Ap(null,e,t,n[1],r),n=jp(n,t.attrs,r),Op(e,t,r,n))}else a=kp(e,t,r)}return a!==void 0&&(r?t.residualClasses=a:t.residualStyles=a),n}function Dp(e,t,n){let r=n?t.classBindings:t.styleBindings;if(ip(r)!==0)return e[ep(r)]}function Op(e,t,n,r){let i=n?t.classBindings:t.styleBindings;e[ep(i)]=r}function kp(e,t,n){let r,i=t.directiveEnd;for(let a=1+t.directiveStylingLast;a<i;a++){let t=e[a].hostAttrs;r=jp(r,t,n)}return jp(r,t.attrs,n)}function Ap(e,t,n,r,i){let a=null,o=n.directiveEnd,s=n.directiveStylingLast;for(s===-1?s=n.directiveStart:s++;s<o&&(a=t[s],r=jp(r,a.hostAttrs,i),a!==e);)s++;return e!==null&&(n.directiveStylingLast=s),r}function jp(e,t,n){let r=n?1:2,i=-1;if(t!==null)for(let a=0;a<t.length;a++){let o=t[a];typeof o==`number`?i=o:i===r&&(Array.isArray(e)||(e=e===void 0?[]:[``,e]),yr(e,o,n?!0:t[++a]))}return e===void 0?null:e}function Mp(e,t,n){if(n==null||n===``)return wr;let r=[],i=Js(n);if(Array.isArray(i))for(let t=0;t<i.length;t++)e(r,i[t],!0);else if(i instanceof Set)for(let t of i)e(r,t,!0);else if(typeof i==`object`)for(let t in i)Object.hasOwn(i,t)&&e(r,t,i[t]);else typeof i==`string`&&t(r,i);return r}function Np(e,t,n){let r=String(t);r!==``&&!r.includes(` `)&&yr(e,r,n)}function Pp(e,t,n,r,i,a,o,s){i===Oc&&(i=wr);let c=0,l=0,u=0<i.length?i[0]:null,d=0<a.length?a[0]:null;for(;u!==null||d!==null;){let f=c<i.length?i[c+1]:void 0,p=l<a.length?a[l+1]:void 0,m=null,ee;u===d?(c+=2,l+=2,f!==p&&(m=d,ee=p)):d===null||u!==null&&u<d?(c+=2,m=u):(l+=2,m=d,ee=p),m!==null&&Fp(e,t,n,r,m,ee,o,s),u=c<i.length?i[c]:null,d=l<a.length?a[l]:null}}function Fp(e,t,n,r,i,a,o,s){if(!(t.type&3))return;let c=e.data,l=c[s+1];Lp(op(l)?Ip(c,t,n,i,ip(l),o):void 0)||(Lp(a)||tp(l)&&(a=Ip(c,null,n,i,s,o)),Tl(r,o,gi(pa(),n),i,a))}function Ip(e,t,n,r,i,a){let o=t===null,s;for(;i>0;){let t=e[i],a=Array.isArray(t),c=a?t[1]:t,l=c===null,u=n[i+1];u===Oc&&(u=l?wr:void 0);let d=l?br(u,r):c===r?u:void 0;if(a&&!Lp(d)&&(d=br(t,r)),Lp(d)&&(s=d,o))return s;let f=e[i+1];i=o?ep(f):ip(f)}if(t!==null){let e=a?t.residualClasses:t.residualStyles;e!=null&&(s=br(e,r))}return s}function Lp(e){return e!==void 0}function Rp(e,t){return e==null||e===``||(typeof t==`string`?e+=t:typeof e==`object`&&(e=En(Js(e)))),e}function zp(e,t){return(e.flags&(t?8:16))!=0}function G(e,t=``){let n=T(),r=E(),i=e+27,a=r.firstCreatePass?Bu(r,i,1,t,null):r.data[i],o=Bp(r,n,a,t);n[i]=o,va()&&_l(r,n,o,a),Wi(a,!1)}var Bp=(e,t,n,r)=>(ya(!0),$s(t[11],r));function Vp(e,t,n,r=``){return nd(e,Xi(),n)?t+Yn(n)+r:Oc}function K(e){return Hp(``,e),K}function Hp(e,t,n){let r=T(),i=Vp(r,e,t,n);return i!==Oc&&Up(r,pa(),i),Hp}function Up(e,t,n){let r=gi(t,e);ec(e[11],r,n)}var Wp=(()=>{class e{applicationErrorHandler=C(Ya);appRef=C(bf);taskService=C(Oa);ngZone=C(Ia);zonelessEnabled=C(oo);tracing=C(zc,{optional:!0});zoneIsDefined=typeof Zone<`u`&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new $e;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(Pa):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(C(so,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let e=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(e);return}this.switchToMicrotaskScheduler(),this.taskService.remove(e)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let e=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(e)})})}notify(e){if(!this.zonelessEnabled&&e===5)return;switch(e){case 0:case 2:this.appRef.dirtyFlags|=2;break;case 3:case 4:case 5:case 1:this.appRef.dirtyFlags|=4;break;case 6:this.appRef.dirtyFlags|=2;break;case 12:this.appRef.dirtyFlags|=16;break;case 13:this.appRef.dirtyFlags|=2;break;case 11:break;default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let t=this.useMicrotaskScheduler?Ma:ja;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>t(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>t(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(`isAngularZone_ID`+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let e=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(e){this.applicationErrorHandler(e)}finally{this.taskService.remove(e),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let e=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(e)}}static ɵfac=function(t){return new(t||e)};static ɵprov=_s({token:e,factory:e.ɵfac})}return e})();function Gp(){return Vc(`NgZoneless`),kr([...Kp(),[]])}function Kp(){return[{provide:ao,useExisting:Wp},{provide:Ia,useClass:Wa},{provide:oo,useValue:!0}]}function qp(){return typeof $localize<`u`&&$localize.locale||`en-US`}var Jp=new b(``,{factory:()=>C(Jp,{optional:!0,skipSelf:!0})||qp()}),Yp=class{destroyed=!1;listeners=null;errorHandler=C(Ja,{optional:!0});isEmitting=!1;hasNullListeners=!1;destroyRef=C(wa);constructor(){this.destroyRef.onDestroy(()=>{this.destroyed=!0,this.listeners=null})}subscribe(e){if(this.destroyed)throw new _(953,!1);return(this.listeners??=[]).push(e),{unsubscribe:()=>{let t=this.listeners?this.listeners.indexOf(e):-1;t>-1&&(this.isEmitting?(this.hasNullListeners=!0,this.listeners[t]=null):this.listeners.splice(t,1))}}}emit(e){if(this.destroyed){console.warn(Tn(953,!1));return}if(this.listeners===null)return;this.isEmitting=!0;let t=d(null);try{for(let t of this.listeners)try{t!==null&&t(e)}catch(e){this.errorHandler?.handleError(e)}}finally{this.hasNullListeners&&(this.hasNullListeners=!1,this.listeners&&Xp(this.listeners)),d(t),this.isEmitting=!1}}};function Xp(e){let t=e.length-1;for(;t>-1;)e[t]===null&&e.splice(t,1),t--}function Zp(e,t){return _e(e,t?.equal)}var Qp=Symbol(`InputSignalNode#UNSET`),$p={...je,transformFn:void 0,applyValueToInputSignal(e,t){ke(e,t)}};function em(e,t){let n=Object.create($p);n.value=e,n.transformFn=t?.transform;function r(){if(m(n),n.value===Qp)throw new _(-950,null);return n.value}return r[u]=n,r}function tm(e){return new Yp}function nm(e,t){return em(e,t)}function rm(e){return em(Qp,e)}var im=(nm.required=rm,nm),am=new b(``),om=new b(``);function sm(e){return!e.moduleRef}function cm(e){let t=sm(e)?e.r3Injector:e.moduleRef.injector,n=t.get(Ia);return n.run(()=>{sm(e)?e.r3Injector.resolveInjectorInitializers():e.moduleRef.resolveInjectorInitializers();let r=t.get(Ya),i;if(n.runOutsideAngular(()=>{i=n.onError.subscribe({next:r})}),sm(e)){let n=()=>t.destroy(),r=e.platformInjector.get(am);r.add(n),t.onDestroy(()=>{i.unsubscribe(),r.delete(n)})}else{let t=()=>e.moduleRef.destroy(),n=e.platformInjector.get(am);n.add(t),e.moduleRef.onDestroy(()=>{Sf(e.allPlatformModules,e.moduleRef),i.unsubscribe(),n.delete(t)})}return um(r,n,()=>{let n=t.get(Oa),r=n.add(),i=t.get(df);return i.runInitializers(),i.donePromise.then(()=>{if(Zf(t.get(Jp,`en-US`)||`en-US`),!t.get(om,!0))return sm(e)?t.get(bf):(e.allPlatformModules.push(e.moduleRef),e.moduleRef);if(sm(e)){let n=t.get(bf);return e.rootComponent!==void 0&&n.bootstrap(e.rootComponent),n}else return lm?.(e.moduleRef,e.allPlatformModules),e.moduleRef}).finally(()=>void n.remove(r))})})}var lm;function um(e,t,n){try{let r=n();return Yd(r)?r.catch(n=>{throw t.runOutsideAngular(()=>e(n)),n}):r}catch(n){throw t.runOutsideAngular(()=>e(n)),n}}var dm=null;function fm(e=[],t){return Sa.create({name:t,providers:[{provide:Br,useValue:`platform`},{provide:am,useValue:new Set([()=>dm=null])},...e]})}function pm(e=[]){if(dm)return dm;let t=fm(e);return dm=t,vf(),mm(t),t}function mm(e){let t=e.get(eo,null);ri(e,()=>{t?.forEach(e=>e())})}function hm(e){let{rootComponent:t,appProviders:n,platformProviders:r,platformRef:i}=e;j(A.BootstrapApplicationStart);try{let e=i?.injector??pm(r);return cm({r3Injector:new Qd({providers:[Kp(),Xa,...n||[]],parent:e,debugName:``,runEnvironmentInitializers:!1}).injector,platformInjector:e,rootComponent:t})}catch(e){return Promise.reject(e)}finally{j(A.BootstrapApplicationEnd)}}var gm=null;function _m(){return gm}function vm(e){gm??=e}var ym=class{};function bm(e,t){t=encodeURIComponent(t);for(let n of e.split(`;`)){let e=n.indexOf(`=`),[r,i]=e==-1?[n,``]:[n.slice(0,e),n.slice(e+1)];if(r.trim()===t)return decodeURIComponent(i)}return null}var xm=`browser`,Sm=class{_doc;constructor(e){this._doc=e}manager},Cm=(()=>{class e extends Sm{constructor(e){super(e)}supports(e){return!0}addEventListener(e,t,n,r){return e.addEventListener(t,n,r),()=>this.removeEventListener(e,t,n,r)}removeEventListener(e,t,n,r){return e.removeEventListener(t,n,r)}static ɵfac=function(t){return new(t||e)(S(Ca))};static ɵprov=y({token:e,factory:e.ɵfac})}return e})(),wm=new b(``),Tm=(()=>{class e{_zone;_plugins;_eventNameToPlugin=new Map;constructor(e,t){this._zone=t,e.forEach(e=>{e.manager=this});let n=e.filter(e=>!(e instanceof Cm));this._plugins=n.slice().reverse();let r=e.find(e=>e instanceof Cm);r&&this._plugins.push(r)}addEventListener(e,t,n,r){return this._findPluginFor(t).addEventListener(e,t,n,r)}getZone(){return this._zone}_findPluginFor(e){let t=this._eventNameToPlugin.get(e);if(t)return t;if(t=this._plugins.find(t=>t.supports(e)),!t)throw new _(-5101,!1);return this._eventNameToPlugin.set(e,t),t}static ɵfac=function(t){return new(t||e)(S(wm),S(Ia))};static ɵprov=y({token:e,factory:e.ɵfac})}return e})(),Em=`ng-app-id`;function Dm(e){for(let t of e)t.remove()}function Om(e,t){let n=t.createElement(`style`);return n.textContent=e,n}function km(e,t,n,r){let i=e.head?.querySelectorAll(`style[${Em}="${t}"],link[${Em}="${t}"]`);if(!i||i.length===0)return!1;for(let e of i)e.removeAttribute(Em),e instanceof HTMLLinkElement?r.set(e.href.slice(e.href.lastIndexOf(`/`)+1),{usage:0,elements:[e]}):e.textContent&&n.set(e.textContent,{usage:0,elements:[e]});return!0}function Am(e,t){let n=t.createElement(`link`);return n.setAttribute(`rel`,`stylesheet`),n.setAttribute(`href`,e),n}var jm=(()=>{class e{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(e,t,n,r={}){this.doc=e,this.appId=t,this.nonce=n,km(e,t,this.inline,this.external)&&this.hosts.add(e.head)}addStyles(e,t){for(let t of e)this.addUsage(t,this.inline,Om);t?.forEach(e=>this.addUsage(e,this.external,Am))}removeStyles(e,t){for(let t of e)this.removeUsage(t,this.inline);t?.forEach(e=>this.removeUsage(e,this.external))}addUsage(e,t,n){let r=t.get(e);r?r.usage++:t.set(e,{usage:1,elements:[...this.hosts].map(t=>this.addElement(t,n(e,this.doc)))})}removeUsage(e,t){let n=t.get(e);n&&(n.usage--,n.usage<=0&&(Dm(n.elements),t.delete(e)))}ngOnDestroy(){for(let[,{elements:e}]of[...this.inline,...this.external])Dm(e);this.hosts.clear()}addHost(e){if(!this.hosts.has(e)){this.hosts.add(e);for(let[t,{elements:n}]of this.inline)n.push(this.addElement(e,Om(t,this.doc)));for(let[t,{elements:n}]of this.external)n.push(this.addElement(e,Am(t,this.doc)))}}removeHost(e){this.hosts.delete(e);for(let t of[...this.inline.values(),...this.external.values()]){let n=[];for(let r of t.elements)r.parentNode===e?r.remove():n.push(r);t.elements=n}}addElement(e,t){return this.nonce&&t.setAttribute(`nonce`,this.nonce),e.appendChild(t)}static ɵfac=function(t){return new(t||e)(S(Ca),S(Qa),S(no,8),S(to))};static ɵprov=y({token:e,factory:e.ɵfac})}return e})(),Mm={svg:`http://www.w3.org/2000/svg`,xhtml:`http://www.w3.org/1999/xhtml`,xlink:`http://www.w3.org/1999/xlink`,xml:`http://www.w3.org/XML/1998/namespace`,xmlns:`http://www.w3.org/2000/xmlns/`,math:`http://www.w3.org/1998/Math/MathML`},Nm=/%COMP%/g,Pm=`%COMP%`,Fm=`_nghost-${Pm}`,Im=`_ngcontent-${Pm}`,Lm=!0,Rm=new b(``,{factory:()=>Lm});function zm(e){return Im.replace(Nm,e)}function Bm(e){return Fm.replace(Nm,e)}function Vm(e,t){return t.map(t=>t.replace(Nm,e))}var Hm=(()=>{class e{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(e,t,n,r,i,a,o=null,s=null){this.eventManager=e,this.sharedStylesHost=t,this.appId=n,this.removeStylesOnCompDestroy=r,this.doc=i,this.ngZone=a,this.nonce=o,this.tracingService=s,this.defaultRenderer=new Um(e,i,a,this.tracingService)}createRenderer(e,t){if(!e||!t)return this.defaultRenderer;let n=this.getOrCreateRenderer(e,t);return n instanceof qm?n.applyToHost(e):n instanceof Km&&n.applyStyles(),n}getOrCreateRenderer(e,t){let n=this.rendererByCompId,r=n.get(t.id);if(!r){let i=this.doc,a=this.ngZone,o=this.eventManager,s=this.sharedStylesHost,c=this.removeStylesOnCompDestroy,l=this.tracingService;switch(t.encapsulation){case Ks.Emulated:r=new qm(o,s,t,this.appId,c,i,a,l);break;case Ks.ShadowDom:return new Gm(o,e,t,i,a,this.nonce,l,s);case Ks.ExperimentalIsolatedShadowDom:return new Gm(o,e,t,i,a,this.nonce,l);default:r=new Km(o,s,t,c,i,a,l);break}n.set(t.id,r)}return r}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(e){this.rendererByCompId.delete(e)}static ɵfac=function(t){return new(t||e)(S(Tm),S(dd),S(Qa),S(Rm),S(Ca),S(Ia),S(no),S(zc,8))};static ɵprov=y({token:e,factory:e.ɵfac})}return e})(),Um=class{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(e,t,n,r){this.eventManager=e,this.doc=t,this.ngZone=n,this.tracingService=r}destroy(){}destroyNode=null;createElement(e,t){return t?this.doc.createElementNS(Mm[t]||t,e):this.doc.createElement(e)}createComment(e){return this.doc.createComment(e)}createText(e){return this.doc.createTextNode(e)}appendChild(e,t){(Wm(e)?e.content:e).appendChild(t)}insertBefore(e,t,n){e&&(Wm(e)?e.content:e).insertBefore(t,n)}removeChild(e,t){t.remove()}selectRootElement(e,t){let n=typeof e==`string`?this.doc.querySelector(e):e;if(!n)throw new _(-5104,!1);return t||(n.textContent=``),n}parentNode(e){return e.parentNode}nextSibling(e){return e.nextSibling}setAttribute(e,t,n,r){if(r){t=r+`:`+t;let i=Mm[r];i?e.setAttributeNS(i,t,n):e.setAttribute(t,n)}else e.setAttribute(t,n)}removeAttribute(e,t,n){if(n){let r=Mm[n];r?e.removeAttributeNS(r,t):e.removeAttribute(`${n}:${t}`)}else e.removeAttribute(t)}addClass(e,t){e.classList.add(t)}removeClass(e,t){e.classList.remove(t)}setStyle(e,t,n,r){r&(kc.DashCase|kc.Important)?e.style.setProperty(t,n,r&kc.Important?`important`:``):e.style[t]=n}removeStyle(e,t,n){n&kc.DashCase?e.style.removeProperty(t):e.style[t]=``}setProperty(e,t,n){e!=null&&(e[t]=n)}setValue(e,t){e.nodeValue=t}listen(e,t,n,r){if(typeof e==`string`&&(e=_m().getGlobalEventTarget(this.doc,e),!e))throw new _(-5102,!1);let i=this.decoratePreventDefault(n);return this.tracingService?.wrapEventListener&&(i=this.tracingService.wrapEventListener(e,t,i)),this.eventManager.addEventListener(e,t,i,r)}decoratePreventDefault(e){return t=>{if(t===`__ngUnwrap__`)return e;e(t)===!1&&t.preventDefault()}}};function Wm(e){return e.tagName===`TEMPLATE`&&e.content!==void 0}var Gm=class extends Um{hostEl;sharedStylesHost;shadowRoot;constructor(e,t,n,r,i,a,o,s){super(e,r,i,o),this.hostEl=t,this.sharedStylesHost=s,this.shadowRoot=t.attachShadow({mode:`open`}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let c=n.styles;c=Vm(n.id,c);for(let e of c){let t=document.createElement(`style`);a&&t.setAttribute(`nonce`,a),t.textContent=e,this.shadowRoot.appendChild(t)}let l=n.getExternalStyles?.();if(l)for(let e of l){let t=Am(e,r);a&&t.setAttribute(`nonce`,a),this.shadowRoot.appendChild(t)}}nodeOrShadowRoot(e){return e===this.hostEl?this.shadowRoot:e}appendChild(e,t){return super.appendChild(this.nodeOrShadowRoot(e),t)}insertBefore(e,t,n){return super.insertBefore(this.nodeOrShadowRoot(e),t,n)}removeChild(e,t){return super.removeChild(null,t)}parentNode(e){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},Km=class extends Um{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(e,t,n,r,i,a,o,s){super(e,i,a,o),this.sharedStylesHost=t,this.removeStylesOnCompDestroy=r;let c=n.styles;this.styles=s?Vm(s,c):c,this.styleUrls=n.getExternalStyles?.(s)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&Lc.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},qm=class extends Km{contentAttr;hostAttr;constructor(e,t,n,r,i,a,o,s){let c=r+`-`+n.id;super(e,t,n,i,a,o,s,c),this.contentAttr=zm(c),this.hostAttr=Bm(c)}applyToHost(e){this.applyStyles(),this.setAttribute(e,this.hostAttr,``)}createElement(e,t){let n=super.createElement(e,t);return super.setAttribute(n,this.contentAttr,``),n}},Jm=class e extends ym{supportsDOMEvents=!0;static makeCurrent(){vm(new e)}onAndCancel(e,t,n,r){return e.addEventListener(t,n,r),()=>{e.removeEventListener(t,n,r)}}dispatchEvent(e,t){e.dispatchEvent(t)}remove(e){e.remove()}createElement(e,t){return t||=this.getDefaultDocument(),t.createElement(e)}createHtmlDocument(){return document.implementation.createHTMLDocument(`fakeTitle`)}getDefaultDocument(){return document}isElementNode(e){return e.nodeType===Node.ELEMENT_NODE}isShadowRoot(e){return e instanceof DocumentFragment}getGlobalEventTarget(e,t){return t===`window`?window:t===`document`?e:t===`body`?e.body:null}getBaseHref(e){let t=Xm();return t==null?null:Zm(t)}resetBaseElement(){Ym=null}getUserAgent(){return window.navigator.userAgent}getCookie(e){return bm(document.cookie,e)}},Ym=null;function Xm(){return Ym||=document.head.querySelector(`base`),Ym?Ym.getAttribute(`href`):null}function Zm(e){return new URL(e,document.baseURI).pathname}var Qm=[`alt`,`control`,`meta`,`shift`],$m={"\b":`Backspace`,"	":`Tab`,"":`Delete`,"\x1B":`Escape`,Del:`Delete`,Esc:`Escape`,Left:`ArrowLeft`,Right:`ArrowRight`,Up:`ArrowUp`,Down:`ArrowDown`,Menu:`ContextMenu`,Scroll:`ScrollLock`,Win:`OS`},eh={alt:e=>e.altKey,control:e=>e.ctrlKey,meta:e=>e.metaKey,shift:e=>e.shiftKey},th=(()=>{class e extends Sm{constructor(e){super(e)}supports(t){return e.parseEventName(t)!=null}addEventListener(t,n,r,i){let a=e.parseEventName(n),o=e.eventCallback(a.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>_m().onAndCancel(t,a.domEventName,o,i))}static parseEventName(t){let n=t.toLowerCase().split(`.`),r=n.shift();if(n.length===0||!(r===`keydown`||r===`keyup`))return null;let i=e._normalizeKey(n.pop()),a=``,o=n.indexOf(`code`);if(o>-1&&(n.splice(o,1),a=`code.`),Qm.forEach(e=>{let t=n.indexOf(e);t>-1&&(n.splice(t,1),a+=e+`.`)}),a+=i,n.length!=0||i.length===0)return null;let s={};return s.domEventName=r,s.fullKey=a,s}static matchEventFullKeyCode(e,t){let n=$m[e.key]||e.key,r=``;return t.indexOf(`code.`)>-1&&(n=e.code,r=`code.`),n==null||!n?!1:(n=n.toLowerCase(),n===` `?n=`space`:n===`.`&&(n=`dot`),Qm.forEach(t=>{if(t!==n){let n=eh[t];n(e)&&(r+=t+`.`)}}),r+=n,r===t)}static eventCallback(t,n,r){return i=>{e.matchEventFullKeyCode(i,t)&&r.runGuarded(()=>n(i))}}static _normalizeKey(e){return e===`esc`?`escape`:e}static ɵfac=function(t){return new(t||e)(S(Ca))};static ɵprov=y({token:e,factory:e.ɵfac})}return e})();async function nh(e,t,n){return hm({rootComponent:e,...rh(t,n)})}function rh(e,t){return{platformRef:t?.platformRef,appProviders:[...ch,...e?.providers??[]],platformProviders:sh}}function ih(){Jm.makeCurrent()}function ah(){return new Ja}function oh(){return Ps(document),document}var sh=[{provide:to,useValue:xm},{provide:eo,useValue:ih,multi:!0},{provide:Ca,useFactory:oh}],ch=[{provide:Br,useValue:`root`},{provide:Ja,useFactory:ah},{provide:wm,useClass:Cm,multi:!0},{provide:wm,useClass:th,multi:!0},Hm,{provide:dd,useClass:jm},{provide:jm,useExisting:dd},Tm,{provide:Zu,useExisting:Hm},[]],lh=`#0f4d0e`,uh=`fsolitaire-presentation`,dh=`fsolitaire-settings`,fh={cardBackStyle:`card-back-blue`,backgroundColor:lh};function ph(e){return e===`card-back-blue`||e===`card-back-red`}function mh(){if(typeof localStorage>`u`)return{...fh};for(let e of[uh,dh])try{let t=localStorage.getItem(e);if(!t)continue;let n=JSON.parse(t);return{cardBackStyle:ph(n.cardBackStyle)?n.cardBackStyle:fh.cardBackStyle,backgroundColor:typeof n.backgroundColor==`string`&&n.backgroundColor?n.backgroundColor:fh.backgroundColor}}catch(t){console.warn(`Failed to load presentation settings from ${e}:`,t)}return{...fh}}var hh=class e{cardBackStyle$;backgroundColor$;constructor(){let e=mh();this.cardBackStyle$=new It(e.cardBackStyle),this.backgroundColor$=new It(e.backgroundColor);let t=!1;Sn(this.cardBackStyle$,this.backgroundColor$).subscribe(()=>{t&&this.save()}),t=!0}cardBackKey(){return this.cardBackStyle}onBackgroundColor=e=>{let t=this.backgroundColor$.subscribe(e);return()=>t.unsubscribe()};get cardBackStyle(){return this.cardBackStyle$.value}setCardBackStyle(e){this.cardBackStyle!==e&&this.cardBackStyle$.next(e)}get backgroundColor(){return this.backgroundColor$.value}setBackgroundColor(e){this.backgroundColor!==e&&this.backgroundColor$.next(e)}save(){if(!(typeof localStorage>`u`))try{let e={cardBackStyle:this.cardBackStyle,backgroundColor:this.backgroundColor};localStorage.setItem(uh,JSON.stringify(e))}catch(e){console.warn(`Failed to save presentation settings:`,e)}}static ɵfac=function(t){return new(t||e)};static ɵprov=y({token:e,factory:e.ɵfac,providedIn:`root`})},gh={green:{name:`Emerald Felt`,color:`#0f4d0e`,bgClass:`theme-green`},blue:{name:`Deep Ocean`,color:`#1b4353`,bgClass:`theme-blue`},charcoal:{name:`Midnight Charcoal`,color:`#2b2d42`,bgClass:`theme-charcoal`},purple:{name:`Royal Velvet`,color:`#3c096c`,bgClass:`theme-purple`}},_h=`green`,vh=class e{presentation=C(hh);themes=gh;themeKeys=Object.keys(gh);selectedTheme=k(_h);currentBgClass=Zp(()=>this.themes[this.selectedTheme()].bgClass);constructor(){let e=this.presentation.backgroundColor,t=this.themeKeys.find(t=>this.themes[t].color===e);this.setTheme(t??this.selectedTheme())}setTheme(e){this.selectedTheme.set(e),this.presentation.setBackgroundColor(this.themes[e].color)}static ɵfac=function(t){return new(t||e)};static ɵprov=y({token:e,factory:e.ɵfac,providedIn:`root`})};function yh(e,t){let n=t?.manualCleanup?null:t?.injector?.get(wa)??C(wa),r=bh(t?.equal),i;i=t?.requireSync?k({kind:0},{equal:r}):k({kind:1,value:t?.initialValue},{equal:r});let a,o=e.subscribe({next:e=>i.set({kind:1,value:e}),error:e=>{i.set({kind:2,error:e}),a?.()},complete:()=>{a?.()}});if(t?.requireSync&&i().kind===0)throw new _(601,!1);return a=n?.onDestroy(o.unsubscribe.bind(o)),Zp(()=>{let e=i();switch(e.kind){case 1:return e.value;case 2:throw e.error;case 0:throw new _(601,!1)}},{equal:t?.equal})}function bh(e=Object.is){return(t,n)=>t.kind===1&&n.kind===1&&e(t.value,n.value)}var xh=class{id;suit;rank;faceUp;faceKey;constructor(e,t,n,r=!1,i=Eh({suit:t,rank:n})){this.id=e,this.suit=t,this.rank=n,this.faceUp=r,this.faceKey=i}},q;(function(e){e[e.SPADE=0]=`SPADE`,e[e.HEART=1]=`HEART`,e[e.DIAMOND=2]=`DIAMOND`,e[e.CLUB=3]=`CLUB`})(q||={});var J;(function(e){e[e.ACE=0]=`ACE`,e[e.TWO=1]=`TWO`,e[e.THREE=2]=`THREE`,e[e.FOUR=3]=`FOUR`,e[e.FIVE=4]=`FIVE`,e[e.SIX=5]=`SIX`,e[e.SEVEN=6]=`SEVEN`,e[e.EIGHT=7]=`EIGHT`,e[e.NINE=8]=`NINE`,e[e.TEN=9]=`TEN`,e[e.JACK=10]=`JACK`,e[e.QUEEN=11]=`QUEEN`,e[e.KING=12]=`KING`})(J||={});var Sh=[q.SPADE,q.HEART,q.DIAMOND,q.CLUB],Ch=[J.ACE,J.TWO,J.THREE,J.FOUR,J.FIVE,J.SIX,J.SEVEN,J.EIGHT,J.NINE,J.TEN,J.JACK,J.QUEEN,J.KING];function wh(e){return e===J.KING?void 0:e+1}function Th(e){return e===J.ACE?void 0:e-1}function Eh(e){return`card-${Ah(e.suit)}-${jh(e.rank)}`}function Dh(e){let t=Eh(e),n=e.deckIndex??0;return n===0?t:`${t}#${n}`}var Oh={[q.SPADE]:`spades`,[q.HEART]:`hearts`,[q.DIAMOND]:`diamonds`,[q.CLUB]:`clubs`},kh={[J.ACE]:`ace`,[J.TWO]:`2`,[J.THREE]:`3`,[J.FOUR]:`4`,[J.FIVE]:`5`,[J.SIX]:`6`,[J.SEVEN]:`7`,[J.EIGHT]:`8`,[J.NINE]:`9`,[J.TEN]:`10`,[J.JACK]:`jack`,[J.QUEEN]:`queen`,[J.KING]:`king`};function Ah(e){let t=Oh[e];if(t===void 0)throw Error(`Unknown Suit: ${String(e)}`);return t}function jh(e){let t=kh[e];if(t===void 0)throw Error(`Unknown Rank: ${String(e)}`);return t}var Mh={suits:Sh,ranks:Ch,copies:1};function Nh(e=Mh){let t=[];for(let n=0;n<e.copies;n++)for(let r of e.suits)for(let i of e.ranks)t.push({suit:r,rank:i,deckIndex:n});return t}var Ph=Nh(),Fh=`fsolitaire-settings`,Ih={drawCount:3,debug:{almostWin:!1}};function Lh(){return{...Ih,debug:{...Ih.debug}}}function Rh(){if(typeof localStorage>`u`)return Lh();try{let e=localStorage.getItem(Fh);if(!e)return Lh();let t=JSON.parse(e);return{drawCount:t.drawCount===1||t.drawCount===3?t.drawCount:Ih.drawCount,debug:{almostWin:typeof t.debug?.almostWin==`boolean`?t.debug.almostWin:Ih.debug.almostWin}}}catch(e){return console.warn(`Failed to load settings from localStorage:`,e),Lh()}}var zh=class{almostWin$;constructor(e=!1){this.almostWin$=new It(e)}get almostWin(){return this.almostWin$.value}setAlmostWin(e){this.almostWin!==e&&this.almostWin$.next(e)}},Bh=class{drawCount$;debug;constructor(){let e=Rh();this.drawCount$=new It(e.drawCount),this.debug=new zh(e.debug.almostWin);let t=!1;Sn(this.drawCount$,this.debug.almostWin$).subscribe(()=>{t&&this.saveToLocalStorage()}),t=!0}saveToLocalStorage(){if(!(typeof localStorage>`u`))try{let e={drawCount:this.drawCount,debug:{almostWin:this.debug.almostWin}};localStorage.setItem(Fh,JSON.stringify(e))}catch(e){console.warn(`Failed to save settings to localStorage:`,e)}}get drawCount(){return this.drawCount$.value}setDrawCount(e){this.drawCount!==e&&this.drawCount$.next(e)}},Vh=class{cardsById=new Map;get size(){return this.cardsById.size}ids(){return[...this.cardsById.keys()]}get(e){return this.cardsById.get(e)}getOrCreate(e){let t=Dh(e),n=this.cardsById.get(t);return n||(n=new xh(t,e.suit,e.rank,!1,Eh(e)),this.cardsById.set(t,n)),n}},Hh=class{pileByCardId=new Map;get(e){return this.pileByCardId.get(e)}record(e,t){this.pileByCardId.set(e,t)}forget(e){this.pileByCardId.delete(e)}},Uh=class{id;role;cards=[];locations;constructor(e=``,t=``,n){this.id=e,this.role=t,this.locations=n}getCards(){return this.cards}get topCard(){return this.cards[this.cards.length-1]}get isEmpty(){return this.cards.length===0}get size(){return this.cards.length}contains(e){return this.cards.includes(e)}addCard(e){this.cards.push(e),this.locations?.record(e.id,this)}removeCard(e){let t=this.cards.indexOf(e);t>-1&&(this.cards.splice(t,1),this.locations?.forget(e.id))}clear(){for(let e of this.cards)this.locations?.forget(e.id);this.cards.length=0}},Wh=class{listeners={};on(e,t){let n=this.listeners[e];n||(n=[],this.listeners[e]=n),n.push(t)}off(e,t){this.listeners[e]&&(this.listeners[e]=this.listeners[e].filter(e=>e!==t))}emit(e,t){let n=this.listeners[e];if(n)for(let e of[...n])e(t)}};function Gh(e){return e.transfers.flatMap(e=>e.cardIds)}var Kh=class{score$=new It(0);moves$=new It(0);undoDepth$=new It(0);get score(){return this.score$.value}set score(e){e!==this.score$.value&&this.score$.next(e)}get moves(){return this.moves$.value}set moves(e){e!==this.moves$.value&&this.moves$.next(e)}get undoDepth(){return this.undoDepth$.value}set undoDepth(e){e!==this.undoDepth$.value&&this.undoDepth$.next(e)}};function qh(e,t,n){switch(e.kind){case`none`:return!1;case`top-only`:return n.topCard===t;case`any-face-up`:return t.faceUp;case`run`:return t.faceUp&&Jh(n,t,e.adjacent)}}function Jh(e,t,n){let r=e.getCards(),i=r.indexOf(t);if(i===-1)return!1;for(let e=i;e<r.length-1;e++)if(!r[e].faceUp||!n(r[e],r[e+1]))return!1;return!0}function Yh(e,t,n){switch(e){case`always-down`:return n;case`always-up`:return t.faceKey;case`card`:return t.faceUp?t.faceKey:n}}function Xh(e,t,n){return e.capacity===void 0||t.size+n<=e.capacity}var Zh={scoreDelta:0,flippedCardIds:[]},Qh=class extends Wh{state=new Kh;locations=new Hh;pilesMap=new Map;pilesByRoleMap=new Map;history=[];relocationListeners=new Set;zones;registry;autoMoveRoles;constructor(e){super(),this.zones=e.zones,this.registry=e.registry,this.autoMoveRoles=e.autoMoveRoles;for(let e of this.zones()){let t=new Uh(e.id,e.role,this.locations);this.pilesMap.set(t.id,t);let n=this.pilesByRoleMap.get(e.role)??[];n.push(t),this.pilesByRoleMap.set(e.role,n)}}get dropTargetPiles(){return this.zones().filter(e=>e.accept!==null).map(e=>this.requirePile(e.id))}get piles(){return[...this.pilesMap.values()]}pilesOfRole(e){return this.pilesByRoleMap.get(e)??[]}getPileById(e){return this.pilesMap.get(e)}requirePile(e){let t=this.pilesMap.get(e);if(!t)throw Error(`No zone declares a pile with id: ${e}`);return t}getCardById(e){return this.registry.get(e)}get cardIds(){return this.registry.ids()}get cardsInPlay(){return this.registry.size}getPileContainingCard(e){return this.locations.get(e)}zoneFor(e){let t=this.zones();return this.zoneIndex?.source!==t&&(this.zoneIndex={source:t,byId:new Map(t.map(e=>[e.id,e]))}),this.zoneIndex.byId.get(e)}zoneIndex=null;board={pile:e=>this.getPileById(e),pilesByRole:e=>this.pilesOfRole(e),emptyCount:e=>this.pilesOfRole(e).filter(e=>e.isEmpty).length};resetPiles(){for(let e of this.pilesMap.values())e.clear()}canMoveCardToPile(e,t){return this.resolveMove(e,t)!==null}resolveMove(e,t){let n=this.getCardById(e),r=this.getPileById(t),i=this.getPileContainingCard(e),a=this.zoneFor(t);if(!n||!r||!i||!a?.accept||i.id===t||!n.faceUp)return null;let o=this.zoneFor(i.id);if(!o||!qh(o.grab,n,i))return null;let s=i.getCards(),c=s.slice(s.indexOf(n));return Xh(a,r,c.length)&&a.accept({card:n,movingStack:c,sourcePile:i,targetPile:r,board:this.board})?{movingStack:c,sourcePile:i,targetPile:r}:null}moveCardToPile(e,t){let n=this.resolveMove(e,t);if(!n)return!1;this.state.moves++;for(let e of n.movingStack)n.sourcePile.removeCard(e),n.targetPile.addCard(e);let r=this.applyMoveEffects(n);return this.record({kind:`move`,transfers:[{cardIds:n.movingStack.map(e=>e.id),fromPileId:n.sourcePile.id,toPileId:n.targetPile.id,faceUpBefore:!0},...r.followUpTransfers??[]],scoreDelta:r.scoreDelta,flippedCardIds:r.flippedCardIds}),this.afterMove(n),!0}applyMoveEffects(e){return Zh}afterMove(e){}autoMoveCard(e){let t=this.getPileContainingCard(e);for(let n of this.autoMoveRoles)for(let r of this.pilesOfRole(n))if(r.id!==t?.id&&this.moveCardToPile(e,r.id))return!0;return!1}undo(){let e=this.history.pop();if(this.state.undoDepth=this.history.length,!e)return!1;for(let t of e.flippedCardIds){let e=this.getCardById(t);e&&(e.faceUp=!1)}for(let t of[...e.transfers].reverse())this.reverseTransfer(t);return this.state.score=Math.max(0,this.state.score-e.scoreDelta),this.state.moves--,this.afterUndo(e),this.announceRelocation(e),!0}reverseTransfer(e){let t=this.getPileById(e.fromPileId),n=this.getPileById(e.toPileId);if(!(!t||!n))for(let r of e.cardIds){let i=this.getCardById(r);i&&(n.removeCard(i),i.faceUp=e.faceUpBefore,t.addCard(i))}}afterUndo(e){}get canUndo(){return this.history.length>0}record(e){this.history.push(e),this.state.undoDepth=this.history.length,this.announceRelocation(e)}onCardsRelocated(e){return this.relocationListeners.add(e),()=>this.relocationListeners.delete(e)}announceRelocation(e){let t=Gh(e);if(t.length!==0)for(let e of[...this.relocationListeners])e(t)}recordTransfers(e,t,n={}){this.record({kind:e,transfers:t,scoreDelta:n.scoreDelta??0,flippedCardIds:n.flippedCardIds??[]})}clearHistory(){this.history.length=0,this.state.undoDepth=0}isCardInteractable(e){let t=this.getPileContainingCard(e.id);return t?this.isCardInteractableInPile(e,t):!1}isCardInteractableInPile(e,t){let n=this.zoneFor(t.id);return n?qh(n.grab,e,t):!1}isCardDraggable(e){let t=this.getPileContainingCard(e.id);return t?this.isCardDraggableInPile(e,t):!1}isCardDraggableInPile(e,t){let n=this.zoneFor(t.id);return n?.draggable?qh(n.grab,e,t):!1}};function $h(e,t=Math.random){for(let n=e.length-1;n>0;n--){let r=Math.floor(t()*(n+1));[e[n],e[r]]=[e[r],e[n]]}}var eg=Ch.filter(e=>e!==J.KING),tg=class{registry;cardIds;random;constructor(e,t=Ph,n=Math.random){this.registry=e,this.cardIds=t,this.random=n}createShuffledDeck(){let e=this.registerAllFaceDown();return $h(e,this.random),e}dealOpeningLayout(e,t,n){for(let n=0;n<t.length;n++)for(let r=0;r<=n;r++){let i=e.pop();i&&(i.faceUp=r===n,t[n].addCard(i))}for(;e.length>0;){let t=e.pop();t&&(t.faceUp=!1,n.addCard(t))}}dealAlmostWin(e,t){this.registerAllFaceDown(),Sh.forEach((n,r)=>{for(let t of eg)this.placeFaceUp({suit:n,rank:t},e[r]);this.placeFaceUp({suit:n,rank:J.KING},t[r])})}registerAllFaceDown(){return this.cardIds.map(e=>{let t=this.registry.getOrCreate(e);return t.faceUp=!1,t})}placeFaceUp(e,t){let n=this.registry.get(Dh(e));n&&(n.faceUp=!0,t.addCard(n))}},ng=()=>!0;function rg(...e){return t=>e.every(e=>e(t))}function ig(...e){return t=>e.some(e=>e(t))}function ag(e,t){return n=>n.targetPile.isEmpty?e(n):t(n)}function og(e){return t=>e(t.card)}var sg=e=>e.movingStack.length===1;function cg(e){return t=>t.movingStack.length<=e(t)}function lg(e){return e.suit===q.HEART||e.suit===q.DIAMOND}function ug(e){return t=>t.rank===e}function dg(e,t){return t.rank===Th(e.rank)&&lg(e)!==lg(t)}function fg(e,t){return e.suit===t.suit&&t.rank===Th(e.rank)}var pg=e=>{let t=e.targetPile.topCard;return t?dg(t,e.card):!1},mg=e=>{let t=e.targetPile.topCard;return t?fg(t,e.card):!1},hg=e=>{let t=e.targetPile.topCard;return t?e.card.rank===Th(t.rank):!1},gg=e=>{let t=e.targetPile.topCard;return t?e.card.suit===t.suit&&e.card.rank===wh(t.rank):!1},_g=rg(sg,ag(og(ug(J.ACE)),gg)),Y={STOCK:`stock`,WASTE:`waste`,FOUNDATION:`foundation`,TABLEAU:`tableau`},vg=ag(og(ug(J.KING)),pg),yg=_g;function bg(e){switch(e){case Y.TABLEAU:return vg;case Y.FOUNDATION:return yg;default:return null}}var xg=`stock`,Sg=`waste`;function Cg(e){return`foundation-${e}`}function wg(e){return`tableau-${e}`}var Tg={kind:`fan-down`,faceUpGap:45,faceDownGap:18,hoverExpansion:15};function Eg(e){return{kind:`fan-right`,gap:55,maxVisible:e===1?1:3}}var Dg={kind:`stacked`};function Og(e){let t=kg.get(e);return t||(t=Ag(e),kg.set(e,t)),t}var kg=new Map;function Ag(e){let t=[{id:xg,role:Y.STOCK,slot:{pileId:xg,column:0,row:0},layout:Dg,accept:bg(Y.STOCK),grab:{kind:`top-only`},draggable:!1,face:`always-down`,backgroundKey:`card-placeholder-full-border-reset`,emptyIsActionable:!0},{id:Sg,role:Y.WASTE,slot:{pileId:Sg,column:1,row:0},layout:Eg(e),accept:bg(Y.WASTE),grab:{kind:`top-only`},draggable:!0,face:`always-up`}];for(let e=0;e<4;e++){let n=Cg(e);t.push({id:n,role:Y.FOUNDATION,slot:{pileId:n,column:3+e,row:0},layout:Dg,accept:bg(Y.FOUNDATION),grab:{kind:`top-only`},draggable:!0,face:`always-up`,backgroundKey:`card-placeholder-full-border-circle`})}for(let e=0;e<7;e++){let n=wg(e);t.push({id:n,role:Y.TABLEAU,slot:{pileId:n,column:e,row:1},layout:Tg,accept:bg(Y.TABLEAU),grab:{kind:`any-face-up`},draggable:!0,face:`card`,backgroundKey:`card-placeholder`})}return t}var jg=class e{static WASTE_TO_TABLEAU=5;static TO_FOUNDATION=10;static FOUNDATION_TO_TABLEAU=-15;static TABLEAU_FLIP_BONUS=5;static DRAW_ONE_RECYCLE_PENALTY=100;static DRAW_THREE_RECYCLE_PENALTY=20;moveScore(t,n){return t===Y.WASTE&&n===Y.TABLEAU?e.WASTE_TO_TABLEAU:t===Y.WASTE&&n===Y.FOUNDATION||t===Y.TABLEAU&&n===Y.FOUNDATION?e.TO_FOUNDATION:t===Y.FOUNDATION&&n===Y.TABLEAU?e.FOUNDATION_TO_TABLEAU:0}tableauFlipBonus(){return e.TABLEAU_FLIP_BONUS}recyclePenalty(t,n){return t===1?n>1?e.DRAW_ONE_RECYCLE_PENALTY:0:n>3?e.DRAW_THREE_RECYCLE_PENALTY:0}},Mg=class extends Qh{stock;waste;foundations;tableaus;settings;recycleCount=0;initialDeck=[];dealer;scoring;constructor(e=Ph,t=new jg,n=new Bh){let r=new Vh;super({zones:()=>Og(n.drawCount),registry:r,autoMoveRoles:[Y.FOUNDATION,Y.TABLEAU]}),this.settings=n,this.scoring=t,this.dealer=new tg(r,e),this.stock=this.requirePile(xg),this.waste=this.requirePile(Sg),this.foundations=this.pilesOfRole(Y.FOUNDATION),this.tableaus=this.pilesOfRole(Y.TABLEAU)}startNewGame(){this.beginGame(()=>{let e=this.dealer.createShuffledDeck();return this.initialDeck=[...e],e})}restartGame(){this.beginGame(()=>this.reuseInitialDeck())}beginGame(e){this.state.score=0,this.state.moves=0,this.recycleCount=0,this.clearHistory(),this.resetPiles(),this.settings.debug.almostWin?this.dealer.dealAlmostWin(this.foundations,this.tableaus):this.dealer.dealOpeningLayout(e(),this.tableaus,this.stock),this.emit(`game-reset`,void 0)}reuseInitialDeck(){return this.initialDeck.length===0&&(this.initialDeck=[...this.dealer.createShuffledDeck()]),this.initialDeck.map(e=>(e.faceUp=!1,e))}drawCardsFromStock(){this.stock.isEmpty&&this.waste.isEmpty||(this.state.moves++,this.stock.isEmpty?this.recycleWaste():this.drawFromStock())}drawFromStock(){let e=Math.min(this.settings.drawCount,this.stock.size),t=[];for(let n=0;n<e;n++){let e=this.stock.topCard;if(!e)break;this.stock.removeCard(e),e.faceUp=!0,this.waste.addCard(e),t.push(e)}this.recordTransfers(`draw`,[{cardIds:t.reverse().map(e=>e.id),fromPileId:this.stock.id,toPileId:this.waste.id,faceUpBefore:!1}])}recycleWaste(){let e=this.state.score;this.recycleCount++;let t=this.scoring.recyclePenalty(this.settings.drawCount,this.recycleCount);this.state.score=Math.max(0,this.state.score-t);let n=[...this.waste.getCards()],r=this.waste.topCard;for(;r;)this.waste.removeCard(r),r.faceUp=!1,this.stock.addCard(r),r=this.waste.topCard;this.recordTransfers(`recycle`,[{cardIds:n.map(e=>e.id),fromPileId:this.waste.id,toPileId:this.stock.id,faceUpBefore:!0}],{scoreDelta:this.state.score-e})}applyMoveEffects(e){let t=this.state.score;this.state.score=Math.max(0,this.state.score+this.scoring.moveScore(e.sourcePile.role,e.targetPile.role));let n=this.autoFlipExposedCard(e.sourcePile);return{scoreDelta:this.state.score-t,flippedCardIds:n?[n.id]:[]}}afterMove(){this.checkWinCondition()}afterUndo(e){e.kind===`recycle`&&this.recycleCount--}autoFlipExposedCard(e){if(e.role!==Y.TABLEAU)return;let t=e.topCard;if(!(!t||t.faceUp))return t.faceUp=!0,this.state.score+=this.scoring.tableauFlipBonus(),t}checkWinCondition(){let e=0;for(let t of this.foundations)e+=t.size;this.cardsInPlay>0&&e===this.cardsInPlay&&this.emit(`game-won`,void 0)}},Ng=class{registry;cardIds;random;constructor(e,t=Ph,n=Math.random){this.registry=e,this.cardIds=t,this.random=n}createShuffledDeck(){let e=this.cardIds.map(e=>{let t=this.registry.getOrCreate(e);return t.faceUp=!0,t});return $h(e,this.random),e}get deckSize(){return this.cardIds.length}dealOpeningLayout(e,t){if(t.length===0)return;let n=0;for(;e.length>0;){let r=e.pop();if(!r)break;r.faceUp=!0,t[n].addCard(r),n=(n+1)%t.length}}dealAlmostWin(e,t){let n=this.cardIds.map(e=>{let t=this.registry.getOrCreate(e);return t.faceUp=!0,t}),r=new Map;for(let e of n){let t=r.get(e.suit)??[];t.push(e),r.set(e.suit,t)}let i=0;for(let n of r.values()){let r=[...n].sort((e,t)=>e.rank-t.rank),a=e[i%e.length],o=t[i%t.length];for(let e of r.slice(0,r.length-1))a.addCard(e);let s=r[r.length-1];s&&o.addCard(s),i++}}},X={CELL:`cell`,FOUNDATION:`foundation`,TABLEAU:`tableau`},Pg={FREECELL:`freecell`,BAKERS:`bakers`,BAKERS_KINGS_ONLY:`bakers-kings-only`};function Fg(e){let t=e.board.emptyCount(X.CELL),n=e.board.emptyCount(X.TABLEAU),r=e.targetPile.isEmpty?Math.max(0,n-1):n;return(t+1)*2**r}function Ig(e){return e.board.emptyCount(X.CELL)+1}var Lg={[Pg.FREECELL]:{tableau:rg(ag(ng,pg),cg(Fg)),adjacent:dg},[Pg.BAKERS]:{tableau:rg(ag(ng,mg),cg(Fg)),adjacent:fg},[Pg.BAKERS_KINGS_ONLY]:{tableau:rg(ag(og(ug(J.KING)),mg),cg(Ig)),adjacent:fg}},Rg=rg(sg,ng),zg=_g;function Bg(e){return Lg[e].adjacent}function Vg(e,t){switch(e){case X.TABLEAU:return Lg[t].tableau;case X.CELL:return Rg;case X.FOUNDATION:return zg;default:return null}}function Hg(e){return`cell-${e}`}function Ug(e){return`foundation-${e}`}function Wg(e){return`tableau-${e}`}var Gg={kind:`fan-down`,faceUpGap:45,faceDownGap:45,hoverExpansion:15},Kg={kind:`stacked`};function qg(e){let t=Jg.get(e);return t||(t=Yg(e),Jg.set(e,t)),t}var Jg=new Map;function Yg(e){let t=[];for(let n=0;n<4;n++){let r=Hg(n);t.push({id:r,role:X.CELL,slot:{pileId:r,column:n,row:0},layout:Kg,capacity:1,accept:Vg(X.CELL,e),grab:{kind:`top-only`},draggable:!0,face:`always-up`,backgroundKey:`card-placeholder`})}for(let n=0;n<4;n++){let r=Ug(n);t.push({id:r,role:X.FOUNDATION,slot:{pileId:r,column:4+n,row:0},layout:Kg,accept:Vg(X.FOUNDATION,e),grab:{kind:`top-only`},draggable:!0,face:`always-up`,backgroundKey:`card-placeholder-full-border-circle`})}for(let n=0;n<8;n++){let r=Wg(n);t.push({id:r,role:X.TABLEAU,slot:{pileId:r,column:n,row:1},layout:Gg,accept:Vg(X.TABLEAU,e),grab:{kind:`run`,adjacent:Bg(e)},draggable:!0,face:`always-up`,backgroundKey:`card-placeholder`})}return t}var Xg=class extends Qh{cells;foundations;tableaus;initialDeck=[];dealer;almostWin=!1;constructor(e=Ph,t=Math.random,n=Pg.FREECELL){let r=new Vh;super({zones:()=>qg(n),registry:r,autoMoveRoles:[X.FOUNDATION,X.TABLEAU,X.CELL]}),this.dealer=new Ng(r,e,t),this.cells=this.pilesOfRole(X.CELL),this.foundations=this.pilesOfRole(X.FOUNDATION),this.tableaus=this.pilesOfRole(X.TABLEAU)}startNewGame(){this.beginGame(()=>{let e=this.dealer.createShuffledDeck();return this.initialDeck=[...e],e})}restartGame(){this.beginGame(()=>this.reuseInitialDeck())}beginGame(e){this.state.moves=0,this.clearHistory(),this.resetPiles(),this.almostWin?this.dealer.dealAlmostWin(this.foundations,this.tableaus):this.dealer.dealOpeningLayout(e(),this.tableaus),this.emit(`game-reset`,void 0)}reuseInitialDeck(){return this.initialDeck.length===0&&(this.initialDeck=[...this.dealer.createShuffledDeck()]),[...this.initialDeck]}afterMove(){let e=0;for(let t of this.foundations)e+=t.size;this.cardsInPlay>0&&e===this.cardsInPlay&&this.emit(`game-won`,void 0)}};function Zg(e){if(e.length<13)return-1;let t=e.length-13,n=e.slice(t);if(n[0].rank!==J.KING||n[n.length-1].rank!==J.ACE)return-1;for(let e=0;e<n.length-1;e++)if(!n[e].faceUp||!fg(n[e],n[e+1]))return-1;return t}function Qg(e){let t=e.topCard;if(!(!t||t.faceUp))return t.faceUp=!0,t}function $g(e,t){let n=[],r=[];for(let i of e){let e=Zg(i.getCards());if(e===-1)continue;let a=t.find(e=>e.isEmpty);if(!a)continue;let o=i.getCards().slice(e,e+13);for(let e of o)i.removeCard(e),a.addCard(e);n.push({cardIds:o.map(e=>e.id),fromPileId:i.id,toPileId:a.id,faceUpBefore:!0});let s=Qg(i);s&&r.push(s.id)}return{transfers:n,flippedCardIds:r}}var e_={suits:Sh,ranks:Ch,copies:2};q.SPADE;var t_={1:[q.SPADE],2:[q.SPADE,q.HEART],4:Sh};function n_(e){let t=t_[e];return{suits:t,ranks:Ch,copies:8/t.length}}var r_=class{registry;cardIds;random;constructor(e,t=Nh(e_),n=Math.random){this.registry=e,this.cardIds=t,this.random=n}createShuffledDeck(){let e=this.cardIds.map(e=>{let t=this.registry.getOrCreate(e);return t.faceUp=!1,t});return $h(e,this.random),e}dealOpeningLayout(e,t,n){if(t.length===0)return;let r=Math.min(54,e.length);for(let n=0;n<r;n++){let r=e.pop();if(!r)break;r.faceUp=!1,t[n%t.length].addCard(r)}for(let e of t){let t=e.topCard;t&&(t.faceUp=!0)}for(;e.length>0;){let t=e.pop();if(!t)break;t.faceUp=!1,n.addCard(t)}}},Z={STOCK:`stock`,FOUNDATION:`foundation`,TABLEAU:`tableau`},i_=ag(ng,hg);function a_(e){switch(e){case Z.TABLEAU:return i_;default:return null}}var o_=`stock`;function s_(e){return`foundation-${e}`}function c_(e){return`tableau-${e}`}var l_={kind:`fan-down`,faceUpGap:45,faceDownGap:18,hoverExpansion:15},u_={kind:`stacked`};function d_(){return f_}var f_=p_();function p_(){let e=[{id:o_,role:Z.STOCK,slot:{pileId:o_,column:0,row:0},layout:u_,accept:a_(Z.STOCK),grab:{kind:`top-only`},draggable:!1,face:`always-down`,backgroundKey:`card-placeholder-full-border-reset`}];for(let t=0;t<8;t++){let n=s_(t);e.push({id:n,role:Z.FOUNDATION,slot:{pileId:n,column:2+t,row:0},layout:u_,accept:a_(Z.FOUNDATION),grab:{kind:`none`},draggable:!1,face:`always-up`,backgroundKey:`card-placeholder-full-border-circle`})}for(let t=0;t<10;t++){let n=c_(t);e.push({id:n,role:Z.TABLEAU,slot:{pileId:n,column:t,row:1},layout:l_,accept:a_(Z.TABLEAU),grab:{kind:`run`,adjacent:fg},draggable:!0,face:`card`,backgroundKey:`card-placeholder`})}return e}var m_=class extends Qh{stock;foundations;tableaus;initialDeck=[];dealer;constructor(e=Nh(e_),t=Math.random){let n=new Vh;super({zones:()=>d_(),registry:n,autoMoveRoles:[Z.TABLEAU]}),this.dealer=new r_(n,e,t),this.stock=this.requirePile(o_),this.foundations=this.pilesOfRole(Z.FOUNDATION),this.tableaus=this.pilesOfRole(Z.TABLEAU)}startNewGame(){this.beginGame(()=>{let e=this.dealer.createShuffledDeck();return this.initialDeck=[...e],e})}restartGame(){this.beginGame(()=>this.reuseInitialDeck())}beginGame(e){this.state.score=0,this.state.moves=0,this.clearHistory(),this.resetPiles(),this.dealer.dealOpeningLayout(e(),this.tableaus,this.stock),this.emit(`game-reset`,void 0)}reuseInitialDeck(){return this.initialDeck.length===0&&(this.initialDeck=[...this.dealer.createShuffledDeck()]),this.initialDeck.map(e=>(e.faceUp=!1,e))}get canDeal(){return!this.stock.isEmpty&&this.tableaus.every(e=>!e.isEmpty)}dealRow(){if(!this.canDeal)return!1;this.state.moves++;let e=[];for(let t of this.tableaus){let n=this.stock.topCard;if(!n)break;this.stock.removeCard(n),n.faceUp=!0,t.addCard(n),e.push({cardIds:[n.id],fromPileId:this.stock.id,toPileId:t.id,faceUpBefore:!1})}let t=$g(this.tableaus,this.foundations);return this.recordTransfers(`deal`,[...e,...t.transfers],{flippedCardIds:t.flippedCardIds}),this.checkWinCondition(),!0}applyMoveEffects(e){let t=e.sourcePile.role===Z.TABLEAU?Qg(e.sourcePile):void 0,n=$g(this.tableaus,this.foundations);return{scoreDelta:0,flippedCardIds:[...t?[t.id]:[],...n.flippedCardIds],followUpTransfers:n.transfers}}afterMove(){this.checkWinCondition()}checkWinCondition(){let e=this.foundations.reduce((e,t)=>e+t.size,0);this.cardsInPlay>0&&e===this.cardsInPlay&&this.emit(`game-won`,void 0)}},h_=class{registry;cardIds;random;constructor(e,t=Ph,n=Math.random){this.registry=e,this.cardIds=t,this.random=n}createShuffledDeck(){let e=this.cardIds.map(e=>{let t=this.registry.getOrCreate(e);return t.faceUp=!1,t});return $h(e,this.random),e}dealOpeningLayout(e,t){for(let n=0;n<t.length;n++){let r=n===0?1:5;for(let i=0;i<n+r;i++){let r=e.pop();if(!r)return;r.faceUp=i>=n,t[n].addCard(r)}}}},g_={FOUNDATION:`foundation`,TABLEAU:`tableau`},__={YUKON:0,ALASKA:1,RUSSIAN:2},v_=__.YUKON,y_={[__.YUKON]:pg,[__.ALASKA]:ig(gg,mg),[__.RUSSIAN]:mg};function b_(e){return ag(og(ug(J.KING)),y_[e])}var x_=_g;function S_(e,t){switch(e){case g_.TABLEAU:return b_(t);case g_.FOUNDATION:return x_;default:return null}}function C_(e){return`foundation-${e}`}function w_(e){return`tableau-${e}`}var T_={kind:`fan-down`,faceUpGap:45,faceDownGap:18,hoverExpansion:15},E_={kind:`stacked`};function D_(e){let t=O_.get(e);return t||(t=k_(e),O_.set(e,t)),t}var O_=new Map;function k_(e){let t=[];for(let n=0;n<4;n++){let r=C_(n);t.push({id:r,role:g_.FOUNDATION,slot:{pileId:r,column:3+n,row:0},layout:E_,accept:S_(g_.FOUNDATION,e),grab:{kind:`top-only`},draggable:!0,face:`always-up`,backgroundKey:`card-placeholder-full-border-circle`})}for(let n=0;n<7;n++){let r=w_(n);t.push({id:r,role:g_.TABLEAU,slot:{pileId:r,column:n,row:1},layout:T_,accept:S_(g_.TABLEAU,e),grab:{kind:`any-face-up`},draggable:!0,face:`card`,backgroundKey:`card-placeholder`})}return t}var A_=class extends Qh{foundations;tableaus;initialDeck=[];dealer;constructor(e=Ph,t=Math.random,n=__.YUKON){let r=new Vh;super({zones:()=>D_(n),registry:r,autoMoveRoles:[g_.FOUNDATION]}),this.dealer=new h_(r,e,t),this.foundations=this.pilesOfRole(g_.FOUNDATION),this.tableaus=this.pilesOfRole(g_.TABLEAU)}startNewGame(){this.beginGame(()=>{let e=this.dealer.createShuffledDeck();return this.initialDeck=[...e],e})}restartGame(){this.beginGame(()=>this.reuseInitialDeck())}beginGame(e){this.state.moves=0,this.clearHistory(),this.resetPiles(),this.dealer.dealOpeningLayout(e(),this.tableaus),this.emit(`game-reset`,void 0)}reuseInitialDeck(){return this.initialDeck.length===0&&(this.initialDeck=[...this.dealer.createShuffledDeck()]),this.initialDeck.map(e=>(e.faceUp=!1,e))}applyMoveEffects(e){let t=e.sourcePile.role===g_.TABLEAU?Qg(e.sourcePile):void 0;return{scoreDelta:0,flippedCardIds:t?[t.id]:[]}}afterMove(){let e=this.foundations.reduce((e,t)=>e+t.size,0);this.cardsInPlay>0&&e===this.cardsInPlay&&this.emit(`game-won`,void 0)}},j_=class{registry;cardIds;random;constructor(e,t=Ph,n=Math.random){this.registry=e,this.cardIds=t,this.random=n}createShuffledDeck(){let e=this.cardIds.map(e=>{let t=this.registry.getOrCreate(e);return t.faceUp=!0,t});return $h(e,this.random),e}dealOpeningLayout(e,t,n){if(t.length===0)return;let r=Math.min(e.length,t.length*6);for(let n=0;n<r;n++){let r=e.pop();if(!r)break;r.faceUp=!0,t[n%t.length].addCard(r)}for(let t of n){let n=e.pop();if(!n)break;n.faceUp=!0,t.addCard(n)}}},Q={CELL:`cell`,FOUNDATION:`foundation`,TABLEAU:`tableau`};function M_(e){return e.board.emptyCount(Q.CELL)+1}var N_=rg(ag(og(ug(J.KING)),mg),cg(M_)),P_=rg(sg,ng),F_=_g;function I_(e){switch(e){case Q.TABLEAU:return N_;case Q.CELL:return P_;case Q.FOUNDATION:return F_;default:return null}}var L_=2;function R_(e){return`cell-${e}`}function z_(e){return`foundation-${e}`}function B_(e){return`tableau-${e}`}var V_={kind:`fan-down`,faceUpGap:45,faceDownGap:45,hoverExpansion:15},H_={kind:`stacked`};function U_(){return W_}var W_=G_();function G_(){let e=[];for(let t=0;t<8;t++){let n=R_(t);e.push({id:n,role:Q.CELL,slot:{pileId:n,column:t,row:0},layout:H_,capacity:1,accept:I_(Q.CELL),grab:{kind:`top-only`},draggable:!0,face:`always-up`,backgroundKey:`card-placeholder`})}for(let t=0;t<4;t++){let n=z_(t);e.push({id:n,role:Q.FOUNDATION,slot:{pileId:n,column:8+t,row:0},layout:H_,accept:I_(Q.FOUNDATION),grab:{kind:`top-only`},draggable:!0,face:`always-up`,backgroundKey:`card-placeholder-full-border-circle`})}for(let t=0;t<8;t++){let n=B_(t);e.push({id:n,role:Q.TABLEAU,slot:{pileId:n,column:L_+t,row:1},layout:V_,accept:I_(Q.TABLEAU),grab:{kind:`run`,adjacent:fg},draggable:!0,face:`always-up`,backgroundKey:`card-placeholder`})}return e}var K_=class extends Qh{cells;foundations;tableaus;initialDeck=[];dealer;constructor(e=Ph,t=Math.random){let n=new Vh;super({zones:()=>U_(),registry:n,autoMoveRoles:[Q.FOUNDATION,Q.TABLEAU,Q.CELL]}),this.dealer=new j_(n,e,t),this.cells=this.pilesOfRole(Q.CELL),this.foundations=this.pilesOfRole(Q.FOUNDATION),this.tableaus=this.pilesOfRole(Q.TABLEAU)}startNewGame(){this.beginGame(()=>{let e=this.dealer.createShuffledDeck();return this.initialDeck=[...e],e})}restartGame(){this.beginGame(()=>this.reuseInitialDeck())}beginGame(e){this.state.moves=0,this.clearHistory(),this.resetPiles(),this.dealer.dealOpeningLayout(e(),this.tableaus,this.cells),this.emit(`game-reset`,void 0)}reuseInitialDeck(){return this.initialDeck.length===0&&(this.initialDeck=[...this.dealer.createShuffledDeck()]),[...this.initialDeck]}afterMove(){let e=0;for(let t of this.foundations)e+=t.size;this.cardsInPlay>0&&e===this.cardsInPlay&&this.emit(`game-won`,void 0)}},q_=class{registry;cardIds;random;constructor(e,t=Ph,n=Math.random){this.registry=e,this.cardIds=t,this.random=n}createShuffledDeck(){let e=this.cardIds.map(e=>{let t=this.registry.getOrCreate(e);return t.faceUp=!1,t});return $h(e,this.random),e}dealOpeningLayout(e,t,n){for(let n=0;n<t.length;n++){let r=n<4?3:0;for(let i=0;i<7;i++){let a=e.pop();if(!a)return;a.faceUp=i>=r,t[n].addCard(a)}}for(;e.length>0;){let t=e.pop();if(!t)break;t.faceUp=!1,n.addCard(t)}}},$={STOCK:`stock`,FOUNDATION:`foundation`,TABLEAU:`tableau`},J_=ag(og(ug(J.KING)),mg);function Y_(e){switch(e){case $.TABLEAU:return J_;default:return null}}var X_=`stock`;function Z_(e){return`foundation-${e}`}function Q_(e){return`tableau-${e}`}var $_={kind:`fan-down`,faceUpGap:45,faceDownGap:18,hoverExpansion:15},ev={kind:`stacked`};function tv(){return nv}var nv=rv();function rv(){let e=[{id:X_,role:$.STOCK,slot:{pileId:X_,column:0,row:0},layout:ev,accept:Y_($.STOCK),grab:{kind:`top-only`},draggable:!1,face:`always-down`,backgroundKey:`card-placeholder`}];for(let t=0;t<4;t++){let n=Z_(t);e.push({id:n,role:$.FOUNDATION,slot:{pileId:n,column:3+t,row:0},layout:ev,accept:Y_($.FOUNDATION),grab:{kind:`none`},draggable:!1,face:`always-up`,backgroundKey:`card-placeholder-full-border-circle`})}for(let t=0;t<7;t++){let n=Q_(t);e.push({id:n,role:$.TABLEAU,slot:{pileId:n,column:t,row:1},layout:$_,accept:Y_($.TABLEAU),grab:{kind:`any-face-up`},draggable:!0,face:`card`,backgroundKey:`card-placeholder`})}return e}var iv=class extends Qh{stock;foundations;tableaus;initialDeck=[];dealer;constructor(e=Ph,t=Math.random){let n=new Vh;super({zones:()=>tv(),registry:n,autoMoveRoles:[$.TABLEAU]}),this.dealer=new q_(n,e,t),this.stock=this.requirePile(X_),this.foundations=this.pilesOfRole($.FOUNDATION),this.tableaus=this.pilesOfRole($.TABLEAU)}startNewGame(){this.beginGame(()=>{let e=this.dealer.createShuffledDeck();return this.initialDeck=[...e],e})}restartGame(){this.beginGame(()=>this.reuseInitialDeck())}beginGame(e){this.state.score=0,this.state.moves=0,this.clearHistory(),this.resetPiles(),this.dealer.dealOpeningLayout(e(),this.tableaus,this.stock),this.emit(`game-reset`,void 0)}reuseInitialDeck(){return this.initialDeck.length===0&&(this.initialDeck=[...this.dealer.createShuffledDeck()]),this.initialDeck.map(e=>(e.faceUp=!1,e))}get canDeal(){return!this.stock.isEmpty}dealStock(){if(!this.canDeal)return!1;this.state.moves++;let e=[];for(let t of this.tableaus.slice(0,3)){let n=this.stock.topCard;if(!n)break;this.stock.removeCard(n),n.faceUp=!0,t.addCard(n),e.push({cardIds:[n.id],fromPileId:this.stock.id,toPileId:t.id,faceUpBefore:!1})}let t=$g(this.tableaus,this.foundations);return this.recordTransfers(`deal`,[...e,...t.transfers],{flippedCardIds:t.flippedCardIds}),this.checkWinCondition(),!0}applyMoveEffects(e){let t=e.sourcePile.role===$.TABLEAU?Qg(e.sourcePile):void 0,n=$g(this.tableaus,this.foundations);return{scoreDelta:0,flippedCardIds:[...t?[t.id]:[],...n.flippedCardIds],followUpTransfers:n.transfers}}afterMove(){this.checkWinCondition()}checkWinCondition(){let e=this.foundations.reduce((e,t)=>e+t.size,0);this.cardsInPlay>0&&e===this.cardsInPlay&&this.emit(`game-won`,void 0)}};function av(e,t){let n=e[t.id];return t.choices.some(e=>e.value===n)?n:t.defaultValue}var ov={id:`drawCount`,label:`Draw Mode`,description:`Draw 1 is easier; Draw 3 is the standard Solitaire challenge.`,choices:[{value:1,label:`Draw 1`},{value:3,label:`Draw 3`}],defaultValue:3},sv={id:`almostWin`,label:`Almost Win Mode`,description:`Pre-populates foundations so that dragging the remaining Kings will win the game.`,choices:[{value:0,label:`Normal`},{value:1,label:`Almost Win`}],defaultValue:0,debugOnly:!0},cv={id:`emptyColumns`,label:`Empty Columns`,description:`Kings Only is the harder variant: it also caps how many cards move at once, because a run can no longer be staged in an empty column.`,choices:[{value:0,label:`Any Card`},{value:1,label:`Kings Only`}],defaultValue:0},lv={id:`suitCount`,label:`Suits`,description:`Always 104 cards — fewer suits means more copies of each, and a far gentler game.`,choices:[{value:1,label:`1 Suit`},{value:2,label:`2 Suits`},{value:4,label:`4 Suits`}],defaultValue:4},uv={id:`variant`,label:`Variant`,description:`Alaska and Russian Solitaire deal like Yukon but build the columns by suit rather than by alternating color.`,choices:[{value:__.YUKON,label:`Yukon`},{value:__.ALASKA,label:`Alaska`},{value:__.RUSSIAN,label:`Russian Solitaire`}],defaultValue:__.YUKON},dv=[{id:`klondike`,name:`Klondike`,options:[ov,sv],create:e=>{let t=new Bh;t.setDrawCount(av(e,ov)===1?1:3),t.debug.setAlmostWin(av(e,sv)===1);let n=new Mg(void 0,void 0,t);return n.startNewGame(),{game:n}}},{id:`freecell`,name:`FreeCell`,options:[],create:()=>{let e=new Xg(void 0,void 0,Pg.FREECELL);return e.startNewGame(),{game:e}}},{id:`spider`,name:`Spider`,options:[lv],create:e=>{let t=new m_(Nh(n_(av(e,lv))));return t.startNewGame(),{game:t}}},{id:`yukon`,name:`Yukon`,options:[uv],create:e=>{let t=new A_(void 0,void 0,av(e,uv));return t.startNewGame(),{game:t}}},{id:`bakers`,name:`Baker's Game`,options:[cv],create:e=>{let t=new Xg(void 0,void 0,av(e,cv)===1?Pg.BAKERS_KINGS_ONLY:Pg.BAKERS);return t.startNewGame(),{game:t}}},{id:`eightoff`,name:`Eight Off`,options:[],create:()=>{let e=new K_;return e.startNewGame(),{game:e}}},{id:`scorpion`,name:`Scorpion`,options:[],create:()=>{let e=new iv;return e.startNewGame(),{game:e}}}];function fv(e){return dv.find(t=>t.id===e)??dv[0]}var pv=`fsolitaire-game`,mv=`fsolitaire-game-options`;function hv(){if(typeof localStorage>`u`)return{};try{let e=localStorage.getItem(mv);if(!e)return{};let t=JSON.parse(e);return typeof t==`object`&&t?t:{}}catch(e){return console.warn(`Failed to read the stored rule options:`,e),{}}}function gv(){if(typeof location>`u`)return null;let e=location.hash.replace(/^#/,``);return dv.some(t=>t.id===e)?e:null}function _v(){if(typeof localStorage>`u`)return null;try{return localStorage.getItem(pv)}catch(e){return console.warn(`Failed to read the selected game:`,e),null}}function vv(){return fv(gv()??_v()).id}var yv=class e{destroyRef=C(wa);games=dv;selectedIdSignal=k(vv());selectedId=this.selectedIdSignal.asReadonly();optionsSignal=k(hv());sessionSignal=k(fv(vv()).create(hv()[vv()]??{}));session=this.sessionSignal.asReadonly();options=Zp(()=>fv(this.selectedIdSignal()).options);optionValues=Zp(()=>this.valuesFor(this.selectedIdSignal(),this.optionsSignal()));valueOf(e){let t=this.options().find(t=>t.id===e);return t?av(this.optionValues(),t):null}setOption(e,t){let n=this.selectedEntry,r=n.options.find(t=>t.id===e);if(!r||!r.choices.some(e=>e.value===t)||av(this.optionValues(),r)===t)return;let i={...this.optionsSignal(),[n.id]:{...this.valuesFor(n.id,this.optionsSignal()),[e]:t}};this.optionsSignal.set(i),this.persistOptions(i),this.sessionSignal.set(n.create(i[n.id]))}valuesFor(e,t){let n=t[e]??{},r={};for(let t of fv(e).options)r[t.id]=av(n,t);return r}persistOptions(e){if(!(typeof localStorage>`u`))try{localStorage.setItem(mv,JSON.stringify(e))}catch(e){console.warn(`Failed to save the rule options:`,e)}}constructor(){if(this.writeHash(this.selectedIdSignal()),typeof window>`u`)return;let e=()=>{let e=gv();e&&this.select(e)};window.addEventListener(`hashchange`,e),this.destroyRef.onDestroy(()=>{window.removeEventListener(`hashchange`,e)})}get selectedEntry(){return fv(this.selectedIdSignal())}select(e){let t=fv(e);t.id!==this.selectedIdSignal()&&(this.selectedIdSignal.set(t.id),this.sessionSignal.set(t.create(this.valuesFor(t.id,this.optionsSignal()))),this.persist(t.id),this.writeHash(t.id))}writeHash(e){typeof location>`u`||location.hash===`#${e}`||(location.hash=e)}persist(e){if(!(typeof localStorage>`u`))try{localStorage.setItem(pv,e)}catch(e){console.warn(`Failed to save the selected game:`,e)}}static ɵfac=function(t){return new(t||e)};static ɵprov=y({token:e,factory:e.ɵfac,providedIn:`root`})},bv=class e{secondsElapsed=k(0);intervalHandle=null;timerText=Zp(()=>{let e=this.secondsElapsed(),t=Math.floor(e/60),n=e%60;return`${t.toString().padStart(2,`0`)}:${n.toString().padStart(2,`0`)}`});constructor(){C(wa).onDestroy(()=>this.stop())}get isRunning(){return this.intervalHandle!==null}start(){this.intervalHandle||=setInterval(()=>{this.secondsElapsed.update(e=>e+1)},1e3)}stop(){this.intervalHandle&&=(clearInterval(this.intervalHandle),null)}reset(){this.stop(),this.secondsElapsed.set(0)}static ɵfac=function(t){return new(t||e)};static ɵprov=y({token:e,factory:e.ɵfac,providedIn:`root`})},xv=class e{isOpen=k(!1);message=k(``);pendingAction=null;request(e,t){this.pendingAction=t,this.message.set(e),this.isOpen.set(!0)}accept(){let e=this.pendingAction;this.pendingAction=null,this.isOpen.set(!1),e?.()}cancel(){this.pendingAction=null,this.isOpen.set(!1)}static ɵfac=function(t){return new(t||e)};static ɵprov=y({token:e,factory:e.ɵfac,providedIn:`root`})},Sv=class e{catalog=C(yv);timer=C(bv);confirmation=C(xv);presentation=C(hh);score=k(0);moves=k(0);undoDepth=k(0);ruleOptions=Zp(()=>this.catalog.options().filter(e=>!e.debugOnly));debugOptions=Zp(()=>this.catalog.options().filter(e=>e.debugOnly));optionValues=this.catalog.optionValues;cardBack=yh(this.presentation.cardBackStyle$,{initialValue:`card-back-blue`});isGameWon=k(!1);timerText=this.timer.timerText;games=this.catalog.games;selectedGameId=this.catalog.selectedId;canUndo=Zp(()=>this.undoDepth()>0&&!this.isGameWon());constructor(){fo(e=>{let{game:t}=this.catalog.session(),n=[t.state.score$.subscribe(e=>this.score.set(e)),t.state.moves$.subscribe(e=>this.moves.set(e)),t.state.undoDepth$.subscribe(e=>this.undoDepth.set(e))],r=()=>{this.isGameWon.set(!0),this.timer.stop()};t.on(`game-won`,r),e(()=>{n.forEach(e=>e.unsubscribe()),t.off(`game-won`,r)})}),fo(()=>{let e=this.moves(),t=this.isGameWon();e>0&&!t&&!this.timer.isRunning&&this.timer.start()})}get gameModel(){return this.catalog.session().game}selectGame(e){e!==this.selectedGameId()&&this.confirmIfInProgress(`Are you sure you want to switch games? Your current progress will be lost.`,()=>{this.catalog.select(e),this.startFreshSession()})}restartGame(){this.confirmIfInProgress(`Are you sure you want to restart this game? Your current progress will be lost.`,()=>{this.gameModel.restartGame(),this.startFreshSession()})}startNewGame(){this.confirmIfInProgress(`Are you sure you want to start a new game? Your current progress will be lost.`,()=>{this.gameModel.startNewGame(),this.startFreshSession()})}setRuleOption(e,t){this.catalog.valueOf(e)!==t&&this.confirmIfInProgress(`Changing this will deal a new game. Are you sure you want to proceed?`,()=>{this.catalog.setOption(e,t),this.startFreshSession()})}undo(){this.canUndo()&&this.gameModel.undo()}setCardBack(e){this.presentation.setCardBackStyle(e)}startFreshSession(){this.isGameWon.set(!1),this.timer.reset()}confirmIfInProgress(e,t){this.moves()>0&&!this.isGameWon()?this.confirmation.request(e,t):t()}static ɵfac=function(t){return new(t||e)};static ɵprov=y({token:e,factory:e.ɵfac,providedIn:`root`})},Cv={klondike:{gameId:`klondike`,title:`Klondike Solitaire`,wikipediaUrl:`https://en.wikipedia.org/wiki/Klondike_(solitaire)`,screenshots:[{url:`./docs/screenshots/klondike/overview.png`,caption:`Klondike initial deal showing seven tableau columns, stock, waste, and four foundation piles.`,altText:`Klondike solitaire board overview`,type:`overview`}],summary:{objective:`Build all 52 cards onto the four foundation piles by suit in ascending order from Ace to King.`,winCondition:`All cards are transferred to the foundations (Ace through King for Hearts, Diamonds, Clubs, and Spades).`,quickOverview:`Klondike is the classic solitaire game. Cards are dealt into 7 tableau columns with increasing hidden cards. Players draw cards from the stock to the waste pile and build tableau runs in descending rank with alternating colors.`},detailedRules:{layout:[`Tableau: 7 columns containing 1 to 7 cards respectively (top card face-up).`,`Foundations: 4 suit piles, initially empty.`,`Stock: Remaining cards face-down in top-left.`,`Waste: Face-up pile where drawn cards land.`],cardMovement:[`Cards on the waste pile or tableau columns can be moved to foundations or other tableau columns.`,`Face-up sequences of cards in alternating colors can be moved together as a unit.`,`Only a King (or a stack headed by a King) can be placed into an empty tableau column.`],sequenceBuilding:[`Foundations: Built UP in the SAME SUIT from Ace (1) to King (13).`,`Tableau: Built DOWN in ALTERNATING COLORS (e.g., Red 9 on Black 10).`],specialRules:[`Draw Mode: Configurable between Draw 1 (draw one card at a time from stock) and Draw 3 (draw three cards at a time).`,`Stock Recycle: When the stock empties, clicking it recycles cards from the waste pile back into the stock.`]},settingsAndVariants:[{optionId:`drawCount`,label:`Draw Mode`,description:`Controls how many cards are flipped from the stock to the waste pile per draw.`,choicesExplanation:[{label:`Draw 1`,effect:`Easier mode. Flips 1 card at a time, making every stock card directly accessible.`},{label:`Draw 3`,effect:`Standard challenge. Flips 3 cards at a time; only the top card of the 3 is immediately playable.`}]}]},freecell:{gameId:`freecell`,title:`FreeCell`,wikipediaUrl:`https://en.wikipedia.org/wiki/FreeCell`,screenshots:[{url:`./docs/screenshots/freecell/overview.png`,caption:`FreeCell board with 4 free cells top-left, 4 foundations top-right, and 8 fully face-up tableau columns.`,altText:`FreeCell board overview`,type:`overview`}],summary:{objective:`Move all 52 cards to the four foundation piles, built up by suit from Ace to King.`,winCondition:`All 52 cards are sorted into their respective suit foundations from Ace through King.`,quickOverview:`FreeCell is a highly strategic solitaire game played with all cards dealt face-up into 8 columns. Four free cells act as temporary storage locations while you arrange columns in descending order with alternating colors.`},detailedRules:{layout:[`Free Cells: 4 single-card holding cells at top-left.`,`Foundations: 4 suit piles at top-right, initially empty.`,`Tableau: 8 columns with all 52 cards dealt completely face-up.`],cardMovement:[`Any single card can be placed into an empty Free Cell.`,`Any card can start an empty tableau column.`,`Multi-card moves (supermoves) simulate moving cards through open Free Cells and empty tableau columns.`],sequenceBuilding:[`Foundations: Built UP in SAME SUIT from Ace to King.`,`Tableau: Built DOWN in ALTERNATING COLORS.`],specialRules:[`Supermove Capacity Formula: Maximum cards moved at once is (Free Cells + 1) * 2^(Empty Tableaus).`,`No Stock: FreeCell has no stock or hidden cards; all cards are visible from the deal.`]},settingsAndVariants:[]},spider:{gameId:`spider`,title:`Spider Solitaire`,wikipediaUrl:`https://en.wikipedia.org/wiki/Spider_(solitaire)`,screenshots:[{url:`./docs/screenshots/spider/overview.png`,caption:`Spider board featuring 10 tableau columns and stock deals at bottom-left.`,altText:`Spider solitaire board overview`,type:`overview`}],summary:{objective:`Assemble 8 full same-suit sequences from King down to Ace on the tableau to clear them.`,winCondition:`All 8 13-card sequences (King to Ace of same suit) are completed and removed from the board.`,quickOverview:`Spider uses two 52-card decks (104 cards total). Players build descending sequences in 10 tableau columns. Completed King-to-Ace same-suit runs are automatically cleared to foundation slots.`},detailedRules:{layout:[`Tableau: 10 columns (first 4 columns have 6 cards, remaining 6 have 5 cards; top card face-up).`,`Stock: Holds remaining 50 cards (dealt 10 cards at a time, one to each column).`,`Foundations: Holds completed 13-card sequences.`],cardMovement:[`Cards can be placed on any tableau card of next higher rank, regardless of suit (e.g. 7 of Clubs on 8 of Hearts).`,`Only same-suit runs can be moved together as a stack.`,`Any card or valid same-suit run can fill an empty tableau column.`],sequenceBuilding:[`Tableau: Built DOWN by RANK (regardless of suit for single cards, same suit for multi-card moves).`,`Completion: Complete King-down-to-Ace sequence of the SAME suit automatically moves to foundations.`],specialRules:[`Stock Dealing: Dealing from stock places 1 face-up card on top of every tableau column.`,`Empty Column Requirement: All tableau columns must contain at least 1 card before dealing from the stock.`]},settingsAndVariants:[{optionId:`suitCount`,label:`Suit Count`,description:`Selects the number of suits used across the 104 cards, controlling game difficulty.`,choicesExplanation:[{label:`1 Suit`,effect:`Easiest mode (104 Spades). Every run is in suit, allowing easy multi-card moves and sequence builds.`},{label:`2 Suits`,effect:`Medium mode (Spades & Hearts). Requires balancing mixed-suit building with same-suit runs.`},{label:`4 Suits`,effect:`Classic hard challenge (Spades, Hearts, Diamonds, Clubs). Highly tactical and tight sequence control.`}]}]},yukon:{gameId:`yukon`,title:`Yukon Solitaire`,wikipediaUrl:`https://en.wikipedia.org/wiki/Yukon_(solitaire)`,screenshots:[{url:`./docs/screenshots/yukon/overview.png`,caption:`Yukon board featuring 7 tableau columns with face-down and face-up card groups, and 4 foundations.`,altText:`Yukon solitaire board overview`,type:`overview`}],summary:{objective:`Build all 52 cards onto four foundations by suit from Ace to King.`,winCondition:`All cards are placed in order on the foundations.`,quickOverview:`Yukon is a fast-paced game with no stock pile. All cards are dealt to the tableau at the start. The signature rule of Yukon is that ANY face-up card can be moved regardless of how many cards are sitting on top of it.`},detailedRules:{layout:[`Tableau: 7 columns (column 1 has 1 face-up card; columns 2-7 have 1-6 face-down cards plus 5 face-up cards).`,`Foundations: 4 suit piles at top-right, built Ace to King.`],cardMovement:[`Any face-up card anywhere in a column can be grabbed and moved, taking all cards above it along for the ride.`,`The grabbed card must land on a valid receiving card according to the variant build rule.`,`Only Kings (and stacks led by a King) can fill empty tableau columns.`],sequenceBuilding:[`Foundations: Built UP in SAME SUIT from Ace to King.`,`Tableau (Yukon): Built DOWN in ALTERNATING COLORS.`,`Tableau (Alaska): Built UP or DOWN in SAME SUIT.`,`Tableau (Russian): Built DOWN in SAME SUIT.`],specialRules:[`No Staging Penalty: Stacks being moved do not need to be in sequence; only the targeted card and destination card must match placement rules.`]},settingsAndVariants:[{optionId:`variant`,label:`Yukon Variant`,description:`Chooses between the three games in the Yukon family.`,choicesExplanation:[{label:`Yukon`,effect:`Standard game. Tableau columns build down in alternating colors.`},{label:`Alaska`,effect:`Gentler suit variant. Tableau columns build either UP or DOWN in the SAME SUIT.`},{label:`Russian Solitaire`,effect:`Hardest variant. Tableau columns build DOWN in the SAME SUIT.`}]}]},bakers:{gameId:`bakers`,title:`Baker's Game`,wikipediaUrl:`https://en.wikipedia.org/wiki/Baker%27s_Game`,screenshots:[{url:`./docs/screenshots/bakers/overview.png`,caption:`Baker's Game board with 4 free cells, 4 foundations, and 8 same-suit building tableau columns.`,altText:`Baker's Game board overview`,type:`overview`}],summary:{objective:`Move all 52 cards to the foundations from Ace to King by suit.`,winCondition:`All four foundations completed from Ace through King.`,quickOverview:`Baker's Game is the direct predecessor to FreeCell. It shares FreeCell's deal and 4 free cells, but requires tableau columns to be built strictly in the SAME SUIT rather than alternating colors.`},detailedRules:{layout:[`Free Cells: 4 single-card holding cells.`,`Foundations: 4 suit piles, Ace to King.`,`Tableau: 8 columns, all 52 cards dealt face-up.`],cardMovement:[`Single cards can move to any empty free cell.`,`Supermove limits apply based on available free cells and empty columns.`,`Cards on tableau columns must build DOWN in the SAME SUIT.`],sequenceBuilding:[`Foundations: Built UP in SAME SUIT from Ace to King.`,`Tableau: Built DOWN in SAME SUIT (e.g. 9 of Spades on 10 of Spades).`],specialRules:[`Empty Columns Rule: Configurable between Any Card or Kings Only.`,`Kings Only Staging Limit: When empty columns accept Kings only, empty columns contribute zero staging capacity for supermoves, making multi-card moves strictly (Free Cells + 1).`]},settingsAndVariants:[{optionId:`emptyColumns`,label:`Empty Columns Rule`,description:`Controls what cards are allowed to fill an empty tableau column.`,choicesExplanation:[{label:`Any Card`,effect:`Standard Baker's Game. Any card can enter an empty column, providing full supermove staging capacity.`},{label:`Kings Only`,effect:`Harder variant. Only Kings can enter empty columns, restricting supermoves to (Free Cells + 1).`}]}]},eightoff:{gameId:`eightoff`,title:`Eight Off`,wikipediaUrl:`https://en.wikipedia.org/wiki/Eight_Off`,screenshots:[{url:`./docs/screenshots/eightoff/overview.png`,caption:`Eight Off board featuring 8 free cells, 4 foundations, and 8 tableau columns.`,altText:`Eight Off board overview`,type:`overview`}],summary:{objective:`Move all 52 cards to the four suit foundation piles, built Ace to King.`,winCondition:`All cards transferred to suit foundations Ace through King.`,quickOverview:`Eight Off is a cousin of FreeCell and Baker's Game featuring 8 free cells instead of 4. Four of the cells start occupied by cards during deal. Tableau columns build strictly down in the same suit, and empty columns accept Kings only.`},detailedRules:{layout:[`Free Cells: 8 single-card holding cells (4 dealt with cards at start, 4 empty).`,`Foundations: 4 suit piles, initially empty.`,`Tableau: 8 columns of 6 cards each, all dealt face-up.`],cardMovement:[`Single cards can move to any empty free cell.`,`Tableau columns build strictly DOWN in the SAME SUIT.`,`Only Kings can fill an empty tableau column.`],sequenceBuilding:[`Foundations: Built UP in SAME SUIT from Ace to King.`,`Tableau: Built DOWN in SAME SUIT.`],specialRules:[`Supermove Capacity: Because empty columns accept Kings only, multi-card supermoves are strictly capped at (Free Cells + 1).`]},settingsAndVariants:[]},scorpion:{gameId:`scorpion`,title:`Scorpion Solitaire`,wikipediaUrl:`https://en.wikipedia.org/wiki/Scorpion_(solitaire)`,screenshots:[{url:`./docs/screenshots/scorpion/overview.png`,caption:`Scorpion board featuring 7 tableau columns, stock reserve, and foundation area.`,altText:`Scorpion solitaire board overview`,type:`overview`},{url:`./docs/screenshots/scorpion/rules_modal_preview.png`,caption:`Interactive in-game documentation modal overlay.`,altText:`Scorpion in-game rules modal preview`,type:`rule_detail`}],summary:{objective:`Build four 13-card same-suit sequences from King down to Ace on the tableau.`,winCondition:`All 4 suits assembled in complete King-to-Ace runs on the board.`,quickOverview:`Scorpion combines the open-stack dragging mechanics of Yukon with the same-suit sequence completion goals of Spider. Players move any face-up card along with all cards on top of it to build same-suit descending runs.`},detailedRules:{layout:[`Tableau: 7 columns of 7 cards each (columns 1-4 have 3 face-down cards and 4 face-up; columns 5-7 have 7 face-up cards).`,`Stock: 3 remaining cards dealt in a single press.`,`Foundations: Automated slots for completed King-to-Ace same-suit runs.`],cardMovement:[`Any face-up card in a column can be moved regardless of what is on top of it.`,`The grabbed card must land on a card of the SAME SUIT and exactly 1 rank higher (e.g., 7 of Spades on 8 of Spades).`,`Only Kings (or stacks led by a King) can fill empty tableau columns.`],sequenceBuilding:[`Tableau: Built DOWN in SAME SUIT.`,`Completion: Complete King-to-Ace same-suit runs automatically clear to foundation slots.`],specialRules:[`Reserve Deal: Clicking the 3-card stock deals 1 card face-up onto each of the first 3 tableau columns.`]},settingsAndVariants:[]}},wv=class e{catalog=C(yv);isOpen=k(!1);activeGameDoc=Zp(()=>Cv[this.catalog.selectedId()]??Cv.klondike);openHelp(){this.isOpen.set(!0)}closeHelp(){this.isOpen.set(!1)}toggleHelp(){this.isOpen.update(e=>!e)}getDocumentation(e){return Cv[e]}static ɵfac=function(t){return new(t||e)};static ɵprov=y({token:e,factory:e.ɵfac,providedIn:`root`})},Tv=class e{session=C(Sv);docService=C(wv);openSettings=tm();static ɵfac=function(t){return new(t||e)};static ɵcmp=tf({type:e,selectors:[[`app-header-bar`]],outputs:{openSettings:`openSettings`},decls:37,vars:4,consts:[[1,`header-bar`],[1,`brand`],[1,`brand-text`],[1,`metrics`],[1,`metric-card`,`score-card`],[1,`label`],[1,`value`],[1,`metric-card`,`timer-card`],[1,`metric-card`,`moves-card`],[1,`actions`],[`title`,`Undo last move`,`aria-label`,`Undo last move`,1,`btn`,`btn-secondary`,3,`click`,`disabled`],[`src`,`icons/undo.svg`,`alt`,`Undo`,1,`btn-icon`],[1,`btn-text`],[`title`,`Restart current game`,`aria-label`,`Restart current game`,1,`btn`,`btn-secondary`,3,`click`],[`src`,`icons/restart.svg`,`alt`,`Restart`,1,`btn-icon`],[`title`,`Start a brand new game`,`aria-label`,`Start a brand new game`,1,`btn`,`btn-primary`,3,`click`],[`src`,`icons/plus.svg`,`alt`,`New Game`,1,`btn-icon`],[`title`,`How to Play / Game Rules`,`aria-label`,`How to Play / Game Rules`,1,`btn-circle`,`btn-rules`,3,`click`],[`src`,`icons/help-circle.svg`,`alt`,`Help`,1,`btn-icon`],[`title`,`Game Settings`,`aria-label`,`Game Settings`,1,`btn-circle`,`btn-settings`,3,`click`],[`src`,`icons/settings.svg`,`alt`,`Settings`,1,`btn-icon`]],template:function(e,t){e&1&&(z(0,`header`,0)(1,`div`,1)(2,`span`,2),G(3,`fSolitaire`),B()(),z(4,`div`,3)(5,`div`,4)(6,`span`,5),G(7,`SCORE`),B(),z(8,`span`,6),G(9),B()(),z(10,`div`,7)(11,`span`,5),G(12,`TIME`),B(),z(13,`span`,6),G(14),B()(),z(15,`div`,8)(16,`span`,5),G(17,`MOVES`),B(),z(18,`span`,6),G(19),B()()(),z(20,`div`,9)(21,`button`,10),H(`click`,function(){return t.session.undo()}),qf(22,`img`,11),z(23,`span`,12),G(24,`Undo`),B()(),z(25,`button`,13),H(`click`,function(){return t.session.restartGame()}),qf(26,`img`,14),z(27,`span`,12),G(28,`Restart`),B()(),z(29,`button`,15),H(`click`,function(){return t.session.startNewGame()}),qf(30,`img`,16),z(31,`span`,12),G(32,`New Game`),B()(),z(33,`button`,17),H(`click`,function(){return t.docService.openHelp()}),qf(34,`img`,18),B(),z(35,`button`,19),H(`click`,function(){return t.openSettings.emit()}),qf(36,`img`,20),B()()()),e&2&&(M(9),K(t.session.score()),M(5),K(t.session.timerText()),M(5),K(t.session.moves()),M(2),Xf(`disabled`,!t.session.canUndo()))},styles:[`.header-bar[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 73px;
  box-sizing: border-box;
  padding: 12px 24px;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  pointer-events: auto;
  color: #f8fafc;
  user-select: none;
}

.brand[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
}

.brand-text[_ngcontent-%COMP%] {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  background: linear-gradient(135deg, #38bdf8 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.metrics[_ngcontent-%COMP%] {
  display: flex;
  gap: 16px;
}

.metric-card[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  min-width: 90px;
  padding: 6px 16px;
}

.metric-card[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  font-size: 0.65rem;
  font-weight: 700;
  color: #94a3b8;
  letter-spacing: 0.1em;
  margin-bottom: 2px;
}

.metric-card[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
  font-size: 1.1rem;
  font-weight: 700;
  font-family: monospace;
  color: #f8fafc;
}

.actions[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}






@media (max-width: 1000px) {
  .actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]   .btn-text[_ngcontent-%COMP%] {
    display: none;
  }

  .actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {
    padding: 8px;
    justify-content: center;
    min-width: 38px;
    min-height: 38px;
    border-radius: 50%;
  }

  .actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]   .btn-icon[_ngcontent-%COMP%] {
    width: 18px;
    height: 18px;
    margin: 0;
  }
}

@media (max-width: 768px) {
  .header-bar[_ngcontent-%COMP%] {
    padding: 10px 16px;
  }

  .brand-text[_ngcontent-%COMP%] {
    font-size: 1.25rem;
  }

  .metrics[_ngcontent-%COMP%] {
    gap: 10px;
  }

  .metric-card[_ngcontent-%COMP%] {
    min-width: 70px;
    padding: 4px 10px;
  }

  .actions[_ngcontent-%COMP%] {
    gap: 8px;
  }
}

@media (max-width: 520px) {
  .header-bar[_ngcontent-%COMP%] {
    padding: 8px 10px;
  }

  .brand-text[_ngcontent-%COMP%] {
    font-size: 1.1rem;
  }

  .metrics[_ngcontent-%COMP%] {
    gap: 6px;
  }

  .metric-card[_ngcontent-%COMP%] {
    min-width: 48px;
    padding: 4px 6px;
  }

  .metric-card[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
    font-size: 0.55rem;
    letter-spacing: 0.05em;
  }

  .metric-card[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {
    font-size: 0.95rem;
  }

  .actions[_ngcontent-%COMP%] {
    gap: 6px;
  }
}`]})},Ev=(e,t)=>t.id,Dv=(e,t)=>t.value;function Ov(e,t){if(e&1){let e=Yf();z(0,`button`,7),H(`click`,function(){let t=D(e).$implicit,n=U().$implicit;return O(U().session.setRuleOption(n.id,t.value))}),G(1),B()}if(e&2){let e=t.$implicit,n=U().$implicit;W(`active`,U().session.optionValues()[n.id]===e.value),M(),Hp(` `,e.label,` `)}}function kv(e,t){if(e&1&&(z(0,`p`,6),G(1),B()),e&2){let e=U().$implicit;M(),K(e.description)}}function Av(e,t){if(e&1&&(z(0,`div`,2)(1,`label`,3),G(2),B(),z(3,`div`,4),F(4,Ov,2,3,`button`,5,Dv),B(),N(6,kv,2,1,`p`,6),B()),e&2){let e=t.$implicit;M(2),K(e.label),M(2),I(e.choices),M(2),P(e.description?6:-1)}}var jv=class e{session=C(Sv);static ɵfac=function(t){return new(t||e)};static ɵcmp=tf({type:e,selectors:[[`app-debug-panel`]],decls:5,vars:0,consts:[[1,`debug-panel`],[1,`setting-label`,`debug-label`],[1,`setting-group`],[1,`setting-sublabel`],[1,`segmented-control`],[1,`segment-btn`,3,`active`],[1,`setting-desc`],[1,`segment-btn`,3,`click`]],template:function(e,t){e&1&&(z(0,`div`,0)(1,`label`,1),G(2,`Debug Options`),B(),F(3,Av,7,2,`div`,2,Ev),B()),e&2&&(M(3),I(t.session.debugOptions()))},styles:[`[_nghost-%COMP%] {
  display: block;
}

.debug-panel[_ngcontent-%COMP%] {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px dashed rgba(239, 68, 68, 0.3);
  background: rgba(239, 68, 68, 0.02);
  margin-left: -24px;
  margin-right: -24px;
  padding-left: 24px;
  padding-right: 24px;
}

.debug-label[_ngcontent-%COMP%] {
  color: #ef4444 !important;
  display: flex;
  align-items: center;
  gap: 6px;
}

.debug-label[_ngcontent-%COMP%]::before {
  content: "⚡";
}

.setting-sublabel[_ngcontent-%COMP%] {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: #cbd5e1;
  margin-bottom: 8px;
}

.setting-group[_ngcontent-%COMP%] {
  margin-bottom: 28px;
}

.setting-label[_ngcontent-%COMP%] {
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 12px;
}

.setting-desc[_ngcontent-%COMP%] {
  margin-top: 8px;
  font-size: 0.75rem;
  color: #64748b;
  line-height: 1.4;
}


.segmented-control[_ngcontent-%COMP%] {
  display: flex;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 2px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.segment-btn[_ngcontent-%COMP%] {
  flex: 1;
  background: transparent;
  border: none;
  padding: 8px 0;
  font-size: 0.85rem;
  font-weight: 600;
  color: #94a3b8;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
}

.segment-btn.active[_ngcontent-%COMP%] {
  background: #3b82f6;
  color: #fff;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
}`]})},Mv=(e,t)=>t.id,Nv=(e,t)=>t.value;function Pv(e,t){if(e&1){let e=Yf();L(0,`button`,22),V(`click`,function(){let t=D(e).$implicit,n=U().$implicit;return O(U(2).session.setRuleOption(n.id,t.value))}),G(1),R()}if(e&2){let e=t.$implicit,n=U().$implicit;W(`active`,U(2).session.optionValues()[n.id]===e.value),M(),Hp(` `,e.label,` `)}}function Fv(e,t){if(e&1&&(L(0,`p`,15),G(1),R()),e&2){let e=U().$implicit;M(),K(e.description)}}function Iv(e,t){if(e&1&&(L(0,`div`,6)(1,`label`,7),G(2),R(),L(3,`div`,20),F(4,Pv,2,3,`button`,21,Nv),R(),N(6,Fv,2,1,`p`,15),R()),e&2){let e=t.$implicit;M(2),K(e.label),M(2),I(e.choices),M(2),P(e.description?6:-1)}}function Lv(e,t){e&1&&Kf(0,`div`,24)}function Rv(e,t){if(e&1){let e=Yf();L(0,`button`,23),V(`click`,function(){let t=D(e).$implicit;return O(U(2).themeService.setTheme(t))}),N(1,Lv,1,0,`div`,24),R()}if(e&2){let e=t.$implicit,n=U(2);yp(`background-color`,n.themeService.themes[e].color),W(`active`,n.themeService.selectedTheme()===e),Uf(`title`,n.themeService.themes[e].name),M(),P(n.themeService.selectedTheme()===e?1:-1)}}function zv(e,t){e&1&&Kf(0,`app-debug-panel`)}function Bv(e,t){if(e&1){let e=Yf();L(0,`div`,0),V(`click`,function(){return D(e),O(U().closed.emit())}),R(),L(1,`div`,1)(2,`div`,2)(3,`h2`),G(4,`Game Options`),R(),L(5,`button`,3),V(`click`,function(){return D(e),O(U().closed.emit())}),Kf(6,`img`,4),R()(),L(7,`div`,5),F(8,Iv,7,2,`div`,6,Mv),L(10,`div`,6)(11,`label`,7),G(12,`Card Back Design`),R(),L(13,`div`,8)(14,`button`,9),V(`click`,function(){return D(e),O(U().session.setCardBack(`card-back-blue`))}),Kf(15,`div`,10),L(16,`span`),G(17,`Classic Blue`),R()(),L(18,`button`,11),V(`click`,function(){return D(e),O(U().session.setCardBack(`card-back-red`))}),Kf(19,`div`,12),L(20,`span`),G(21,`Royal Red`),R()()()(),L(22,`div`,6)(23,`label`,7),G(24,`Table Theme`),R(),L(25,`div`,13),F(26,Rv,2,6,`button`,14,Pf),R(),L(28,`p`,15),G(29),R()(),L(30,`div`,6)(31,`label`,7),G(32,`Game Rules & Documentation`),R(),L(33,`button`,16),V(`click`,function(){return D(e),O(U().openRules())}),Kf(34,`img`,17),G(35),R()(),N(36,zv,1,0,`app-debug-panel`),R(),L(37,`div`,18)(38,`button`,19),V(`click`,function(){return D(e),O(U().closed.emit())}),G(39,` Apply Settings `),R()()()}if(e&2){let e=U();M(8),I(e.session.ruleOptions()),M(6),W(`active`,e.session.cardBack()===`card-back-blue`),M(4),W(`active`,e.session.cardBack()===`card-back-red`),M(8),I(e.themeService.themeKeys),M(3),Hp(` Theme: `,e.themeService.themes[e.themeService.selectedTheme()].name,` `),M(6),Hp(` How to Play `,e.docService.activeGameDoc().title,` `),M(),P(e.isDevMode&&e.session.debugOptions().length>0?36:-1)}}var Vv=class e{session=C(Sv);themeService=C(vh);docService=C(wv);isDevMode=!1;open=im(!1);closed=tm();openRules(){this.closed.emit(),this.docService.openHelp()}static ɵfac=function(t){return new(t||e)};static ɵcmp=tf({type:e,selectors:[[`app-settings-drawer`]],inputs:{open:[1,`open`]},outputs:{closed:`closed`},decls:1,vars:1,consts:[[1,`drawer-backdrop`,3,`click`],[1,`drawer`],[1,`drawer-header`],[1,`btn-close`,3,`click`],[`src`,`icons/close.svg`,`alt`,`Close`,1,`close-icon`],[1,`drawer-content`],[1,`setting-group`],[1,`setting-label`],[1,`card-back-selector`],[1,`card-back-option`,`blue-back`,3,`click`],[1,`card-back-preview`,`blue-pattern`],[1,`card-back-option`,`red-back`,3,`click`],[1,`card-back-preview`,`red-pattern`],[1,`theme-selector`],[1,`theme-option`,3,`active`,`backgroundColor`,`title`],[1,`setting-desc`],[1,`btn`,`btn-secondary`,`btn-block`,3,`click`],[`src`,`icons/help-circle.svg`,`alt`,`Help`,1,`btn-icon`,2,`width`,`18px`,`height`,`18px`,`margin-right`,`6px`],[1,`drawer-footer`],[1,`btn`,`btn-primary`,`btn-block`,3,`click`],[1,`segmented-control`],[1,`segment-btn`,3,`active`],[1,`segment-btn`,3,`click`],[1,`theme-option`,3,`click`,`title`],[1,`theme-indicator`]],template:function(e,t){e&1&&N(0,Bv,40,7),e&2&&P(t.open()?0:-1)},dependencies:[jv],styles:[`.drawer-backdrop[_ngcontent-%COMP%] {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
  pointer-events: auto;
}

.drawer[_ngcontent-%COMP%] {
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  max-width: 100vw;
  box-sizing: border-box;
  height: 100vh;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.4);
  z-index: 101;
  display: flex;
  flex-direction: column;
  color: #e2e8f0;
  pointer-events: auto;
  user-select: none;
}

.drawer-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.drawer-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
}

.btn-close[_ngcontent-%COMP%] {
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;
}

.btn-close[_ngcontent-%COMP%]:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

.close-icon[_ngcontent-%COMP%] {
  width: 20px;
  height: 20px;
}

.drawer-content[_ngcontent-%COMP%] {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.setting-group[_ngcontent-%COMP%] {
  margin-bottom: 28px;
}

.setting-label[_ngcontent-%COMP%] {
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 12px;
}

.setting-desc[_ngcontent-%COMP%] {
  margin-top: 8px;
  font-size: 0.75rem;
  color: #64748b;
  line-height: 1.4;
}


.segmented-control[_ngcontent-%COMP%] {
  display: flex;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 2px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.segment-btn[_ngcontent-%COMP%] {
  flex: 1;
  background: transparent;
  border: none;
  padding: 8px 0;
  font-size: 0.85rem;
  font-weight: 600;
  color: #94a3b8;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
}

.segment-btn.active[_ngcontent-%COMP%] {
  background: #3b82f6;
  color: #fff;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
}


.card-back-selector[_ngcontent-%COMP%] {
  display: flex;
  gap: 16px;
}

.card-back-option[_ngcontent-%COMP%] {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.03);
  border: 2px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.2s;
  color: #94a3b8;
}

.card-back-option[_ngcontent-%COMP%]:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.15);
}

.card-back-option.active[_ngcontent-%COMP%] {
  background: rgba(59, 130, 246, 0.1);
  border-color: #3b82f6;
  color: #fff;
}

.card-back-preview[_ngcontent-%COMP%] {
  width: 48px;
  height: 68px;
  border-radius: 4px;
  margin-bottom: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.blue-pattern[_ngcontent-%COMP%] {
  background-color: #1e3a8a;
  background-image:
    radial-gradient(circle, #2563eb 20%, transparent 20%),
    radial-gradient(circle, #2563eb 20%, transparent 20%);
  background-size: 8px 8px;
  background-position:
    0 0,
    4px 4px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.red-pattern[_ngcontent-%COMP%] {
  background-color: #7f1d1d;
  background-image:
    radial-gradient(circle, #dc2626 20%, transparent 20%),
    radial-gradient(circle, #dc2626 20%, transparent 20%);
  background-size: 8px 8px;
  background-position:
    0 0,
    4px 4px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}


.theme-selector[_ngcontent-%COMP%] {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.theme-option[_ngcontent-%COMP%] {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.theme-option[_ngcontent-%COMP%]:hover {
  transform: scale(1.1);
}

.theme-option.active[_ngcontent-%COMP%] {
  border-color: #fff;
  transform: scale(1.05);
}

.theme-indicator[_ngcontent-%COMP%] {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background-color: #fff;
  border-radius: 50%;
}

.drawer-footer[_ngcontent-%COMP%] {
  padding: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

@media (max-width: 480px) {
  .drawer-header[_ngcontent-%COMP%] {
    padding: 16px;
  }
  .drawer-content[_ngcontent-%COMP%] {
    padding: 16px;
  }
  .drawer-footer[_ngcontent-%COMP%] {
    padding: 16px;
  }
}


.game-selector[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(6.5rem, 1fr));
  gap: 0.5rem;
}

.game-option[_ngcontent-%COMP%] {
  padding: 0.6rem 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.06);
  color: inherit;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;
}

.game-option[_ngcontent-%COMP%]:hover {
  background: rgba(255, 255, 255, 0.12);
}

.game-option.active[_ngcontent-%COMP%] {
  background: #2563eb;
  border-color: #2563eb;
  color: #fff;
}`]})};function Hv(e,t){if(e&1){let e=Yf();z(0,`div`,0)(1,`div`,1)(2,`div`,2),qf(3,`div`,3)(4,`img`,4),B(),z(5,`h1`),G(6,`Congratulations!`),B(),z(7,`p`,5),G(8,`You have successfully cleared the board!`),B(),z(9,`div`,6)(10,`div`,7)(11,`span`,8),G(12),B(),z(13,`span`,9),G(14,`Score`),B()(),z(15,`div`,7)(16,`span`,8),G(17),B(),z(18,`span`,9),G(19,`Time`),B()(),z(20,`div`,7)(21,`span`,8),G(22),B(),z(23,`span`,9),G(24,`Moves`),B()()(),z(25,`button`,10),H(`click`,function(){return D(e),O(U().session.startNewGame())}),G(26,` Play Again `),B()()()}if(e&2){let e=U();M(12),K(e.session.score()),M(5),K(e.session.timerText()),M(5),K(e.session.moves())}}var Uv=class e{session=C(Sv);static ɵfac=function(t){return new(t||e)};static ɵcmp=tf({type:e,selectors:[[`app-victory-overlay`]],decls:1,vars:1,consts:[[1,`victory-overlay`],[1,`victory-card`],[1,`trophy-container`],[1,`trophy-glow`],[`src`,`icons/trophy.svg`,`alt`,`Trophy`,1,`trophy-icon`],[1,`victory-subtitle`],[1,`victory-stats`],[1,`v-stat`],[1,`v-val`],[1,`v-lbl`],[1,`btn`,`btn-gradient`,`btn-large`,`btn-block`,3,`click`]],template:function(e,t){e&1&&N(0,Hv,27,3,`div`,0),e&2&&P(t.session.isGameWon()?0:-1)},styles:[`.victory-overlay[_ngcontent-%COMP%] {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  pointer-events: auto;
  user-select: none;
}

.victory-card[_ngcontent-%COMP%] {
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 40px;
  width: 420px;
  max-width: calc(100vw - 32px);
  box-sizing: border-box;
  text-align: center;
  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.5),
    0 0 100px rgba(245, 158, 11, 0.15);
  color: #fff;
  transform: scale(1);
  animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.trophy-container[_ngcontent-%COMP%] {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
}

.trophy-icon[_ngcontent-%COMP%] {
  width: 80px;
  height: 80px;
  color: #f59e0b;
  position: relative;
  z-index: 2;
  animation: _ngcontent-%COMP%_bounce 2s infinite;
}

@keyframes _ngcontent-%COMP%_bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.trophy-glow[_ngcontent-%COMP%] {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: radial-gradient(
    circle,
    rgba(245, 158, 11, 0.4) 0%,
    transparent 70%
  );
  z-index: 1;
}

.victory-card[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
  font-size: 2.25rem;
  font-weight: 800;
  margin: 0 0 8px;
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.victory-subtitle[_ngcontent-%COMP%] {
  color: #94a3b8;
  font-size: 1rem;
  margin: 0 0 32px;
}

.victory-stats[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-around;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 32px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.v-stat[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
}

.v-stat[_ngcontent-%COMP%]   .v-val[_ngcontent-%COMP%] {
  font-size: 1.5rem;
  font-weight: 800;
  color: #f8fafc;
  font-family: monospace;
}

.v-stat[_ngcontent-%COMP%]   .v-lbl[_ngcontent-%COMP%] {
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  margin-top: 4px;
}

@media (max-width: 480px) {
  .victory-card[_ngcontent-%COMP%] {
    padding: 24px 16px;
  }

  .victory-card[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
    font-size: 1.75rem;
  }

  .victory-subtitle[_ngcontent-%COMP%] {
    margin-bottom: 20px;
  }

  .victory-stats[_ngcontent-%COMP%] {
    padding: 12px 8px;
    margin-bottom: 24px;
  }

  .v-stat[_ngcontent-%COMP%]   .v-val[_ngcontent-%COMP%] {
    font-size: 1.2rem;
  }
}`]})};function Wv(e,t){if(e&1){let e=Yf();z(0,`div`,1),H(`click`,function(){return D(e),O(U().confirmation.cancel())}),z(1,`div`,2),H(`click`,function(e){return e.stopPropagation()}),z(2,`div`,3),qf(3,`img`,4),B(),z(4,`h3`),G(5,`Confirm Action`),B(),z(6,`p`,5),G(7),B(),z(8,`div`,6)(9,`button`,7),H(`click`,function(){return D(e),O(U().confirmation.cancel())}),G(10,` Cancel `),B(),z(11,`button`,8),H(`click`,function(){return D(e),O(U().confirmation.accept())}),G(12,` Confirm `),B()()()()}if(e&2){let e=U();M(7),K(e.confirmation.message())}}var Gv=class e{confirmation=C(xv);static ɵfac=function(t){return new(t||e)};static ɵcmp=tf({type:e,selectors:[[`app-confirmation-dialog`]],decls:1,vars:1,consts:[[1,`confirmation-overlay`],[1,`confirmation-overlay`,3,`click`],[1,`confirmation-card`,3,`click`],[1,`warning-icon-container`],[`src`,`icons/warning.svg`,`alt`,`Warning`,1,`warning-icon`],[1,`confirmation-message`],[1,`confirmation-actions`],[1,`btn`,`btn-secondary`,3,`click`],[1,`btn`,`btn-danger`,3,`click`]],template:function(e,t){e&1&&N(0,Wv,13,1,`div`,0),e&2&&P(t.confirmation.isOpen()?0:-1)},styles:[`.confirmation-overlay[_ngcontent-%COMP%] {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000; 
  pointer-events: auto;
  user-select: none;
}

.confirmation-card[_ngcontent-%COMP%] {
  background: rgba(30, 41, 59, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 32px;
  width: 380px;
  max-width: calc(100vw - 32px);
  box-sizing: border-box;
  text-align: center;
  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.5),
    0 0 80px rgba(239, 68, 68, 0.15);
  color: #fff;
  animation: popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.warning-icon-container[_ngcontent-%COMP%] {
  position: relative;
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
}

.warning-icon[_ngcontent-%COMP%] {
  width: 64px;
  height: 64px;
  color: #ef4444; 
  animation: _ngcontent-%COMP%_pulse 2s infinite;
}

@keyframes _ngcontent-%COMP%_pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.85;
  }
}

.confirmation-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 12px;
  background: linear-gradient(135deg, #ef4444 0%, #f87171 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.confirmation-message[_ngcontent-%COMP%] {
  color: #cbd5e1;
  font-size: 0.95rem;
  margin: 0 0 28px;
  line-height: 1.5;
}

.confirmation-actions[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  gap: 16px;
}

@media (max-width: 480px) {
  .confirmation-card[_ngcontent-%COMP%] {
    padding: 24px 16px;
  }

  .confirmation-actions[_ngcontent-%COMP%] {
    gap: 10px;
  }
}`]})},Kv=(e,t)=>t.optionId,qv=(e,t)=>t.label;function Jv(e,t){e&1&&(z(0,`a`,8),qf(1,`img`,17),z(2,`span`),G(3,`Wikipedia`),B()()),e&2&&Xf(`href`,U(2).docService.activeGameDoc().wikipediaUrl,uc)}function Yv(e,t){if(e&1){let e=Yf();z(0,`button`,11),H(`click`,function(){return D(e),O(U(2).selectTab(`variants`))}),G(1,` Options & Variants `),B()}e&2&&W(`active`,U(2).activeTab()===`variants`)}function Xv(e,t){if(e&1){let e=Yf();z(0,`div`,24)(1,`div`,25)(2,`img`,26),H(`load`,function(){D(e);let t=U(3);return O(t.onImageLoad(t.docService.activeGameDoc().screenshots[0].url))}),B()(),z(3,`p`,27),G(4),B()()}if(e&2){let e=U(3);M(),W(`is-loaded`,e.isImageLoaded(e.docService.activeGameDoc().screenshots[0].url)),M(),W(`loaded`,e.isImageLoaded(e.docService.activeGameDoc().screenshots[0].url)),Xf(`src`,e.docService.activeGameDoc().screenshots[0].url,uc)(`alt`,e.docService.activeGameDoc().screenshots[0].altText),M(2),Hp(` `,e.docService.activeGameDoc().screenshots[0].caption,` `)}}function Zv(e,t){if(e&1&&(z(0,`section`,14)(1,`div`,18)(2,`h3`,19),G(3,`Objective & Win Condition`),B(),z(4,`p`,20)(5,`strong`),G(6,`Objective:`),B(),G(7),B(),z(8,`p`,21)(9,`strong`),G(10,`Win Condition:`),B(),G(11),B()(),z(12,`div`,22)(13,`h4`),G(14,`Game Overview`),B(),z(15,`p`,23),G(16),B()(),N(17,Xv,5,7,`div`,24),B()),e&2){let e=U(2);M(7),Hp(` `,e.docService.activeGameDoc().summary.objective,` `),M(4),Hp(` `,e.docService.activeGameDoc().summary.winCondition,` `),M(5),K(e.docService.activeGameDoc().summary.quickOverview),M(),P(e.docService.activeGameDoc().screenshots.length>0?17:-1)}}function Qv(e,t){if(e&1&&(z(0,`li`),G(1),B()),e&2){let e=t.$implicit;M(),K(e)}}function $v(e,t){if(e&1&&(z(0,`li`),G(1),B()),e&2){let e=t.$implicit;M(),K(e)}}function ey(e,t){if(e&1&&(z(0,`li`),G(1),B()),e&2){let e=t.$implicit;M(),K(e)}}function ty(e,t){if(e&1&&(z(0,`li`),G(1),B()),e&2){let e=t.$implicit;M(),K(e)}}function ny(e,t){if(e&1&&(z(0,`div`,30)(1,`h4`),G(2,`Special Game Mechanics`),B(),z(3,`ul`),F(4,ty,2,1,`li`,null,Nf),B()()),e&2){let e=U();M(4),I(e)}}function ry(e,t){e&1&&N(0,ny,6,0,`div`,30),e&2&&P(t.length>0?0:-1)}function iy(e,t){if(e&1&&(z(0,`section`,14)(1,`div`,28)(2,`div`,29)(3,`h4`),G(4,`Board Layout`),B(),z(5,`ul`),F(6,Qv,2,1,`li`,null,Nf),B()(),z(8,`div`,29)(9,`h4`),G(10,`Sequence Building Rules`),B(),z(11,`ul`),F(12,$v,2,1,`li`,null,Nf),B()(),z(14,`div`,29)(15,`h4`),G(16,`Card Movement & Grabbing`),B(),z(17,`ul`),F(18,ey,2,1,`li`,null,Nf),B()(),N(20,ry,1,1),B()()),e&2){let e,t=U(2);M(6),I(t.docService.activeGameDoc().detailedRules.layout),M(6),I(t.docService.activeGameDoc().detailedRules.sequenceBuilding),M(6),I(t.docService.activeGameDoc().detailedRules.cardMovement),M(2),P((e=t.docService.activeGameDoc().detailedRules.specialRules)?20:-1,e)}}function ay(e,t){if(e&1&&(z(0,`div`,35)(1,`span`,36),G(2),B(),z(3,`span`,37),G(4),B()()),e&2){let e=t.$implicit;M(2),K(e.label),M(2),K(e.effect)}}function oy(e,t){if(e&1&&(z(0,`div`,31)(1,`h3`,32),G(2),B(),z(3,`p`,33),G(4),B(),z(5,`div`,34),F(6,ay,5,2,`div`,35,qv),B()()),e&2){let e=t.$implicit;M(2),K(e.label),M(2),K(e.description),M(2),I(e.choicesExplanation)}}function sy(e,t){if(e&1&&(z(0,`section`,14),F(1,oy,8,2,`div`,31,Kv),B()),e&2){let e=U(2);M(),I(e.docService.activeGameDoc().settingsAndVariants)}}function cy(e,t){if(e&1){let e=Yf();z(0,`div`,1),H(`click`,function(t){return D(e),O(U().onBackdropClick(t))}),z(1,`div`,2)(2,`div`,3)(3,`div`,4)(4,`div`,5),qf(5,`img`,6),z(6,`h2`,7),G(7),B()(),N(8,Jv,4,1,`a`,8),B(),z(9,`button`,9),H(`click`,function(){return D(e),O(U().docService.closeHelp())}),G(10,` × `),B()(),z(11,`nav`,10)(12,`button`,11),H(`click`,function(){return D(e),O(U().selectTab(`overview`))}),G(13,` Summary `),B(),z(14,`button`,11),H(`click`,function(){return D(e),O(U().selectTab(`rules`))}),G(15,` Detailed Rules `),B(),N(16,Yv,2,2,`button`,12),B(),z(17,`div`,13),N(18,Zv,18,4,`section`,14)(19,iy,21,1,`section`,14)(20,sy,3,0,`section`,14),B(),z(21,`div`,15)(22,`button`,16),H(`click`,function(){return D(e),O(U().docService.closeHelp())}),G(23,` Close `),B()()()()}if(e&2){let e,t=U();Cf(`aria-label`,t.docService.activeGameDoc().title+` Rules & Documentation`),M(7),K(t.docService.activeGameDoc().title),M(),P(t.docService.activeGameDoc().wikipediaUrl?8:-1),M(4),W(`active`,t.activeTab()===`overview`),M(2),W(`active`,t.activeTab()===`rules`),M(2),P(t.docService.activeGameDoc().settingsAndVariants.length>0?16:-1),M(2),P((e=t.activeTab())===`overview`?18:e===`rules`?19:e===`variants`?20:-1)}}var ly=class e{docService=C(wv);activeTab=k(`overview`);constructor(){fo(()=>{let e=this.docService.activeGameDoc();this.docService.isOpen()?this.activeTab()===`variants`&&e.settingsAndVariants.length===0&&this.activeTab.set(`overview`):this.activeTab.set(`overview`)})}loadedImages=k(new Set);selectTab(e){this.activeTab.set(e)}onImageLoad(e){this.loadedImages.update(t=>{let n=new Set(t);return n.add(e),n})}isImageLoaded(e){return this.loadedImages().has(e)}onEscapeKey(){this.docService.isOpen()&&this.docService.closeHelp()}onBackdropClick(e){e.target.classList.contains(`modal-backdrop`)&&this.docService.closeHelp()}static ɵfac=function(t){return new(t||e)};static ɵcmp=tf({type:e,selectors:[[`app-game-help-modal`]],hostBindings:function(e,t){e&1&&V(`keydown.escape`,function(){return t.onEscapeKey()},fc)},decls:1,vars:1,consts:[[`role`,`dialog`,`aria-modal`,`true`,1,`modal-backdrop`],[`role`,`dialog`,`aria-modal`,`true`,1,`modal-backdrop`,3,`click`],[1,`modal-dialog`],[1,`modal-header`],[1,`header-title-group`],[1,`title-with-icon`],[`src`,`icons/help-circle.svg`,`alt`,`Help`,1,`header-icon`],[1,`game-title`],[`target`,`_blank`,`rel`,`noopener noreferrer`,`title`,`View article on Wikipedia`,1,`wiki-badge`,3,`href`],[`title`,`Close documentation (Esc)`,`aria-label`,`Close documentation`,1,`btn-modal-close`,3,`click`],[`aria-label`,`Documentation sections`,1,`modal-tabs`],[1,`tab-btn`,3,`click`],[1,`tab-btn`,3,`active`],[1,`modal-body`],[1,`doc-section`,`animated-fade`],[1,`modal-footer`],[1,`btn`,`btn-secondary`,3,`click`],[`src`,`icons/wikipedia.svg`,`alt`,`Wikipedia`,1,`badge-icon`],[1,`callout-card`,`primary-callout`],[1,`callout-title`],[1,`objective-text`],[1,`win-text`],[1,`overview-block`],[1,`overview-p`],[1,`hero-screenshot-card`],[1,`img-skeleton-container`],[1,`screenshot-img`,3,`load`,`src`,`alt`],[1,`screenshot-caption`],[1,`rules-grid`],[1,`rule-card`],[1,`rule-card`,`special-card`],[1,`variant-card`],[1,`option-title`],[1,`option-desc`],[1,`choices-list`],[1,`choice-item`],[1,`choice-badge`],[1,`choice-effect`]],template:function(e,t){e&1&&N(0,cy,24,9,`div`,0),e&2&&P(t.docService.isOpen()?0:-1)},styles:[`.modal-backdrop[_ngcontent-%COMP%] {
  position: fixed;
  inset: 0;
  z-index: 1500;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(8px);
  padding: 1.5rem;
  animation: _ngcontent-%COMP%_fadeIn 0.2s ease-out;
  pointer-events: auto;
}

.modal-dialog[_ngcontent-%COMP%] {
  background: rgba(26, 32, 44, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
  color: #e2e8f0;
  display: flex;
  flex-direction: column;
  height: 90vh;
  max-height: 90vh;
  max-width: 1200px;
  width: 90vw;
  overflow: hidden;
}

.modal-header[_ngcontent-%COMP%] {
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
}

.header-title-group[_ngcontent-%COMP%] {
  align-items: center;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.title-with-icon[_ngcontent-%COMP%] {
  align-items: center;
  display: flex;
  gap: 0.5rem;
}

.header-icon[_ngcontent-%COMP%] {
  color: #38bdf8;
  height: 28px;
  width: 28px;
}

.game-title[_ngcontent-%COMP%] {
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: 0.025em;
}

.wiki-badge[_ngcontent-%COMP%] {
  align-items: center;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.3);
  border-radius: 20px;
  color: #38bdf8;
  display: inline-flex;
  font-size: 0.8rem;
  font-weight: 600;
  gap: 0.35rem;
  padding: 0.25rem 0.75rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.wiki-badge[_ngcontent-%COMP%]:hover {
  background: rgba(56, 189, 248, 0.25);
  border-color: #38bdf8;
  color: #ffffff;
}

.badge-icon[_ngcontent-%COMP%] {
  height: 14px;
  width: 14px;
}

.btn-modal-close[_ngcontent-%COMP%] {
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 1.75rem;
  line-height: 1;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.btn-modal-close[_ngcontent-%COMP%]:hover {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.1);
}

.modal-tabs[_ngcontent-%COMP%] {
  background: rgba(15, 23, 42, 0.6);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 1.5rem 0;
}

.tab-btn[_ngcontent-%COMP%] {
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: #94a3b8;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.6rem 1rem;
  transition: all 0.2s ease;
}

.tab-btn[_ngcontent-%COMP%]:hover {
  color: #f1f5f9;
}

.tab-btn.active[_ngcontent-%COMP%] {
  border-bottom-color: #38bdf8;
  color: #38bdf8;
}

.modal-body[_ngcontent-%COMP%] {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.doc-section[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.callout-card[_ngcontent-%COMP%] {
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(14, 165, 233, 0.05));
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: 12px;
  padding: 1.25rem;
}

.callout-title[_ngcontent-%COMP%] {
  color: #38bdf8;
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
}

.objective-text[_ngcontent-%COMP%], 
.win-text[_ngcontent-%COMP%] {
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0.4rem 0;
}

.overview-block[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {
  color: #f1f5f9;
  font-size: 1.05rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.overview-p[_ngcontent-%COMP%] {
  color: #cbd5e1;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

.hero-screenshot-card[_ngcontent-%COMP%] {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  padding: 0.75rem;
  text-align: center;
}

@keyframes _ngcontent-%COMP%_shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.img-skeleton-container[_ngcontent-%COMP%] {
  position: relative;
  width: 100%;
  min-height: 180px;
  border-radius: 8px;
  overflow: hidden;
  background: linear-gradient(
    90deg,
    rgba(30, 41, 59, 0.5) 0%,
    rgba(51, 65, 85, 0.8) 50%,
    rgba(30, 41, 59, 0.5) 100%
  );
  background-size: 200% 100%;
  animation: _ngcontent-%COMP%_shimmer 1.8s infinite linear;
  display: flex;
  align-items: center;
  justify-content: center;
}

.img-skeleton-container.is-loaded[_ngcontent-%COMP%] {
  animation: none;
  background: transparent;
  min-height: auto;
}

.screenshot-img[_ngcontent-%COMP%] {
  border-radius: 8px;
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
  opacity: 0;
  transition: opacity 0.35s ease-in-out;
}

.screenshot-img.loaded[_ngcontent-%COMP%] {
  opacity: 1;
}

.screenshot-caption[_ngcontent-%COMP%] {
  color: #94a3b8;
  font-size: 0.85rem;
  margin-top: 0.6rem;
  margin-bottom: 0.2rem;
  font-style: italic;
}

.rules-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.rule-card[_ngcontent-%COMP%] {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 1.25rem;
}

.rule-card[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {
  color: #38bdf8;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
}

.rule-card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {
  margin: 0;
  padding-left: 1.25rem;
}

.rule-card[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {
  color: #cbd5e1;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 0.5rem;
}

.variant-card[_ngcontent-%COMP%] {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.25rem;
}

.option-title[_ngcontent-%COMP%] {
  color: #f1f5f9;
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 0.4rem 0;
}

.option-desc[_ngcontent-%COMP%] {
  color: #94a3b8;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
}

.choices-list[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.choice-item[_ngcontent-%COMP%] {
  align-items: flex-start;
  display: flex;
  gap: 0.75rem;
}

.choice-badge[_ngcontent-%COMP%] {
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid rgba(56, 189, 248, 0.3);
  border-radius: 6px;
  color: #38bdf8;
  font-size: 0.8rem;
  font-weight: 700;
  min-width: 100px;
  padding: 0.3rem 0.6rem;
  text-align: center;
}

.choice-effect[_ngcontent-%COMP%] {
  color: #cbd5e1;
  font-size: 0.9rem;
  line-height: 1.4;
}



.modal-footer[_ngcontent-%COMP%] {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: flex-end;
  padding: 1rem 1.5rem;
}

@keyframes _ngcontent-%COMP%_fadeIn {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animated-fade[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}`]})},uy=``+new URL(`card_assets-0-VlHDaQ-p.png`,import.meta.url).href,dy=``+new URL(`card_assets-1-C_BtY2IZ.png`,import.meta.url).href,fy={textures:[{image:`card_assets-0.png`,format:`RGBA8888`,size:{w:4032,h:3732},scale:1,frames:[{filename:`card-clubs-ace`,frame:{x:4,y:4,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-clubs-2`,frame:{x:452,y:4,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-clubs-3`,frame:{x:900,y:4,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-clubs-4`,frame:{x:1348,y:4,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-clubs-5`,frame:{x:1796,y:4,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-clubs-6`,frame:{x:2244,y:4,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-clubs-7`,frame:{x:2692,y:4,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-clubs-8`,frame:{x:3140,y:4,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-clubs-9`,frame:{x:3588,y:4,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-clubs-10`,frame:{x:4,y:626,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-clubs-jack`,frame:{x:452,y:626,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-clubs-queen`,frame:{x:900,y:626,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-clubs-king`,frame:{x:1348,y:626,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-hearts-ace`,frame:{x:1796,y:626,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-hearts-2`,frame:{x:2244,y:626,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-hearts-3`,frame:{x:2692,y:626,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-hearts-4`,frame:{x:3140,y:626,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-hearts-5`,frame:{x:3588,y:626,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-hearts-6`,frame:{x:4,y:1248,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-hearts-7`,frame:{x:452,y:1248,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-hearts-8`,frame:{x:900,y:1248,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-hearts-9`,frame:{x:1348,y:1248,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-hearts-10`,frame:{x:1796,y:1248,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-hearts-jack`,frame:{x:2244,y:1248,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-hearts-queen`,frame:{x:2692,y:1248,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-hearts-king`,frame:{x:3140,y:1248,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-spades-ace`,frame:{x:3588,y:1248,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-spades-2`,frame:{x:4,y:1870,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-spades-3`,frame:{x:452,y:1870,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-spades-4`,frame:{x:900,y:1870,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-spades-5`,frame:{x:1348,y:1870,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-spades-6`,frame:{x:1796,y:1870,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-spades-7`,frame:{x:2244,y:1870,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-spades-8`,frame:{x:2692,y:1870,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-spades-9`,frame:{x:3140,y:1870,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-spades-10`,frame:{x:3588,y:1870,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-spades-jack`,frame:{x:4,y:2492,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-spades-queen`,frame:{x:452,y:2492,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-spades-king`,frame:{x:900,y:2492,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-diamonds-ace`,frame:{x:1348,y:2492,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-diamonds-2`,frame:{x:1796,y:2492,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-diamonds-3`,frame:{x:2244,y:2492,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-diamonds-4`,frame:{x:2692,y:2492,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-diamonds-5`,frame:{x:3140,y:2492,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-diamonds-6`,frame:{x:3588,y:2492,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-diamonds-7`,frame:{x:4,y:3114,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-diamonds-8`,frame:{x:452,y:3114,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-diamonds-9`,frame:{x:900,y:3114,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-diamonds-10`,frame:{x:1348,y:3114,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-diamonds-jack`,frame:{x:1796,y:3114,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-diamonds-queen`,frame:{x:2244,y:3114,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-diamonds-king`,frame:{x:2692,y:3114,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-back-blue`,frame:{x:3140,y:3114,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-back-red`,frame:{x:3588,y:3114,w:440,h:614},anchor:{x:.5,y:.5}}]},{image:`card_assets-1.png`,format:`RGBA8888`,size:{w:1344,h:622},scale:1,frames:[{filename:`card-placeholder`,frame:{x:4,y:4,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-placeholder-full-border-circle`,frame:{x:452,y:4,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-placeholder-full-border-reset`,frame:{x:900,y:4,w:440,h:614},anchor:{x:.5,y:.5}}]}]},py=Object.assign({"/src/engine/render/assets/sprites/atlas/card_assets-0.png":uy,"/src/engine/render/assets/sprites/atlas/card_assets-1.png":dy});function my(e){let t=Object.entries(py).find(([t])=>t.endsWith(`/${e}`));if(!t)throw Error(`Atlas page not found: ${e}`);return t[1]}var hy=class extends e{constructor(){super(`loading-scene`)}preload(){let e={textures:fy.textures.map(e=>({...e,image:my(e.image)}))};this.load.multiatlas(`card_assets`,e,void 0)}create(){this.scene.start(`board-scene`)}},gy=class e{scene;cardBackStyle;static CARD_SHADOW={x:-1.5,y:-2,decay:.22,power:.04,color:0,samples:12,intensity:.1};static CARD_SHADOW_PADDING={x:32,y:48};constructor(e,t){this.scene=e,this.cardBackStyle=t}createCardSprite(){let t=this.scene.add.sprite(0,0,`card_assets`,this.cardBackStyle());t.setOrigin(0,0),t.enableFilters();let n=e.CARD_SHADOW,r=e.CARD_SHADOW_PADDING;return t.filters?.internal.addShadow(n.x,n.y,n.decay,n.power,n.color,n.samples,n.intensity)?.setPaddingOverride(-r.x,-r.y,r.x,r.y),t.setInteractive({useHandCursor:!0}),t}createPileBackground(e,t,n){let r=this.scene.add.sprite(0,0,`card_assets`,e);return r.setOrigin(0,0),r.setAlpha(t),n&&r.setInteractive({useHandCursor:!0}),r}},_y=350,vy=class{handle;stackFromCard;now;hoveredCardId=null;hoveredBackgroundPileId=null;drag=null;snapAll=!0;flightState=[];lastPressTimeMs=0;lastPressedCardId=null;constructor(e,t,n=Date.now){this.handle=e,this.stackFromCard=t,this.now=n}cardOver(e){this.hoveredCardId=e}cardOut(e){this.hoveredCardId===e&&(this.hoveredCardId=null)}backgroundOver(e){this.hoveredBackgroundPileId=e}backgroundOut(e){this.hoveredBackgroundPileId===e&&(this.hoveredBackgroundPileId=null)}cardPressed(e){this.handle({kind:`activate`,cardId:e}),this.isDoublePress(e)&&(this.drag=null,this.handle({kind:`activate-secondary`,cardId:e}))}backgroundPressed(e){this.handle({kind:`activate-pile`,pileId:e})}isDoublePress(e){let t=this.now(),n=this.lastPressedCardId===e&&t-this.lastPressTimeMs<_y;return this.lastPressTimeMs=t,this.lastPressedCardId=e,n}resetPressTracking(){this.lastPressTimeMs=0,this.lastPressedCardId=null}dragStarted(e,t){let n=this.stackFromCard(e);n.length!==0&&(this.drag={cardIds:[...n],primary:{x:t.x,y:t.y}})}dragMoved(e){this.drag&&(this.drag.primary={x:e.x,y:e.y})}dragEnded(e){let t=this.drag;t&&(this.drag=null,this.handle({kind:`drop`,cardIds:t.cardIds,targetPileId:e}),this.beginFlight(t.cardIds))}get flights(){return this.flightState}beginFlight(e){if(e.length===0)return;let t=new Set(e);for(let e=this.flightState.length-1;e>=0;e--){let n=this.flightState[e].cardIds.filter(e=>!t.has(e));n.length===0?this.flightState.splice(e,1):this.flightState[e].cardIds=n}this.flightState.push({cardIds:[...e]})}endFlight(e){let t=this.flightState.indexOf(e);t!==-1&&this.flightState.splice(t,1)}get interaction(){return{hoveredCardId:this.hoveredCardId,hoveredBackgroundPileId:this.hoveredBackgroundPileId,drag:this.drag,flights:this.flightState,snapAll:this.snapAll}}reset(){this.hoveredCardId=null,this.hoveredBackgroundPileId=null,this.drag=null,this.flightState.length=0,this.snapAll=!0,this.resetPressTracking()}};function yy(e){let t=e.getData(`cardId`);return typeof t==`string`?t:null}var by=class{boardScene;controller;constructor(e){this.boardScene=e,this.controller=new vy(e.handleIntent,e.stackFromCard)}registerDragListeners(){this.boardScene.input.on(`dragstart`,(e,t)=>this.onDragStart(t)),this.boardScene.input.on(`drag`,(e,t,n,r)=>this.controller.dragMoved({x:n,y:r})),this.boardScene.input.on(`dragend`,(e,t)=>this.onDragEnd(t))}registerCardListeners(e,t){e.on(`pointerover`,()=>this.controller.cardOver(t)),e.on(`pointerout`,()=>this.controller.cardOut(t)),e.on(`pointerdown`,()=>this.controller.cardPressed(t))}registerPileBackgroundListeners(e,t){e.on(`pointerdown`,()=>this.controller.backgroundPressed(t)),e.on(`pointerover`,()=>this.controller.backgroundOver(t)),e.on(`pointerout`,()=>this.controller.backgroundOut(t))}onDragStart(e){let t=yy(e);t&&this.controller.dragStarted(t,{x:e.x,y:e.y})}onDragEnd(e){let t=this.controller.drag;if(!t||!yy(e)){this.controller.dragEnded(null);return}let n=this.boardScene.resolveDropTarget(t,this.boardScene.viewport);this.controller.dragEnded(n?.pileId??null)}get hoveredCardId(){return this.controller.hoveredCardId}set hoveredCardId(e){this.controller.hoveredCardId=e}get hoveredBackgroundPileId(){return this.controller.hoveredBackgroundPileId}set hoveredBackgroundPileId(e){this.controller.hoveredBackgroundPileId=e}get drag(){return this.controller.drag}set drag(e){this.controller.drag=e}get snapAll(){return this.controller.snapAll}set snapAll(e){this.controller.snapAll=e}get flights(){return this.controller.flights}beginFlight(e){this.controller.beginFlight(e)}endFlight(e){this.controller.endFlight(e)}get interaction(){return this.controller.interaction}resetInteraction(){this.controller.reset()}},xy=90,Sy=.5,Cy=9,wy=12,Ty=15462299,Ey=.9,Dy=class{sprites;highlightBorders=[];travelDistances=new Map;constructor(e){this.sprites=e}areCardsTravelling(e){return e.some(e=>this.travelDistances.has(e))}apply(e,t){let n=t>0?1-Math.exp(-t/xy):1;for(let t of e.backgrounds){let e=this.sprites.pileBackgroundSprite(t.pileId);e?.active&&(e.setPosition(t.x,t.y),e.setScale(t.scale),e.setDepth(t.depth),t.cursor&&e.input&&e.input.cursor!==t.cursor&&(e.input.cursor=t.cursor))}let r=new Map;for(let i of e.cards){let e=this.sprites.cardSprite(i.cardId);if(e?.active){if(i.snap||t<=0)e.setPosition(i.x,i.y);else{e.x+=(i.x-e.x)*n,e.y+=(i.y-e.y)*n;let t=Math.abs(e.x-i.x),a=Math.abs(e.y-i.y);t<Sy&&a<Sy?e.setPosition(i.x,i.y):r.set(i.cardId,Math.max(t,a))}e.setScale(i.scale),e.setDepth(i.depth),e.frame.name!==i.frame&&(e.setFrame(i.frame),e.setOrigin(0,0)),e.input&&e.input.cursor!==i.cursor&&(e.input.cursor=i.cursor),e.getData(`draggable`)!==i.draggable&&(this.sprites.setDraggable(e,i.draggable),e.setData(`draggable`,i.draggable))}}this.travelDistances=r,this.drawHighlights(e.highlights,r)}drawHighlights(e,t){let n=0;for(let r of e){let e=this.resolveHighlightPosition(r,t);if(!e)continue;let i=this.highlightBorder(n++);this.shapeHighlightBorder(i,r),i.depth!==r.depth&&(i.graphics.setDepth(r.depth),i.depth=r.depth),i.graphics.setPosition(e.x,e.y),i.graphics.setVisible(!0)}for(let e=n;e<this.highlightBorders.length;e++)this.highlightBorders[e].graphics.setVisible(!1)}resolveHighlightPosition(e,t){if(e.anchor.kind===`point`)return{x:e.anchor.x,y:e.anchor.y};let n=e.anchor.cardId,r=15*e.scale;if((t.get(n)??0)>r)return null;let i=this.sprites.cardSprite(n);return i?.active?{x:i.x,y:i.y}:null}highlightBorder(e){let t=this.highlightBorders[e];return t||(t={graphics:this.sprites.addGraphics(),shapeKey:null,depth:null},this.highlightBorders[e]=t),t}shapeHighlightBorder(e,t){let n=`${t.width}:${t.height}:${t.scale}:${t.openBottom}`;if(e.shapeKey===n)return;e.shapeKey=n;let r=e.graphics,i=wy*t.scale;r.clear(),r.lineStyle(Cy*t.scale,Ty,Ey),t.openBottom?Oy(r,t.width,t.height,i):r.strokeRoundedRect(0,0,t.width,t.height,i)}};function Oy(e,t,n,r){let i=Math.max(0,Math.min(r,n,t/2));e.beginPath(),e.moveTo(0,n),e.lineTo(0,i),e.arc(i,i,i,Math.PI,Math.PI*1.5),e.lineTo(t-i,0),e.arc(t-i,i,i,Math.PI*1.5,Math.PI*2),e.lineTo(t,n),e.strokePath()}function ky(e){let t=e.columns*e.cardSize.width+Math.max(0,e.columns-1)*e.gap.x+2*e.padding.x,n=e.headerHeightPx+e.rows*e.cardSize.height+Math.max(0,e.rows-1)*e.gap.y+2*e.padding.y;return{width:t,height:e.designHeightPx??n}}function Ay(e,t){let n=ky(e),r=t.pixelRatio,i=t.width||n.width*r,a=(t.height||n.height*r)-e.headerHeightPx*r,o=i/n.width,s=a/(n.height-e.headerHeightPx),c=Math.min(o,s);return c>r&&(c=r),c<=0&&(c=r),c}var jy={x:8,y:14},My={x:8,y:14};function Ny(e,t){let n=t.width/(t.pixelRatio||1);return n===0||n>720?e:{...e,gap:{x:Math.min(e.gap.x,jy.x),y:Math.min(e.gap.y,jy.y)},padding:{x:Math.min(e.padding.x,My.x),y:Math.min(e.padding.y,My.y)}}}function Py(e,t){let n=Ny(e,t),r=Ay(n,t);return{layout:n,scale:r,origins:Fy(n,t,r)}}function Fy(e,t,n){let r=e.cardSize.width*n,i=e.cardSize.height*n,a=e.gap.x*n,o=e.gap.y*n,s=e.columns*r+Math.max(0,e.columns-1)*a,c=t.width||ky(e).width,l=Math.max(e.padding.x*n,(c-s)/2),u=e.padding.y*n,d=e.headerHeightPx*t.pixelRatio,f=new Map;for(let t of e.slots)f.set(t.pileId,{x:l+t.column*(r+a),y:d+u+t.row*(i+o)});return f}var Iy=class t extends e{static PILE_BACKGROUND_ALPHA=.5;tableGame;options;cardSprites=new Map;pileBackgrounds=new Map;inputManager;visualFactory;viewApplier;constructor(e){super(`board-scene`),this.options=e,this.tableGame=e.game}get resolveDropTarget(){return this.options.resolveDropTarget}get handleIntent(){return this.options.handleIntent}get stackFromCard(){return this.options.stackFromCard}create(){this.inputManager=new by(this),this.viewApplier=new Dy(this),this.visualFactory=new gy(this,this.options.cardBackKey),this.createPileBackgroundSprites(),this.createCardSprites();let e=this.options.onBackgroundColor(e=>{this.cameras?.main?.setBackgroundColor(e)}),t=this.options.onReset(()=>{this.inputManager.resetInteraction()}),n=this.options.onCardsRelocated(e=>{this.inputManager.beginFlight(e)});this.events.once(r.Events.SHUTDOWN,()=>{e(),t(),n()}),this.inputManager.snapAll=!0,this.scale.on(`resize`,()=>{this.inputManager.snapAll=!0}),this.inputManager.registerDragListeners(),this.input.setPollAlways()}createCardSprites(){for(let e of this.options.cardIds){if(!this.tableGame.getCardById(e))throw Error(`Card model not found for: ${e}`);let t=this.visualFactory.createCardSprite();this.cardSprites.set(e,t),t.setData(`cardId`,e),this.inputManager.registerCardListeners(t,e)}}createPileBackgroundSprites(){let e=t.PILE_BACKGROUND_ALPHA;for(let t of this.tableGame.piles){let n=this.tableGame.zoneFor(t.id);if(!n?.backgroundKey)continue;let r=this.visualFactory.createPileBackground(n.backgroundKey,e,n.emptyIsActionable??!1);this.pileBackgrounds.set(t.id,r),n.emptyIsActionable&&this.inputManager.registerPileBackgroundListeners(r,t.id)}}cardSprite(e){return this.cardSprites.get(e)}pileBackgroundSprite(e){return this.pileBackgrounds.get(e)}addGraphics(){return this.add.graphics()}setDraggable(e,t){this.input.setDraggable(e,t)}get cardIds(){return this.cardSprites.keys()}get pixelRatio(){let e=this.scale?.displayScale?.x;return e&&Number.isFinite(e)?e:1}get viewport(){let e=ky(this.options.layout);return{width:this.scale?.width||e.width,height:this.scale?.height||e.height,pixelRatio:this.pixelRatio}}update(e,t){if(!this.inputManager||!this.viewApplier)return;let n=this.options.buildViewState(this.inputManager.interaction,this.viewport);this.viewApplier.apply(n,t);for(let e of[...this.inputManager.flights])this.viewApplier.areCardsTravelling(e.cardIds)||this.inputManager.endFlight(e);this.inputManager.snapAll&&(this.inputManager.snapAll=!1)}};function Ly(e){return Array.from({length:e},()=>({x:0,y:0}))}function Ry(e,t,n){let r=[],i=0;for(let a of e)r.push({x:0,y:i}),i+=a.faceUp?t.faceUpGap:t.faceDownGap,a.id===n&&(i+=t.hoverExpansion);return r}function zy(e,t){let n=e-Math.min(e,t.maxVisible),r=[];for(let i=0;i<e;i++)r.push(i<n?{x:0,y:0}:{x:(i-n)*t.gap,y:0});return r}function By(e,t,n=null){switch(e.kind){case`fan-down`:return Ry(t,e,n);case`fan-right`:return zy(t.length,e);default:return Ly(t.length)}}function Vy(e,t,n){if(t.length===0)return n;let r=By(e,t);return r[r.length-1].y+n}function Hy(e,t,n,r){let i=[];for(let{pile:a,layout:o}of e){let e=t.get(a.id);e&&i.push({pileId:a.id,x:e.x,y:e.y,width:n.width*r,height:Vy(o,a.getCards(),n.height)*r})}return i}function Uy(e,t){return Math.max(0,Math.min(e.x+e.width,t.x+t.width)-Math.max(e.x,t.x))*Math.max(0,Math.min(e.y+e.height,t.y+t.height)-Math.max(e.y,t.y))}function Wy(e,t){let n=null,r=0;for(let i of t){let t=Uy(e,i);t>r&&(r=t,n=i)}return n}var Gy;(function(e){e[e.PILE_BACKGROUND=0]=`PILE_BACKGROUND`,e[e.RESTING_CARD=1]=`RESTING_CARD`,e[e.HOVER_HINT=2]=`HOVER_HINT`,e[e.DROP_TARGET_HINT=3]=`DROP_TARGET_HINT`,e[e.FLYING_CARD=4]=`FLYING_CARD`,e[e.HELD_CARD=5]=`HELD_CARD`})(Gy||={});var Ky=1e3;function qy(e,t=0){let n=Math.min(Math.max(Math.trunc(t),0),Ky-1);return e*Ky+n}function Jy(e,t,n){let r=n.layout.cardSize,i=Hy(e.dropTargetPiles.map(t=>({pile:t,layout:e.zoneFor(t.id)?.layout??{kind:`stacked`}})),n.origins,r,n.scale);return Wy({x:t.primary.x,y:t.primary.y,width:r.width*n.scale,height:r.height*n.scale},i)}var Yy=class{game;interaction;metrics;presentation;scale;spriteScale;origins;cardWidth;cardHeight;constructor(e,t,n,r){this.game=e,this.interaction=t,this.metrics=n,this.presentation=r,this.scale=n.scale,this.spriteScale=this.scale/2,this.origins=n.origins,this.cardWidth=220*this.scale,this.cardHeight=307*this.scale}build(){return{backgrounds:this.buildBackgrounds(),cards:this.buildCards(),highlights:this.buildHighlights()}}buildBackgrounds(){let e=[];for(let t of this.game.piles){let n=this.game.zoneFor(t.id),r=this.origins.get(t.id);!n?.backgroundKey||!r||e.push({pileId:t.id,x:r.x,y:r.y,scale:this.spriteScale,depth:qy(Gy.PILE_BACKGROUND),cursor:n.emptyIsActionable&&t.isEmpty?`pointer`:`default`})}return e}buildCards(){let e=[],t=this.interaction.drag?.cardIds??[],n=new Set(t),r=this.interaction.drag?.primary??null,i=t.length>0?this.game.getPileContainingCard(t[0]):null,a=i?this.game.zoneFor(i.id)?.layout:void 0,o=a?.kind===`fan-down`?a.faceUpGap:0,s=new Map;for(let e of this.interaction.flights)for(let t of e.cardIds)s.set(t,s.size);let c=0;for(let i of this.game.piles){let a=this.origins.get(i.id),l=this.game.zoneFor(i.id);if(!a||!l)continue;let u=i.getCards(),d=By(l.layout,u,this.expansionCardId(i,u));for(let f=0;f<u.length;f++){let p=u[f],m=n.has(p.id),ee,te,ne=qy(Gy.RESTING_CARD,c++),re=this.interaction.snapAll;if(m&&r){let e=t.indexOf(p.id);ee=r.x,te=r.y+e*o*this.scale,ne=qy(Gy.HELD_CARD,e),re=!0}else{ee=a.x+d[f].x*this.scale,te=a.y+d[f].y*this.scale;let e=s.get(p.id);e!==void 0&&(ne=qy(Gy.FLYING_CARD,e))}e.push({cardId:p.id,x:ee,y:te,scale:this.spriteScale,depth:ne,frame:Yh(l.face,p,this.presentation.cardBackKey),cursor:this.game.isCardInteractableInPile(p,i)?`pointer`:`default`,draggable:this.game.isCardDraggableInPile(p,i),snap:re})}}return e}expansionCardId(e,t){if(!this.interaction.hoveredCardId||this.interaction.drag)return null;let n=t.find(e=>e.id===this.interaction.hoveredCardId);return n&&this.game.isCardInteractableInPile(n,e)?n.id:null}buildHighlights(){let e=this.interaction.drag;if(e&&e.cardIds.length>0){let t=this.buildDropTargetHighlight(e);return t?[t]:[]}let t=this.buildHoverHighlight();return t?[t]:[]}buildDropTargetHighlight(e){let t=Jy(this.game,e,this.metrics);if(!t)return null;let n=this.game.getPileById(t.pileId);if(!n||!this.game.canMoveCardToPile(e.cardIds[0],t.pileId))return null;let r=n.topCard;return{anchor:r?{kind:`card`,cardId:r.id}:{kind:`point`,x:t.x,y:t.y},width:this.cardWidth,height:this.cardHeight,scale:this.scale,depth:qy(Gy.DROP_TARGET_HINT),openBottom:!1}}buildHoverHighlight(){let e=this.buildBackgroundHoverHighlight();if(e)return e;if(!this.interaction.hoveredCardId)return null;let t=this.game.getCardById(this.interaction.hoveredCardId),n=t?this.game.getPileContainingCard(t.id):void 0;if(!t||!n||!this.game.isCardInteractableInPile(t,n))return null;let r=n.getCards(),i=r.indexOf(t);return{anchor:{kind:`card`,cardId:t.id},width:this.cardWidth,height:this.cardHeight,scale:this.scale,depth:qy(Gy.HOVER_HINT),openBottom:i!==-1&&i<r.length-1}}buildBackgroundHoverHighlight(){let e=this.interaction.hoveredBackgroundPileId;if(!e)return null;let t=this.game.getPileById(e),n=this.game.zoneFor(e),r=this.origins.get(e);return!t?.isEmpty||!n?.emptyIsActionable||!r?null:{anchor:{kind:`point`,x:r.x,y:r.y},width:this.cardWidth,height:this.cardHeight,scale:this.scale,depth:qy(Gy.HOVER_HINT),openBottom:!1}}};function Xy(e,t,n,r){return new Yy(e,t,n,r).build()}var Zy={columns:7,rows:2,slots:Og(3).map(e=>e.slot),cardSize:{width:221,height:313},gap:{x:30,y:40},padding:{x:40,y:40},headerHeightPx:73,designHeightPx:950};function Qy(e){return Py(Zy,e)}function $y(e,t){return(n,r)=>Xy(e,n,Qy(r),{cardBackKey:t.cardBackKey()})}function eb(e){return(t,n)=>Jy(e,t,Qy(n))}function tb(e,t){let n=e.getCards(),r=n.findIndex(e=>e.id===t);return r===-1?[]:n.slice(r).map(e=>e.id)}function nb(e){return t=>{switch(t.kind){case`activate`:{let n=e.getPileContainingCard(t.cardId);if(!n)throw Error(`Card ${t.cardId} is not in a pile`);n.role===Y.STOCK&&n.topCard?.id===t.cardId&&e.drawCardsFromStock();return}case`activate-secondary`:{let n=e.getPileContainingCard(t.cardId);(n?.role===Y.TABLEAU||n?.role===Y.WASTE)&&e.autoMoveCard(t.cardId);return}case`activate-pile`:t.pileId===e.stock.id&&e.stock.isEmpty&&e.drawCardsFromStock();return;case`drop`:{let[n]=t.cardIds;t.targetPileId&&n&&e.moveCardToPile(n,t.targetPileId);return}}}}function rb(e){return t=>{let n=e.getPileContainingCard(t);return n?tb(n,t):[]}}var ib=class e{window;game;parent;static MAX_PIXEL_RATIO=2;pixelRatioQuery=null;parentObserver=null;onViewportChange=()=>{this.apply()};constructor(e,t,n){this.window=e,this.game=t,this.parent=n}get pixelRatio(){return Math.min(this.devicePixelRatio,e.MAX_PIXEL_RATIO)}start(){this.apply(),this.window.addEventListener(`resize`,this.onViewportChange),this.observeParent()}observeParent(){typeof ResizeObserver>`u`||typeof Element>`u`||!(this.parent instanceof Element)||(this.parentObserver=new ResizeObserver(this.onViewportChange),this.parentObserver.observe(this.parent))}stop(){this.window.removeEventListener(`resize`,this.onViewportChange),this.pixelRatioQuery?.removeEventListener(`change`,this.onViewportChange),this.pixelRatioQuery=null,this.parentObserver?.disconnect(),this.parentObserver=null}apply(){let e=this.pixelRatio,t=this.parent.getBoundingClientRect(),n=Math.max(1,Math.floor(t.width)),r=Math.max(1,Math.floor(t.height));this.game.scale.setZoom(1/e),this.game.scale.resize(n*e,r*e),this.game.canvas.style.width=`${n}px`,this.game.canvas.style.height=`${r}px`,this.watchPixelRatio()}get devicePixelRatio(){return Math.max(this.window.devicePixelRatio||1,1)}watchPixelRatio(){let e=this.window.matchMedia?.(`(resolution: ${this.devicePixelRatio}dppx)`);e&&(this.pixelRatioQuery?.removeEventListener(`change`,this.onViewportChange),this.pixelRatioQuery=e,e.addEventListener(`change`,this.onViewportChange))}};function ab(e,t){return new Iy({game:e,cardIds:e.cardIds,layout:Zy,buildViewState:$y(e,t),resolveDropTarget:eb(e),handleIntent:nb(e),stackFromCard:rb(e),cardBackKey:()=>t.cardBackKey(),onBackgroundColor:t.onBackgroundColor,onReset:t=>{let n=()=>t();return e.on(`game-reset`,n),()=>e.off(`game-reset`,n)},onCardsRelocated:t=>e.onCardsRelocated(t)})}var ob=class{window;parent;makeBoardScene;game;scaler;constructor(e,t,n){this.window=e,this.parent=t,this.makeBoardScene=n}start(){let e=new i({title:`fSolitaire`,type:a,parent:this.parent,backgroundColor:lh,scale:{mode:t.ScaleModes.NONE},render:{antialias:!0,roundPixels:!0},canvasStyle:`display: block; width: 100%; height: 100%;`,autoFocus:!0,scene:[hy,this.makeBoardScene()]});this.game=e,e.events.once(n.Events.READY,()=>{this.scaler=new ib(this.window,e,this.parent),this.scaler.start()})}destroy(){this.scaler?.stop(),this.scaler=void 0,this.game?.destroy(!0),this.game=void 0}};function sb(e){return t=>{let n=e.getPileContainingCard(t),r=e.getCardById(t),i=n?e.zoneFor(n.id):void 0;if(!n||!r||!i||!qh(i.grab,r,n))return[];let a=n.getCards(),o=a.indexOf(r);return o===-1?[]:a.slice(o).map(e=>e.id)}}function cb(e){let{game:t,layout:n,handleIntent:r,presentation:i}=e,a=e=>Py(n,e);return new Iy({game:t,cardIds:t.cardIds,layout:n,buildViewState:(e,n)=>Xy(t,e,a(n),{cardBackKey:i.cardBackKey()}),resolveDropTarget:(e,n)=>Jy(t,e,a(n)),handleIntent:r,stackFromCard:sb(t),cardBackKey:()=>i.cardBackKey(),onBackgroundColor:i.onBackgroundColor,onReset:e=>{let n=()=>e();return t.on(`game-reset`,n),()=>t.off(`game-reset`,n)},onCardsRelocated:e=>t.onCardsRelocated(e)})}function lb(e){return t=>{switch(t.kind){case`activate`:case`activate-pile`:return;case`activate-secondary`:e.autoMoveCard(t.cardId);return;case`drop`:{let[n]=t.cardIds;t.targetPileId&&n&&e.moveCardToPile(n,t.targetPileId);return}}}}var ub={columns:8,rows:2,slots:qg(Pg.FREECELL).map(e=>e.slot),cardSize:{width:221,height:313},gap:{x:30,y:40},padding:{x:40,y:40},headerHeightPx:73,designHeightPx:1120};function db(e,t){return cb({game:e,layout:ub,handleIntent:lb(e),presentation:t})}var fb={columns:10,rows:2,slots:d_().map(e=>e.slot),cardSize:{width:221,height:313},gap:{x:30,y:40},padding:{x:40,y:40},headerHeightPx:73,designHeightPx:1350};function pb(e){return t=>{switch(t.kind){case`activate`:e.getPileContainingCard(t.cardId)?.role===Z.STOCK&&e.dealRow();return;case`activate-pile`:return;case`activate-secondary`:e.getPileContainingCard(t.cardId)?.role===Z.TABLEAU&&e.autoMoveCard(t.cardId);return;case`drop`:{let[n]=t.cardIds;t.targetPileId&&n&&e.moveCardToPile(n,t.targetPileId);return}}}}function mb(e,t){return cb({game:e,layout:fb,handleIntent:pb(e),presentation:t})}var hb={columns:7,rows:2,slots:D_(v_).map(e=>e.slot),cardSize:{width:221,height:313},gap:{x:30,y:40},padding:{x:40,y:40},headerHeightPx:73,designHeightPx:1150};function gb(e,t){return cb({game:e,layout:hb,handleIntent:lb(e),presentation:t})}var _b={columns:12,rows:2,slots:U_().map(e=>e.slot),cardSize:{width:221,height:313},gap:{x:30,y:40},padding:{x:40,y:40},headerHeightPx:73,designHeightPx:1200};function vb(e,t){return cb({game:e,layout:_b,handleIntent:lb(e),presentation:t})}var yb={columns:7,rows:2,slots:tv().map(e=>e.slot),cardSize:{width:221,height:313},gap:{x:30,y:40},padding:{x:40,y:40},headerHeightPx:73,designHeightPx:1150};function bb(e){return t=>{switch(t.kind){case`activate`:e.getPileContainingCard(t.cardId)?.role===$.STOCK&&e.dealStock();return;case`activate-pile`:return;case`activate-secondary`:e.getPileContainingCard(t.cardId)?.role===$.TABLEAU&&e.autoMoveCard(t.cardId);return;case`drop`:{let[n]=t.cardIds;t.targetPileId&&n&&e.moveCardToPile(n,t.targetPileId);return}}}}function xb(e,t){return cb({game:e,layout:yb,handleIntent:bb(e),presentation:t})}function Sb(e,t){if(e instanceof Mg)return ab(e,t);if(e instanceof Xg)return db(e,t);if(e instanceof m_)return mb(e,t);if(e instanceof A_)return gb(e,t);if(e instanceof K_)return vb(e,t);if(e instanceof iv)return xb(e,t);throw Error(`No board is registered for this game.`)}var Cb=class e{host=C(bs);catalog=C(yv);presentation=C(hh);constructor(){fo(e=>{let{game:t}=this.catalog.session(),n=new ob(window,this.host.nativeElement,()=>Sb(t,this.presentation));n.start(),window.klondike=n,e(()=>{n.destroy(),window.klondike===n&&delete window.klondike})})}static ɵfac=function(t){return new(t||e)};static ɵcmp=tf({type:e,selectors:[[`app-game-canvas`]],decls:0,vars:0,template:function(e,t){},styles:[`








[_nghost-%COMP%] {
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
}`]})},wb=`fsolitaire-menu-expanded`;function Tb(){if(typeof localStorage>`u`)return!1;try{return localStorage.getItem(wb)===`true`}catch(e){return console.warn(`Failed to read the game menu state:`,e),!1}}var Eb=class e{destroyRef=C(wa);expanded=k(Tb());overlay=k(!1);isExpanded=this.expanded.asReadonly();isOverlay=this.overlay.asReadonly();constructor(){if(typeof window>`u`||!window.matchMedia)return;let e=window.matchMedia(`(max-width: 720px)`);this.overlay.set(e.matches);let t=()=>this.overlay.set(e.matches);e.addEventListener(`change`,t),this.destroyRef.onDestroy(()=>{e.removeEventListener(`change`,t)})}collapseIfOverlay(){this.overlay()&&this.setExpanded(!1)}toggle(){this.setExpanded(!this.expanded())}setExpanded(e){this.expanded()!==e&&(this.expanded.set(e),this.persist(e))}persist(e){if(!(typeof localStorage>`u`))try{localStorage.setItem(wb,String(e))}catch(e){console.warn(`Failed to save the game menu state:`,e)}}static ɵfac=function(t){return new(t||e)};static ɵprov=y({token:e,factory:e.ɵfac,providedIn:`root`})},Db=(e,t)=>t.id;function Ob(e,t){if(e&1){let e=Yf();z(0,`div`,6),H(`click`,function(){return D(e),O(U().menu.setExpanded(!1))}),B()}}function kb(e,t){e&1&&(z(0,`span`,3),G(1,`Games`),B())}function Ab(e,t){if(e&1&&(z(0,`span`,9),G(1),B()),e&2){let e=U().$implicit;M(),K(e.name)}}function jb(e,t){if(e&1){let e=Yf();z(0,`li`)(1,`button`,7),H(`click`,function(){let t=D(e).$implicit;return O(U().chooseGame(t.id))}),z(2,`span`,8),G(3),B(),N(4,Ab,2,1,`span`,9),B()()}if(e&2){let e=t.$implicit,n=U();M(),W(`active`,n.session.selectedGameId()===e.id),Xf(`title`,e.name),Cf(`aria-current`,n.session.selectedGameId()===e.id),M(2),K(e.name.charAt(0)),M(),P(n.menu.isExpanded()?4:-1)}}var Mb=class e{session=C(Sv);menu=C(Eb);chooseGame(e){this.session.selectGame(e),this.menu.collapseIfOverlay()}static ɵfac=function(t){return new(t||e)};static ɵcmp=tf({type:e,selectors:[[`app-game-menu`]],decls:8,vars:8,consts:[[1,`menu-backdrop`],[`title`,`Games`,1,`menu-toggle`,3,`click`],[`src`,`icons/menu.svg`,`alt`,`Menu`,1,`toggle-icon`],[1,`menu-title`],[1,`game-menu`],[1,`game-list`],[1,`menu-backdrop`,3,`click`],[1,`game-item`,3,`click`,`title`],[1,`game-marker`],[1,`game-name`]],template:function(e,t){e&1&&(N(0,Ob,1,0,`div`,0),z(1,`button`,1),H(`click`,function(){return t.menu.toggle()}),qf(2,`img`,2),N(3,kb,2,0,`span`,3),B(),z(4,`nav`,4)(5,`ul`,5),F(6,jb,5,6,`li`,null,Db),B()()),e&2&&(P(t.menu.isExpanded()?0:-1),M(),W(`expanded`,t.menu.isExpanded()),Cf(`aria-expanded`,t.menu.isExpanded())(`aria-label`,t.menu.isExpanded()?`Collapse game menu`:`Expand game menu`),M(2),P(t.menu.isExpanded()?3:-1),M(),W(`expanded`,t.menu.isExpanded()),M(2),I(t.session.games))},styles:[`





[_nghost-%COMP%] {
  --rail-collapsed-width: 56px;
  --rail-expanded-width: 190px;
  --rail-top: 73px;
}

.menu-toggle[_ngcontent-%COMP%], 
.game-menu[_ngcontent-%COMP%] {
  position: fixed;
  left: 0;
  box-sizing: border-box;
  background: rgba(15, 23, 42, 0.82);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
  pointer-events: auto;
  user-select: none;
  z-index: 90;
  transition: width 0.18s ease;
}

.menu-toggle[_ngcontent-%COMP%] {
  top: var(--rail-top);
  width: var(--rail-collapsed-width);
  height: 44px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 10px;
  border-top: none;
  border-left: none;
  border-bottom: none;
  color: #94a3b8;
  font: inherit;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 6px 0 24px rgba(0, 0, 0, 0.35);
}

.menu-toggle.expanded[_ngcontent-%COMP%] {
  width: var(--rail-expanded-width);
}

.menu-toggle[_ngcontent-%COMP%]:hover {
  color: #fff;
}

.game-menu[_ngcontent-%COMP%] {
  top: calc(var(--rail-top) + 44px);
  bottom: 0;
  width: var(--rail-collapsed-width);
  padding: 8px;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 6px 0 24px rgba(0, 0, 0, 0.35);
}

.game-menu.expanded[_ngcontent-%COMP%] {
  width: var(--rail-expanded-width);
}

.toggle-icon[_ngcontent-%COMP%] {
  width: 20px;
  height: 20px;
  flex: 0 0 20px;
}

.menu-title[_ngcontent-%COMP%] {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.game-list[_ngcontent-%COMP%] {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.game-item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  
  min-height: 44px;
  padding: 9px 10px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;
}

.game-item[_ngcontent-%COMP%]:hover {
  background: rgba(255, 255, 255, 0.1);
}

.game-item.active[_ngcontent-%COMP%] {
  background: rgba(37, 99, 235, 0.9);
  border-color: rgba(96, 165, 250, 0.9);
  color: #fff;
}

.game-item.active[_ngcontent-%COMP%]:hover {
  background: rgba(37, 99, 235, 1);
}


.game-marker[_ngcontent-%COMP%] {
  flex: 0 0 22px;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.12);
  font-size: 0.75rem;
  font-weight: 700;
}

.game-item.active[_ngcontent-%COMP%]   .game-marker[_ngcontent-%COMP%] {
  background: rgba(255, 255, 255, 0.22);
}

.game-name[_ngcontent-%COMP%] {
  font-size: 0.875rem;
  font-weight: 600;
}


.menu-backdrop[_ngcontent-%COMP%] {
  display: none;
}






@media (max-width: 720px) {
  [_nghost-%COMP%] {
    --rail-collapsed-width: 44px;
    --rail-top: 60px;
  }

  .menu-toggle[_ngcontent-%COMP%] {
    width: var(--rail-collapsed-width);
    justify-content: center;
    padding: 0;
  }

  .menu-toggle.expanded[_ngcontent-%COMP%] {
    width: min(72vw, 260px);
    justify-content: flex-start;
    padding: 0 12px;
    z-index: 102;
  }

  .game-menu.expanded[_ngcontent-%COMP%] {
    width: min(72vw, 260px);
    padding: 12px;
    z-index: 101;
  }

  
  .game-item[_ngcontent-%COMP%] {
    min-height: 48px;
  }

  .menu-backdrop[_ngcontent-%COMP%] {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
    pointer-events: auto;
  }
}`]})};nh(class e{theme=C(vh);menu=C(Eb);showSettings=k(!1);openSettings(){this.showSettings.set(!0)}closeSettings(){this.showSettings.set(!1)}static ɵfac=function(t){return new(t||e)};static ɵcmp=tf({type:e,selectors:[[`app-root`]],decls:9,vars:5,consts:[[1,`board-area`],[1,`ui-overlay`],[3,`openSettings`],[3,`closed`,`open`]],template:function(e,t){e&1&&(L(0,`div`,0),Kf(1,`app-game-canvas`),R(),L(2,`div`,1)(3,`app-header-bar`,2),V(`openSettings`,function(){return t.openSettings()}),R(),Kf(4,`app-game-menu`),L(5,`app-settings-drawer`,3),V(`closed`,function(){return t.closeSettings()}),R(),Kf(6,`app-game-help-modal`)(7,`app-victory-overlay`)(8,`app-confirmation-dialog`),R()),e&2&&(W(`rail-expanded`,t.menu.isExpanded()),M(2),bp(t.theme.currentBgClass()),M(3),Uf(`open`,t.showSettings()))},dependencies:[Cb,Mb,Tv,Vv,ly,Uv,Gv],styles:[`




.board-area[_ngcontent-%COMP%] {
  position: absolute;
  inset: 0;
  box-sizing: border-box;
  padding-left: 56px;
}

.board-area.rail-expanded[_ngcontent-%COMP%] {
  padding-left: 190px;
}






@media (max-width: 720px) {
  .board-area[_ngcontent-%COMP%], 
   .board-area.rail-expanded[_ngcontent-%COMP%] {
    padding-left: 44px;
  }
}

.ui-overlay[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  pointer-events: none;
}`]})},{providers:[Gp()]}).catch(e=>{console.error(e)});