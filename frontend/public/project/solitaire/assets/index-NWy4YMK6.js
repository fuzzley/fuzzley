import{a as e,i as t,n,o as r,r as i,t as a}from"./phaser-h7GCY5wB.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var o=null,s=!1,c=1,l=null,u=Symbol(`SIGNAL`);function d(e){let t=o;return o=e,t}function f(){return o}var p={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:`unknown`,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function m(e){if(s)throw Error(``);if(o===null)return;o.consumerOnSignalRead(e);let t=o.producersTail;if(t!==void 0&&t.producer===e)return;let n,r=o.recomputing;if(r&&(n=t===void 0?o.producers:t.nextProducer,n!==void 0&&n.producer===e)){o.producersTail=n,n.lastReadVersion=e.version,n.knownValidAtEpoch=c;return}let i=e.consumersTail;if(i!==void 0&&i.consumer===o&&(!r||i.knownValidAtEpoch===c))return;let a=me(o),l={producer:e,consumer:o,nextProducer:n,prevConsumer:void 0,knownValidAtEpoch:c,lastReadVersion:e.version,nextConsumer:void 0};o.producersTail=l,t===void 0?o.producers=l:t.nextProducer=l,a&&fe(e,l)}function ee(){c++}function te(e){if(!(me(e)&&!e.dirty)&&!(!e.dirty&&e.lastCleanEpoch===c)){if(!e.producerMustRecompute(e)&&!ue(e)){ae(e);return}e.producerRecomputeValue(e),ae(e)}}function ne(e){if(e.consumers===void 0)return;let t=s;s=!0;try{for(let t=e.consumers;t!==void 0;t=t.nextConsumer){let e=t.consumer;e.dirty||ie(e)}}finally{s=t}}function re(){return o?.consumerAllowSignalWrites!==!1}function ie(e){e.dirty=!0,ne(e),e.consumerMarkedDirty?.(e)}function ae(e){e.dirty=!1,e.lastCleanEpoch=c}function oe(e){return e&&se(e),d(e)}function se(e){if(e.producersTail?.knownValidAtEpoch===c){let t=e.producers;for(;t!==void 0;)t.knownValidAtEpoch=null,t=t.nextProducer}e.producersTail=void 0,e.recomputing=!0}function ce(e,t){d(t),e&&le(e)}function le(e){e.recomputing=!1;let t=e.producersTail,n=t===void 0?e.producers:t.nextProducer;if(n!==void 0){if(me(e))do n=pe(n);while(n!==void 0);t===void 0?e.producers=void 0:t.nextProducer=void 0}}function ue(e){for(let t=e.producers;t!==void 0;t=t.nextProducer){let e=t.producer,n=t.lastReadVersion;if(n!==e.version||(te(e),n!==e.version))return!0}return!1}function de(e){if(me(e)){let t=e.producers;for(;t!==void 0;)t=pe(t)}e.producers=void 0,e.producersTail=void 0,e.consumers=void 0,e.consumersTail=void 0}function fe(e,t){let n=e.consumersTail,r=me(e);if(n===void 0?(t.nextConsumer=void 0,e.consumers=t):(t.nextConsumer=n.nextConsumer,n.nextConsumer=t),t.prevConsumer=n,e.consumersTail=t,!r)for(let t=e.producers;t!==void 0;t=t.nextProducer)fe(t.producer,t)}function pe(e){let t=e.producer,n=e.nextProducer,r=e.nextConsumer,i=e.prevConsumer;if(e.nextConsumer=void 0,e.prevConsumer=void 0,r===void 0?t.consumersTail=i:r.prevConsumer=i,i!==void 0)i.nextConsumer=r;else if(t.consumers=r,!me(t)){let e=t.producers;for(;e!==void 0;)e=pe(e)}return n}function me(e){return e.consumerIsAlwaysLive||e.consumers!==void 0}function he(e){l?.(e)}function ge(e,t){return Object.is(e,t)}function _e(e,t){let n=Object.create(xe);n.computation=e,t!==void 0&&(n.equal=t);let r=()=>{if(te(n),m(n),n.value===be)throw n.error;return n.value};return r[u]=n,he(n),r}var ve=Symbol(`UNSET`),ye=Symbol(`COMPUTING`),be=Symbol(`ERRORED`),xe={...p,value:ve,dirty:!0,error:null,equal:ge,kind:`computed`,producerMustRecompute(e){return e.value===ve||e.value===ye},producerRecomputeValue(e){if(e.value===ye)throw Error(``);let t=e.value;e.value=ye;let n=oe(e),r,i=!1;try{r=e.computation(),d(null),i=t!==ve&&t!==be&&r!==be&&e.equal(t,r)}catch(t){r=be,e.error=t}finally{ce(e,n)}if(i){e.value=t;return}e.value=r,e.version++}};function Se(){throw Error()}var Ce=Se;function we(e){Ce(e)}function Te(e){Ce=e}var Ee=null;function De(e,t){let n=Object.create(je);n.value=e,t!==void 0&&(n.equal=t);let r=()=>Oe(n);return r[u]=n,he(n),[r,e=>ke(n,e),e=>Ae(n,e)]}function Oe(e){return m(e),e.value}function ke(e,t){re()||we(e),e.equal(e.value,t)||(e.value=t,Me(e))}function Ae(e,t){re()||we(e),ke(e,t(e.value))}var je={...p,equal:ge,value:void 0,kind:`signal`};function Me(e){e.version++,ee(),ne(e),Ee?.(e)}var Ne={...p,consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,kind:`effect`};function Pe(e){if(e.dirty=!1,e.version>0&&!ue(e))return;e.version++;let t=oe(e);try{e.cleanup(),e.fn()}finally{ce(e,t)}}var Fe=void 0;function Ie(){return Fe}function Le(e){let t=Fe;return Fe=e,t}var Re=Symbol(`NotFound`);function ze(e){return e===Re||e?.name===`ɵNotFound`}var Be=function(e,t){return Be=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},Be(e,t)};function Ve(e,t){if(typeof t!=`function`&&t!==null)throw TypeError(`Class extends value `+String(t)+` is not a constructor or null`);Be(e,t);function n(){this.constructor=e}e.prototype=t===null?Object.create(t):(n.prototype=t.prototype,new n)}function He(e,t,n,r){function i(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||=Promise)(function(n,a){function o(e){try{c(r.next(e))}catch(e){a(e)}}function s(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){e.done?n(e.value):i(e.value).then(o,s)}c((r=r.apply(e,t||[])).next())})}function Ue(e,t){var n={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},r,i,a,o=Object.create((typeof Iterator==`function`?Iterator:Object).prototype);return o.next=s(0),o.throw=s(1),o.return=s(2),typeof Symbol==`function`&&(o[Symbol.iterator]=function(){return this}),o;function s(e){return function(t){return c([e,t])}}function c(s){if(r)throw TypeError(`Generator is already executing.`);for(;o&&(o=0,s[0]&&(n=0)),n;)try{if(r=1,i&&(a=s[0]&2?i.return:s[0]?i.throw||((a=i.return)&&a.call(i),0):i.next)&&!(a=a.call(i,s[1])).done)return a;switch(i=0,a&&(s=[s[0]&2,a.value]),s[0]){case 0:case 1:a=s;break;case 4:return n.label++,{value:s[1],done:!1};case 5:n.label++,i=s[1],s=[0];continue;case 7:s=n.ops.pop(),n.trys.pop();continue;default:if((a=n.trys,!(a=a.length>0&&a[a.length-1]))&&(s[0]===6||s[0]===2)){n=0;continue}if(s[0]===3&&(!a||s[1]>a[0]&&s[1]<a[3])){n.label=s[1];break}if(s[0]===6&&n.label<a[1]){n.label=a[1],a=s;break}if(a&&n.label<a[2]){n.label=a[2],n.ops.push(s);break}a[2]&&n.ops.pop(),n.trys.pop();continue}s=t.call(e,n)}catch(e){s=[6,e],i=0}finally{r=a=0}if(s[0]&5)throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}}function We(e){var t=typeof Symbol==`function`&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&typeof e.length==`number`)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw TypeError(t?`Object is not iterable.`:`Symbol.iterator is not defined.`)}function Ge(e,t){var n=typeof Symbol==`function`&&e[Symbol.iterator];if(!n)return e;var r=n.call(e),i,a=[],o;try{for(;(t===void 0||t-->0)&&!(i=r.next()).done;)a.push(i.value)}catch(e){o={error:e}}finally{try{i&&!i.done&&(n=r.return)&&n.call(r)}finally{if(o)throw o.error}}return a}function Ke(e,t,n){if(n||arguments.length===2)for(var r=0,i=t.length,a;r<i;r++)(a||!(r in t))&&(a||=Array.prototype.slice.call(t,0,r),a[r]=t[r]);return e.concat(a||Array.prototype.slice.call(t))}function qe(e){return this instanceof qe?(this.v=e,this):new qe(e)}function Je(e,t,n){if(!Symbol.asyncIterator)throw TypeError(`Symbol.asyncIterator is not defined.`);var r=n.apply(e,t||[]),i,a=[];return i=Object.create((typeof AsyncIterator==`function`?AsyncIterator:Object).prototype),s(`next`),s(`throw`),s(`return`,o),i[Symbol.asyncIterator]=function(){return this},i;function o(e){return function(t){return Promise.resolve(t).then(e,d)}}function s(e,t){r[e]&&(i[e]=function(t){return new Promise(function(n,r){a.push([e,t,n,r])>1||c(e,t)})},t&&(i[e]=t(i[e])))}function c(e,t){try{l(r[e](t))}catch(e){f(a[0][3],e)}}function l(e){e.value instanceof qe?Promise.resolve(e.value.v).then(u,d):f(a[0][2],e)}function u(e){c(`next`,e)}function d(e){c(`throw`,e)}function f(e,t){e(t),a.shift(),a.length&&c(a[0][0],a[0][1])}}function Ye(e){if(!Symbol.asyncIterator)throw TypeError(`Symbol.asyncIterator is not defined.`);var t=e[Symbol.asyncIterator],n;return t?t.call(e):(e=typeof We==`function`?We(e):e[Symbol.iterator](),n={},r(`next`),r(`throw`),r(`return`),n[Symbol.asyncIterator]=function(){return this},n);function r(t){n[t]=e[t]&&function(n){return new Promise(function(r,a){n=e[t](n),i(r,a,n.done,n.value)})}}function i(e,t,n,r){Promise.resolve(r).then(function(t){e({value:t,done:n})},t)}}function h(e){return typeof e==`function`}function Xe(e){var t=e(function(e){Error.call(e),e.stack=Error().stack});return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var Ze=Xe(function(e){return function(t){e(this),this.message=t?t.length+` errors occurred during unsubscription:
`+t.map(function(e,t){return t+1+`) `+e.toString()}).join(`
  `):``,this.name=`UnsubscriptionError`,this.errors=t}});function Qe(e,t){if(e){var n=e.indexOf(t);0<=n&&e.splice(n,1)}}var $e=function(){function e(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}return e.prototype.unsubscribe=function(){var e,t,n,r,i;if(!this.closed){this.closed=!0;var a=this._parentage;if(a)if(this._parentage=null,Array.isArray(a))try{for(var o=We(a),s=o.next();!s.done;s=o.next())s.value.remove(this)}catch(t){e={error:t}}finally{try{s&&!s.done&&(t=o.return)&&t.call(o)}finally{if(e)throw e.error}}else a.remove(this);var c=this.initialTeardown;if(h(c))try{c()}catch(e){i=e instanceof Ze?e.errors:[e]}var l=this._finalizers;if(l){this._finalizers=null;try{for(var u=We(l),d=u.next();!d.done;d=u.next()){var f=d.value;try{nt(f)}catch(e){i??=[],e instanceof Ze?i=Ke(Ke([],Ge(i)),Ge(e.errors)):i.push(e)}}}catch(e){n={error:e}}finally{try{d&&!d.done&&(r=u.return)&&r.call(u)}finally{if(n)throw n.error}}}if(i)throw new Ze(i)}},e.prototype.add=function(t){if(t&&t!==this)if(this.closed)nt(t);else{if(t instanceof e){if(t.closed||t._hasParent(this))return;t._addParent(this)}(this._finalizers=this._finalizers??[]).push(t)}},e.prototype._hasParent=function(e){var t=this._parentage;return t===e||Array.isArray(t)&&t.includes(e)},e.prototype._addParent=function(e){var t=this._parentage;this._parentage=Array.isArray(t)?(t.push(e),t):t?[t,e]:e},e.prototype._removeParent=function(e){var t=this._parentage;t===e?this._parentage=null:Array.isArray(t)&&Qe(t,e)},e.prototype.remove=function(t){var n=this._finalizers;n&&Qe(n,t),t instanceof e&&t._removeParent(this)},e.EMPTY=(function(){var t=new e;return t.closed=!0,t})(),e}(),et=$e.EMPTY;function tt(e){return e instanceof $e||e&&`closed`in e&&h(e.remove)&&h(e.add)&&h(e.unsubscribe)}function nt(e){h(e)?e():e.unsubscribe()}var rt={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1},it={setTimeout:function(e,t){var n=[...arguments].slice(2),r=it.delegate;return r?.setTimeout?r.setTimeout.apply(r,Ke([e,t],Ge(n))):setTimeout.apply(void 0,Ke([e,t],Ge(n)))},clearTimeout:function(e){return(it.delegate?.clearTimeout||clearTimeout)(e)},delegate:void 0};function at(e){it.setTimeout(function(){var t=rt.onUnhandledError;if(t)t(e);else throw e})}function ot(){}var st=(function(){return ut(`C`,void 0,void 0)})();function ct(e){return ut(`E`,void 0,e)}function lt(e){return ut(`N`,e,void 0)}function ut(e,t,n){return{kind:e,value:t,error:n}}var dt=null;function ft(e){if(rt.useDeprecatedSynchronousErrorHandling){var t=!dt;if(t&&(dt={errorThrown:!1,error:null}),e(),t){var n=dt,r=n.errorThrown,i=n.error;if(dt=null,r)throw i}}else e()}function pt(e){rt.useDeprecatedSynchronousErrorHandling&&dt&&(dt.errorThrown=!0,dt.error=e)}var mt=function(e){Ve(t,e);function t(t){var n=e.call(this)||this;return n.isStopped=!1,t?(n.destination=t,tt(t)&&t.add(n)):n.destination=St,n}return t.create=function(e,t,n){return new vt(e,t,n)},t.prototype.next=function(e){this.isStopped?xt(lt(e),this):this._next(e)},t.prototype.error=function(e){this.isStopped?xt(ct(e),this):(this.isStopped=!0,this._error(e))},t.prototype.complete=function(){this.isStopped?xt(st,this):(this.isStopped=!0,this._complete())},t.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,e.prototype.unsubscribe.call(this),this.destination=null)},t.prototype._next=function(e){this.destination.next(e)},t.prototype._error=function(e){try{this.destination.error(e)}finally{this.unsubscribe()}},t.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},t}($e),ht=Function.prototype.bind;function gt(e,t){return ht.call(e,t)}var _t=function(){function e(e){this.partialObserver=e}return e.prototype.next=function(e){var t=this.partialObserver;if(t.next)try{t.next(e)}catch(e){yt(e)}},e.prototype.error=function(e){var t=this.partialObserver;if(t.error)try{t.error(e)}catch(e){yt(e)}else yt(e)},e.prototype.complete=function(){var e=this.partialObserver;if(e.complete)try{e.complete()}catch(e){yt(e)}},e}(),vt=function(e){Ve(t,e);function t(t,n,r){var i=e.call(this)||this,a;if(h(t)||!t)a={next:t??void 0,error:n??void 0,complete:r??void 0};else{var o;i&&rt.useDeprecatedNextContext?(o=Object.create(t),o.unsubscribe=function(){return i.unsubscribe()},a={next:t.next&&gt(t.next,o),error:t.error&&gt(t.error,o),complete:t.complete&&gt(t.complete,o)}):a=t}return i.destination=new _t(a),i}return t}(mt);function yt(e){rt.useDeprecatedSynchronousErrorHandling?pt(e):at(e)}function bt(e){throw e}function xt(e,t){var n=rt.onStoppedNotification;n&&it.setTimeout(function(){return n(e,t)})}var St={closed:!0,next:ot,error:bt,complete:ot},Ct=(function(){return typeof Symbol==`function`&&Symbol.observable||`@@observable`})();function wt(e){return e}function Tt(e){return e.length===0?wt:e.length===1?e[0]:function(t){return e.reduce(function(e,t){return t(e)},t)}}var g=function(){function e(e){e&&(this._subscribe=e)}return e.prototype.lift=function(t){var n=new e;return n.source=this,n.operator=t,n},e.prototype.subscribe=function(e,t,n){var r=this,i=Ot(e)?e:new vt(e,t,n);return ft(function(){var e=r,t=e.operator,n=e.source;i.add(t?t.call(i,n):n?r._subscribe(i):r._trySubscribe(i))}),i},e.prototype._trySubscribe=function(e){try{return this._subscribe(e)}catch(t){e.error(t)}},e.prototype.forEach=function(e,t){var n=this;return t=Et(t),new t(function(t,r){var i=new vt({next:function(t){try{e(t)}catch(e){r(e),i.unsubscribe()}},error:r,complete:t});n.subscribe(i)})},e.prototype._subscribe=function(e){return this.source?.subscribe(e)},e.prototype[Ct]=function(){return this},e.prototype.pipe=function(){return Tt([...arguments])(this)},e.prototype.toPromise=function(e){var t=this;return e=Et(e),new e(function(e,n){var r;t.subscribe(function(e){return r=e},function(e){return n(e)},function(){return e(r)})})},e.create=function(t){return new e(t)},e}();function Et(e){return e??rt.Promise??Promise}function Dt(e){return e&&h(e.next)&&h(e.error)&&h(e.complete)}function Ot(e){return e&&e instanceof mt||Dt(e)&&tt(e)}function kt(e){return h(e?.lift)}function At(e){return function(t){if(kt(t))return t.lift(function(t){try{return e(t,this)}catch(e){this.error(e)}});throw TypeError(`Unable to lift unknown Observable type`)}}function jt(e,t,n,r,i){return new Mt(e,t,n,r,i)}var Mt=function(e){Ve(t,e);function t(t,n,r,i,a,o){var s=e.call(this,t)||this;return s.onFinalize=a,s.shouldUnsubscribe=o,s._next=n?function(e){try{n(e)}catch(e){t.error(e)}}:e.prototype._next,s._error=i?function(e){try{i(e)}catch(e){t.error(e)}finally{this.unsubscribe()}}:e.prototype._error,s._complete=r?function(){try{r()}catch(e){t.error(e)}finally{this.unsubscribe()}}:e.prototype._complete,s}return t.prototype.unsubscribe=function(){var t;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){var n=this.closed;e.prototype.unsubscribe.call(this),!n&&((t=this.onFinalize)==null||t.call(this))}},t}(mt),Nt=Xe(function(e){return function(){e(this),this.name=`ObjectUnsubscribedError`,this.message=`object unsubscribed`}}),Pt=function(e){Ve(t,e);function t(){var t=e.call(this)||this;return t.closed=!1,t.currentObservers=null,t.observers=[],t.isStopped=!1,t.hasError=!1,t.thrownError=null,t}return t.prototype.lift=function(e){var t=new Ft(this,this);return t.operator=e,t},t.prototype._throwIfClosed=function(){if(this.closed)throw new Nt},t.prototype.next=function(e){var t=this;ft(function(){var n,r;if(t._throwIfClosed(),!t.isStopped){t.currentObservers||=Array.from(t.observers);try{for(var i=We(t.currentObservers),a=i.next();!a.done;a=i.next())a.value.next(e)}catch(e){n={error:e}}finally{try{a&&!a.done&&(r=i.return)&&r.call(i)}finally{if(n)throw n.error}}}})},t.prototype.error=function(e){var t=this;ft(function(){if(t._throwIfClosed(),!t.isStopped){t.hasError=t.isStopped=!0,t.thrownError=e;for(var n=t.observers;n.length;)n.shift().error(e)}})},t.prototype.complete=function(){var e=this;ft(function(){if(e._throwIfClosed(),!e.isStopped){e.isStopped=!0;for(var t=e.observers;t.length;)t.shift().complete()}})},t.prototype.unsubscribe=function(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null},Object.defineProperty(t.prototype,"observed",{get:function(){return this.observers?.length>0},enumerable:!1,configurable:!0}),t.prototype._trySubscribe=function(t){return this._throwIfClosed(),e.prototype._trySubscribe.call(this,t)},t.prototype._subscribe=function(e){return this._throwIfClosed(),this._checkFinalizedStatuses(e),this._innerSubscribe(e)},t.prototype._innerSubscribe=function(e){var t=this,n=this,r=n.hasError,i=n.isStopped,a=n.observers;return r||i?et:(this.currentObservers=null,a.push(e),new $e(function(){t.currentObservers=null,Qe(a,e)}))},t.prototype._checkFinalizedStatuses=function(e){var t=this,n=t.hasError,r=t.thrownError,i=t.isStopped;n?e.error(r):i&&e.complete()},t.prototype.asObservable=function(){var e=new g;return e.source=this,e},t.create=function(e,t){return new Ft(e,t)},t}(g),Ft=function(e){Ve(t,e);function t(t,n){var r=e.call(this)||this;return r.destination=t,r.source=n,r}return t.prototype.next=function(e){var t,n;(n=(t=this.destination)?.next)==null||n.call(t,e)},t.prototype.error=function(e){var t,n;(n=(t=this.destination)?.error)==null||n.call(t,e)},t.prototype.complete=function(){var e,t;(t=(e=this.destination)?.complete)==null||t.call(e)},t.prototype._subscribe=function(e){return this.source?.subscribe(e)??et},t}(Pt),It=function(e){Ve(t,e);function t(t){var n=e.call(this)||this;return n._value=t,n}return Object.defineProperty(t.prototype,"value",{get:function(){return this.getValue()},enumerable:!1,configurable:!0}),t.prototype._subscribe=function(t){var n=e.prototype._subscribe.call(this,t);return!n.closed&&t.next(this._value),n},t.prototype.getValue=function(){var e=this,t=e.hasError,n=e.thrownError,r=e._value;if(t)throw n;return this._throwIfClosed(),r},t.prototype.next=function(t){e.prototype.next.call(this,this._value=t)},t}(Pt),Lt=new g(function(e){return e.complete()});function Rt(e){return e&&h(e.schedule)}function zt(e){return e[e.length-1]}function Bt(e){return Rt(zt(e))?e.pop():void 0}function Vt(e,t){return typeof zt(e)==`number`?e.pop():t}var Ht=(function(e){return e&&typeof e.length==`number`&&typeof e!=`function`});function Ut(e){return h(e?.then)}function Wt(e){return h(e[Ct])}function Gt(e){return Symbol.asyncIterator&&h(e?.[Symbol.asyncIterator])}function Kt(e){return TypeError(`You provided `+(typeof e==`object`&&e?`an invalid object`:`'`+e+`'`)+` where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function qt(){return typeof Symbol!=`function`||!Symbol.iterator?`@@iterator`:Symbol.iterator}var Jt=qt();function Yt(e){return h(e?.[Jt])}function Xt(e){return Je(this,arguments,function(){var t,n,r,i;return Ue(this,function(a){switch(a.label){case 0:t=e.getReader(),a.label=1;case 1:a.trys.push([1,,9,10]),a.label=2;case 2:return[4,qe(t.read())];case 3:return n=a.sent(),r=n.value,i=n.done,i?[4,qe(void 0)]:[3,5];case 4:return[2,a.sent()];case 5:return[4,qe(r)];case 6:return[4,a.sent()];case 7:return a.sent(),[3,2];case 8:return[3,10];case 9:return t.releaseLock(),[7];case 10:return[2]}})})}function Zt(e){return h(e?.getReader)}function Qt(e){if(e instanceof g)return e;if(e!=null){if(Wt(e))return $t(e);if(Ht(e))return en(e);if(Ut(e))return tn(e);if(Gt(e))return rn(e);if(Yt(e))return nn(e);if(Zt(e))return an(e)}throw Kt(e)}function $t(e){return new g(function(t){var n=e[Ct]();if(h(n.subscribe))return n.subscribe(t);throw TypeError(`Provided object does not correctly implement Symbol.observable`)})}function en(e){return new g(function(t){for(var n=0;n<e.length&&!t.closed;n++)t.next(e[n]);t.complete()})}function tn(e){return new g(function(t){e.then(function(e){t.closed||(t.next(e),t.complete())},function(e){return t.error(e)}).then(null,at)})}function nn(e){return new g(function(t){var n,r;try{for(var i=We(e),a=i.next();!a.done;a=i.next()){var o=a.value;if(t.next(o),t.closed)return}}catch(e){n={error:e}}finally{try{a&&!a.done&&(r=i.return)&&r.call(i)}finally{if(n)throw n.error}}t.complete()})}function rn(e){return new g(function(t){on(e,t).catch(function(e){return t.error(e)})})}function an(e){return rn(Xt(e))}function on(e,t){var n,r,i,a;return He(this,void 0,void 0,function(){var o,s;return Ue(this,function(c){switch(c.label){case 0:c.trys.push([0,5,6,11]),n=Ye(e),c.label=1;case 1:return[4,n.next()];case 2:if(r=c.sent(),r.done)return[3,4];if(o=r.value,t.next(o),t.closed)return[2];c.label=3;case 3:return[3,1];case 4:return[3,11];case 5:return s=c.sent(),i={error:s},[3,11];case 6:return c.trys.push([6,,9,10]),r&&!r.done&&(a=n.return)?[4,a.call(n)]:[3,8];case 7:c.sent(),c.label=8;case 8:return[3,10];case 9:if(i)throw i.error;return[7];case 10:return[7];case 11:return t.complete(),[2]}})})}function sn(e,t,n,r,i){r===void 0&&(r=0),i===void 0&&(i=!1);var a=t.schedule(function(){n(),i?e.add(this.schedule(null,r)):this.unsubscribe()},r);if(e.add(a),!i)return a}function cn(e,t){return t===void 0&&(t=0),At(function(n,r){n.subscribe(jt(r,function(n){return sn(r,e,function(){return r.next(n)},t)},function(){return sn(r,e,function(){return r.complete()},t)},function(n){return sn(r,e,function(){return r.error(n)},t)}))})}function ln(e,t){return t===void 0&&(t=0),At(function(n,r){r.add(e.schedule(function(){return n.subscribe(r)},t))})}function un(e,t){return Qt(e).pipe(ln(t),cn(t))}function dn(e,t){return Qt(e).pipe(ln(t),cn(t))}function fn(e,t){return new g(function(n){var r=0;return t.schedule(function(){r===e.length?n.complete():(n.next(e[r++]),n.closed||this.schedule())})})}function pn(e,t){return new g(function(n){var r;return sn(n,t,function(){r=e[Jt](),sn(n,t,function(){var e,t,i;try{e=r.next(),t=e.value,i=e.done}catch(e){n.error(e);return}i?n.complete():n.next(t)},0,!0)}),function(){return h(r?.return)&&r.return()}})}function mn(e,t){if(!e)throw Error(`Iterable cannot be null`);return new g(function(n){sn(n,t,function(){var r=e[Symbol.asyncIterator]();sn(n,t,function(){r.next().then(function(e){e.done?n.complete():n.next(e.value)})},0,!0)})})}function hn(e,t){return mn(Xt(e),t)}function gn(e,t){if(e!=null){if(Wt(e))return un(e,t);if(Ht(e))return fn(e,t);if(Ut(e))return dn(e,t);if(Gt(e))return mn(e,t);if(Yt(e))return pn(e,t);if(Zt(e))return hn(e,t)}throw Kt(e)}function _n(e,t){return t?gn(e,t):Qt(e)}function vn(e,t){return At(function(n,r){var i=0;n.subscribe(jt(r,function(n){r.next(e.call(t,n,i++))}))})}function yn(e,t,n,r,i,a,o,s){var c=[],l=0,u=0,d=!1,f=function(){d&&!c.length&&!l&&t.complete()},p=function(e){return l<r?m(e):c.push(e)},m=function(e){a&&t.next(e),l++;var s=!1;Qt(n(e,u++)).subscribe(jt(t,function(e){i?.(e),a?p(e):t.next(e)},function(){s=!0},void 0,function(){if(s)try{l--;for(var e=function(){var e=c.shift();o?sn(t,o,function(){return m(e)}):m(e)};c.length&&l<r;)e();f()}catch(e){t.error(e)}}))};return e.subscribe(jt(t,p,function(){d=!0,f()})),function(){s?.()}}function bn(e,t,n){return n===void 0&&(n=1/0),h(t)?bn(function(n,r){return vn(function(e,i){return t(n,e,r,i)})(Qt(e(n,r)))},n):(typeof t==`number`&&(n=t),At(function(t,r){return yn(t,r,e,n)}))}function xn(e){return e===void 0&&(e=1/0),bn(wt,e)}function Sn(){var e=[...arguments],t=Bt(e),n=Vt(e,1/0),r=e;return r.length?r.length===1?Qt(r[0]):xn(n)(_n(r,t)):Lt}var Cn=`https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss`,_=class extends Error{code;constructor(e,t){super(Tn(e,t)),this.code=e}};function wn(e){return`NG0${Math.abs(e)}`}function Tn(e,t){return`${wn(e)}${t?`: `+t:``}`}function v(e){for(let t in e)if(e[t]===v)return t;throw Error(``)}function En(e){if(typeof e==`string`)return e;if(Array.isArray(e))return`[${e.map(En).join(`, `)}]`;if(e==null)return``+e;let t=e.overriddenName||e.name;if(t)return`${t}`;let n=e.toString();if(n==null)return``+n;let r=n.indexOf(`
`);return r>=0?n.slice(0,r):n}function Dn(e,t){return e?t?`${e} ${t}`:e:t||``}var On=v({__forward_ref__:v});function kn(e){return e.__forward_ref__=kn,e}function An(e){return jn(e)?e():e}function jn(e){return typeof e==`function`&&e.hasOwnProperty(On)&&e.__forward_ref__===kn}function y(e){return{token:e.token,providedIn:e.providedIn||null,factory:e.factory,value:void 0}}function Mn(e){return Nn(e,In)}function Nn(e,t){return e.hasOwnProperty(t)&&e[t]||null}function Pn(e){return(e?.[In]??null)||null}function Fn(e){return e&&e.hasOwnProperty(Ln)?e[Ln]:null}var In=v({ɵprov:v}),Ln=v({ɵinj:v}),b=class{_desc;ngMetadataName=`InjectionToken`;ɵprov;constructor(e,t){this._desc=e,this.ɵprov=void 0,typeof t==`number`?this.__NG_ELEMENT_ID__=t:t!==void 0&&(this.ɵprov=y({token:this,providedIn:t.providedIn||`root`,factory:t.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function Rn(e){return e&&!!e.ɵproviders}var zn=v({ɵcmp:v}),Bn=v({ɵdir:v}),Vn=v({ɵpipe:v}),Hn=v({ɵfac:v}),Un=v({__NG_ELEMENT_ID__:v}),Wn=v({__NG_ENV_ID__:v});function Gn(e){return Jn(e,`@Component`),e[zn]||null}function Kn(e){return Jn(e,`@Directive`),e[Bn]||null}function qn(e){return Jn(e,`@Pipe`),e[Vn]||null}function Jn(e,t){if(e==null)throw new _(-919,!1)}function Yn(e){return typeof e==`string`?e:e==null?``:String(e)}var Xn=v({ngErrorCode:v}),Zn=v({ngErrorMessage:v}),Qn=v({ngTokenPath:v});function $n(e,t){return tr(``,-200,t)}function er(e,t){throw new _(-201,!1)}function tr(e,t,n){let r=new _(t,e);return r[Xn]=t,r[Zn]=e,n&&(r[Qn]=n),r}function nr(e){return e[Xn]}var rr;function ir(){return rr}function ar(e){let t=rr;return rr=e,t}function or(e,t,n){let r=Mn(e);if(r&&r.providedIn==`root`)return r.value===void 0?r.value=r.factory():r.value;if(n&8)return null;if(t!==void 0)return t;er(e,``)}var sr={},cr=`__NG_DI_FLAG__`,lr=class{injector;constructor(e){this.injector=e}retrieve(e,t){let n=dr(t)||0;try{return this.injector.get(e,n&8?null:sr,n)}catch(e){if(ze(e))return e;throw e}}};function ur(e,t=0){let n=Ie();if(n===void 0)throw new _(-203,!1);if(n===null)return or(e,void 0,t);{let r=fr(t),i=n.retrieve(e,r);if(ze(i)){if(r.optional)return null;throw i}return i}}function x(e,t=0){return(ir()||ur)(An(e),t)}function S(e,t){return x(e,dr(t))}function dr(e){return e===void 0||typeof e==`number`?e:0|(e.optional&&8)|(e.host&&1)|(e.self&&2)|(e.skipSelf&&4)}function fr(e){return{optional:!!(e&8),host:!!(e&1),self:!!(e&2),skipSelf:!!(e&4)}}function pr(e){let t=[];for(let n=0;n<e.length;n++){let r=An(e[n]);if(Array.isArray(r)){if(r.length===0)throw new _(900,!1);let e,n=0;for(let t=0;t<r.length;t++){let i=r[t],a=mr(i);typeof a==`number`?a===-1?e=i.token:n|=a:e=i}t.push(x(e,n))}else t.push(x(r))}return t}function mr(e){return e[cr]}function hr(e,t){return e.hasOwnProperty(Hn)?e[Hn]:null}function gr(e,t,n){if(e.length!==t.length)return!1;for(let r=0;r<e.length;r++){let i=e[r],a=t[r];if(n&&(i=n(i),a=n(a)),a!==i)return!1}return!0}function _r(e){return e.flat(1/0)}function vr(e,t){e.forEach(e=>Array.isArray(e)?vr(e,t):t(e))}function yr(e,t,n){t>=e.length?e.push(n):e.splice(t,0,n)}function br(e,t){return t>=e.length-1?e.pop():e.splice(t,1)[0]}function xr(e,t,n,r){let i=e.length;if(i==t)e.push(n,r);else if(i===1)e.push(r,e[0]),e[0]=n;else{for(i--,e.push(e[i-1],e[i]);i>t;)e[i]=e[i-2],i--;e[t]=n,e[t+1]=r}}function Sr(e,t,n){let r=wr(e,t);return r>=0?e[r|1]=n:(r=~r,xr(e,r,t,n)),r}function Cr(e,t){let n=wr(e,t);if(n>=0)return e[n|1]}function wr(e,t){return Tr(e,t,1)}function Tr(e,t,n){let r=0,i=e.length>>n;for(;i!==r;){let a=r+(i-r>>1),o=e[a<<n];if(t===o)return a<<n;o>t?i=a:r=a+1}return~(i<<n)}var Er={},Dr=[],Or=new b(``),kr=new b(``,-1),Ar=new b(``),jr=class{get(e,t=sr){if(t===sr){let e=tr(``,-201);throw e.name=`ɵNotFound`,e}return t}};function Mr(e){return{ɵproviders:e}}function Nr(...e){return{ɵproviders:Pr(!0,e),ɵfromNgModule:!0}}function Pr(e,...t){let n=[],r=new Set,i,a=e=>{n.push(e)};return vr(t,e=>{let t=e;Ir(t,a,[],r)&&(i||=[],i.push(t))}),i!==void 0&&Fr(i,a),n}function Fr(e,t){for(let n=0;n<e.length;n++){let{ngModule:r,providers:i}=e[n];Lr(i,e=>{t(e,r)})}}function Ir(e,t,n,r){if(e=An(e),!e)return!1;let i=null,a=Fn(e),o=!a&&Gn(e);if(!a&&!o){let t=e.ngModule;if(a=Fn(t),a)i=t;else return!1}else if(o&&!o.standalone)return!1;else i=e;let s=r.has(i);if(o){if(s)return!1;if(r.add(i),o.dependencies){let e=typeof o.dependencies==`function`?o.dependencies():o.dependencies;for(let i of e)Ir(i,t,n,r)}}else if(a){if(a.imports!=null&&!s){r.add(i);let e;try{vr(a.imports,i=>{Ir(i,t,n,r)&&(e||=[],e.push(i))})}finally{}e!==void 0&&Fr(e,t)}if(!s){let e=hr(i)||(()=>new i);t({provide:i,useFactory:e,deps:Dr},i),t({provide:Ar,useValue:i,multi:!0},i),t({provide:Or,useValue:()=>x(i),multi:!0},i)}let o=a.providers;if(o!=null&&!s){let n=e;Lr(o,e=>{t(e,n)})}}else return!1;return i!==e&&e.providers!==void 0}function Lr(e,t){for(let n of e)Rn(n)&&(n=n.ɵproviders),Array.isArray(n)?Lr(n,t):t(n)}var Rr=v({provide:String,useValue:v});function zr(e){return typeof e==`object`&&!!e&&Rr in e}function Br(e){return!!(e&&e.useExisting)}function Vr(e){return!!(e&&e.useFactory)}function Hr(e){return typeof e==`function`}var Ur=new b(``),Wr={},Gr={},Kr=void 0;function qr(){return Kr===void 0&&(Kr=new jr),Kr}var Jr=class{},Yr=class extends Jr{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(e,t,n,r){super(),this.parent=t,this.source=n,this.scopes=r,ai(e,e=>this.processProvider(e)),this.records.set(kr,ti(void 0,this)),r.has(`environment`)&&this.records.set(Jr,ti(void 0,this));let i=this.records.get(Ur);i!=null&&typeof i.value==`string`&&this.scopes.add(i.value),this.injectorDefTypes=new Set(this.get(Ar,Dr,{self:!0}))}retrieve(e,t){let n=dr(t)||0;try{return this.get(e,sr,n)}catch(e){if(ze(e))return e;throw e}}destroy(){ei(this),this._destroyed=!0;let e=d(null);try{for(let e of this._ngOnDestroyHooks)e.ngOnDestroy();let e=this._onDestroyHooks;this._onDestroyHooks=[];for(let t of e)t()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),d(e)}}onDestroy(e){return ei(this),this._onDestroyHooks.push(e),()=>this.removeOnDestroy(e)}runInContext(e){ei(this);let t=Le(this),n=ar(void 0);try{return e()}finally{Le(t),ar(n)}}get(e,t=sr,n){if(ei(this),e.hasOwnProperty(Wn))return e[Wn](this);let r=dr(n),i=Le(this),a=ar(void 0);try{if(!(r&4)){let t=this.records.get(e);if(t===void 0){let n=ii(e)&&Mn(e);t=n&&this.injectableDefInScope(n)?ti(Xr(e),Wr):null,this.records.set(e,t)}if(t!=null)return this.hydrate(e,t,r)}let n=r&2?qr():this.parent;return t=r&8&&t===sr?null:t,n.get(e,t)}catch(e){let t=nr(e);throw t===-200||t===-201?new _(t,null):e}finally{ar(a),Le(i)}}resolveInjectorInitializers(){let e=d(null),t=Le(this),n=ar(void 0);try{let e=this.get(Or,Dr,{self:!0});for(let t of e)t()}finally{Le(t),ar(n),d(e)}}toString(){return`R3Injector[...]`}processProvider(e){e=An(e);let t=Hr(e)?e:An(e&&e.provide),n=Qr(e);if(!Hr(e)&&e.multi===!0){let n=this.records.get(t);n||(n=ti(void 0,Wr,!0),n.factory=()=>pr(n.multi),this.records.set(t,n)),t=e,n.multi.push(e)}this.records.set(t,n)}hydrate(e,t,n){let r=d(null);try{if(t.value===Gr)throw $n(``);return t.value===Wr&&(t.value=Gr,t.value=t.factory(void 0,n)),typeof t.value==`object`&&t.value&&ri(t.value)&&this._ngOnDestroyHooks.add(t.value),t.value}finally{d(r)}}injectableDefInScope(e){if(!e.providedIn)return!1;let t=An(e.providedIn);return typeof t==`string`?t===`any`||this.scopes.has(t):this.injectorDefTypes.has(t)}removeOnDestroy(e){let t=this._onDestroyHooks.indexOf(e);t!==-1&&this._onDestroyHooks.splice(t,1)}};function Xr(e){let t=Mn(e),n=t===null?hr(e):t.factory;if(n!==null)return n;if(e instanceof b)throw new _(-204,!1);if(e instanceof Function)return Zr(e);throw new _(-204,!1)}function Zr(e){if(e.length>0)throw new _(-204,!1);let t=Pn(e);return t===null?()=>new e:()=>t.factory(e)}function Qr(e){return zr(e)?ti(void 0,e.useValue):ti($r(e),Wr)}function $r(e,t,n){let r;if(Hr(e)){let t=An(e);return hr(t)||Xr(t)}else if(zr(e))r=()=>An(e.useValue);else if(Vr(e))r=()=>e.useFactory(...pr(e.deps||[]));else if(Br(e))r=(t,n)=>x(An(e.useExisting),n!==void 0&&n&8?8:void 0);else{let t=An(e&&(e.useClass||e.provide));if(ni(e))r=()=>new t(...pr(e.deps));else return hr(t)||Xr(t)}return r}function ei(e){if(e.destroyed)throw new _(-205,!1)}function ti(e,t,n=!1){return{factory:e,value:t,multi:n?[]:void 0}}function ni(e){return!!e.deps}function ri(e){return typeof e==`object`&&!!e&&typeof e.ngOnDestroy==`function`}function ii(e){return typeof e==`function`||typeof e==`object`&&e.ngMetadataName===`InjectionToken`}function ai(e,t){for(let n of e)Array.isArray(n)?ai(n,t):n&&Rn(n)?ai(n.ɵproviders,t):t(n)}function oi(e,t){let n;e instanceof Yr?(ei(e),n=e):n=new lr(e);let r=Le(n),i=ar(void 0);try{return t()}finally{Le(r),ar(i)}}function si(){return ir()!==void 0||Ie()!=null}var ci=1;function li(e){return Array.isArray(e)&&typeof e[ci]==`object`}function ui(e){return Array.isArray(e)&&e[ci]===!0}function di(e){return(e.flags&4)!=0}function fi(e){return e.componentOffset>-1}function pi(e){return(e.flags&1)==1}function mi(e){return!!e.template}function hi(e){return(e[2]&512)!=0}function gi(e){return(e[2]&256)==256}var _i=`math`;function vi(e){for(;Array.isArray(e);)e=e[0];return e}function yi(e,t){return vi(t[e])}function bi(e,t){return vi(t[e.index])}function xi(e,t){return e.data[t]}function Si(e,t){let n=t[e];return li(n)?n:n[0]}function Ci(e){return(e[2]&128)==128}function wi(e){return ui(e[3])}function Ti(e,t){return t==null?null:e[t]}function Ei(e){e[17]=0}function Di(e){e[2]&1024||(e[2]|=1024,Ci(e)&&ji(e))}function Oi(e,t){for(;e>0;)t=t[14],e--;return t}function ki(e){return!!(e[2]&9216||e[24]?.dirty)}function Ai(e){e[10].changeDetectionScheduler?.notify(8),e[2]&64&&(e[2]|=1024),ki(e)&&ji(e)}function ji(e){e[10].changeDetectionScheduler?.notify(0);let t=Pi(e);for(;t!==null&&!(t[2]&8192||(t[2]|=8192,!Ci(t)));)t=Pi(t)}function Mi(e,t){if(gi(e))throw new _(911,!1);e[21]===null&&(e[21]=[]),e[21].push(t)}function Ni(e,t){if(e[21]===null)return;let n=e[21].indexOf(t);n!==-1&&e[21].splice(n,1)}function Pi(e){let t=e[3];return ui(t)?t[3]:t}function Fi(e){return e[7]??=[]}function Ii(e){return e.cleanup??=[]}function Li(e,t,n,r){let i=Fi(t);i.push(n),e.firstCreatePass&&Ii(e).push(r,i.length-1)}var C={lFrame:ma(null),bindingsEnabled:!0,skipHydrationRootTNode:null},Ri=!1;function zi(){return C.lFrame.elementDepthCount}function Bi(){C.lFrame.elementDepthCount++}function Vi(){C.lFrame.elementDepthCount--}function Hi(){return C.bindingsEnabled}function Ui(){return C.skipHydrationRootTNode!==null}function Wi(e){return C.skipHydrationRootTNode===e}function Gi(){C.skipHydrationRootTNode=null}function w(){return C.lFrame.lView}function T(){return C.lFrame.tView}function E(e){return C.lFrame.contextLView=e,e[8]}function D(e){return C.lFrame.contextLView=null,e}function Ki(){let e=qi();for(;e!==null&&e.type===64;)e=e.parent;return e}function qi(){return C.lFrame.currentTNode}function Ji(){let e=C.lFrame,t=e.currentTNode;return e.isParent?t:t.parent}function Yi(e,t){let n=C.lFrame;n.currentTNode=e,n.isParent=t}function Xi(){return C.lFrame.isParent}function Zi(){C.lFrame.isParent=!1}function Qi(){return Ri}function $i(e){let t=Ri;return Ri=e,t}function ea(e){return C.lFrame.bindingIndex=e}function ta(){return C.lFrame.bindingIndex++}function na(e){let t=C.lFrame,n=t.bindingIndex;return t.bindingIndex+=e,n}function ra(){return C.lFrame.inI18n}function ia(e,t){let n=C.lFrame;n.bindingIndex=n.bindingRootIndex=e,oa(t)}function aa(){return C.lFrame.currentDirectiveIndex}function oa(e){C.lFrame.currentDirectiveIndex=e}function sa(e){let t=C.lFrame.currentDirectiveIndex;return t===-1?null:e[t]}function ca(){return C.lFrame.currentQueryIndex}function la(e){C.lFrame.currentQueryIndex=e}function ua(e){let t=e[1];return t.type===2?t.declTNode:t.type===1?e[5]:null}function da(e,t,n){if(n&4){let r=t,i=e;for(;(r=r.parent,r===null&&!(n&1))&&(r=ua(i),!(r===null||(i=i[14],r.type&10))););if(r===null)return!1;t=r,e=i}let r=C.lFrame=pa();return r.currentTNode=t,r.lView=e,!0}function fa(e){let t=pa(),n=e[1];C.lFrame=t,t.currentTNode=n.firstChild,t.lView=e,t.tView=n,t.contextLView=e,t.bindingIndex=n.bindingStartIndex,t.inI18n=!1}function pa(){let e=C.lFrame,t=e===null?null:e.child;return t===null?ma(e):t}function ma(e){let t={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:e,child:null,inI18n:!1};return e!==null&&(e.child=t),t}function ha(){let e=C.lFrame;return C.lFrame=e.parent,e.currentTNode=null,e.lView=null,e}var ga=ha;function _a(){let e=ha();e.isParent=!0,e.tView=null,e.selectedIndex=-1,e.contextLView=null,e.elementDepthCount=0,e.currentDirectiveIndex=-1,e.currentNamespace=null,e.bindingRootIndex=-1,e.bindingIndex=-1,e.currentQueryIndex=0}function va(e){return(C.lFrame.contextLView=Oi(e,C.lFrame.contextLView))[8]}function ya(){return C.lFrame.selectedIndex}function ba(e){C.lFrame.selectedIndex=e}function xa(){let e=C.lFrame;return xi(e.tView,e.selectedIndex)}function Sa(){C.lFrame.currentNamespace=`svg`}function Ca(){wa()}function wa(){C.lFrame.currentNamespace=null}function Ta(){return C.lFrame.currentNamespace}var Ea=!0;function Da(){return Ea}function Oa(e){Ea=e}function ka(e,t=null,n=null,r){let i=Aa(e,t,n,r);return i.resolveInjectorInitializers(),i}function Aa(e,t=null,n=null,r,i=new Set){return new Yr([n||Dr,Nr(e)],t||qr(),null,i)}var ja=class e{static THROW_IF_NOT_FOUND=sr;static NULL=new jr;static create(e,t){if(Array.isArray(e))return ka({name:``},t,e,``);{let t=e.name??``;return ka({name:t},e.parent,e.providers,t)}}static ɵprov=y({token:e,providedIn:`any`,factory:()=>x(kr)});static __NG_ELEMENT_ID__=-1},Ma=new b(``),Na=(()=>{class e{static __NG_ELEMENT_ID__=Fa;static __NG_ENV_ID__=e=>e}return e})(),Pa=class extends Na{_lView;constructor(e){super(),this._lView=e}get destroyed(){return gi(this._lView)}onDestroy(e){let t=this._lView;return Mi(t,e),()=>Ni(t,e)}};function Fa(){return new Pa(w())}var Ia=new b(``),La=(()=>{class e{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new It(!1);debugTaskTracker=S(Ia,{optional:!0});get hasPendingTasks(){return!this.destroyed&&this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new g(e=>{e.next(!1),e.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let e=this.taskId++;return this.pendingTasks.add(e),this.debugTaskTracker?.add(e),e}has(e){return this.pendingTasks.has(e)}remove(e){this.pendingTasks.delete(e),this.debugTaskTracker?.remove(e),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static ɵprov=y({token:e,providedIn:`root`,factory:()=>new e})}return e})(),Ra=class extends Pt{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(e=!1){super(),this.__isAsync=e,si()&&(this.destroyRef=S(Na,{optional:!0})??void 0,this.pendingTasks=S(La,{optional:!0})??void 0)}emit(e){let t=d(null);try{super.next(e)}finally{d(t)}}subscribe(e,t,n){let r=e,i=t||(()=>null),a=n;if(e&&typeof e==`object`){let t=e;r=t.next?.bind(t),i=t.error?.bind(t),a=t.complete?.bind(t)}this.__isAsync&&(i=this.wrapInTimeout(i),r&&=this.wrapInTimeout(r),a&&=this.wrapInTimeout(a));let o=super.subscribe({next:r,error:i,complete:a});return e instanceof $e&&e.add(o),o}wrapInTimeout(e){return t=>{let n=this.pendingTasks?.add();setTimeout(()=>{try{e(t)}finally{n!==void 0&&this.pendingTasks?.remove(n)}})}}};function za(...e){}function Ba(e){let t,n;function r(){e=za;try{n!==void 0&&typeof cancelAnimationFrame==`function`&&cancelAnimationFrame(n),t!==void 0&&clearTimeout(t)}catch{}}return t=setTimeout(()=>{e(),r()}),typeof requestAnimationFrame==`function`&&(n=requestAnimationFrame(()=>{e(),r()})),()=>r()}function Va(e){return queueMicrotask(()=>e()),()=>{e=za}}var Ha=`isAngularZone`,Ua=`isAngularZone_ID`,Wa=0,Ga=class e{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new Ra(!1);onMicrotaskEmpty=new Ra(!1);onStable=new Ra(!1);onError=new Ra(!1);constructor(e){let{enableLongStackTrace:t=!1,shouldCoalesceEventChangeDetection:n=!1,shouldCoalesceRunChangeDetection:r=!1,scheduleInRootZone:i=!1}=e;if(typeof Zone>`u`)throw new _(908,!1);Zone.assertZonePatched();let a=this;a._nesting=0,a._outer=a._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(a._inner=a._inner.fork(new Zone.TaskTrackingZoneSpec)),t&&Zone.longStackTraceZoneSpec&&(a._inner=a._inner.fork(Zone.longStackTraceZoneSpec)),a.shouldCoalesceEventChangeDetection=!r&&n,a.shouldCoalesceRunChangeDetection=r,a.callbackScheduled=!1,a.scheduleInRootZone=i,Ya(a)}static isInAngularZone(){return typeof Zone<`u`&&Zone.current.get(Ha)===!0}static assertInAngularZone(){if(!e.isInAngularZone())throw new _(909,!1)}static assertNotInAngularZone(){if(e.isInAngularZone())throw new _(909,!1)}run(e,t,n){return this._inner.run(e,t,n)}runTask(e,t,n,r){let i=this._inner,a=i.scheduleEventTask(`NgZoneEvent: `+r,e,Ka,za,za);try{return i.runTask(a,t,n)}finally{i.cancelTask(a)}}runGuarded(e,t,n){return this._inner.runGuarded(e,t,n)}runOutsideAngular(e){return this._outer.run(e)}},Ka={};function qa(e){if(e._nesting==0&&!e.hasPendingMicrotasks&&!e.isStable)try{e._nesting++,e.onMicrotaskEmpty.emit(null)}finally{if(e._nesting--,!e.hasPendingMicrotasks)try{e.runOutsideAngular(()=>e.onStable.emit(null))}finally{e.isStable=!0}}}function Ja(e){if(e.isCheckStableRunning||e.callbackScheduled)return;e.callbackScheduled=!0;function t(){Ba(()=>{e.callbackScheduled=!1,Xa(e),e.isCheckStableRunning=!0,qa(e),e.isCheckStableRunning=!1})}e.scheduleInRootZone?Zone.root.run(()=>{t()}):e._outer.run(()=>{t()}),Xa(e)}function Ya(e){let t=()=>{Ja(e)},n=Wa++;e._inner=e._inner.fork({name:`angular`,properties:{[Ha]:!0,[Ua]:n,[Ua+n]:!0},onInvokeTask:(n,r,i,a,o,s)=>{if(eo(s))return n.invokeTask(i,a,o,s);try{return Za(e),n.invokeTask(i,a,o,s)}finally{(e.shouldCoalesceEventChangeDetection&&a.type===`eventTask`||e.shouldCoalesceRunChangeDetection)&&t(),Qa(e)}},onInvoke:(n,r,i,a,o,s,c)=>{try{return Za(e),n.invoke(i,a,o,s,c)}finally{e.shouldCoalesceRunChangeDetection&&!e.callbackScheduled&&!to(s)&&t(),Qa(e)}},onHasTask:(t,n,r,i)=>{t.hasTask(r,i),n===r&&(i.change==`microTask`?(e._hasPendingMicrotasks=i.microTask,Xa(e),qa(e)):i.change==`macroTask`&&(e.hasPendingMacrotasks=i.macroTask))},onHandleError:(t,n,r,i)=>(t.handleError(r,i),e.runOutsideAngular(()=>e.onError.emit(i)),!1)})}function Xa(e){e._hasPendingMicrotasks||(e.shouldCoalesceEventChangeDetection||e.shouldCoalesceRunChangeDetection)&&e.callbackScheduled===!0?e.hasPendingMicrotasks=!0:e.hasPendingMicrotasks=!1}function Za(e){e._nesting++,e.isStable&&(e.isStable=!1,e.onUnstable.emit(null))}function Qa(e){e._nesting--,qa(e)}var $a=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new Ra;onMicrotaskEmpty=new Ra;onStable=new Ra;onError=new Ra;run(e,t,n){return e.apply(t,n)}runGuarded(e,t,n){return e.apply(t,n)}runOutsideAngular(e){return e()}runTask(e,t,n,r){return e.apply(t,n)}};function eo(e){return no(e,`__ignore_ng_zone__`)}function to(e){return no(e,`__scheduler_tick__`)}function no(e,t){return!Array.isArray(e)||e.length!==1?!1:e[0]?.data?.[t]===!0}var ro=class{_console=console;handleError(e){this._console.error(`ERROR`,e)}},io=new b(``,{factory:()=>{let e=S(Ga),t=S(Jr),n;return r=>{e.runOutsideAngular(()=>{t.destroyed&&!n?setTimeout(()=>{throw r}):(n??=t.get(ro),n.handleError(r))})}}}),ao={provide:Or,useValue:()=>{S(ro,{optional:!0})},multi:!0};function O(e,t){let[n,r,i]=De(e,t?.equal),a=n;return a[u],a.set=r,a.update=i,a.asReadonly=oo.bind(a),a}function oo(){let e=this[u];if(e.readonlyFn===void 0){let t=()=>this();t[u]=e,e.readonlyFn=t}return e.readonlyFn}var so=new b(``,{factory:()=>co}),co=`ng`,lo=new b(``),uo=new b(``,{providedIn:`platform`,factory:()=>`unknown`}),fo=new b(``,{factory:()=>S(Ma).body?.querySelector(`[ngCspNonce]`)?.getAttribute(`ngCspNonce`)||null}),po=(()=>{class e{view;node;constructor(e,t){this.view=e,this.node=t}static __NG_ELEMENT_ID__=mo}return e})();function mo(){return new po(w(),Ki())}var ho=class{},go=new b(``,{factory:()=>!0}),_o=new b(``),vo=(()=>{class e{static ɵprov=y({token:e,providedIn:`root`,factory:()=>new yo})}return e})(),yo=class{dirtyEffectCount=0;queues=new Map;add(e){this.enqueue(e),this.schedule(e)}schedule(e){e.dirty&&this.dirtyEffectCount++}remove(e){let t=e.zone,n=this.queues.get(t);n.has(e)&&(n.delete(e),e.dirty&&this.dirtyEffectCount--)}enqueue(e){let t=e.zone;this.queues.has(t)||this.queues.set(t,new Set);let n=this.queues.get(t);n.has(e)||n.add(e)}flush(){for(;this.dirtyEffectCount>0;){let e=!1;for(let[t,n]of this.queues)t===null?e||=this.flushQueue(n):e||=t.run(()=>this.flushQueue(n));e||(this.dirtyEffectCount=0)}}flushQueue(e){let t=!1;for(let n of e)n.dirty&&(this.dirtyEffectCount--,t=!0,n.run());return t}},bo=class{[u];constructor(e){this[u]=e}destroy(){this[u].destroy()}};function xo(e,t){let n=t?.injector??S(ja),r=t?.manualCleanup===!0?null:n.get(Na),i,a=n.get(po,null,{optional:!0}),o=n.get(ho);return a===null?i=Eo(e,n.get(vo),o):(i=To(a.view,o,e),r instanceof Pa&&r._lView===a.view&&(r=null)),i.injector=n,r!==null&&(i.onDestroyFns=[r.onDestroy(()=>i.destroy())]),new bo(i)}var So={...Ne,cleanupFns:void 0,zone:null,onDestroyFns:null,run(){let e=$i(!1);try{Pe(this)}finally{$i(e)}},cleanup(){if(!this.cleanupFns?.length)return;let e=d(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[],d(e)}}},Co={...So,consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){if(de(this),this.onDestroyFns!==null)for(let e of this.onDestroyFns)e();this.cleanup(),this.scheduler.remove(this)}},wo={...So,consumerMarkedDirty(){this.view[2]|=8192,ji(this.view),this.notifier.notify(13)},destroy(){if(de(this),this.onDestroyFns!==null)for(let e of this.onDestroyFns)e();this.cleanup(),this.view[23]?.delete(this)}};function To(e,t,n){let r=Object.create(wo);return r.view=e,r.zone=typeof Zone<`u`?Zone.current:null,r.notifier=t,r.fn=Do(r,n),e[23]??=new Set,e[23].add(r),r.consumerMarkedDirty(r),r}function Eo(e,t,n){let r=Object.create(Co);return r.fn=Do(r,e),r.scheduler=t,r.notifier=n,r.zone=typeof Zone<`u`?Zone.current:null,r.scheduler.add(r),r.notifier.notify(12),r}function Do(e,t){return()=>{t(t=>(e.cleanupFns??=[]).push(t))}}function Oo(e){return{toString:e}.toString()}var k=function(e){return e[e.TemplateCreateStart=0]=`TemplateCreateStart`,e[e.TemplateCreateEnd=1]=`TemplateCreateEnd`,e[e.TemplateUpdateStart=2]=`TemplateUpdateStart`,e[e.TemplateUpdateEnd=3]=`TemplateUpdateEnd`,e[e.LifecycleHookStart=4]=`LifecycleHookStart`,e[e.LifecycleHookEnd=5]=`LifecycleHookEnd`,e[e.OutputStart=6]=`OutputStart`,e[e.OutputEnd=7]=`OutputEnd`,e[e.BootstrapApplicationStart=8]=`BootstrapApplicationStart`,e[e.BootstrapApplicationEnd=9]=`BootstrapApplicationEnd`,e[e.BootstrapComponentStart=10]=`BootstrapComponentStart`,e[e.BootstrapComponentEnd=11]=`BootstrapComponentEnd`,e[e.ChangeDetectionStart=12]=`ChangeDetectionStart`,e[e.ChangeDetectionEnd=13]=`ChangeDetectionEnd`,e[e.ChangeDetectionSyncStart=14]=`ChangeDetectionSyncStart`,e[e.ChangeDetectionSyncEnd=15]=`ChangeDetectionSyncEnd`,e[e.AfterRenderHooksStart=16]=`AfterRenderHooksStart`,e[e.AfterRenderHooksEnd=17]=`AfterRenderHooksEnd`,e[e.ComponentStart=18]=`ComponentStart`,e[e.ComponentEnd=19]=`ComponentEnd`,e[e.DeferBlockStateStart=20]=`DeferBlockStateStart`,e[e.DeferBlockStateEnd=21]=`DeferBlockStateEnd`,e[e.DynamicComponentStart=22]=`DynamicComponentStart`,e[e.DynamicComponentEnd=23]=`DynamicComponentEnd`,e[e.HostBindingsUpdateStart=24]=`HostBindingsUpdateStart`,e[e.HostBindingsUpdateEnd=25]=`HostBindingsUpdateEnd`,e}(k||{});function ko(e,t,n,r){t===null?e[n]=r:t.applyValueToInputSignal(t,r)}var Ao=null;function jo(){return Ao}var Mo=[],A=function(e,t=null,n){for(let r=0;r<Mo.length;r++){let i=Mo[r];i(e,t,n)}};function No(e,t,n){let{ngOnChanges:r,ngOnInit:i,ngDoCheck:a}=t.type.prototype;if(r){let r=jo()(t);(n.preOrderHooks??=[]).push(e,r),(n.preOrderCheckHooks??=[]).push(e,r)}i&&(n.preOrderHooks??=[]).push(0-e,i),a&&((n.preOrderHooks??=[]).push(e,a),(n.preOrderCheckHooks??=[]).push(e,a))}function Po(e,t){for(let n=t.directiveStart,r=t.directiveEnd;n<r;n++){let{ngAfterContentInit:t,ngAfterContentChecked:r,ngAfterViewInit:i,ngAfterViewChecked:a,ngOnDestroy:o}=e.data[n].type.prototype;t&&(e.contentHooks??=[]).push(-n,t),r&&((e.contentHooks??=[]).push(n,r),(e.contentCheckHooks??=[]).push(n,r)),i&&(e.viewHooks??=[]).push(-n,i),a&&((e.viewHooks??=[]).push(n,a),(e.viewCheckHooks??=[]).push(n,a)),o!=null&&(e.destroyHooks??=[]).push(n,o)}}function Fo(e,t,n){Ro(e,t,3,n)}function Io(e,t,n,r){(e[2]&3)===n&&Ro(e,t,n,r)}function Lo(e,t){let n=e[2];(n&3)===t&&(n&=16383,n+=1,e[2]=n)}function Ro(e,t,n,r){let i=r===void 0?0:e[17]&65535,a=r??-1,o=t.length-1,s=0;for(let c=i;c<o;c++)if(typeof t[c+1]==`number`){if(s=t[c],r!=null&&s>=r)break}else t[c]<0&&(e[17]+=65536),(s<a||a==-1)&&(Bo(e,n,t,c),e[17]=(e[17]&4294901760)+c+2),c++}function zo(e,t){A(k.LifecycleHookStart,e,t);let n=d(null);try{t.call(e)}finally{d(n),A(k.LifecycleHookEnd,e,t)}}function Bo(e,t,n,r){let i=n[r]<0,a=n[r+1],o=e[i?-n[r]:n[r]];i?e[2]>>14<e[17]>>16&&(e[2]&3)===t&&(e[2]+=16384,zo(o,a)):zo(o,a)}var Vo=-1,Ho=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(e,t,n,r){this.factory=e,this.name=r,this.canSeeViewProviders=t,this.injectImpl=n}};function Uo(e){return(e.flags&8)!=0}function Wo(e){return(e.flags&16)!=0}function Go(e,t,n){let r=0;for(;r<n.length;){let i=n[r];if(typeof i==`number`){if(i!==0)break;r++;let a=n[r++],o=n[r++],s=n[r++];e.setAttribute(t,o,s,a)}else{let a=i,o=n[++r];qo(a)?e.setProperty(t,a,o):e.setAttribute(t,a,o),r++}}return r}function Ko(e){return e===3||e===4||e===6}function qo(e){return e.charCodeAt(0)===64}function Jo(e,t){if(!(t===null||t.length===0))if(e===null||e.length===0)e=t.slice();else{let n=-1;for(let r=0;r<t.length;r++){let i=t[r];typeof i==`number`?n=i:n===0||(n===-1||n===2?Yo(e,n,i,null,t[++r]):Yo(e,n,i,null,null))}}return e}function Yo(e,t,n,r,i){let a=0,o=e.length;if(t===-1)o=-1;else for(;a<e.length;){let n=e[a++];if(typeof n==`number`){if(n===t){o=-1;break}else if(n>t){o=a-1;break}}}for(;a<e.length;){let t=e[a];if(typeof t==`number`)break;if(t===n){i!==null&&(e[a+1]=i);return}a++,i!==null&&a++}o!==-1&&(e.splice(o,0,t),a=o+1),e.splice(a++,0,n),i!==null&&e.splice(a++,0,i)}function Xo(e){return e!==Vo}function Zo(e){return e&32767}function Qo(e){return e>>16}function $o(e,t){let n=Qo(e),r=t;for(;n>0;)r=r[14],n--;return r}var es=!0;function ts(e){let t=es;return es=e,t}var ns=255,rs=5,is=0,as={};function os(e,t,n){let r;typeof n==`string`?r=n.charCodeAt(0)||0:n.hasOwnProperty(Un)&&(r=n[Un]),r??=n[Un]=is++;let i=r&ns,a=1<<i;t.data[e+(i>>rs)]|=a}function ss(e,t){let n=ls(e,t);if(n!==-1)return n;let r=t[1];r.firstCreatePass&&(e.injectorIndex=t.length,cs(r.data,e),cs(t,null),cs(r.blueprint,null));let i=us(e,t),a=e.injectorIndex;if(Xo(i)){let e=Zo(i),n=$o(i,t),r=n[1].data;for(let i=0;i<8;i++)t[a+i]=n[e+i]|r[e+i]}return t[a+8]=i,a}function cs(e,t){e.push(0,0,0,0,0,0,0,0,t)}function ls(e,t){return e.injectorIndex===-1||e.parent&&e.parent.injectorIndex===e.injectorIndex||t[e.injectorIndex+8]===null?-1:e.injectorIndex}function us(e,t){if(e.parent&&e.parent.injectorIndex!==-1)return e.parent.injectorIndex;let n=0,r=null,i=t;for(;i!==null;){if(r=Ts(i),r===null)return Vo;if(n++,i=i[14],r.injectorIndex!==-1)return r.injectorIndex|n<<16}return Vo}function ds(e,t,n){os(e,t,n)}function fs(e,t,n){if(n&8||e!==void 0)return e;er(t,`NodeInjector`)}function ps(e,t,n,r){if(n&8&&r===void 0&&(r=null),!(n&3)){let i=e[9],a=ar(void 0);try{return i?i.get(t,r,n&8):or(t,r,n&8)}finally{ar(a)}}return fs(r,t,n)}function ms(e,t,n,r=0,i){if(e!==null){if(t[2]&2048&&!(r&2)){let i=ws(e,t,n,r,as);if(i!==as)return i}let i=hs(e,t,n,r,as);if(i!==as)return i}return ps(t,n,r,i)}function hs(e,t,n,r,i){let a=ys(n);if(typeof a==`function`){if(!da(t,e,r))return r&1?fs(i,n,r):ps(t,n,r,i);try{let e;if(e=a(r),e==null&&!(r&8))er(n);else return e}finally{ga()}}else if(typeof a==`number`){let i=null,o=ls(e,t),s=Vo,c=r&1?t[15][5]:null;for((o===-1||r&4)&&(s=o===-1?us(e,t):t[o+8],s===Vo||!xs(r,!1)?o=-1:(i=t[1],o=Zo(s),t=$o(s,t)));o!==-1;){let e=t[1];if(bs(a,o,e.data)){let e=gs(o,t,n,i,r,c);if(e!==as)return e}s=t[o+8],s!==Vo&&xs(r,t[1].data[o+8]===c)&&bs(a,o,t)?(i=e,o=Zo(s),t=$o(s,t)):o=-1}}return i}function gs(e,t,n,r,i,a){let o=t[1],s=o.data[e+8],c=_s(s,o,n,r==null?fi(s)&&es:r!=o&&(s.type&3)!=0,i&1&&a===s);return c===null?as:vs(t,o,c,s,i)}function _s(e,t,n,r,i){let a=e.providerIndexes,o=t.data,s=a&1048575,c=e.directiveStart,l=e.directiveEnd,u=a>>20,d=r?s:s+u,f=i?s+u:l;for(let e=d;e<f;e++){let t=o[e];if(e<c&&n===t||e>=c&&t.type===n)return e}if(i){let e=o[c];if(e&&mi(e)&&e.type===n)return c}return null}function vs(e,t,n,r,i){let a=e[n],o=t.data;if(a instanceof Ho){let s=a;if(s.resolving)throw $n(``);let c=ts(s.canSeeViewProviders);s.resolving=!0,o[n].type||o[n];let l=s.injectImpl?ar(s.injectImpl):null;da(e,r,0);try{a=e[n]=s.factory(void 0,i,o,e,r),t.firstCreatePass&&n>=r.directiveStart&&No(n,o[n],t)}finally{l!==null&&ar(l),ts(c),s.resolving=!1,ga()}}return a}function ys(e){if(typeof e==`string`)return e.charCodeAt(0)||0;let t=e.hasOwnProperty(Un)?e[Un]:void 0;return typeof t==`number`?t>=0?t&ns:Cs:t}function bs(e,t,n){let r=1<<e;return!!(n[t+(e>>rs)]&r)}function xs(e,t){return!(e&2)&&!(e&1&&t)}var Ss=class{_tNode;_lView;constructor(e,t){this._tNode=e,this._lView=t}get(e,t,n){return ms(this._tNode,this._lView,e,dr(n),t)}};function Cs(){return new Ss(Ki(),w())}function ws(e,t,n,r,i){let a=e,o=t;for(;a!==null&&o!==null&&o[2]&2048&&!hi(o);){let e=hs(a,o,n,r|2,as);if(e!==as)return e;let t=a.parent;if(!t){let e=o[20];if(e){let t=e.get(n,as,r&-5);if(t!==as)return t}t=Ts(o),o=o[14]}a=t}return i}function Ts(e){let t=e[1],n=t.type;return n===2?t.declTNode:n===1?e[5]:null}function Es(e){return{token:e.token,providedIn:e.autoProvided===!1?null:`root`,factory:e.factory,value:void 0}}function Ds(){return Os(Ki(),w())}function Os(e,t){return new ks(bi(e,t))}var ks=(()=>{class e{nativeElement;constructor(e){this.nativeElement=e}static __NG_ELEMENT_ID__=Ds}return e})();function As(e){return e instanceof ks?e.nativeElement:e}function js(){return this._results[Symbol.iterator]()}var Ms=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new Pt}constructor(e=!1){this._emitDistinctChangesOnly=e}get(e){return this._results[e]}map(e){return this._results.map(e)}filter(e){return this._results.filter(e)}find(e){return this._results.find(e)}reduce(e,t){return this._results.reduce(e,t)}forEach(e){this._results.forEach(e)}some(e){return this._results.some(e)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(e,t){this.dirty=!1;let n=_r(e);(this._changesDetected=!gr(this._results,n,t))&&(this._results=n,this.length=n.length,this.last=n[this.length-1],this.first=n[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(e){this._onDirty=e}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=js};function Ns(e){return(e.flags&128)==128}var Ps=function(e){return e[e.OnPush=0]=`OnPush`,e[e.Eager=1]=`Eager`,e[e.Default=1]=`Default`,e}(Ps||{}),Fs=new Map,Is=0;function Ls(){return Is++}function Rs(e){Fs.set(e[19],e)}function zs(e){Fs.delete(e[19])}var Bs=`__ngContext__`;function Vs(e,t){li(t)?(e[Bs]=t[19],Rs(t)):e[Bs]=t}function Hs(e){return Ws(e[12])}function Us(e){return Ws(e[4])}function Ws(e){for(;e!==null&&!ui(e);)e=e[4];return e}var Gs=void 0;function Ks(e){Gs=e}function qs(){if(Gs!==void 0)return Gs;if(typeof document<`u`)return document;throw new _(210,!1)}var Js=!1,Ys=new b(``,{factory:()=>Js}),Xs=new WeakMap;function Zs(e,t){if(typeof e!=`object`||!e)return;let n=Xs.get(e);n||(n=new WeakSet,Xs.set(e,n)),n.add(t)}function Qs(e){return(e.flags&32)==32}var $s=()=>null;function ec(e,t,n=!1){return $s(e,t,n)}function tc(e,t){let n=e.contentQueries;if(n!==null){let r=d(null);try{for(let r=0;r<n.length;r+=2){let i=n[r],a=n[r+1];if(a!==-1){let n=e.data[a];la(i),n.contentQueries(2,t[a],a)}}}finally{d(r)}}}function nc(e,t,n){la(0);let r=d(null);try{t(e,n)}finally{d(r)}}function rc(e,t,n){if(di(t)){let r=d(null);try{let r=t.directiveStart,i=t.directiveEnd;for(let t=r;t<i;t++){let r=e.data[t];if(r.contentQueries){let e=n[t];r.contentQueries(1,e,t)}}}finally{d(r)}}}var ic=function(e){return e[e.Emulated=0]=`Emulated`,e[e.None=2]=`None`,e[e.ShadowDom=3]=`ShadowDom`,e[e.ExperimentalIsolatedShadowDom=4]=`ExperimentalIsolatedShadowDom`,e}(ic||{}),ac=class{changingThisBreaksApplicationSecurity;constructor(e){this.changingThisBreaksApplicationSecurity=e}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Cn})`}};function oc(e){return e instanceof ac?e.changingThisBreaksApplicationSecurity:e}function sc(e,t){let n=cc(e);if(n!=null&&n!==t){if(n===`ResourceURL`&&t===`URL`)return!0;throw Error(`Required a safe ${t}, got a ${n} (see ${Cn})`)}return n===t}function cc(e){return e instanceof ac&&e.getTypeName()||null}var lc=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function uc(e){return e=String(e),e.match(lc)?e:`unsafe:`+e}function dc(e,t){return e.createText(t)}function fc(e,t,n){e.setValue(t,n)}function pc(e,t,n){return e.createElement(t,n)}function mc(e,t,n,r,i){e.insertBefore(t,n,r,i)}function hc(e,t,n){e.appendChild(t,n)}function gc(e,t,n,r,i){r===null?hc(e,t,n):mc(e,t,n,r,i)}function _c(e,t,n,r){e.removeChild(null,t,n,r)}function vc(e,t,n){e.setAttribute(t,`style`,n)}function yc(e,t,n){n===``?e.removeAttribute(t,`class`):e.setAttribute(t,`class`,n)}function bc(e,t,n){let{mergedAttrs:r,classes:i,styles:a}=n;r!==null&&Go(e,t,r),i!==null&&yc(e,t,i),a!==null&&vc(e,t,a)}var xc=function(e){return e[e.NONE=0]=`NONE`,e[e.HTML=1]=`HTML`,e[e.STYLE=2]=`STYLE`,e[e.SCRIPT=3]=`SCRIPT`,e[e.URL=4]=`URL`,e[e.RESOURCE_URL=5]=`RESOURCE_URL`,e[e.ATTRIBUTE_NO_BINDING=6]=`ATTRIBUTE_NO_BINDING`,e}(xc||{});function Sc(e){let t=Cc();return t?t.sanitize(xc.URL,e)||``:sc(e,`URL`)?oc(e):uc(Yn(e))}function Cc(){let e=w();return e&&e[10].sanitizer}function wc(e){return e.ownerDocument}function Tc(e,t,n){let r=e.length;for(;;){let i=e.indexOf(t,n);if(i===-1)return i;if(i===0||e.charCodeAt(i-1)<=32){let n=t.length;if(i+n===r||e.charCodeAt(i+n)<=32)return i}n=i+1}}var Ec=`ng-template`;function Dc(e,t,n,r){let i=0;if(r){for(;i<t.length&&typeof t[i]==`string`;i+=2)if(t[i]===`class`&&Tc(t[i+1].toLowerCase(),n,0)!==-1)return!0}else if(Oc(e))return!1;if(i=t.indexOf(1,i),i>-1){let e;for(;++i<t.length&&typeof(e=t[i])==`string`;)if(e.toLowerCase()===n)return!0}return!1}function Oc(e){return e.type===4&&e.value!==Ec}function kc(e,t,n){return t===(e.type===4&&!n?Ec:e.value)}function Ac(e,t,n){let r=4,i=e.attrs,a=i===null?0:Pc(i),o=!1;for(let s=0;s<t.length;s++){let c=t[s];if(typeof c==`number`){if(!o&&!jc(r)&&!jc(c))return!1;if(o&&jc(c))continue;o=!1,r=c|r&1;continue}if(!o)if(r&4){if(r=2|r&1,c!==``&&!kc(e,c,n)||c===``&&t.length===1){if(jc(r))return!1;o=!0}}else if(r&8){if(i===null||!Dc(e,i,c,n)){if(jc(r))return!1;o=!0}}else{let l=t[++s],u=Mc(c,i,Oc(e),n);if(u===-1){if(jc(r))return!1;o=!0;continue}if(l!==``){let e;if(e=u>a?``:i[u+1].toLowerCase(),r&2&&l!==e){if(jc(r))return!1;o=!0}}}}return jc(r)||o}function jc(e){return(e&1)==0}function Mc(e,t,n,r){if(t===null)return-1;let i=0;if(r||!n){let n=!1;for(;i<t.length;){let r=t[i];if(r===e)return i;if(r===3||r===6)n=!0;else if(r===1||r===2){let e=t[++i];for(;typeof e==`string`;)e=t[++i];continue}else if(r===4)break;else if(r===0){i+=4;continue}i+=n?1:2}return-1}else return Fc(t,e)}function Nc(e,t,n=!1){for(let r=0;r<t.length;r++)if(Ac(e,t[r],n))return!0;return!1}function Pc(e){for(let t=0;t<e.length;t++){let n=e[t];if(Ko(n))return t}return e.length}function Fc(e,t){let n=e.indexOf(4);if(n>-1)for(n++;n<e.length;){let r=e[n];if(typeof r==`number`)return-1;if(r===t)return n;n++}return-1}function Ic(e,t){return e?`:not(`+t.trim()+`)`:t}function Lc(e){let t=e[0],n=1,r=2,i=``,a=!1;for(;n<e.length;){let o=e[n];if(typeof o==`string`)if(r&2){let t=e[++n];i+=`[`+o+(t.length>0?`="`+t+`"`:``)+`]`}else r&8?i+=`.`+o:r&4&&(i+=` `+o);else i!==``&&!jc(o)&&(t+=Ic(a,i),i=``),r=o,a||=!jc(r);n++}return i!==``&&(t+=Ic(a,i)),t}function Rc(e){return e.map(Lc).join(`,`)}function zc(e){let t=[],n=[],r=1,i=2;for(;r<e.length;){let a=e[r];if(typeof a==`string`)i===2?a!==``&&t.push(a,e[++r]):i===8&&n.push(a);else{if(!jc(i))break;i=a}r++}return n.length&&t.push(1,...n),t}var Bc={},Vc=function(e){return e[e.Important=1]=`Important`,e[e.DashCase=2]=`DashCase`,e}(Vc||{}),Hc;function Uc(e,t){return Hc(e,t)}typeof document<`u`&&document?.documentElement?.getAnimations;var Wc=new WeakMap;function Gc(e){return e?e[14]??e:null}var Kc=new WeakSet;function qc(e,t,n){let r=Wc.get(e);if(!r||r.length===0)return;let i=t.parentNode,a=t.previousSibling,o=Gc(n);for(let e=r.length-1;e>=0;e--){let{el:n,declarationView:s}=r[e],c=n.parentNode;n===t?(r.splice(e,1),Kc.add(n),n.dispatchEvent(new CustomEvent(`animationend`,{detail:{cancel:!0}}))):(a&&n===a||c&&i&&c!==i&&(o===null||s===null||o===s))&&(r.splice(e,1),n.dispatchEvent(new CustomEvent(`animationend`,{detail:{cancel:!0}})),n.parentNode?.removeChild(n))}}function Jc(e,t,n){let r=Gc(n),i=Wc.get(e);i?i.some(e=>e.el===t)||i.push({el:t,declarationView:r}):Wc.set(e,[{el:t,declarationView:r}])}var Yc=new Set,Xc=function(e){return e[e.CHANGE_DETECTION=0]=`CHANGE_DETECTION`,e[e.AFTER_NEXT_RENDER=1]=`AFTER_NEXT_RENDER`,e}(Xc||{}),Zc=new b(``),Qc=new Set;function $c(e){Qc.has(e)||(Qc.add(e),performance?.mark?.(`mark_feature_usage`,{detail:{feature:e}}))}var el=(()=>{class e{impl=null;execute(){this.impl?.execute()}static ɵprov=y({token:e,providedIn:`root`,factory:()=>new e})}return e})(),tl=new b(``,{factory:()=>{let e=S(Jr),t=new Set;return e.onDestroy(()=>t.clear()),{queue:t,isScheduled:!1,scheduler:null,injector:e}}});function nl(e,t,n){let r=e.get(tl);if(Array.isArray(t))for(let e of t)r.queue.add(e),n?.detachedLeaveAnimationFns?.push(e);else r.queue.add(t),n?.detachedLeaveAnimationFns?.push(t);r.scheduler&&r.scheduler(e)}function rl(e,t){let n=e.get(tl);if(Array.isArray(t))for(let e of t)n.queue.delete(e);else n.queue.delete(t)}function il(e,t){let n=e.get(tl);if(t.detachedLeaveAnimationFns){for(let e of t.detachedLeaveAnimationFns)n.queue.delete(e);t.detachedLeaveAnimationFns=void 0}}function al(e,t){for(let[n,r]of t)nl(e,r.animateFns)}function ol(e,t,n,r){let i=e?.[26]?.enter;t!==null&&i&&i.has(n.index)&&al(r,i)}function sl(e,t,n,r){try{n.get(kr)}catch{return r(!1)}let i=e?.[26];i?.enter?.has(t.index)&&rl(n,i.enter.get(t.index).animateFns);let a=cl(e,t,i);if(a.size===0){let n=!1;if(e){let r=[];ul(e,t,r),n=r.length>0}if(!n)return r(!1)}e&&Yc.add(e[19]),nl(n,()=>ll(e,t,i||void 0,a,r),i||void 0)}function cl(e,t,n){let r=new Map,i=n?.leave;if(i&&i.has(t.index)&&r.set(t.index,i.get(t.index)),e&&i)for(let[n,a]of i){if(r.has(n))continue;let i=e[1].data[n].parent;for(;i;){if(i===t){r.set(n,a);break}i=i.parent}}return r}function ll(e,t,n,r,i){let a=[];if(n&&n.leave)for(let[e]of r){if(!n.leave.has(e))continue;let t=n.leave.get(e);for(let e of t.animateFns){let{promise:t}=e();a.push(t)}n.detachedLeaveAnimationFns=void 0}if(e&&ul(e,t,a),a.length>0){let t=n||e?.[26];if(t){let n=t.running;n&&a.push(n),t.running=Promise.allSettled(a),fl(e,t.running,i)}else Promise.allSettled(a).then(()=>{e&&Yc.delete(e[19]),i(!0)})}else e&&Yc.delete(e[19]),i(!1)}function ul(e,t,n){if(t.type&12){let r=e[t.index];if(ui(r))for(let e=10;e<r.length;e++){let t=r[e];t[1].type===2&&dl(t,n)}}let r=t.child;for(;r;)ul(e,r,n),r=r.next}function dl(e,t){let n=e[26];if(n&&n.leave)for(let e of n.leave.values())for(let n of e.animateFns){let{promise:e}=n();t.push(e)}let r=e[1].firstChild;for(;r;)ul(e,r,t),r=r.next}function fl(e,t,n){t.then(()=>{e[26]?.running===t&&(e[26].running=void 0,Yc.delete(e[19])),n(!0)})}function pl(e,t,n,r,i,a,o,s){if(i!=null){let c,l=!1;ui(i)?c=i:li(i)&&(l=!0,i=i[0]);let u=vi(i);e===0&&r!==null?(ol(s,r,a,n),o==null?hc(t,r,u):mc(t,r,u,o||null,!0)):e===1&&r!==null?(ol(s,r,a,n),mc(t,r,u,o||null,!0),qc(a,u,s)):e===2?(s?.[26]?.leave?.has(a.index)&&Jc(a,u,s),Kc.delete(u),sl(s,a,n,e=>{if(Kc.has(u)){Kc.delete(u);return}_c(t,u,l,e)})):e===3&&(Kc.delete(u),sl(s,a,n,()=>{t.destroyNode(u)})),c!=null&&Il(t,e,n,c,a,r,o)}}function ml(e,t){gl(e,t),t[0]=null,t[5]=null}function hl(e,t,n,r,i,a){r[0]=i,r[5]=t,Pl(e,r,n,1,i,a)}function gl(e,t){t[10].changeDetectionScheduler?.notify(9),Pl(e,t,t[11],2,null,null)}function _l(e){let t=e[12];if(!t)return bl(e[1],e);for(;t;){let n=null;if(li(t))n=t[12];else{let e=t[10];e&&(n=e)}if(!n){for(;t&&!t[4]&&t!==e;)li(t)&&bl(t[1],t),t=t[3];t===null&&(t=e),li(t)&&bl(t[1],t),n=t&&t[4]}t=n}}function vl(e,t){let n=e[9],r=n.indexOf(t);n.splice(r,1)}function yl(e,t){if(gi(t))return;let n=t[11];n.destroyNode&&Pl(e,t,n,3,null,null),_l(t)}function bl(e,t){if(gi(t))return;let n=d(null);try{t[2]&=-129,t[2]|=256,t[24]&&de(t[24]),Sl(e,t),xl(e,t),t[1].type===1&&t[11].destroy();let n=t[16];if(n!==null&&ui(t[3])){n!==t[3]&&vl(n,t);let r=t[18];r!==null&&r.detachView(e)}zs(t)}finally{d(n)}}function xl(e,t){let n=e.cleanup,r=t[7];if(n!==null)for(let e=0;e<n.length-1;e+=2)if(typeof n[e]==`string`){let t=n[e+3];t>=0?r[t]():r[-t].unsubscribe(),e+=2}else{let t=r[n[e+1]];n[e].call(t)}r!==null&&(t[7]=null);let i=t[21];if(i!==null){t[21]=null;for(let e=0;e<i.length;e++){let t=i[e];t()}}let a=t[23];if(a!==null){t[23]=null;for(let e of a)e.destroy()}}function Sl(e,t){let n;if(e!=null&&(n=e.destroyHooks)!=null)for(let e=0;e<n.length;e+=2){let r=t[n[e]];if(!(r instanceof Ho)){let t=n[e+1];if(Array.isArray(t))for(let e=0;e<t.length;e+=2){let n=r[t[e]],i=t[e+1];A(k.LifecycleHookStart,n,i);try{i.call(n)}finally{A(k.LifecycleHookEnd,n,i)}}else{A(k.LifecycleHookStart,r,t);try{t.call(r)}finally{A(k.LifecycleHookEnd,r,t)}}}}}function Cl(e,t,n){return wl(e,t.parent,n)}function wl(e,t,n){let r=t;for(;r!==null&&r.type&168;)t=r,r=t.parent;if(r===null)return n[0];if(fi(r)){let{encapsulation:t}=e.data[r.directiveStart+r.componentOffset];if(t===ic.None||t===ic.Emulated)return null}return bi(r,n)}function Tl(e,t,n){return Dl(e,t,n)}function El(e,t,n){return e.type&40?bi(e,n):null}var Dl=El,Ol;function kl(e,t,n,r){let i=Cl(e,r,t),a=t[11],o=Tl(r.parent||t[5],r,t);if(i!=null)if(Array.isArray(n))for(let e=0;e<n.length;e++)gc(a,i,n[e],o,!1);else gc(a,i,n,o,!1);Ol!==void 0&&Ol(a,r,t,n,i)}function Al(e,t){if(t!==null){let n=t.type;if(n&3)return bi(t,e);if(n&4)return Ml(-1,e[t.index]);if(n&8){let n=t.child;if(n!==null)return Al(e,n);{let n=e[t.index];return ui(n)?Ml(-1,n):vi(n)}}else if(n&128)return Al(e,t.next);else if(n&32)return Uc(t,e)()||vi(e[t.index]);else{let n=jl(e,t);return n===null?Al(e,t.next):Array.isArray(n)?n[0]:Al(Pi(e[15]),n)}}return null}function jl(e,t){if(t!==null){let n=e[15][5],r=t.projection;return n.projection[r]}return null}function Ml(e,t){let n=10+e+1;if(n<t.length){let e=t[n],r=e[1].firstChild;if(r!==null)return Al(e,r)}return t[7]}function Nl(e,t,n,r,i,a,o){for(;n!=null;){let s=r[9];if(n.type===128){n=n.next;continue}let c=r[n.index],l=n.type;if(o&&t===0&&(c&&Vs(vi(c),r),n.flags|=2),!Qs(n))if(l&8)Nl(e,t,n.child,r,i,a,!1),pl(t,e,s,i,c,n,a,r);else if(l&32){let o=Uc(n,r),l;for(;l=o();)pl(t,e,s,i,l,n,a,r);pl(t,e,s,i,c,n,a,r)}else l&16?Fl(e,t,r,n,i,a):pl(t,e,s,i,c,n,a,r);n=o?n.projectionNext:n.next}}function Pl(e,t,n,r,i,a){Nl(n,r,e.firstChild,t,i,a,!1)}function Fl(e,t,n,r,i,a){let o=n[15],s=o[5].projection[r.projection];if(Array.isArray(s))for(let o=0;o<s.length;o++){let c=s[o];pl(t,e,n[9],i,c,r,a,n)}else{let n=s,c=o[3];Ns(r)&&(n.flags|=128),Nl(e,t,n,c,i,a,!0)}}function Il(e,t,n,r,i,a,o){let s=r[7];s!==vi(r)&&pl(t,e,n,a,s,i,o);for(let n=10;n<r.length;n++){let i=r[n];Pl(i[1],i,e,t,a,s)}}function Ll(e,t,n,r,i){if(t)i?e.addClass(n,r):e.removeClass(n,r);else{let t=r.indexOf(`-`)===-1?void 0:Vc.DashCase;i==null?e.removeStyle(n,r,t):(typeof i==`string`&&i.endsWith(`!important`)&&(i=i.slice(0,-10),t|=Vc.Important),e.setStyle(n,r,i,t))}}function Rl(e,t,n,r,i,a,o,s,c,l,u){let d=27+r,f=d+i,p=zl(d,f),m=typeof l==`function`?l():l;return p[1]={type:e,blueprint:p,template:n,queries:null,viewQuery:s,declTNode:t,data:p.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:f,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof a==`function`?a():a,pipeRegistry:typeof o==`function`?o():o,firstChild:null,schemas:c,consts:m,incompleteFirstPass:!1,ssrId:u}}function zl(e,t){let n=[];for(let r=0;r<t;r++)n.push(r<e?null:Bc);return n}function Bl(e){let t=e.tView;return t===null||t.incompleteFirstPass?e.tView=Rl(1,null,e.template,e.decls,e.vars,e.directiveDefs,e.pipeDefs,e.viewQuery,e.schemas,e.consts,e.id):t}function Vl(e,t,n,r,i,a,o,s,c,l,u){let d=t.blueprint.slice();return d[0]=i,d[2]=r|1228,(l!==null||e&&e[2]&2048)&&(d[2]|=2048),Ei(d),d[3]=d[14]=e,d[8]=n,d[10]=o||e&&e[10],d[11]=s||e&&e[11],d[9]=c||e&&e[9]||null,d[5]=a,d[19]=Ls(),d[6]=u,d[20]=l,d[15]=t.type==2?e[15]:d,d}function Hl(e,t,n){let r=bi(t,e),i=Bl(n),a=e[10].rendererFactory,o=Gl(e,Vl(e,i,null,Ul(n),r,t,null,a.createRenderer(r,n),null,null,null));return e[t.index]=o}function Ul(e){let t=16;return e.signals?t=4096:e.onPush&&(t=64),t}function Wl(e,t,n,r){if(n===0)return-1;let i=t.length;for(let i=0;i<n;i++)t.push(r),e.blueprint.push(r),e.data.push(null);return i}function Gl(e,t){return e[12]?e[13][4]=t:e[12]=t,e[13]=t,t}function j(e=1){Kl(T(),w(),ya()+e,!1)}function Kl(e,t,n,r){if(!r)if((t[2]&3)==3){let r=e.preOrderCheckHooks;r!==null&&Fo(t,r,n)}else{let r=e.preOrderHooks;r!==null&&Io(t,r,0,n)}ba(n)}var ql=function(e){return e[e.None=0]=`None`,e[e.SignalBased=1]=`SignalBased`,e[e.HasDecoratorInputTransform=2]=`HasDecoratorInputTransform`,e}(ql||{});function Jl(e,t,n,r){let i=d(null);try{let[i,a,o]=e.inputs[n],s=null;(a&ql.SignalBased)!==0&&(s=t[i][u]),s!==null&&s.transformFn!==void 0?r=s.transformFn(r):o!==null&&(r=o.call(t,r)),e.setInput===null?ko(t,s,i,r):e.setInput(t,s,r,n,i)}finally{d(i)}}function Yl(e,t,n,r,i){let a=ya(),o=r&2;try{ba(-1),o&&t.length>27&&Kl(e,t,27,!1),A(o?k.TemplateUpdateStart:k.TemplateCreateStart,i,n),n(r,i)}finally{ba(a),A(o?k.TemplateUpdateEnd:k.TemplateCreateEnd,i,n)}}function Xl(e,t,n){ru(e,t,n),(n.flags&64)==64&&iu(e,t,n)}function Zl(e,t,n=bi){let r=t.localNames;if(r!==null){let i=t.index+1;for(let a=0;a<r.length;a+=2){let o=r[a+1],s=o===-1?n(t,e):e[o];e[i++]=s}}}function Ql(e,t,n,r){let i=r.get(Ys,Js)||n===ic.ShadowDom||n===ic.ExperimentalIsolatedShadowDom;return e.selectRootElement(t,i)}function $l(e){return e===`class`?`className`:e===`for`?`htmlFor`:e===`formaction`?`formAction`:e===`innerHtml`?`innerHTML`:e===`readonly`?`readOnly`:e===`tabindex`?`tabIndex`:e}function eu(e,t,n,r,i,a){let o=t[1];if(pu(e,o,t,n,r)){fi(e)&&nu(t,e.index);return}e.type&3&&(n=$l(n)),tu(e,t,n,r,i,a)}function tu(e,t,n,r,i,a){if(e.type&3){let o=bi(e,t);r=a==null?r:a(r,e.value||``,n),i.setProperty(o,n,r)}else e.type&12}function nu(e,t){let n=Si(t,e);n[2]&16||(n[2]|=64)}function ru(e,t,n){let r=n.directiveStart,i=n.directiveEnd;fi(n)&&Hl(t,n,e.data[r+n.componentOffset]),e.firstCreatePass||ss(n,t);let a=n.initialInputs;for(let o=r;o<i;o++){let i=e.data[o],s=vs(t,e,o,n);if(Vs(s,t),a!==null&&lu(t,o-r,s,i,n,a),mi(i)){let r=Si(n.index,t);r[8]=vs(t,e,o,n)}}}function iu(e,t,n){let r=n.directiveStart,i=n.directiveEnd,a=n.index,o=aa();try{ba(a);for(let n=r;n<i;n++){let r=e.data[n],i=t[n];oa(n),(r.hostBindings!==null||r.hostVars!==0||r.hostAttrs!==null)&&au(r,i)}}finally{ba(-1),oa(o)}}function au(e,t){e.hostBindings!==null&&e.hostBindings(1,t)}function ou(e,t){let n=e.directiveRegistry,r=null;if(n)for(let e=0;e<n.length;e++){let i=n[e];Nc(t,i.selectors,!1)&&(r??=[],mi(i)?r.unshift(i):r.push(i))}return r}function su(e,t,n,r,i,a){let o=bi(e,t);cu(t[11],o,a,e.value,n,r,i)}function cu(e,t,n,r,i,a,o){if(a==null)o?.(a,r||``,i),e.removeAttribute(t,i,n);else{let s=o==null?Yn(a):o(a,r||``,i);e.setAttribute(t,i,s,n)}}function lu(e,t,n,r,i,a){let o=a[t];if(o!==null)for(let e=0;e<o.length;e+=2){let t=o[e],i=o[e+1];Jl(r,n,t,i)}}function uu(e,t,n,r,i){let a=27+n,o=t[1],s=i(o,t,e,r,n);t[a]=s,Yi(e,!0);let c=e.type===2;return c?(bc(t[11],s,e),(zi()===0||pi(e))&&Vs(s,t),Bi()):Vs(s,t),Da()&&(!c||!Qs(e))&&kl(o,t,s,e),e}function du(e){let t=e;return Xi()?Zi():(t=t.parent,Yi(t,!1)),t}function fu(e,t){let n=e[9];if(!n)return;let r;try{r=n.get(io,null)}catch{r=null}r?.(t)}function pu(e,t,n,r,i){let a=e.inputs?.[r],o=e.hostDirectiveInputs?.[r],s=!1;if(o)for(let e=0;e<o.length;e+=2){let r=o[e],a=o[e+1],c=t.data[r];Jl(c,n[r],a,i),s=!0}if(a)for(let e of a){let a=n[e],o=t.data[e];Jl(o,a,r,i),s=!0}return s}function mu(e,t){let n=Si(t,e),r=n[1];hu(r,n);let i=n[0];i!==null&&n[6]===null&&(n[6]=ec(i,n[9])),A(k.ComponentStart);try{gu(r,n,n[8])}finally{A(k.ComponentEnd,n[8])}}function hu(e,t){for(let n=t.length;n<e.blueprint.length;n++)t.push(e.blueprint[n])}function gu(e,t,n){fa(t);try{let r=e.viewQuery;r!==null&&nc(1,r,n);let i=e.template;i!==null&&Yl(e,t,i,1,n),e.firstCreatePass&&=!1,t[18]?.finishViewCreation(e),e.staticContentQueries&&tc(e,t),e.staticViewQueries&&nc(2,e.viewQuery,n);let a=e.components;a!==null&&_u(t,a)}catch(t){throw e.firstCreatePass&&=(e.incompleteFirstPass=!0,!1),t}finally{t[2]&=-5,_a()}}function _u(e,t){for(let n=0;n<t.length;n++)mu(e,t[n])}function vu(e,t,n,r){let i=d(null);try{let i=t.tView,a=Vl(e,i,n,e[2]&4096?4096:16,null,t,null,null,r?.injector??null,r?.embeddedViewInjector??null,r?.dehydratedView??null);a[16]=e[t.index];let o=e[18];return o!==null&&(a[18]=o.createEmbeddedView(i)),gu(i,a,n),a}finally{d(i)}}function yu(e,t){return!t||t.firstChild===null||Ns(e)}function bu(e,t,n,r,i=!1){for(;n!==null;){if(n.type===128){n=i?n.projectionNext:n.next;continue}let a=t[n.index];a!==null&&r.push(vi(a)),ui(a)&&xu(a,r);let o=n.type;if(o&8)bu(e,t,n.child,r);else if(o&32){let e=Uc(n,t),i;for(;i=e();)r.push(i)}else if(o&16){let e=jl(t,n);if(Array.isArray(e))r.push(...e);else{let n=Pi(t[15]);bu(n[1],n,e,r,!0)}}n=i?n.projectionNext:n.next}return r}function xu(e,t){for(let n=10;n<e.length;n++){let r=e[n],i=r[1].firstChild;i!==null&&bu(r[1],r,i,t)}e[7]!==e[0]&&t.push(e[7])}function Su(e){if(e[25]!==null){for(let t of e[25])t.impl.addSequence(t);e[25].length=0}}var Cu=[];function wu(e){return e[24]??Tu(e)}function Tu(e){let t=Cu.pop()??Object.create(Du);return t.lView=e,t}function Eu(e){e.lView[24]!==e&&(e.lView=null,Cu.push(e))}var Du={...p,consumerIsAlwaysLive:!0,kind:`template`,consumerMarkedDirty:e=>{ji(e.lView)},consumerOnSignalRead(){this.lView[24]=this}};function Ou(e){let t=e[24]??Object.create(ku);return t.lView=e,t}var ku={...p,consumerIsAlwaysLive:!0,kind:`template`,consumerMarkedDirty:e=>{let t=Pi(e.lView);for(;t&&!Au(t[1]);)t=Pi(t);t&&Di(t)},consumerOnSignalRead(){this.lView[24]=this}};function Au(e){return e.type!==2}function ju(e){if(e[23]===null)return;let t=!0;for(;t;){let n=!1;for(let t of e[23])t.dirty&&(n=!0,t.zone===null||Zone.current===t.zone?t.run():t.zone.run(()=>t.run()));t=n&&!!(e[2]&8192)}}var Mu=100;function Nu(e,t=0){let n=e[10].rendererFactory;n.begin?.();try{Pu(e,t)}finally{n.end?.()}}function Pu(e,t){let n=Qi();try{$i(!0),Bu(e,t);let n=0;for(;ki(e);){if(n===Mu)throw new _(103,!1);n++,Bu(e,1)}}finally{$i(n)}}function Fu(e,t,n,r){if(gi(t))return;let i=t[2];fa(t);let a=!0,o=null,s=null;Au(e)?(s=wu(t),o=oe(s)):f()===null?(a=!1,s=Ou(t),o=oe(s)):t[24]&&=(de(t[24]),null);try{Ei(t),ea(e.bindingStartIndex),n!==null&&Yl(e,t,n,2,r);let a=(i&3)==3;if(a){let n=e.preOrderCheckHooks;n!==null&&Fo(t,n,null)}else{let n=e.preOrderHooks;n!==null&&Io(t,n,0,null),Lo(t,0)}if(Lu(t),ju(t),Iu(t,0),e.contentQueries!==null&&tc(e,t),a){let n=e.contentCheckHooks;n!==null&&Fo(t,n)}else{let n=e.contentHooks;n!==null&&Io(t,n,1),Lo(t,1)}Hu(e,t);let o=e.components;o!==null&&Vu(t,o,0);let s=e.viewQuery;if(s!==null&&nc(2,s,r),a){let n=e.viewCheckHooks;n!==null&&Fo(t,n)}else{let n=e.viewHooks;n!==null&&Io(t,n,2),Lo(t,2)}if(e.firstUpdatePass===!0&&(e.firstUpdatePass=!1),t[22]){for(let e of t[22])e();t[22]=null}Su(t),t[2]&=-73}catch(e){throw ji(t),e}finally{s!==null&&(ce(s,o),a&&Eu(s)),_a()}}function Iu(e,t){for(let n=Hs(e);n!==null;n=Us(n))for(let e=10;e<n.length;e++){let r=n[e];zu(r,t)}}function Lu(e){for(let t=Hs(e);t!==null;t=Us(t)){if(!(t[2]&2))continue;let e=t[9];for(let t=0;t<e.length;t++){let n=e[t];Di(n)}}}function Ru(e,t,n){A(k.ComponentStart);let r=Si(t,e);try{zu(r,n)}finally{A(k.ComponentEnd,r[8])}}function zu(e,t){Ci(e)&&Bu(e,t)}function Bu(e,t){let n=e[1],r=e[2],i=e[24],a=!!(t===0&&r&16);if(a||=!!(r&64&&t===0),a||=!!(r&1024),a||=!!(i?.dirty&&ue(i)),a||=!1,i&&(i.dirty=!1),e[2]&=-9217,a)Fu(n,e,n.template,e[8]);else if(r&8192){let t=d(null);try{ju(e),Iu(e,1);let t=n.components;t!==null&&Vu(e,t,1),Su(e)}finally{d(t)}}}function Vu(e,t,n){for(let r=0;r<t.length;r++)Ru(e,t[r],n)}function Hu(e,t){let n=e.hostBindingOpCodes;if(n!==null)try{for(let e=0;e<n.length;e++){let r=n[e];if(r<0)ba(~r);else{let i=r,a=n[++e],o=n[++e];ia(a,i);let s=t[i];A(k.HostBindingsUpdateStart,s);try{o(2,s)}finally{A(k.HostBindingsUpdateEnd,s)}}}}finally{ba(-1)}}function Uu(e,t){let n=Qi()?64:1088;for(e[10].changeDetectionScheduler?.notify(t);e;){e[2]|=n;let t=Pi(e);if(hi(e)&&!t)return e;e=t}return null}function Wu(e,t,n,r){return[e,!0,0,t,null,r,null,n,null,null]}function Gu(e,t){let n=10+t;if(n<e.length)return e[n]}function Ku(e,t,n,r=!0){let i=t[1];if(Yu(i,t,e,n),r){let r=Ml(n,e),a=t[11],o=a.parentNode(e[7]);o!==null&&hl(i,e[5],a,t,o,r)}let a=t[6];a!==null&&a.firstChild!==null&&(a.firstChild=null)}function qu(e,t){let n=Ju(e,t);return n!==void 0&&yl(n[1],n),n}function Ju(e,t){if(e.length<=10)return;let n=10+t,r=e[n];if(r){let i=r[16];i!==null&&i!==e&&vl(i,r),t>0&&(e[n-1][4]=r[4]);let a=br(e,10+t);ml(r[1],r);let o=a[18];o!==null&&o.detachView(a[1]),r[3]=null,r[4]=null,r[2]&=-129}return r}function Yu(e,t,n,r){let i=10+r,a=n.length;r>0&&(n[i-1][4]=t),r<a-10?(t[4]=n[i],yr(n,10+r,t)):(n.push(t),t[4]=null),t[3]=n;let o=t[16];o!==null&&n!==o&&Xu(o,t);let s=t[18];s!==null&&s.insertView(e),Ai(t),t[2]|=128}function Xu(e,t){let n=e[9],r=t[3];if(li(r))e[2]|=2;else{let n=r[3][15];t[15]!==n&&(e[2]|=2)}n===null?e[9]=[t]:n.push(t)}var Zu=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let e=this._lView,t=e[1];return bu(t,e,t.firstChild,[])}constructor(e,t){this._lView=e,this._cdRefInjectingView=t}get context(){return this._lView[8]}set context(e){this._lView[8]=e}get destroyed(){return gi(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let e=this._lView[3];if(ui(e)){let t=e[8],n=t?t.indexOf(this):-1;n>-1&&(Ju(e,n),br(t,n))}this._attachedToViewContainer=!1}yl(this._lView[1],this._lView)}onDestroy(e){Mi(this._lView,e)}markForCheck(){Uu(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[2]&=-129}reattach(){Ai(this._lView),this._lView[2]|=128}detectChanges(){this._lView[2]|=1024,Nu(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new _(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let e=hi(this._lView),t=this._lView[16];t!==null&&!e&&vl(t,this._lView),gl(this._lView[1],this._lView)}attachToAppRef(e){if(this._attachedToViewContainer)throw new _(902,!1);this._appRef=e;let t=hi(this._lView),n=this._lView[16];n!==null&&!t&&Xu(n,this._lView),Ai(this._lView)}},Qu=(()=>{class e{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=$u;constructor(e,t,n){this._declarationLView=e,this._declarationTContainer=t,this.elementRef=n}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(e,t){return this.createEmbeddedViewImpl(e,t)}createEmbeddedViewImpl(e,t,n){return new Zu(vu(this._declarationLView,this._declarationTContainer,e,{embeddedViewInjector:t,dehydratedView:n}))}}return e})();function $u(){return ed(Ki(),w())}function ed(e,t){return e.type&4?new Qu(t,e,Os(e,t)):null}function td(e,t,n,r,i){let a=e.data[t];if(a===null)a=nd(e,t,n,r,i),ra()&&(a.flags|=32);else if(a.type&64){a.type=n,a.value=r,a.attrs=i;let e=Ji();a.injectorIndex=e===null?-1:e.injectorIndex}return Yi(a,!0),a}function nd(e,t,n,r,i){let a=qi(),o=Xi(),s=o?a:a&&a.parent,c=e.data[t]=id(e,s,n,t,r,i);return rd(e,c,a,o),c}function rd(e,t,n,r){e.firstChild===null&&(e.firstChild=t),n!==null&&(r?n.child==null&&t.parent!==null&&(n.child=t):n.next===null&&(n.next=t,t.prev=n))}function id(e,t,n,r,i,a){let o=t?t.injectorIndex:-1,s=0;return Ui()&&(s|=128),{type:n,index:r,insertBeforeIndex:null,injectorIndex:o,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:s,providerIndexes:0,value:i,namespace:Ta(),attrs:a,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:t,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function ad(e){let t=e[6]??[],n=e[3][11],r=[];for(let e of t)e.data.di===void 0?od(e,n):r.push(e);e[6]=r}function od(e,t){let n=0,r=e.firstChild;if(r){let i=e.data.r;for(;n<i;){let e=r.nextSibling;_c(t,r,!1),r=e,n++}}}var sd=()=>null,cd=()=>null;function ld(e,t){return sd(e,t)}function ud(e,t,n){return cd(e,t,n)}var dd=class{},fd=class{},pd=(()=>{class e{static ɵprov=y({token:e,providedIn:`root`,factory:()=>null})}return e})();function md(e){return e.debugInfo?.className||e.type.name||null}var hd={},gd=class{injector;parentInjector;constructor(e,t){this.injector=e,this.parentInjector=t}get(e,t,n){let r=this.injector.get(e,hd,n);return r!==hd||t===hd?r:this.parentInjector.get(e,t,n)}};function _d(e,t,n){if(n===Bc)return!1;let r=e[t];return Object.is(r,n)?!1:(e[t]=n,!0)}function vd(e,t,n){return function r(i){let a=r.__ngNativeEl__;a!==void 0&&Zs(i,a),Uu(fi(e)?Si(e.index,t):t,5);let o=t[8],s=yd(t,o,n,i),c=r.__ngNextListenerFn__;for(;c;)s=yd(t,o,c,i)&&s,c=c.__ngNextListenerFn__;return s}}function yd(e,t,n,r){let i=d(null);try{return A(k.OutputStart,t,n),n(r)!==!1}catch(t){return fu(e,t),!1}finally{A(k.OutputEnd,t,n),d(i)}}function bd(e,t,n,r,i,a,o,s){let c=pi(e),l=!1,u=null;if(!r&&c&&(u=Sd(t,n,a,e.index)),u!==null){let e=u.__ngLastListenerFn__||u;e.__ngNextListenerFn__=o,u.__ngLastListenerFn__=o,l=!0}else{let o=bi(e,n),c=r?r(o):o;r||(s.__ngNativeEl__=o);let l=i.listen(c,a,s);xd(a)||Cd(r?t=>r(vi(t[e.index])):e.index,t,n,a,s,l,!1)}return l}function xd(e){return e.startsWith(`animation`)||e.startsWith(`transition`)}function Sd(e,t,n,r){let i=e.cleanup;if(i!=null)for(let e=0;e<i.length-1;e+=2){let a=i[e];if(a===n&&i[e+1]===r){let n=t[7],r=i[e+2];return n&&n.length>r?n[r]:null}typeof a==`string`&&(e+=2)}return null}function Cd(e,t,n,r,i,a,o){let s=t.firstCreatePass?Ii(t):null,c=Fi(n),l=c.length;c.push(i,a),s&&s.push(r,e,l,(l+1)*(o?-1:1))}function wd(e,t,n,r,i,a){let o=t[n],s=t[1],c=o[s.data[n].outputs[r]].subscribe(a);Cd(e.index,s,t,i,a,c,!0)}var Td=Symbol(`BINDING`),Ed=new b(``);function Dd(e,t,n){let r=n?e.styles:null,i=n?e.classes:null,a=0;if(t!==null)for(let e=0;e<t.length;e++){let n=t[e];if(typeof n==`number`)a=n;else if(a==1)i=Dn(i,n);else if(a==2){let i=n,a=t[++e];r=Dn(r,i+`: `+a+`;`)}}n?e.styles=r:e.stylesWithoutHost=r,n?e.classes=i:e.classesWithoutHost=i}function Od(e,t=0){let n=w();return n===null?x(e,t):ms(Ki(),n,An(e),t)}function kd(e,t,n,r,i){let a=r===null?null:{"":-1},o=i(e,n);if(o!==null){let r=o,i=null,s=null;for(let e of o)if(e.resolveHostDirectives!==null){[r,i,s]=e.resolveHostDirectives(o);break}Md(e,t,n,r,a,i,s)}a!==null&&r!==null&&Ad(n,r,a)}function Ad(e,t,n){let r=e.localNames=[];for(let e=0;e<t.length;e+=2){let i=n[t[e+1]];if(i==null)throw new _(-301,!1);r.push(t[e],i)}}function jd(e,t,n){t.componentOffset=n,(e.components??=[]).push(t.index)}function Md(e,t,n,r,i,a,o){let s=r.length,c=null;for(let i=0;i<s;i++){let a=r[i];c===null&&mi(a)&&(c=a,jd(e,n,i)),ds(ss(n,t),e,a.type)}Hd(n,e.data.length,s),c?.viewProvidersResolver&&c.viewProvidersResolver(c);for(let e=0;e<s;e++){let t=r[e];t.providersResolver&&t.providersResolver(t)}let l=!1,u=!1,d=Wl(e,t,s,null);s>0&&(n.directiveToIndex=new Map);for(let c=0;c<s;c++){let s=r[c];if(n.mergedAttrs=Jo(n.mergedAttrs,s.hostAttrs),Rd(e,n,t,d,s),Vd(d,s,i),o!==null&&o.has(s)){let[e,t]=o.get(s);n.directiveToIndex.set(s.type,[d,e+n.directiveStart,t+n.directiveStart])}else(a===null||!a.has(s))&&n.directiveToIndex.set(s.type,d);s.contentQueries!==null&&(n.flags|=4),(s.hostBindings!==null||s.hostAttrs!==null||s.hostVars!==0)&&(n.flags|=64);let f=s.type.prototype;!l&&(f.ngOnChanges||f.ngOnInit||f.ngDoCheck)&&((e.preOrderHooks??=[]).push(n.index),l=!0),!u&&(f.ngOnChanges||f.ngDoCheck)&&((e.preOrderCheckHooks??=[]).push(n.index),u=!0),d++}Nd(e,n,a)}function Nd(e,t,n){for(let r=t.directiveStart;r<t.directiveEnd;r++){let i=e.data[r];if(n===null||!n.has(i))Pd(0,t,i,r),Pd(1,t,i,r),Ld(t,r,!1);else{let e=n.get(i);Fd(0,t,e,r),Fd(1,t,e,r),Ld(t,r,!0)}}}function Pd(e,t,n,r){let i=e===0?n.inputs:n.outputs;for(let n in i)if(i.hasOwnProperty(n)){let i;i=e===0?t.inputs??={}:t.outputs??={},i[n]??=[],i[n].push(r),Id(t,n)}}function Fd(e,t,n,r){let i=e===0?n.inputs:n.outputs;for(let n in i)if(i.hasOwnProperty(n)){let a=i[n],o;o=e===0?t.hostDirectiveInputs??={}:t.hostDirectiveOutputs??={},o[a]??=[],o[a].push(r,n),Id(t,a)}}function Id(e,t){t===`class`?e.flags|=8:t===`style`&&(e.flags|=16)}function Ld(e,t,n){let{attrs:r,inputs:i,hostDirectiveInputs:a}=e;if(r===null||!n&&i===null||n&&a===null||Oc(e)){e.initialInputs??=[],e.initialInputs.push(null);return}let o=null,s=0;for(;s<r.length;){let e=r[s];if(e===0){s+=4;continue}else if(e===5){s+=2;continue}else if(typeof e==`number`)break;if(!n&&i.hasOwnProperty(e)){let n=i[e];for(let i of n)if(i===t){o??=[],o.push(e,r[s+1]);break}}else if(n&&a.hasOwnProperty(e)){let n=a[e];for(let e=0;e<n.length;e+=2)if(n[e]===t){o??=[],o.push(n[e+1],r[s+1]);break}}s+=2}e.initialInputs??=[],e.initialInputs.push(o)}function Rd(e,t,n,r,i){e.data[r]=i;let a=new Ho(i.factory||=hr(i.type,!0),mi(i),Od,null);e.blueprint[r]=a,n[r]=a,zd(e,t,r,Wl(e,n,i.hostVars,Bc),i)}function zd(e,t,n,r,i){let a=i.hostBindings;if(a){let i=e.hostBindingOpCodes;i===null&&(i=e.hostBindingOpCodes=[]);let o=~t.index;Bd(i)!=o&&i.push(o),i.push(n,r,a)}}function Bd(e){let t=e.length;for(;t>0;){let n=e[--t];if(typeof n==`number`&&n<0)return n}return 0}function Vd(e,t,n){if(n){if(t.exportAs)for(let r=0;r<t.exportAs.length;r++)n[t.exportAs[r]]=e;mi(t)&&(n[``]=e)}}function Hd(e,t,n){e.flags|=1,e.directiveStart=t,e.directiveEnd=t+n,e.providerIndexes=t}function Ud(e,t,n,r,i,a,o,s){let c=t[1],l=c.consts,u=td(c,e,n,r,Ti(l,o));return a&&kd(c,t,u,Ti(l,s),i),u.mergedAttrs=Jo(u.mergedAttrs,u.attrs),u.attrs!==null&&Dd(u,u.attrs,!1),u.mergedAttrs!==null&&Dd(u,u.mergedAttrs,!0),c.queries!==null&&c.queries.elementStart(c,u),u}function Wd(e,t){Po(e,t),di(t)&&e.queries.elementEnd(t)}function Gd(e,t,n,r,i,a){let o=t.consts,s=td(t,e,n,r,Ti(o,i));if(s.mergedAttrs=Jo(s.mergedAttrs,s.attrs),a!=null){let e=Ti(o,a);s.localNames=[];for(let t=0;t<e.length;t+=2)s.localNames.push(e[t],-1)}return s.attrs!==null&&Dd(s,s.attrs,!1),s.mergedAttrs!==null&&Dd(s,s.mergedAttrs,!0),t.queries!==null&&t.queries.elementStart(t,s),s}var Kd=typeof ShadowRoot<`u`,qd=typeof Document<`u`;function Jd(e){return Object.keys(e).map(t=>{let[n,r,i]=e[t],a={propName:n,templateName:t,isSignal:(r&ql.SignalBased)!==0};return i&&(a.transform=i),a})}function Yd(e){return Object.keys(e).map(t=>({propName:e[t],templateName:t}))}function Xd(e,t,n){let r=t instanceof Jr?t:t?.injector;return r&&e.getStandaloneInjector!==null&&(r=e.getStandaloneInjector(r)||r),r?new gd(n,r):n}function Zd(e){let t=e.get(fd,null);if(t===null)throw new _(407,!1);return{rendererFactory:t,sanitizer:e.get(pd,null),changeDetectionScheduler:e.get(ho,null),ngReflect:!1,tracingService:e.get(Zc,null,{optional:!0})}}function Qd(e,t){let n=ef(e);return pc(t,n,n===`svg`?`svg`:n===`math`?_i:null)}function $d(e){if(e?.toLowerCase()===`script`)throw new _(905,!1)}function ef(e){return(e.selectors[0][0]||`div`).toLowerCase()}var tf=class{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=Jd(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=Yd(this.componentDef.outputs),this.cachedOutputs}constructor(e,t){this.componentDef=e,this.ngModule=t,this.componentType=e.type,this.selector=Rc(e.selectors),this.ngContentSelectors=e.ngContentSelectors??[],this.isBoundToModule=!!t}create(e,t,n,r,i,a){A(k.DynamicComponentStart);let o=d(null);try{let o=this.componentDef,s=Xd(o,r||this.ngModule,e),c=Zd(s),l=c.tracingService;return l&&l.componentCreate?l.componentCreate(md(o),()=>this.createComponentRef(c,s,t,n,i,a)):this.createComponentRef(c,s,t,n,i,a)}finally{d(o)}}createComponentRef(e,t,n,r,i,a){let o=this.componentDef,s=nf(r,o,a,i),c=e.rendererFactory.createRenderer(null,o),l=r?Ql(c,r,o.encapsulation,t):Qd(o,c);$d(l?.tagName);let u=t.get(Ed,null),d=rf(l,()=>t.get(Ma,null)??qs());u&&u.addHost(d);let f=a?.some(of)||i?.some(e=>typeof e!=`function`&&e.bindings.some(of)),p=Vl(null,s,null,512|Ul(o),null,null,e,c,t,null,ec(l,t,!0));u&&Kd&&d instanceof ShadowRoot&&Mi(p,()=>{u.removeHost(d)}),p[27]=l,fa(p);let m=null;try{let e=Ud(27,p,2,`#host`,()=>s.directiveRegistry,!0,0);bc(c,l,e),Vs(l,p),Xl(s,p,e),rc(s,e,p),Wd(s,e),n!==void 0&&cf(e,this.ngContentSelectors,n),m=Si(e.index,p),p[8]=m[8],gu(s,p,null)}catch(e){throw m!==null&&zs(m),zs(p),e}finally{A(k.DynamicComponentEnd),_a()}return new sf(this.componentType,p,!!f)}};function nf(e,t,n,r){let i=e?[`ng-version`,`22.0.8`]:zc(t.selectors[0]),a=null,o=null,s=0;if(n)for(let e of n)s+=e[Td].requiredVars,e.create&&(e.targetIdx=0,(a??=[]).push(e)),e.update&&(e.targetIdx=0,(o??=[]).push(e));if(r)for(let e=0;e<r.length;e++){let t=r[e];if(typeof t!=`function`)for(let n of t.bindings){s+=n[Td].requiredVars;let t=e+1;n.create&&(n.targetIdx=t,(a??=[]).push(n)),n.update&&(n.targetIdx=t,(o??=[]).push(n))}}let c=[t];if(r)for(let e of r){let t=Kn(typeof e==`function`?e:e.type);c.push(t)}return Rl(0,null,af(a,o),1,s,c,null,null,null,[i],null)}function rf(e,t){let n=e.getRootNode?.();return qd&&n instanceof Document?n.head:n&&Kd&&n instanceof ShadowRoot?n:t().head}function af(e,t){return!e&&!t?null:n=>{if(n&1&&e)for(let t of e)t.create();if(n&2&&t)for(let e of t)e.update()}}function of(e){let t=e[Td].kind;return t===`input`||t===`twoWay`}var sf=class extends dd{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(e,t,n){super(),this._rootLView=t,this._hasInputBindings=n,this._tNode=xi(t[1],27),this.location=Os(this._tNode,t),this.instance=Si(this._tNode.index,t)[8],this.hostView=this.changeDetectorRef=new Zu(t,void 0),this.componentType=e}setInput(e,t){this._hasInputBindings;let n=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(e)&&Object.is(this.previousInputValues.get(e),t))return;let r=this._rootLView;pu(n,r[1],r,e,t),this.previousInputValues.set(e,t),Uu(Si(n.index,r),1)}get injector(){return new Ss(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(e){this.hostView.onDestroy(e)}};function cf(e,t,n){let r=e.projection=[];for(let e=0;e<t.length;e++){let t=n[e];r.push(t!=null&&t.length?Array.from(t):null)}}var lf=(()=>{class e{static __NG_ELEMENT_ID__=uf}return e})();function uf(){return mf(Ki(),w())}var df=class e extends lf{_lContainer;_hostTNode;_hostLView;constructor(e,t,n){super(),this._lContainer=e,this._hostTNode=t,this._hostLView=n}get element(){return Os(this._hostTNode,this._hostLView)}get injector(){return new Ss(this._hostTNode,this._hostLView)}get parentInjector(){let e=us(this._hostTNode,this._hostLView);if(Xo(e)){let t=$o(e,this._hostLView),n=Zo(e),r=t[1].data[n+8];return new Ss(r,t)}else return new Ss(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(e){let t=ff(this._lContainer);return t!==null&&t[e]||null}get length(){return this._lContainer.length-10}createEmbeddedView(e,t,n){let r,i;typeof n==`number`?r=n:n!=null&&(r=n.index,i=n.injector);let a=ld(this._lContainer,e.ssrId),o=e.createEmbeddedViewImpl(t||{},i,a);return this.insertImpl(o,r,yu(this._hostTNode,a)),o}createComponent(e,t,n,r,i,a,o){let s,c=t||{};s=c.index,n=c.injector,r=c.projectableNodes,i=c.environmentInjector||c.ngModuleRef,a=c.directives,o=c.bindings;let l=new tf(Gn(e)),u=n||this.parentInjector;if(!i&&l.ngModule==null){let e=this.parentInjector.get(Jr,null);e&&(i=e)}let d=Gn(l.componentType??{}),f=ld(this._lContainer,d?.id??null),p=f?.firstChild??null,m=l.create(u,r,p,i,a,o);return this.insertImpl(m.hostView,s,yu(this._hostTNode,f)),m}insert(e,t){return this.insertImpl(e,t,!0)}insertImpl(t,n,r){let i=t._lView;if(wi(i)){let n=this.indexOf(t);if(n!==-1)this.detach(n);else{let n=i[3],r=new e(n,n[5],n[3]);r.detach(r.indexOf(t))}}let a=this._adjustIndex(n),o=this._lContainer;return Ku(o,i,a,r),t.attachToViewContainerRef(),yr(pf(o),a,t),t}move(e,t){return this.insert(e,t)}indexOf(e){let t=ff(this._lContainer);return t===null?-1:t.indexOf(e)}remove(e){let t=this._adjustIndex(e,-1),n=Ju(this._lContainer,t);n&&(br(pf(this._lContainer),t),yl(n[1],n))}detach(e){let t=this._adjustIndex(e,-1),n=Ju(this._lContainer,t);return n&&br(pf(this._lContainer),t)!=null?new Zu(n):null}_adjustIndex(e,t=0){return e??this.length+t}};function ff(e){return e[8]}function pf(e){return e[8]||=[]}function mf(e,t){let n,r=t[e.index];return ui(r)?n=r:(n=Wu(r,t,null,e),t[e.index]=n,Gl(t,n)),gf(n,t,e,r),new df(n,e,t)}function hf(e,t){let n=e[11],r=n.createComment(``),i=bi(t,e);return mc(n,n.parentNode(i),r,n.nextSibling(i),!1),r}var gf=yf,_f=()=>!1;function vf(e,t,n){return _f(e,t,n)}function yf(e,t,n,r){if(e[7])return;let i;i=n.type&8?vi(r):hf(t,n),e[7]=i}var bf=class e{queryList;matches=null;constructor(e){this.queryList=e}clone(){return new e(this.queryList)}setDirty(){this.queryList.setDirty()}},xf=class e{queries;constructor(e=[]){this.queries=e}createEmbeddedView(t){let n=t.queries;if(n!==null){let r=t.contentQueries===null?n.length:t.contentQueries[0],i=[];for(let e=0;e<r;e++){let t=n.getByIndex(e),r=this.queries[t.indexInDeclarationView];i.push(r.clone())}return new e(i)}return null}insertView(e){this.dirtyQueriesWithMatches(e)}detachView(e){this.dirtyQueriesWithMatches(e)}finishViewCreation(e){this.dirtyQueriesWithMatches(e)}dirtyQueriesWithMatches(e){for(let t=0;t<this.queries.length;t++)If(e,t).matches!==null&&this.queries[t].setDirty()}},Sf=class{flags;read;predicate;constructor(e,t,n=null){this.flags=t,this.read=n,typeof e==`string`?this.predicate=Pf(e):this.predicate=e}},Cf=class e{queries;constructor(e=[]){this.queries=e}elementStart(e,t){for(let n=0;n<this.queries.length;n++)this.queries[n].elementStart(e,t)}elementEnd(e){for(let t=0;t<this.queries.length;t++)this.queries[t].elementEnd(e)}embeddedTView(t){let n=null;for(let e=0;e<this.length;e++){let r=n===null?0:n.length,i=this.getByIndex(e).embeddedTView(t,r);i&&(i.indexInDeclarationView=e,n===null?n=[i]:n.push(i))}return n===null?null:new e(n)}template(e,t){for(let n=0;n<this.queries.length;n++)this.queries[n].template(e,t)}getByIndex(e){return this.queries[e]}get length(){return this.queries.length}track(e){this.queries.push(e)}},wf=class e{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(e,t=-1){this.metadata=e,this._declarationNodeIndex=t}elementStart(e,t){this.isApplyingToNode(t)&&this.matchTNode(e,t)}elementEnd(e){this._declarationNodeIndex===e.index&&(this._appliesToNextNode=!1)}template(e,t){this.elementStart(e,t)}embeddedTView(t,n){return this.isApplyingToNode(t)?(this.crossesNgTemplate=!0,this.addMatch(-t.index,n),new e(this.metadata)):null}isApplyingToNode(e){if(this._appliesToNextNode&&(this.metadata.flags&1)!=1){let t=this._declarationNodeIndex,n=e.parent;for(;n!==null&&n.type&8&&n.index!==t;)n=n.parent;return t===(n===null?-1:n.index)}return this._appliesToNextNode}matchTNode(e,t){let n=this.metadata.predicate;if(Array.isArray(n))for(let r=0;r<n.length;r++){let i=n[r];this.matchTNodeWithReadOption(e,t,Tf(t,i)),this.matchTNodeWithReadOption(e,t,_s(t,e,i,!1,!1))}else n===Qu?t.type&4&&this.matchTNodeWithReadOption(e,t,-1):this.matchTNodeWithReadOption(e,t,_s(t,e,n,!1,!1))}matchTNodeWithReadOption(e,t,n){if(n!==null){let r=this.metadata.read;if(r!==null)if(r===ks||r===lf||r===Qu&&t.type&4)this.addMatch(t.index,-2);else{let n=_s(t,e,r,!1,!1);n!==null&&this.addMatch(t.index,n)}else this.addMatch(t.index,n)}}addMatch(e,t){this.matches===null?this.matches=[e,t]:this.matches.push(e,t)}};function Tf(e,t){let n=e.localNames;if(n!==null){for(let e=0;e<n.length;e+=2)if(n[e]===t)return n[e+1]}return null}function Ef(e,t){return e.type&11?Os(e,t):e.type&4?ed(e,t):null}function Df(e,t,n,r){return n===-1?Ef(t,e):n===-2?Of(e,t,r):vs(e,e[1],n,t)}function Of(e,t,n){if(n===ks)return Os(t,e);if(n===Qu)return ed(t,e);if(n===lf)return mf(t,e)}function kf(e,t,n,r){let i=t[18].queries[r];if(i.matches===null){let r=e.data,a=n.matches,o=[];for(let e=0;a!==null&&e<a.length;e+=2){let i=a[e];if(i<0)o.push(null);else{let s=r[i];o.push(Df(t,s,a[e+1],n.metadata.read))}}i.matches=o}return i.matches}function Af(e,t,n,r){let i=e.queries.getByIndex(n),a=i.matches;if(a!==null){let o=kf(e,t,i,n);for(let e=0;e<a.length;e+=2){let n=a[e];if(n>0)r.push(o[e/2]);else{let i=a[e+1],o=t[-n];for(let e=10;e<o.length;e++){let t=o[e];t[16]===t[3]&&Af(t[1],t,i,r)}if(o[9]!==null){let e=o[9];for(let t=0;t<e.length;t++){let n=e[t];Af(n[1],n,i,r)}}}}}return r}function jf(e,t){return e[18].queries[t].queryList}function Mf(e,t,n){let r=new Ms((n&4)==4);return Li(e,t,r,r.destroy),(t[18]??=new xf).queries.push(new bf(r))-1}function Nf(e,t,n){let r=T();return r.firstCreatePass&&(Ff(r,new Sf(e,t,n),-1),(t&2)==2&&(r.staticViewQueries=!0)),Mf(r,w(),t)}function Pf(e){return e.split(`,`).map(e=>e.trim())}function Ff(e,t,n){e.queries===null&&(e.queries=new Cf),e.queries.track(new wf(t,n))}function If(e,t){return e.queries.getByIndex(t)}function Lf(e,t){let n=e[1],r=If(n,t);return r.crossesNgTemplate?Af(n,e,t,[]):kf(n,e,r,t)}function Rf(e,t,n){let r,i=_e(()=>{r._dirtyCounter();let n=Hf(r,e);if(t&&n===void 0)throw new _(-951,!1);return n});return r=i[u],r._dirtyCounter=O(0),r._flatValue=void 0,i}function zf(e){return Rf(!0,!1,e)}function Bf(e){return Rf(!0,!0,e)}function Vf(e,t){let n=e[u];n._lView=w(),n._queryIndex=t,n._queryList=jf(n._lView,t),n._queryList.onDirty(()=>n._dirtyCounter.update(e=>e+1))}function Hf(e,t){let n=e._lView,r=e._queryIndex;if(n===void 0||r===void 0||n[2]&4)return t?void 0:Dr;let i=jf(n,r),a=Lf(n,r);return i.reset(a,As),t?i.first:i._changesDetected||e._flatValue===void 0?e._flatValue=i.toArray():e._flatValue}function Uf(e){return!!e&&typeof e.then==`function`}function Wf(e){return!!e&&typeof e.subscribe==`function`}var Gf=class{},Kf=class extends Gf{injector;instance=null;constructor(e){super();let t=new Yr([...e.providers,{provide:Gf,useValue:this}],e.parent||qr(),e.debugName,new Set([`environment`]));this.injector=t,e.runEnvironmentInitializers&&t.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(e){this.injector.onDestroy(e)}};function qf(e,t,n=null){return new Kf({providers:e,parent:t,debugName:n,runEnvironmentInitializers:!0}).injector}var Jf=(()=>{class e{_injector;cachedInjectors=new Map;constructor(e){this._injector=e}getOrCreateStandaloneInjector(e){if(!e.standalone)return null;if(!this.cachedInjectors.has(e)){let t=Pr(!1,e.type),n=t.length>0?qf([t],this._injector,``):null;this.cachedInjectors.set(e,n)}return this.cachedInjectors.get(e)}ngOnDestroy(){try{for(let e of this.cachedInjectors.values())e!==null&&e.destroy()}finally{this.cachedInjectors.clear()}}static ɵprov=y({token:e,providedIn:`environment`,factory:()=>new e(x(Jr))})}return e})();function Yf(e){return Oo(()=>{let t=$f(e),n={...t,decls:e.decls,vars:e.vars,template:e.template,consts:e.consts||null,ngContentSelectors:e.ngContentSelectors,onPush:e.changeDetection!==Ps.Eager,directiveDefs:null,pipeDefs:null,dependencies:t.standalone&&e.dependencies||null,getStandaloneInjector:t.standalone?e=>e.get(Jf).getOrCreateStandaloneInjector(n):null,getExternalStyles:null,signals:e.signals??!1,data:e.data||{},encapsulation:e.encapsulation||ic.Emulated,styles:e.styles||Dr,_:null,schemas:e.schemas||null,tView:null,id:``};t.standalone&&$c(`NgStandalone`),ep(n);let r=e.dependencies;return n.directiveDefs=tp(r,Xf),n.pipeDefs=tp(r,qn),n.id=np(n),n})}function Xf(e){return Gn(e)||Kn(e)}function Zf(e,t){if(e==null)return Er;let n={};for(let r in e)if(e.hasOwnProperty(r)){let i=e[r],a,o,s,c;Array.isArray(i)?(s=i[0],a=i[1],o=i[2]??a,c=i[3]||null):(a=i,o=i,s=ql.None,c=null),n[a]=[r,s,c],t[a]=o}return n}function Qf(e){if(e==null)return Er;let t={};for(let n in e)e.hasOwnProperty(n)&&(t[e[n]]=n);return t}function $f(e){let t={};return{type:e.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:e.hostBindings||null,hostVars:e.hostVars||0,hostAttrs:e.hostAttrs||null,contentQueries:e.contentQueries||null,declaredInputs:t,inputConfig:e.inputs||Er,exportAs:e.exportAs||null,standalone:e.standalone??!0,signals:e.signals===!0,selectors:e.selectors||Dr,viewQuery:e.viewQuery||null,features:e.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,signalFormsInputPresence:null,inputs:Zf(e.inputs,t),outputs:Qf(e.outputs),debugInfo:null}}function ep(e){e.features?.forEach(t=>t(e))}function tp(e,t){return e?()=>{let n=typeof e==`function`?e():e,r=[];for(let e of n){let n=t(e);n!==null&&r.push(n)}return r}:null}function np(e){let t=0,n=typeof e.consts==`function`?``:e.consts,r=[e.selectors,e.ngContentSelectors,e.hostVars,e.hostAttrs,n,e.vars,e.decls,e.encapsulation,e.standalone,e.signals,e.exportAs,JSON.stringify(e.inputs),JSON.stringify(e.outputs),Object.getOwnPropertyNames(e.type.prototype),!!e.contentQueries,!!e.viewQuery];for(let e of r.join(`|`))t=Math.imul(31,t)+e.charCodeAt(0)<<0;return t+=2147483648,`c`+t}var rp=new b(``),ip=(()=>{class e{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((e,t)=>{this.resolve=e,this.reject=t});appInits=S(rp,{optional:!0})??[];injector=S(ja);constructor(){}runInitializers(){if(this.initialized)return;let e=[];for(let t of this.appInits){let n=oi(this.injector,t);if(Uf(n))e.push(n);else if(Wf(n)){let t=new Promise((e,t)=>{n.subscribe({complete:e,error:t})});e.push(t)}}let t=()=>{this.done=!0,this.resolve()};Promise.all(e).then(()=>{t()}).catch(e=>{this.reject(e)}),e.length===0&&t(),this.initialized=!0}static ɵfac=function(t){return new(t||e)};static ɵprov=Es({token:e,factory:e.ɵfac})}return e})();function ap(e,t,n,r,i,a,o,s){if(n.firstCreatePass){e.mergedAttrs=Jo(e.mergedAttrs,e.attrs);let t=e.tView=Rl(2,e,i,a,o,n.directiveRegistry,n.pipeRegistry,null,n.schemas,n.consts,null);n.queries!==null&&(n.queries.template(n,e),t.queries=n.queries.embeddedTView(e))}s&&(e.flags|=s),Yi(e,!1);let c=sp(n,t,e,r);Da()&&kl(n,t,c,e),Vs(c,t);let l=Wu(c,t,c,e);t[r+27]=l,Gl(t,l),vf(l,e,t)}function op(e,t,n,r,i,a,o,s,c,l,u){let d=n+27,f;if(t.firstCreatePass){if(f=td(t,d,4,o||null,s||null),l!=null){let e=Ti(t.consts,l);f.localNames=[];for(let t=0;t<e.length;t+=2)f.localNames.push(e[t],-1)}}else f=t.data[d];return ap(f,e,t,n,r,i,a,c),l!=null&&Zl(e,f,u),f}var sp=cp;function cp(e,t,n,r){return Oa(!0),t[11].createComment(``)}var lp=new b(``),up=new b(``);function dp(){Te(()=>{throw new _(600,``)})}var fp=10,pp=(()=>{class e{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=S(io);afterRenderManager=S(el);zonelessEnabled=S(go);rootEffectScheduler=S(vo);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new Pt;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=S(La);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(vn(e=>!e))}constructor(){S(Zc,{optional:!0})}whenStable(){let e;return new Promise(t=>{e=this.isStable.subscribe({next:e=>{e&&t()}})}).finally(()=>{e.unsubscribe()})}_injector=S(Jr);_rendererFactory=null;get injector(){return this._injector}bootstrap(e,t){return this.bootstrapImpl(e,t)}bootstrapImpl(e,t,n=ja.NULL){return this._injector.get(Ga).run(()=>{if(A(k.BootstrapComponentStart),!this._injector.get(ip).done)throw new _(405,``);let r=Gn(e),i=this._injector.get(Gf),a=new tf(r,i);this.componentTypes.push(e);let{hostElement:o,directives:s,bindings:c}=mp(t),l=o||a.selector,u=a.create(n,[],l,i.injector,s,c),d=u.location.nativeElement,f=u.injector.get(lp,null);return f?.registerApplication(d),u.onDestroy(()=>{this.detachView(u.hostView),hp(this.components,u),f?.unregisterApplication(d)}),this._loadComponent(u),A(k.BootstrapComponentEnd,u),u})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){A(k.ChangeDetectionStart),this.tracingSnapshot===null?this.tickImpl():this.tracingSnapshot.run(Xc.CHANGE_DETECTION,this.tickImpl)}tickImpl=()=>{if(this._runningTick)throw A(k.ChangeDetectionEnd),new _(101,!1);let e=d(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,d(e),this.afterTick.next(),A(k.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(fd,null,{optional:!0}));let e=0;for(;this.dirtyFlags!==0&&e++<fp;){A(k.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{A(k.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let e=!1;if(this.dirtyFlags&7){let t=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:n}of this.allViews)!t&&!ki(n)||(Nu(n,t&&!this.zonelessEnabled?0:1),e=!0);if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}e||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:e})=>ki(e))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(e){let t=e;this._views.push(t),t.attachToAppRef(this)}detachView(e){let t=e;hp(this._views,t),t.detachFromAppRef()}_loadComponent(e){this.attachView(e.hostView);try{this.tick()}catch(e){this.internalErrorHandler(e)}this.components.push(e),this._injector.get(up,[]).forEach(t=>t(e))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(e=>e()),this._views.slice().forEach(e=>e.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(e){return this._destroyListeners.push(e),()=>hp(this._destroyListeners,e)}destroy(){if(this._destroyed)throw new _(406,!1);let e=this._injector;e.destroy&&!e.destroyed&&e.destroy()}get viewCount(){return this._views.length}static ɵfac=function(t){return new(t||e)};static ɵprov=Es({token:e,factory:e.ɵfac})}return e})();function mp(e){return e===void 0||typeof e==`string`||e instanceof Element?{hostElement:e}:e}function hp(e,t){let n=e.indexOf(t);n>-1&&e.splice(n,1)}function gp(e,t,n,r){let i=w();return _d(i,ta(),t)&&(T(),su(xa(),i,e,t,n,r)),gp}var _p=class{destroy(e){}updateValue(e,t){}swap(e,t){let n=Math.min(e,t),r=Math.max(e,t),i=this.detach(r);if(r-n>1){let e=this.detach(n);this.attach(n,i),this.attach(r,e)}else this.attach(n,i)}move(e,t){this.attach(t,this.detach(e))}};function vp(e,t,n,r,i){return e===n&&Object.is(t,r)?1:Object.is(i(e,t),i(n,r))?-1:0}function yp(e,t,n,r){let i,a,o=0,s=e.length-1;if(Array.isArray(t)){d(r);let c=t.length-1;for(d(null);o<=s&&o<=c;){let r=e.at(o),l=t[o],u=vp(o,r,o,l,n);if(u!==0){u<0&&e.updateValue(o,l),o++;continue}let d=e.at(s),f=t[c],p=vp(s,d,c,f,n);if(p!==0){p<0&&e.updateValue(s,f),s--,c--;continue}let m=n(o,r),ee=n(s,d),te=n(o,l);if(Object.is(te,ee)){let t=n(c,f);Object.is(t,m)?(e.swap(o,s),e.updateValue(s,f),c--,s--):e.move(s,o),e.updateValue(o,l),o++;continue}if(i??=new Cp,a??=Sp(e,o,s,n),bp(e,i,o,te))e.updateValue(o,l),o++,s++;else if(a.has(te))i.set(m,e.detach(o)),s--;else{let n=e.create(o,t[o]);e.attach(o,n),o++,s++}}for(;o<=c;)xp(e,i,n,o,t[o]),o++}else if(t!=null){d(r);let c=t[Symbol.iterator]();d(null);let l=c.next();for(;!l.done&&o<=s;){let t=e.at(o),r=l.value,u=vp(o,t,o,r,n);if(u!==0)u<0&&e.updateValue(o,r),o++,l=c.next();else{i??=new Cp,a??=Sp(e,o,s,n);let u=n(o,r);if(bp(e,i,o,u))e.updateValue(o,r),o++,s++,l=c.next();else if(!a.has(u))e.attach(o,e.create(o,r)),o++,s++,l=c.next();else{let r=n(o,t);i.set(r,e.detach(o)),s--}}}for(;!l.done;)xp(e,i,n,e.length,l.value),l=c.next()}for(;o<=s;)e.destroy(e.detach(s--));i?.forEach(t=>{e.destroy(t)})}function bp(e,t,n,r){return t!==void 0&&t.has(r)?(e.attach(n,t.get(r)),t.delete(r),!0):!1}function xp(e,t,n,r,i){if(bp(e,t,r,n(r,i)))e.updateValue(r,i);else{let t=e.create(r,i);e.attach(r,t)}}function Sp(e,t,n,r){let i=new Set;for(let a=t;a<=n;a++)i.add(r(a,e.at(a)));return i}var Cp=class{kvMap=new Map;_vMap=void 0;has(e){return this.kvMap.has(e)}delete(e){if(!this.has(e))return!1;let t=this.kvMap.get(e);return this._vMap!==void 0&&this._vMap.has(t)?(this.kvMap.set(e,this._vMap.get(t)),this._vMap.delete(t)):this.kvMap.delete(e),!0}get(e){return this.kvMap.get(e)}set(e,t){if(this.kvMap.has(e)){let n=this.kvMap.get(e);this._vMap===void 0&&(this._vMap=new Map);let r=this._vMap;for(;r.has(n);)n=r.get(n);r.set(n,t)}else this.kvMap.set(e,t)}forEach(e){for(let[t,n]of this.kvMap)if(e(n,t),this._vMap!==void 0){let r=this._vMap;for(;r.has(n);)n=r.get(n),e(n,t)}}};function M(e,t,n,r,i,a,o,s){$c(`NgControlFlow`);let c=w(),l=T();return op(c,l,e,t,n,r,i,Ti(l.consts,a),256,o,s),wp}function wp(e,t,n,r,i,a,o,s){$c(`NgControlFlow`);let c=w(),l=T();return op(c,l,e,t,n,r,i,Ti(l.consts,a),512,o,s),wp}function N(e,t){$c(`NgControlFlow`);let n=w(),r=ta(),i=n[r]===Bc?-1:n[r],a=i===-1?void 0:Ap(n,27+i);if(_d(n,r,e)){let r=d(null);try{if(a!==void 0&&qu(a,0),e!==-1){let r=27+e,i=Ap(n,r),a=Fp(n[1],r),o=ud(i,a,n);Ku(i,vu(n,a,t,{dehydratedView:o}),0,yu(a,o))}}finally{d(r)}}else if(a!==void 0){let e=Gu(a,0);e!==void 0&&(e[8]=t)}}var Tp=class{lContainer;$implicit;$index;constructor(e,t,n){this.lContainer=e,this.$implicit=t,this.$index=n}get $count(){return this.lContainer.length-10}};function Ep(e){return e}function Dp(e,t){return t}var Op=class{hasEmptyBlock;trackByFn;liveCollection;constructor(e,t,n){this.hasEmptyBlock=e,this.trackByFn=t,this.liveCollection=n}};function P(e,t,n,r,i,a,o,s,c,l,u,d,f){$c(`NgControlFlow`);let p=w(),m=T(),ee=c!==void 0,te=w(),ne=new Op(ee,s?o.bind(te[15][8]):o);te[27+e]=ne,op(p,m,e+1,t,n,r,i,Ti(m.consts,a),256),ee&&op(p,m,e+2,c,l,u,d,Ti(m.consts,f),512)}var kp=class extends _p{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=!1;constructor(e,t,n){super(),this.lContainer=e,this.hostLView=t,this.templateTNode=n}get length(){return this.lContainer.length-10}at(e){return this.getLView(e)[8].$implicit}attach(e,t){let n=t[6];this.needsIndexUpdate||=e!==this.length,Ku(this.lContainer,t,e,yu(this.templateTNode,n)),jp(this.lContainer,e)}detach(e){return this.needsIndexUpdate||=e!==this.length-1,Mp(this.lContainer,e),Np(this.lContainer,e)}create(e,t){let n=ld(this.lContainer,this.templateTNode.tView.ssrId);return vu(this.hostLView,this.templateTNode,new Tp(this.lContainer,t,e),{dehydratedView:n})}destroy(e){yl(e[1],e)}updateValue(e,t){this.getLView(e)[8].$implicit=t}reset(){this.needsIndexUpdate=!1}updateIndexes(){if(this.needsIndexUpdate)for(let e=0;e<this.length;e++)this.getLView(e)[8].$index=e}getLView(e){return Pp(this.lContainer,e)}};function F(e){let t=d(null),n=ya();try{let r=w(),i=r[1],a=r[n],o=n+1,s=Ap(r,o);a.liveCollection===void 0?a.liveCollection=new kp(s,r,Fp(i,o)):a.liveCollection.reset();let c=a.liveCollection;if(yp(c,e,a.trackByFn,t),c.updateIndexes(),a.hasEmptyBlock){let e=ta(),t=c.length===0;if(_d(r,e,t)){let e=n+2,a=Ap(r,e);if(t){let t=Fp(i,e),n=ud(a,t,r);Ku(a,vu(r,t,void 0,{dehydratedView:n}),0,yu(t,n))}else i.firstUpdatePass&&ad(a),qu(a,0)}}}finally{d(t)}}function Ap(e,t){return e[t]}function jp(e,t){if(e.length<=10)return;let n=e[10+t],r=n?n[26]:void 0;if(n&&r&&r.detachedLeaveAnimationFns&&r.detachedLeaveAnimationFns.length>0){let e=n[9];il(e,r),Yc.delete(n[19]),r.detachedLeaveAnimationFns=void 0}}function Mp(e,t){if(e.length<=10)return;let n=e[10+t],r=n?n[26]:void 0;r&&r.leave&&r.leave.size>0&&(r.detachedLeaveAnimationFns=[])}function Np(e,t){return Ju(e,t)}function Pp(e,t){return Gu(e,t)}function Fp(e,t){return xi(e,t)}function Ip(e,t,n){let r=w();return _d(r,ta(),t)&&(T(),eu(xa(),r,e,t,r[11],n)),Ip}function Lp(e,t,n,r,i){pu(t,e,n,i?`class`:`style`,r)}function I(e,t,n,r){let i=w(),a=i[1],o=e+27,s=a.firstCreatePass?Ud(o,i,2,t,ou,Hi(),n,r):a.data[o];if(fi(s)){let n=i[10].tracingService;if(n&&n.componentCreate){let o=a.data[s.directiveStart+s.componentOffset];return n.componentCreate(md(o),()=>(Rp(e,t,i,s,r),I))}}return Rp(e,t,i,s,r),I}function Rp(e,t,n,r,i){if(uu(r,n,e,t,Bp),pi(r)){let e=n[1];Xl(e,n,r),rc(e,r,n)}i!=null&&Zl(n,r)}function L(){let e=T(),t=du(Ki());return e.firstCreatePass&&Wd(e,t),Wi(t)&&Gi(),Vi(),t.classesWithoutHost!=null&&Uo(t)&&Lp(e,t,w(),t.classesWithoutHost,!0),t.stylesWithoutHost!=null&&Wo(t)&&Lp(e,t,w(),t.stylesWithoutHost,!1),L}function zp(e,t,n,r){return I(e,t,n,r),L(),zp}function R(e,t,n,r){let i=w(),a=i[1],o=e+27,s=a.firstCreatePass?Gd(o,a,2,t,n,r):a.data[o];return uu(s,i,e,t,Bp),r!=null&&Zl(i,s),R}function z(){return Wi(du(Ki()))&&Gi(),Vi(),z}function B(e,t,n,r){return R(e,t,n,r),z(),B}var Bp=(e,t,n,r,i)=>(Oa(!0),pc(t[11],r,Ta()));function Vp(){return w()}function Hp(e,t,n){let r=w();return _d(r,ta(),t)&&(T(),tu(xa(),r,e,t,r[11],n)),Hp}function Up(e){typeof e==`string`&&e.toLowerCase().replace(/_/g,`-`)}function Wp(e,t,n){let r=w(),i=T(),a=Ki();return Gp(i,r,r[11],a,e,t,n),Wp}function V(e,t,n){let r=w(),i=T(),a=Ki();return(a.type&3||n)&&bd(a,i,r,n,r[11],e,t,vd(a,r,t)),V}function Gp(e,t,n,r,i,a,o){let s=!0,c=null;if((r.type&3||o)&&(c??=vd(r,t,a),bd(r,e,t,o,n,i,a,c)&&(s=!1)),s){let e=r.outputs?.[i],n=r.hostDirectiveOutputs?.[i];if(n&&n.length)for(let e=0;e<n.length;e+=2){let o=n[e],s=n[e+1];c??=vd(r,t,a),wd(r,t,o,s,i,c)}if(e&&e.length)for(let n of e)c??=vd(r,t,a),wd(r,t,n,i,i,c)}}function H(e=1){return va(e)}function Kp(e,t,n,r){return Vf(e,Nf(t,n,r)),Kp}function qp(e=1){la(ca()+e)}function Jp(e,t){return e<<17|t<<2}function Yp(e){return e>>17&32767}function Xp(e){return(e&2)==2}function Zp(e,t){return e&131071|t<<17}function Qp(e){return e|2}function $p(e){return(e&131068)>>2}function em(e,t){return e&-131069|t<<2}function tm(e){return(e&1)==1}function nm(e){return e|1}function rm(e,t,n,r,i,a){let o=a?t.classBindings:t.styleBindings,s=Yp(o),c=$p(o);e[r]=n;let l=!1,u;if(Array.isArray(n)){let e=n;u=e[1],(u===null||wr(e,u)>0)&&(l=!0)}else u=n;if(i)if(c!==0){let t=Yp(e[s+1]);e[r+1]=Jp(t,s),t!==0&&(e[t+1]=em(e[t+1],r)),e[s+1]=Zp(e[s+1],r)}else e[r+1]=Jp(s,0),s!==0&&(e[s+1]=em(e[s+1],r)),s=r;else e[r+1]=Jp(c,0),s===0?s=r:e[c+1]=em(e[c+1],r),c=r;l&&(e[r+1]=Qp(e[r+1])),am(e,u,r,!0),am(e,u,r,!1),im(t,u,e,r,a),o=Jp(s,c),a?t.classBindings=o:t.styleBindings=o}function im(e,t,n,r,i){let a=i?e.residualClasses:e.residualStyles;a!=null&&typeof t==`string`&&wr(a,t)>=0&&(n[r+1]=nm(n[r+1]))}function am(e,t,n,r){let i=e[n+1],a=t===null,o=r?Yp(i):$p(i),s=!1;for(;o!==0&&(s===!1||a);){let n=e[o],i=e[o+1];om(n,t)&&(s=!0,e[o+1]=r?nm(i):Qp(i)),o=r?Yp(i):$p(i)}s&&(e[n+1]=r?Qp(i):nm(i))}function om(e,t){return e===null||t==null||(Array.isArray(e)?e[1]:e)===t?!0:Array.isArray(e)&&typeof t==`string`?wr(e,t)>=0:!1}var sm={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function cm(e){return e.substring(sm.key,sm.keyEnd)}function lm(e){return dm(e),um(e,fm(e,0,sm.textEnd))}function um(e,t){let n=sm.textEnd;return n===t?-1:(t=sm.keyEnd=pm(e,sm.key=t,n),fm(e,t,n))}function dm(e){sm.key=0,sm.keyEnd=0,sm.value=0,sm.valueEnd=0,sm.textEnd=e.length}function fm(e,t,n){for(;t<n&&e.charCodeAt(t)<=32;)t++;return t}function pm(e,t,n){for(;t<n&&e.charCodeAt(t)>32;)t++;return t}function mm(e,t,n){return _m(e,t,n,!1),mm}function U(e,t){return _m(e,t,null,!0),U}function hm(e){vm(Om,gm,e,!0)}function gm(e,t){for(let n=lm(t);n>=0;n=um(t,n))Sr(e,cm(t),!0)}function _m(e,t,n,r){let i=w(),a=T(),o=na(2);if(a.firstUpdatePass&&bm(a,e,o,r),t!==Bc&&_d(i,o,t)){let s=a.data[ya()];Am(a,s,i,i[11],e,i[o+1]=Nm(t,n),r,o)}}function vm(e,t,n,r){let i=T(),a=na(2);i.firstUpdatePass&&bm(i,null,a,r);let o=w();if(n!==Bc&&_d(o,a,n)){let s=i.data[ya()];if(Pm(s,r)&&!ym(i,a)){let e=r?s.classesWithoutHost:s.stylesWithoutHost;e!==null&&(n=Dn(e,n||``)),Lp(i,s,o,n,r)}else km(i,s,o,o[11],o[a+1],o[a+1]=Dm(e,t,n),r,a)}}function ym(e,t){return t>=e.expandoStartIndex}function bm(e,t,n,r){let i=e.data;if(i[n+1]===null){let a=i[ya()],o=ym(e,n);Pm(a,r)&&t===null&&!o&&(t=!1),t=xm(i,a,t,r),rm(i,a,t,n,o,r)}}function xm(e,t,n,r){let i=sa(e),a=r?t.residualClasses:t.residualStyles;if(i===null)(r?t.classBindings:t.styleBindings)===0&&(n=Tm(null,e,t,n,r),n=Em(n,t.attrs,r),a=null);else{let o=t.directiveStylingLast;if(o===-1||e[o]!==i)if(n=Tm(i,e,t,n,r),a===null){let n=Sm(e,t,r);n!==void 0&&Array.isArray(n)&&(n=Tm(null,e,t,n[1],r),n=Em(n,t.attrs,r),Cm(e,t,r,n))}else a=wm(e,t,r)}return a!==void 0&&(r?t.residualClasses=a:t.residualStyles=a),n}function Sm(e,t,n){let r=n?t.classBindings:t.styleBindings;if($p(r)!==0)return e[Yp(r)]}function Cm(e,t,n,r){let i=n?t.classBindings:t.styleBindings;e[Yp(i)]=r}function wm(e,t,n){let r,i=t.directiveEnd;for(let a=1+t.directiveStylingLast;a<i;a++){let t=e[a].hostAttrs;r=Em(r,t,n)}return Em(r,t.attrs,n)}function Tm(e,t,n,r,i){let a=null,o=n.directiveEnd,s=n.directiveStylingLast;for(s===-1?s=n.directiveStart:s++;s<o&&(a=t[s],r=Em(r,a.hostAttrs,i),a!==e);)s++;return e!==null&&(n.directiveStylingLast=s),r}function Em(e,t,n){let r=n?1:2,i=-1;if(t!==null)for(let a=0;a<t.length;a++){let o=t[a];typeof o==`number`?i=o:i===r&&(Array.isArray(e)||(e=e===void 0?[]:[``,e]),Sr(e,o,n?!0:t[++a]))}return e===void 0?null:e}function Dm(e,t,n){if(n==null||n===``)return Dr;let r=[],i=oc(n);if(Array.isArray(i))for(let t=0;t<i.length;t++)e(r,i[t],!0);else if(i instanceof Set)for(let t of i)e(r,t,!0);else if(typeof i==`object`)for(let t in i)Object.hasOwn(i,t)&&e(r,t,i[t]);else typeof i==`string`&&t(r,i);return r}function Om(e,t,n){let r=String(t);r!==``&&!r.includes(` `)&&Sr(e,r,n)}function km(e,t,n,r,i,a,o,s){i===Bc&&(i=Dr);let c=0,l=0,u=0<i.length?i[0]:null,d=0<a.length?a[0]:null;for(;u!==null||d!==null;){let f=c<i.length?i[c+1]:void 0,p=l<a.length?a[l+1]:void 0,m=null,ee;u===d?(c+=2,l+=2,f!==p&&(m=d,ee=p)):d===null||u!==null&&u<d?(c+=2,m=u):(l+=2,m=d,ee=p),m!==null&&Am(e,t,n,r,m,ee,o,s),u=c<i.length?i[c]:null,d=l<a.length?a[l]:null}}function Am(e,t,n,r,i,a,o,s){if(!(t.type&3))return;let c=e.data,l=c[s+1];Mm(tm(l)?jm(c,t,n,i,$p(l),o):void 0)||(Mm(a)||Xp(l)&&(a=jm(c,null,n,i,s,o)),Ll(r,o,yi(ya(),n),i,a))}function jm(e,t,n,r,i,a){let o=t===null,s;for(;i>0;){let t=e[i],a=Array.isArray(t),c=a?t[1]:t,l=c===null,u=n[i+1];u===Bc&&(u=l?Dr:void 0);let d=l?Cr(u,r):c===r?u:void 0;if(a&&!Mm(d)&&(d=Cr(t,r)),Mm(d)&&(s=d,o))return s;let f=e[i+1];i=o?Yp(f):$p(f)}if(t!==null){let e=a?t.residualClasses:t.residualStyles;e!=null&&(s=Cr(e,r))}return s}function Mm(e){return e!==void 0}function Nm(e,t){return e==null||e===``||(typeof t==`string`?e+=t:typeof e==`object`&&(e=En(oc(e)))),e}function Pm(e,t){return(e.flags&(t?8:16))!=0}function W(e,t=``){let n=w(),r=T(),i=e+27,a=r.firstCreatePass?td(r,i,1,t,null):r.data[i],o=Fm(r,n,a,t);n[i]=o,Da()&&kl(r,n,o,a),Yi(a,!1)}var Fm=(e,t,n,r)=>(Oa(!0),dc(t[11],r));function Im(e,t,n,r=``){return _d(e,ta(),n)?t+Yn(n)+r:Bc}function G(e){return Lm(``,e),G}function Lm(e,t,n){let r=w(),i=Im(r,e,t,n);return i!==Bc&&Rm(r,ya(),i),Lm}function Rm(e,t,n){let r=yi(t,e);fc(e[11],r,n)}var zm=(()=>{class e{applicationErrorHandler=S(io);appRef=S(pp);taskService=S(La);ngZone=S(Ga);zonelessEnabled=S(go);tracing=S(Zc,{optional:!0});zoneIsDefined=typeof Zone<`u`&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new $e;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(Ua):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(S(_o,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let e=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(e);return}this.switchToMicrotaskScheduler(),this.taskService.remove(e)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let e=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(e)})})}notify(e){if(!this.zonelessEnabled&&e===5)return;switch(e){case 0:case 2:this.appRef.dirtyFlags|=2;break;case 3:case 4:case 5:case 1:this.appRef.dirtyFlags|=4;break;case 6:this.appRef.dirtyFlags|=2;break;case 12:this.appRef.dirtyFlags|=16;break;case 13:this.appRef.dirtyFlags|=2;break;case 11:break;default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let t=this.useMicrotaskScheduler?Va:Ba;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>t(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>t(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(`isAngularZone_ID`+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let e=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(e){this.applicationErrorHandler(e)}finally{this.taskService.remove(e),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let e=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(e)}}static ɵfac=function(t){return new(t||e)};static ɵprov=Es({token:e,factory:e.ɵfac})}return e})();function Bm(){return $c(`NgZoneless`),Mr([...Vm(),[]])}function Vm(){return[{provide:ho,useExisting:zm},{provide:Ga,useClass:$a},{provide:go,useValue:!0}]}function Hm(){return typeof $localize<`u`&&$localize.locale||`en-US`}var Um=new b(``,{factory:()=>S(Um,{optional:!0,skipSelf:!0})||Hm()}),Wm=class{destroyed=!1;listeners=null;errorHandler=S(ro,{optional:!0});isEmitting=!1;hasNullListeners=!1;destroyRef=S(Na);constructor(){this.destroyRef.onDestroy(()=>{this.destroyed=!0,this.listeners=null})}subscribe(e){if(this.destroyed)throw new _(953,!1);return(this.listeners??=[]).push(e),{unsubscribe:()=>{let t=this.listeners?this.listeners.indexOf(e):-1;t>-1&&(this.isEmitting?(this.hasNullListeners=!0,this.listeners[t]=null):this.listeners.splice(t,1))}}}emit(e){if(this.destroyed){console.warn(Tn(953,!1));return}if(this.listeners===null)return;this.isEmitting=!0;let t=d(null);try{for(let t of this.listeners)try{t!==null&&t(e)}catch(e){this.errorHandler?.handleError(e)}}finally{this.hasNullListeners&&(this.hasNullListeners=!1,this.listeners&&Gm(this.listeners)),d(t),this.isEmitting=!1}}};function Gm(e){let t=e.length-1;for(;t>-1;)e[t]===null&&e.splice(t,1),t--}function K(e,t){return _e(e,t?.equal)}var Km=Symbol(`InputSignalNode#UNSET`),qm={...je,transformFn:void 0,applyValueToInputSignal(e,t){ke(e,t)}};function Jm(e,t){let n=Object.create(qm);n.value=e,n.transformFn=t?.transform;function r(){if(m(n),n.value===Km)throw new _(-950,null);return n.value}return r[u]=n,r}function Ym(e){return new Wm}function Xm(e,t){return Jm(e,t)}function Zm(e){return Jm(Km,e)}var Qm=(Xm.required=Zm,Xm);function $m(e,t){return zf(t)}function eh(e,t){return Bf(t)}var th=($m.required=eh,$m),nh=new b(``),rh=new b(``);function ih(e){return!e.moduleRef}function ah(e){let t=ih(e)?e.r3Injector:e.moduleRef.injector,n=t.get(Ga);return n.run(()=>{ih(e)?e.r3Injector.resolveInjectorInitializers():e.moduleRef.resolveInjectorInitializers();let r=t.get(io),i;if(n.runOutsideAngular(()=>{i=n.onError.subscribe({next:r})}),ih(e)){let n=()=>t.destroy(),r=e.platformInjector.get(nh);r.add(n),t.onDestroy(()=>{i.unsubscribe(),r.delete(n)})}else{let t=()=>e.moduleRef.destroy(),n=e.platformInjector.get(nh);n.add(t),e.moduleRef.onDestroy(()=>{hp(e.allPlatformModules,e.moduleRef),i.unsubscribe(),n.delete(t)})}return sh(r,n,()=>{let n=t.get(La),r=n.add(),i=t.get(ip);return i.runInitializers(),i.donePromise.then(()=>{if(Up(t.get(Um,`en-US`)||`en-US`),!t.get(rh,!0))return ih(e)?t.get(pp):(e.allPlatformModules.push(e.moduleRef),e.moduleRef);if(ih(e)){let n=t.get(pp);return e.rootComponent!==void 0&&n.bootstrap(e.rootComponent),n}else return oh?.(e.moduleRef,e.allPlatformModules),e.moduleRef}).finally(()=>void n.remove(r))})})}var oh;function sh(e,t,n){try{let r=n();return Uf(r)?r.catch(n=>{throw t.runOutsideAngular(()=>e(n)),n}):r}catch(n){throw t.runOutsideAngular(()=>e(n)),n}}var ch=null;function lh(e=[],t){return ja.create({name:t,providers:[{provide:Ur,useValue:`platform`},{provide:nh,useValue:new Set([()=>ch=null])},...e]})}function uh(e=[]){if(ch)return ch;let t=lh(e);return ch=t,dp(),dh(t),t}function dh(e){let t=e.get(lo,null);oi(e,()=>{t?.forEach(e=>e())})}function fh(e){let{rootComponent:t,appProviders:n,platformProviders:r,platformRef:i}=e;A(k.BootstrapApplicationStart);try{let e=i?.injector??uh(r);return ah({r3Injector:new Kf({providers:[Vm(),ao,...n||[]],parent:e,debugName:``,runEnvironmentInitializers:!1}).injector,platformInjector:e,rootComponent:t})}catch(e){return Promise.reject(e)}finally{A(k.BootstrapApplicationEnd)}}var ph=null;function mh(){return ph}function hh(e){ph??=e}var gh=class{};function _h(e,t){t=encodeURIComponent(t);for(let n of e.split(`;`)){let e=n.indexOf(`=`),[r,i]=e==-1?[n,``]:[n.slice(0,e),n.slice(e+1)];if(r.trim()===t)return decodeURIComponent(i)}return null}var vh=`browser`,yh=class{_doc;constructor(e){this._doc=e}manager},bh=(()=>{class e extends yh{constructor(e){super(e)}supports(e){return!0}addEventListener(e,t,n,r){return e.addEventListener(t,n,r),()=>this.removeEventListener(e,t,n,r)}removeEventListener(e,t,n,r){return e.removeEventListener(t,n,r)}static ɵfac=function(t){return new(t||e)(x(Ma))};static ɵprov=y({token:e,factory:e.ɵfac})}return e})(),xh=new b(``),Sh=(()=>{class e{_zone;_plugins;_eventNameToPlugin=new Map;constructor(e,t){this._zone=t,e.forEach(e=>{e.manager=this});let n=e.filter(e=>!(e instanceof bh));this._plugins=n.slice().reverse();let r=e.find(e=>e instanceof bh);r&&this._plugins.push(r)}addEventListener(e,t,n,r){return this._findPluginFor(t).addEventListener(e,t,n,r)}getZone(){return this._zone}_findPluginFor(e){let t=this._eventNameToPlugin.get(e);if(t)return t;if(t=this._plugins.find(t=>t.supports(e)),!t)throw new _(-5101,!1);return this._eventNameToPlugin.set(e,t),t}static ɵfac=function(t){return new(t||e)(x(xh),x(Ga))};static ɵprov=y({token:e,factory:e.ɵfac})}return e})(),Ch=`ng-app-id`;function wh(e){for(let t of e)t.remove()}function Th(e,t){let n=t.createElement(`style`);return n.textContent=e,n}function Eh(e,t,n,r){let i=e.head?.querySelectorAll(`style[${Ch}="${t}"],link[${Ch}="${t}"]`);if(!i||i.length===0)return!1;for(let e of i)e.removeAttribute(Ch),e instanceof HTMLLinkElement?r.set(e.href.slice(e.href.lastIndexOf(`/`)+1),{usage:0,elements:[e]}):e.textContent&&n.set(e.textContent,{usage:0,elements:[e]});return!0}function Dh(e,t){let n=t.createElement(`link`);return n.setAttribute(`rel`,`stylesheet`),n.setAttribute(`href`,e),n}var Oh=(()=>{class e{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(e,t,n,r={}){this.doc=e,this.appId=t,this.nonce=n,Eh(e,t,this.inline,this.external)&&this.hosts.add(e.head)}addStyles(e,t){for(let t of e)this.addUsage(t,this.inline,Th);t?.forEach(e=>this.addUsage(e,this.external,Dh))}removeStyles(e,t){for(let t of e)this.removeUsage(t,this.inline);t?.forEach(e=>this.removeUsage(e,this.external))}addUsage(e,t,n){let r=t.get(e);r?r.usage++:t.set(e,{usage:1,elements:[...this.hosts].map(t=>this.addElement(t,n(e,this.doc)))})}removeUsage(e,t){let n=t.get(e);n&&(n.usage--,n.usage<=0&&(wh(n.elements),t.delete(e)))}ngOnDestroy(){for(let[,{elements:e}]of[...this.inline,...this.external])wh(e);this.hosts.clear()}addHost(e){if(!this.hosts.has(e)){this.hosts.add(e);for(let[t,{elements:n}]of this.inline)n.push(this.addElement(e,Th(t,this.doc)));for(let[t,{elements:n}]of this.external)n.push(this.addElement(e,Dh(t,this.doc)))}}removeHost(e){this.hosts.delete(e);for(let t of[...this.inline.values(),...this.external.values()]){let n=[];for(let r of t.elements)r.parentNode===e?r.remove():n.push(r);t.elements=n}}addElement(e,t){return this.nonce&&t.setAttribute(`nonce`,this.nonce),e.appendChild(t)}static ɵfac=function(t){return new(t||e)(x(Ma),x(so),x(fo,8),x(uo))};static ɵprov=y({token:e,factory:e.ɵfac})}return e})(),kh={svg:`http://www.w3.org/2000/svg`,xhtml:`http://www.w3.org/1999/xhtml`,xlink:`http://www.w3.org/1999/xlink`,xml:`http://www.w3.org/XML/1998/namespace`,xmlns:`http://www.w3.org/2000/xmlns/`,math:`http://www.w3.org/1998/Math/MathML`},Ah=/%COMP%/g,jh=`%COMP%`,Mh=`_nghost-${jh}`,Nh=`_ngcontent-${jh}`,Ph=!0,Fh=new b(``,{factory:()=>Ph});function Ih(e){return Nh.replace(Ah,e)}function Lh(e){return Mh.replace(Ah,e)}function Rh(e,t){return t.map(t=>t.replace(Ah,e))}var zh=(()=>{class e{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(e,t,n,r,i,a,o=null,s=null){this.eventManager=e,this.sharedStylesHost=t,this.appId=n,this.removeStylesOnCompDestroy=r,this.doc=i,this.ngZone=a,this.nonce=o,this.tracingService=s,this.defaultRenderer=new Bh(e,i,a,this.tracingService)}createRenderer(e,t){if(!e||!t)return this.defaultRenderer;let n=this.getOrCreateRenderer(e,t);return n instanceof Wh?n.applyToHost(e):n instanceof Uh&&n.applyStyles(),n}getOrCreateRenderer(e,t){let n=this.rendererByCompId,r=n.get(t.id);if(!r){let i=this.doc,a=this.ngZone,o=this.eventManager,s=this.sharedStylesHost,c=this.removeStylesOnCompDestroy,l=this.tracingService;switch(t.encapsulation){case ic.Emulated:r=new Wh(o,s,t,this.appId,c,i,a,l);break;case ic.ShadowDom:return new Hh(o,e,t,i,a,this.nonce,l,s);case ic.ExperimentalIsolatedShadowDom:return new Hh(o,e,t,i,a,this.nonce,l);default:r=new Uh(o,s,t,c,i,a,l);break}n.set(t.id,r)}return r}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(e){this.rendererByCompId.delete(e)}static ɵfac=function(t){return new(t||e)(x(Sh),x(Ed),x(so),x(Fh),x(Ma),x(Ga),x(fo),x(Zc,8))};static ɵprov=y({token:e,factory:e.ɵfac})}return e})(),Bh=class{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(e,t,n,r){this.eventManager=e,this.doc=t,this.ngZone=n,this.tracingService=r}destroy(){}destroyNode=null;createElement(e,t){return t?this.doc.createElementNS(kh[t]||t,e):this.doc.createElement(e)}createComment(e){return this.doc.createComment(e)}createText(e){return this.doc.createTextNode(e)}appendChild(e,t){(Vh(e)?e.content:e).appendChild(t)}insertBefore(e,t,n){e&&(Vh(e)?e.content:e).insertBefore(t,n)}removeChild(e,t){t.remove()}selectRootElement(e,t){let n=typeof e==`string`?this.doc.querySelector(e):e;if(!n)throw new _(-5104,!1);return t||(n.textContent=``),n}parentNode(e){return e.parentNode}nextSibling(e){return e.nextSibling}setAttribute(e,t,n,r){if(r){t=r+`:`+t;let i=kh[r];i?e.setAttributeNS(i,t,n):e.setAttribute(t,n)}else e.setAttribute(t,n)}removeAttribute(e,t,n){if(n){let r=kh[n];r?e.removeAttributeNS(r,t):e.removeAttribute(`${n}:${t}`)}else e.removeAttribute(t)}addClass(e,t){e.classList.add(t)}removeClass(e,t){e.classList.remove(t)}setStyle(e,t,n,r){r&(Vc.DashCase|Vc.Important)?e.style.setProperty(t,n,r&Vc.Important?`important`:``):e.style[t]=n}removeStyle(e,t,n){n&Vc.DashCase?e.style.removeProperty(t):e.style[t]=``}setProperty(e,t,n){e!=null&&(e[t]=n)}setValue(e,t){e.nodeValue=t}listen(e,t,n,r){if(typeof e==`string`&&(e=mh().getGlobalEventTarget(this.doc,e),!e))throw new _(-5102,!1);let i=this.decoratePreventDefault(n);return this.tracingService?.wrapEventListener&&(i=this.tracingService.wrapEventListener(e,t,i)),this.eventManager.addEventListener(e,t,i,r)}decoratePreventDefault(e){return t=>{if(t===`__ngUnwrap__`)return e;e(t)===!1&&t.preventDefault()}}};function Vh(e){return e.tagName===`TEMPLATE`&&e.content!==void 0}var Hh=class extends Bh{hostEl;sharedStylesHost;shadowRoot;constructor(e,t,n,r,i,a,o,s){super(e,r,i,o),this.hostEl=t,this.sharedStylesHost=s,this.shadowRoot=t.attachShadow({mode:`open`}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let c=n.styles;c=Rh(n.id,c);for(let e of c){let t=document.createElement(`style`);a&&t.setAttribute(`nonce`,a),t.textContent=e,this.shadowRoot.appendChild(t)}let l=n.getExternalStyles?.();if(l)for(let e of l){let t=Dh(e,r);a&&t.setAttribute(`nonce`,a),this.shadowRoot.appendChild(t)}}nodeOrShadowRoot(e){return e===this.hostEl?this.shadowRoot:e}appendChild(e,t){return super.appendChild(this.nodeOrShadowRoot(e),t)}insertBefore(e,t,n){return super.insertBefore(this.nodeOrShadowRoot(e),t,n)}removeChild(e,t){return super.removeChild(null,t)}parentNode(e){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},Uh=class extends Bh{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(e,t,n,r,i,a,o,s){super(e,i,a,o),this.sharedStylesHost=t,this.removeStylesOnCompDestroy=r;let c=n.styles;this.styles=s?Rh(s,c):c,this.styleUrls=n.getExternalStyles?.(s)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&Yc.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},Wh=class extends Uh{contentAttr;hostAttr;constructor(e,t,n,r,i,a,o,s){let c=r+`-`+n.id;super(e,t,n,i,a,o,s,c),this.contentAttr=Ih(c),this.hostAttr=Lh(c)}applyToHost(e){this.applyStyles(),this.setAttribute(e,this.hostAttr,``)}createElement(e,t){let n=super.createElement(e,t);return super.setAttribute(n,this.contentAttr,``),n}},Gh=class e extends gh{supportsDOMEvents=!0;static makeCurrent(){hh(new e)}onAndCancel(e,t,n,r){return e.addEventListener(t,n,r),()=>{e.removeEventListener(t,n,r)}}dispatchEvent(e,t){e.dispatchEvent(t)}remove(e){e.remove()}createElement(e,t){return t||=this.getDefaultDocument(),t.createElement(e)}createHtmlDocument(){return document.implementation.createHTMLDocument(`fakeTitle`)}getDefaultDocument(){return document}isElementNode(e){return e.nodeType===Node.ELEMENT_NODE}isShadowRoot(e){return e instanceof DocumentFragment}getGlobalEventTarget(e,t){return t===`window`?window:t===`document`?e:t===`body`?e.body:null}getBaseHref(e){let t=qh();return t==null?null:Jh(t)}resetBaseElement(){Kh=null}getUserAgent(){return window.navigator.userAgent}getCookie(e){return _h(document.cookie,e)}},Kh=null;function qh(){return Kh||=document.head.querySelector(`base`),Kh?Kh.getAttribute(`href`):null}function Jh(e){return new URL(e,document.baseURI).pathname}var Yh=[`alt`,`control`,`meta`,`shift`],Xh={"\b":`Backspace`,"	":`Tab`,"":`Delete`,"\x1B":`Escape`,Del:`Delete`,Esc:`Escape`,Left:`ArrowLeft`,Right:`ArrowRight`,Up:`ArrowUp`,Down:`ArrowDown`,Menu:`ContextMenu`,Scroll:`ScrollLock`,Win:`OS`},Zh={alt:e=>e.altKey,control:e=>e.ctrlKey,meta:e=>e.metaKey,shift:e=>e.shiftKey},Qh=(()=>{class e extends yh{constructor(e){super(e)}supports(t){return e.parseEventName(t)!=null}addEventListener(t,n,r,i){let a=e.parseEventName(n),o=e.eventCallback(a.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>mh().onAndCancel(t,a.domEventName,o,i))}static parseEventName(t){let n=t.toLowerCase().split(`.`),r=n.shift();if(n.length===0||!(r===`keydown`||r===`keyup`))return null;let i=e._normalizeKey(n.pop()),a=``,o=n.indexOf(`code`);if(o>-1&&(n.splice(o,1),a=`code.`),Yh.forEach(e=>{let t=n.indexOf(e);t>-1&&(n.splice(t,1),a+=e+`.`)}),a+=i,n.length!=0||i.length===0)return null;let s={};return s.domEventName=r,s.fullKey=a,s}static matchEventFullKeyCode(e,t){let n=Xh[e.key]||e.key,r=``;return t.indexOf(`code.`)>-1&&(n=e.code,r=`code.`),n==null||!n?!1:(n=n.toLowerCase(),n===` `?n=`space`:n===`.`&&(n=`dot`),Yh.forEach(t=>{if(t!==n){let n=Zh[t];n(e)&&(r+=t+`.`)}}),r+=n,r===t)}static eventCallback(t,n,r){return i=>{e.matchEventFullKeyCode(i,t)&&r.runGuarded(()=>n(i))}}static _normalizeKey(e){return e===`esc`?`escape`:e}static ɵfac=function(t){return new(t||e)(x(Ma))};static ɵprov=y({token:e,factory:e.ɵfac})}return e})();async function $h(e,t,n){return fh({rootComponent:e,...eg(t,n)})}function eg(e,t){return{platformRef:t?.platformRef,appProviders:[...ag,...e?.providers??[]],platformProviders:ig}}function tg(){Gh.makeCurrent()}function ng(){return new ro}function rg(){return Ks(document),document}var ig=[{provide:uo,useValue:vh},{provide:lo,useValue:tg,multi:!0},{provide:Ma,useFactory:rg}],ag=[{provide:Ur,useValue:`root`},{provide:ro,useFactory:ng},{provide:xh,useClass:bh,multi:!0},{provide:xh,useClass:Qh,multi:!0},zh,{provide:Ed,useClass:Oh},{provide:Oh,useExisting:Ed},Sh,{provide:fd,useExisting:zh},[]],og=`#0f4d0e`,sg=`fsolitaire-presentation`,cg=`fsolitaire-settings`,lg={cardBackStyle:`card-back-blue`,backgroundColor:og};function ug(e){return e===`card-back-blue`||e===`card-back-red`}function dg(){if(typeof localStorage>`u`)return{...lg};for(let e of[sg,cg])try{let t=localStorage.getItem(e);if(!t)continue;let n=JSON.parse(t);return{cardBackStyle:ug(n.cardBackStyle)?n.cardBackStyle:lg.cardBackStyle,backgroundColor:typeof n.backgroundColor==`string`&&n.backgroundColor?n.backgroundColor:lg.backgroundColor}}catch(t){console.warn(`Failed to load presentation settings from ${e}:`,t)}return{...lg}}var fg=class e{cardBackStyle$;backgroundColor$;constructor(){let e=dg();this.cardBackStyle$=new It(e.cardBackStyle),this.backgroundColor$=new It(e.backgroundColor);let t=!1;Sn(this.cardBackStyle$,this.backgroundColor$).subscribe(()=>{t&&this.save()}),t=!0}cardBackKey(){return this.cardBackStyle}onBackgroundColor=e=>{let t=this.backgroundColor$.subscribe(e);return()=>t.unsubscribe()};get cardBackStyle(){return this.cardBackStyle$.value}setCardBackStyle(e){this.cardBackStyle!==e&&this.cardBackStyle$.next(e)}get backgroundColor(){return this.backgroundColor$.value}setBackgroundColor(e){this.backgroundColor!==e&&this.backgroundColor$.next(e)}save(){if(!(typeof localStorage>`u`))try{let e={cardBackStyle:this.cardBackStyle,backgroundColor:this.backgroundColor};localStorage.setItem(sg,JSON.stringify(e))}catch(e){console.warn(`Failed to save presentation settings:`,e)}}static ɵfac=function(t){return new(t||e)};static ɵprov=y({token:e,factory:e.ɵfac,providedIn:`root`})},pg={green:{name:`Emerald Felt`,color:`#0f4d0e`,bgClass:`theme-green`},blue:{name:`Deep Ocean`,color:`#1b4353`,bgClass:`theme-blue`},charcoal:{name:`Midnight Charcoal`,color:`#2b2d42`,bgClass:`theme-charcoal`},purple:{name:`Royal Velvet`,color:`#3c096c`,bgClass:`theme-purple`}},mg=`green`,hg=class e{presentation=S(fg);themes=pg;themeKeys=Object.keys(pg);selectedTheme=O(mg);currentBgClass=K(()=>this.themes[this.selectedTheme()].bgClass);constructor(){let e=this.presentation.backgroundColor,t=this.themeKeys.find(t=>this.themes[t].color===e);this.setTheme(t??this.selectedTheme())}setTheme(e){this.selectedTheme.set(e),this.presentation.setBackgroundColor(this.themes[e].color)}static ɵfac=function(t){return new(t||e)};static ɵprov=y({token:e,factory:e.ɵfac,providedIn:`root`})};function gg(e,t){let n=t?.manualCleanup?null:t?.injector?.get(Na)??S(Na),r=_g(t?.equal),i;i=t?.requireSync?O({kind:0},{equal:r}):O({kind:1,value:t?.initialValue},{equal:r});let a,o=e.subscribe({next:e=>i.set({kind:1,value:e}),error:e=>{i.set({kind:2,error:e}),a?.()},complete:()=>{a?.()}});if(t?.requireSync&&i().kind===0)throw new _(601,!1);return a=n?.onDestroy(o.unsubscribe.bind(o)),K(()=>{let e=i();switch(e.kind){case 1:return e.value;case 2:throw e.error;case 0:throw new _(601,!1)}},{equal:t?.equal})}function _g(e=Object.is){return(t,n)=>t.kind===1&&n.kind===1&&e(t.value,n.value)}var vg=class{id;suit;rank;faceUp;faceKey;constructor(e,t,n,r=!1,i=Cg({suit:t,rank:n})){this.id=e,this.suit=t,this.rank=n,this.faceUp=r,this.faceKey=i}},q;(function(e){e[e.SPADE=0]=`SPADE`,e[e.HEART=1]=`HEART`,e[e.DIAMOND=2]=`DIAMOND`,e[e.CLUB=3]=`CLUB`})(q||={});var J;(function(e){e[e.ACE=0]=`ACE`,e[e.TWO=1]=`TWO`,e[e.THREE=2]=`THREE`,e[e.FOUR=3]=`FOUR`,e[e.FIVE=4]=`FIVE`,e[e.SIX=5]=`SIX`,e[e.SEVEN=6]=`SEVEN`,e[e.EIGHT=7]=`EIGHT`,e[e.NINE=8]=`NINE`,e[e.TEN=9]=`TEN`,e[e.JACK=10]=`JACK`,e[e.QUEEN=11]=`QUEEN`,e[e.KING=12]=`KING`})(J||={});var yg=[q.SPADE,q.HEART,q.DIAMOND,q.CLUB],bg=[J.ACE,J.TWO,J.THREE,J.FOUR,J.FIVE,J.SIX,J.SEVEN,J.EIGHT,J.NINE,J.TEN,J.JACK,J.QUEEN,J.KING];function xg(e){return e===J.KING?void 0:e+1}function Sg(e){return e===J.ACE?void 0:e-1}function Cg(e){return`card-${Dg(e.suit)}-${Og(e.rank)}`}function wg(e){let t=Cg(e),n=e.deckIndex??0;return n===0?t:`${t}#${n}`}var Tg={[q.SPADE]:`spades`,[q.HEART]:`hearts`,[q.DIAMOND]:`diamonds`,[q.CLUB]:`clubs`},Eg={[J.ACE]:`ace`,[J.TWO]:`2`,[J.THREE]:`3`,[J.FOUR]:`4`,[J.FIVE]:`5`,[J.SIX]:`6`,[J.SEVEN]:`7`,[J.EIGHT]:`8`,[J.NINE]:`9`,[J.TEN]:`10`,[J.JACK]:`jack`,[J.QUEEN]:`queen`,[J.KING]:`king`};function Dg(e){let t=Tg[e];if(t===void 0)throw Error(`Unknown Suit: ${String(e)}`);return t}function Og(e){let t=Eg[e];if(t===void 0)throw Error(`Unknown Rank: ${String(e)}`);return t}var kg={suits:yg,ranks:bg,copies:1};function Ag(e=kg){let t=[];for(let n=0;n<e.copies;n++)for(let r of e.suits)for(let i of e.ranks)t.push({suit:r,rank:i,deckIndex:n});return t}var jg=Ag(),Mg=`fsolitaire-settings`,Ng={drawCount:3,debug:{almostWin:!1}};function Pg(){return{...Ng,debug:{...Ng.debug}}}function Fg(){if(typeof localStorage>`u`)return Pg();try{let e=localStorage.getItem(Mg);if(!e)return Pg();let t=JSON.parse(e);return{drawCount:t.drawCount===1||t.drawCount===3?t.drawCount:Ng.drawCount,debug:{almostWin:typeof t.debug?.almostWin==`boolean`?t.debug.almostWin:Ng.debug.almostWin}}}catch(e){return console.warn(`Failed to load settings from localStorage:`,e),Pg()}}var Ig=class{almostWin$;constructor(e=!1){this.almostWin$=new It(e)}get almostWin(){return this.almostWin$.value}setAlmostWin(e){this.almostWin!==e&&this.almostWin$.next(e)}},Lg=class{drawCount$;debug;constructor(){let e=Fg();this.drawCount$=new It(e.drawCount),this.debug=new Ig(e.debug.almostWin);let t=!1;Sn(this.drawCount$,this.debug.almostWin$).subscribe(()=>{t&&this.saveToLocalStorage()}),t=!0}saveToLocalStorage(){if(!(typeof localStorage>`u`))try{let e={drawCount:this.drawCount,debug:{almostWin:this.debug.almostWin}};localStorage.setItem(Mg,JSON.stringify(e))}catch(e){console.warn(`Failed to save settings to localStorage:`,e)}}get drawCount(){return this.drawCount$.value}setDrawCount(e){this.drawCount!==e&&this.drawCount$.next(e)}},Rg=class{cardsById=new Map;get size(){return this.cardsById.size}ids(){return[...this.cardsById.keys()]}get(e){return this.cardsById.get(e)}getOrCreate(e){let t=wg(e),n=this.cardsById.get(t);return n||(n=new vg(t,e.suit,e.rank,!1,Cg(e)),this.cardsById.set(t,n)),n}},zg=class{pileByCardId=new Map;get(e){return this.pileByCardId.get(e)}record(e,t){this.pileByCardId.set(e,t)}forget(e){this.pileByCardId.delete(e)}},Bg=class{id;role;cards=[];locations;constructor(e=``,t=``,n){this.id=e,this.role=t,this.locations=n}getCards(){return this.cards}get topCard(){return this.cards[this.cards.length-1]}get isEmpty(){return this.cards.length===0}get size(){return this.cards.length}contains(e){return this.cards.includes(e)}addCard(e){this.cards.push(e),this.locations?.record(e.id,this)}removeCard(e){let t=this.cards.indexOf(e);t>-1&&(this.cards.splice(t,1),this.locations?.forget(e.id))}clear(){for(let e of this.cards)this.locations?.forget(e.id);this.cards.length=0}},Vg=class{listeners={};on(e,t){let n=this.listeners[e];n||(n=[],this.listeners[e]=n),n.push(t)}off(e,t){this.listeners[e]&&(this.listeners[e]=this.listeners[e].filter(e=>e!==t))}emit(e,t){let n=this.listeners[e];if(n)for(let e of[...n])e(t)}};function Hg(e){return e.transfers.flatMap(e=>e.cardIds)}var Ug=class{score$=new It(0);moves$=new It(0);undoDepth$=new It(0);get score(){return this.score$.value}set score(e){e!==this.score$.value&&this.score$.next(e)}get moves(){return this.moves$.value}set moves(e){e!==this.moves$.value&&this.moves$.next(e)}get undoDepth(){return this.undoDepth$.value}set undoDepth(e){e!==this.undoDepth$.value&&this.undoDepth$.next(e)}};function Wg(e,t,n){switch(e.kind){case`none`:return!1;case`top-only`:return n.topCard===t;case`any-face-up`:return t.faceUp;case`run`:return t.faceUp&&Gg(n,t,e.adjacent)}}function Gg(e,t,n){let r=e.getCards(),i=r.indexOf(t);if(i===-1)return!1;for(let e=i;e<r.length-1;e++)if(!r[e].faceUp||!n(r[e],r[e+1]))return!1;return!0}function Kg(e,t,n){switch(e){case`always-down`:return n;case`always-up`:return t.faceKey;case`card`:return t.faceUp?t.faceKey:n}}function qg(e,t,n){return e.capacity===void 0||t.size+n<=e.capacity}var Jg={scoreDelta:0,flippedCardIds:[]},Yg=class extends Vg{state=new Ug;locations=new zg;pilesMap=new Map;pilesByRoleMap=new Map;history=[];relocationListeners=new Set;zones;registry;autoMoveRoles;constructor(e){super(),this.zones=e.zones,this.registry=e.registry,this.autoMoveRoles=e.autoMoveRoles;for(let e of this.zones()){let t=new Bg(e.id,e.role,this.locations);this.pilesMap.set(t.id,t);let n=this.pilesByRoleMap.get(e.role)??[];n.push(t),this.pilesByRoleMap.set(e.role,n)}}get dropTargetPiles(){return this.zones().filter(e=>e.accept!==null).map(e=>this.requirePile(e.id))}get piles(){return[...this.pilesMap.values()]}pilesOfRole(e){return this.pilesByRoleMap.get(e)??[]}getPileById(e){return this.pilesMap.get(e)}requirePile(e){let t=this.pilesMap.get(e);if(!t)throw Error(`No zone declares a pile with id: ${e}`);return t}getCardById(e){return this.registry.get(e)}get cardIds(){return this.registry.ids()}get cardsInPlay(){return this.registry.size}getPileContainingCard(e){return this.locations.get(e)}zoneFor(e){let t=this.zones();return this.zoneIndex?.source!==t&&(this.zoneIndex={source:t,byId:new Map(t.map(e=>[e.id,e]))}),this.zoneIndex.byId.get(e)}zoneIndex=null;board={pile:e=>this.getPileById(e),pilesByRole:e=>this.pilesOfRole(e),emptyCount:e=>this.pilesOfRole(e).filter(e=>e.isEmpty).length};resetPiles(){for(let e of this.pilesMap.values())e.clear()}canMoveCardToPile(e,t){return this.resolveMove(e,t)!==null}resolveMove(e,t){let n=this.getCardById(e),r=this.getPileById(t),i=this.getPileContainingCard(e),a=this.zoneFor(t);if(!n||!r||!i||!a?.accept||i.id===t||!n.faceUp)return null;let o=this.zoneFor(i.id);if(!o||!Wg(o.grab,n,i))return null;let s=i.getCards(),c=s.slice(s.indexOf(n));return qg(a,r,c.length)&&a.accept({card:n,movingStack:c,sourcePile:i,targetPile:r,board:this.board})?{movingStack:c,sourcePile:i,targetPile:r}:null}moveCardToPile(e,t){let n=this.resolveMove(e,t);if(!n)return!1;this.state.moves++;for(let e of n.movingStack)n.sourcePile.removeCard(e),n.targetPile.addCard(e);let r=this.applyMoveEffects(n);return this.record({kind:`move`,transfers:[{cardIds:n.movingStack.map(e=>e.id),fromPileId:n.sourcePile.id,toPileId:n.targetPile.id,faceUpBefore:!0},...r.followUpTransfers??[]],scoreDelta:r.scoreDelta,flippedCardIds:r.flippedCardIds}),this.afterMove(n),!0}applyMoveEffects(e){return Jg}afterMove(e){}autoMoveCard(e){let t=this.getPileContainingCard(e);for(let n of this.autoMoveRoles)for(let r of this.pilesOfRole(n))if(r.id!==t?.id&&this.moveCardToPile(e,r.id))return!0;return!1}undo(){let e=this.history.pop();if(this.state.undoDepth=this.history.length,!e)return!1;for(let t of e.flippedCardIds){let e=this.getCardById(t);e&&(e.faceUp=!1)}for(let t of[...e.transfers].reverse())this.reverseTransfer(t);return this.state.score=Math.max(0,this.state.score-e.scoreDelta),this.state.moves--,this.afterUndo(e),this.announceRelocation(e),!0}reverseTransfer(e){let t=this.getPileById(e.fromPileId),n=this.getPileById(e.toPileId);if(!(!t||!n))for(let r of e.cardIds){let i=this.getCardById(r);i&&(n.removeCard(i),i.faceUp=e.faceUpBefore,t.addCard(i))}}afterUndo(e){}get canUndo(){return this.history.length>0}record(e){this.history.push(e),this.state.undoDepth=this.history.length,this.announceRelocation(e)}onCardsRelocated(e){return this.relocationListeners.add(e),()=>this.relocationListeners.delete(e)}announceRelocation(e){let t=Hg(e);if(t.length!==0)for(let e of[...this.relocationListeners])e(t)}recordTransfers(e,t,n={}){this.record({kind:e,transfers:t,scoreDelta:n.scoreDelta??0,flippedCardIds:n.flippedCardIds??[]})}clearHistory(){this.history.length=0,this.state.undoDepth=0}isCardInteractable(e){let t=this.getPileContainingCard(e.id);return t?this.isCardInteractableInPile(e,t):!1}isCardInteractableInPile(e,t){let n=this.zoneFor(t.id);return n?Wg(n.grab,e,t):!1}isCardDraggable(e){let t=this.getPileContainingCard(e.id);return t?this.isCardDraggableInPile(e,t):!1}isCardDraggableInPile(e,t){let n=this.zoneFor(t.id);return n?.draggable?Wg(n.grab,e,t):!1}};function Xg(e,t=Math.random){for(let n=e.length-1;n>0;n--){let r=Math.floor(t()*(n+1));[e[n],e[r]]=[e[r],e[n]]}}var Zg=bg.filter(e=>e!==J.KING),Qg=class{registry;cardIds;random;constructor(e,t=jg,n=Math.random){this.registry=e,this.cardIds=t,this.random=n}createShuffledDeck(){let e=this.registerAllFaceDown();return Xg(e,this.random),e}dealOpeningLayout(e,t,n){for(let n=0;n<t.length;n++)for(let r=0;r<=n;r++){let i=e.pop();i&&(i.faceUp=r===n,t[n].addCard(i))}for(;e.length>0;){let t=e.pop();t&&(t.faceUp=!1,n.addCard(t))}}dealAlmostWin(e,t){this.registerAllFaceDown(),yg.forEach((n,r)=>{for(let t of Zg)this.placeFaceUp({suit:n,rank:t},e[r]);this.placeFaceUp({suit:n,rank:J.KING},t[r])})}registerAllFaceDown(){return this.cardIds.map(e=>{let t=this.registry.getOrCreate(e);return t.faceUp=!1,t})}placeFaceUp(e,t){let n=this.registry.get(wg(e));n&&(n.faceUp=!0,t.addCard(n))}},$g=()=>!0;function e_(...e){return t=>e.every(e=>e(t))}function t_(...e){return t=>e.some(e=>e(t))}function n_(e,t){return n=>n.targetPile.isEmpty?e(n):t(n)}function r_(e){return t=>e(t.card)}var i_=e=>e.movingStack.length===1;function a_(e){return t=>t.movingStack.length<=e(t)}function o_(e){return e.suit===q.HEART||e.suit===q.DIAMOND}function s_(e){return t=>t.rank===e}function c_(e,t){return t.rank===Sg(e.rank)&&o_(e)!==o_(t)}function l_(e,t){return e.suit===t.suit&&t.rank===Sg(e.rank)}var u_=e=>{let t=e.targetPile.topCard;return t?c_(t,e.card):!1},d_=e=>{let t=e.targetPile.topCard;return t?l_(t,e.card):!1},f_=e=>{let t=e.targetPile.topCard;return t?e.card.rank===Sg(t.rank):!1},p_=e=>{let t=e.targetPile.topCard;return t?e.card.suit===t.suit&&e.card.rank===xg(t.rank):!1},m_=e_(i_,n_(r_(s_(J.ACE)),p_)),Y={STOCK:`stock`,WASTE:`waste`,FOUNDATION:`foundation`,TABLEAU:`tableau`},h_=n_(r_(s_(J.KING)),u_),g_=m_;function __(e){switch(e){case Y.TABLEAU:return h_;case Y.FOUNDATION:return g_;default:return null}}var v_=`stock`,y_=`waste`;function b_(e){return`foundation-${e}`}function x_(e){return`tableau-${e}`}var S_={kind:`fan-down`,faceUpGap:45,faceDownGap:18,hoverExpansion:15};function C_(e){return{kind:`fan-right`,gap:55,maxVisible:e===1?1:3}}var w_={kind:`stacked`};function T_(e){let t=E_.get(e);return t||(t=D_(e),E_.set(e,t)),t}var E_=new Map;function D_(e){let t=[{id:v_,role:Y.STOCK,slot:{pileId:v_,column:0,row:0},layout:w_,accept:__(Y.STOCK),grab:{kind:`top-only`},draggable:!1,face:`always-down`,backgroundKey:`card-placeholder-full-border-reset`,emptyIsActionable:!0},{id:y_,role:Y.WASTE,slot:{pileId:y_,column:1,row:0},layout:C_(e),accept:__(Y.WASTE),grab:{kind:`top-only`},draggable:!0,face:`always-up`}];for(let e=0;e<4;e++){let n=b_(e);t.push({id:n,role:Y.FOUNDATION,slot:{pileId:n,column:3+e,row:0},layout:w_,accept:__(Y.FOUNDATION),grab:{kind:`top-only`},draggable:!0,face:`always-up`,backgroundKey:`card-placeholder-full-border-circle`})}for(let e=0;e<7;e++){let n=x_(e);t.push({id:n,role:Y.TABLEAU,slot:{pileId:n,column:e,row:1},layout:S_,accept:__(Y.TABLEAU),grab:{kind:`any-face-up`},draggable:!0,face:`card`,backgroundKey:`card-placeholder`})}return t}var O_=class e{static WASTE_TO_TABLEAU=5;static TO_FOUNDATION=10;static FOUNDATION_TO_TABLEAU=-15;static TABLEAU_FLIP_BONUS=5;static DRAW_ONE_RECYCLE_PENALTY=100;static DRAW_THREE_RECYCLE_PENALTY=20;moveScore(t,n){return t===Y.WASTE&&n===Y.TABLEAU?e.WASTE_TO_TABLEAU:t===Y.WASTE&&n===Y.FOUNDATION||t===Y.TABLEAU&&n===Y.FOUNDATION?e.TO_FOUNDATION:t===Y.FOUNDATION&&n===Y.TABLEAU?e.FOUNDATION_TO_TABLEAU:0}tableauFlipBonus(){return e.TABLEAU_FLIP_BONUS}recyclePenalty(t,n){return t===1?n>1?e.DRAW_ONE_RECYCLE_PENALTY:0:n>3?e.DRAW_THREE_RECYCLE_PENALTY:0}},k_=class extends Yg{stock;waste;foundations;tableaus;settings;recycleCount=0;initialDeck=[];dealer;scoring;constructor(e=jg,t=new O_,n=new Lg){let r=new Rg;super({zones:()=>T_(n.drawCount),registry:r,autoMoveRoles:[Y.FOUNDATION,Y.TABLEAU]}),this.settings=n,this.scoring=t,this.dealer=new Qg(r,e),this.stock=this.requirePile(v_),this.waste=this.requirePile(y_),this.foundations=this.pilesOfRole(Y.FOUNDATION),this.tableaus=this.pilesOfRole(Y.TABLEAU)}startNewGame(){this.beginGame(()=>{let e=this.dealer.createShuffledDeck();return this.initialDeck=[...e],e})}restartGame(){this.beginGame(()=>this.reuseInitialDeck())}beginGame(e){this.state.score=0,this.state.moves=0,this.recycleCount=0,this.clearHistory(),this.resetPiles(),this.settings.debug.almostWin?this.dealer.dealAlmostWin(this.foundations,this.tableaus):this.dealer.dealOpeningLayout(e(),this.tableaus,this.stock),this.emit(`game-reset`,void 0)}reuseInitialDeck(){return this.initialDeck.length===0&&(this.initialDeck=[...this.dealer.createShuffledDeck()]),this.initialDeck.map(e=>(e.faceUp=!1,e))}drawCardsFromStock(){this.stock.isEmpty&&this.waste.isEmpty||(this.state.moves++,this.stock.isEmpty?this.recycleWaste():this.drawFromStock())}drawFromStock(){let e=Math.min(this.settings.drawCount,this.stock.size),t=[];for(let n=0;n<e;n++){let e=this.stock.topCard;if(!e)break;this.stock.removeCard(e),e.faceUp=!0,this.waste.addCard(e),t.push(e)}this.recordTransfers(`draw`,[{cardIds:t.reverse().map(e=>e.id),fromPileId:this.stock.id,toPileId:this.waste.id,faceUpBefore:!1}])}recycleWaste(){let e=this.state.score;this.recycleCount++;let t=this.scoring.recyclePenalty(this.settings.drawCount,this.recycleCount);this.state.score=Math.max(0,this.state.score-t);let n=[...this.waste.getCards()],r=this.waste.topCard;for(;r;)this.waste.removeCard(r),r.faceUp=!1,this.stock.addCard(r),r=this.waste.topCard;this.recordTransfers(`recycle`,[{cardIds:n.map(e=>e.id),fromPileId:this.waste.id,toPileId:this.stock.id,faceUpBefore:!0}],{scoreDelta:this.state.score-e})}applyMoveEffects(e){let t=this.state.score;this.state.score=Math.max(0,this.state.score+this.scoring.moveScore(e.sourcePile.role,e.targetPile.role));let n=this.autoFlipExposedCard(e.sourcePile);return{scoreDelta:this.state.score-t,flippedCardIds:n?[n.id]:[]}}afterMove(){this.checkWinCondition()}afterUndo(e){e.kind===`recycle`&&this.recycleCount--}autoFlipExposedCard(e){if(e.role!==Y.TABLEAU)return;let t=e.topCard;if(!(!t||t.faceUp))return t.faceUp=!0,this.state.score+=this.scoring.tableauFlipBonus(),t}checkWinCondition(){let e=0;for(let t of this.foundations)e+=t.size;this.cardsInPlay>0&&e===this.cardsInPlay&&this.emit(`game-won`,void 0)}},A_=class{registry;cardIds;random;constructor(e,t=jg,n=Math.random){this.registry=e,this.cardIds=t,this.random=n}createShuffledDeck(){let e=this.cardIds.map(e=>{let t=this.registry.getOrCreate(e);return t.faceUp=!0,t});return Xg(e,this.random),e}get deckSize(){return this.cardIds.length}dealOpeningLayout(e,t){if(t.length===0)return;let n=0;for(;e.length>0;){let r=e.pop();if(!r)break;r.faceUp=!0,t[n].addCard(r),n=(n+1)%t.length}}dealAlmostWin(e,t){let n=this.cardIds.map(e=>{let t=this.registry.getOrCreate(e);return t.faceUp=!0,t}),r=new Map;for(let e of n){let t=r.get(e.suit)??[];t.push(e),r.set(e.suit,t)}let i=0;for(let n of r.values()){let r=[...n].sort((e,t)=>e.rank-t.rank),a=e[i%e.length],o=t[i%t.length];for(let e of r.slice(0,r.length-1))a.addCard(e);let s=r[r.length-1];s&&o.addCard(s),i++}}},X={CELL:`cell`,FOUNDATION:`foundation`,TABLEAU:`tableau`},j_={FREECELL:`freecell`,BAKERS:`bakers`,BAKERS_KINGS_ONLY:`bakers-kings-only`};function M_(e){let t=e.board.emptyCount(X.CELL),n=e.board.emptyCount(X.TABLEAU),r=e.targetPile.isEmpty?Math.max(0,n-1):n;return(t+1)*2**r}function N_(e){return e.board.emptyCount(X.CELL)+1}var P_={[j_.FREECELL]:{tableau:e_(n_($g,u_),a_(M_)),adjacent:c_},[j_.BAKERS]:{tableau:e_(n_($g,d_),a_(M_)),adjacent:l_},[j_.BAKERS_KINGS_ONLY]:{tableau:e_(n_(r_(s_(J.KING)),d_),a_(N_)),adjacent:l_}},F_=e_(i_,$g),I_=m_;function L_(e){return P_[e].adjacent}function R_(e,t){switch(e){case X.TABLEAU:return P_[t].tableau;case X.CELL:return F_;case X.FOUNDATION:return I_;default:return null}}function z_(e){return`cell-${e}`}function B_(e){return`foundation-${e}`}function V_(e){return`tableau-${e}`}var H_={kind:`fan-down`,faceUpGap:45,faceDownGap:45,hoverExpansion:15},U_={kind:`stacked`};function W_(e){let t=G_.get(e);return t||(t=K_(e),G_.set(e,t)),t}var G_=new Map;function K_(e){let t=[];for(let n=0;n<4;n++){let r=z_(n);t.push({id:r,role:X.CELL,slot:{pileId:r,column:n,row:0},layout:U_,capacity:1,accept:R_(X.CELL,e),grab:{kind:`top-only`},draggable:!0,face:`always-up`,backgroundKey:`card-placeholder`})}for(let n=0;n<4;n++){let r=B_(n);t.push({id:r,role:X.FOUNDATION,slot:{pileId:r,column:4+n,row:0},layout:U_,accept:R_(X.FOUNDATION,e),grab:{kind:`top-only`},draggable:!0,face:`always-up`,backgroundKey:`card-placeholder-full-border-circle`})}for(let n=0;n<8;n++){let r=V_(n);t.push({id:r,role:X.TABLEAU,slot:{pileId:r,column:n,row:1},layout:H_,accept:R_(X.TABLEAU,e),grab:{kind:`run`,adjacent:L_(e)},draggable:!0,face:`always-up`,backgroundKey:`card-placeholder`})}return t}var q_=class extends Yg{cells;foundations;tableaus;initialDeck=[];dealer;almostWin=!1;constructor(e=jg,t=Math.random,n=j_.FREECELL){let r=new Rg;super({zones:()=>W_(n),registry:r,autoMoveRoles:[X.FOUNDATION,X.TABLEAU,X.CELL]}),this.dealer=new A_(r,e,t),this.cells=this.pilesOfRole(X.CELL),this.foundations=this.pilesOfRole(X.FOUNDATION),this.tableaus=this.pilesOfRole(X.TABLEAU)}startNewGame(){this.beginGame(()=>{let e=this.dealer.createShuffledDeck();return this.initialDeck=[...e],e})}restartGame(){this.beginGame(()=>this.reuseInitialDeck())}beginGame(e){this.state.moves=0,this.clearHistory(),this.resetPiles(),this.almostWin?this.dealer.dealAlmostWin(this.foundations,this.tableaus):this.dealer.dealOpeningLayout(e(),this.tableaus),this.emit(`game-reset`,void 0)}reuseInitialDeck(){return this.initialDeck.length===0&&(this.initialDeck=[...this.dealer.createShuffledDeck()]),[...this.initialDeck]}afterMove(){let e=0;for(let t of this.foundations)e+=t.size;this.cardsInPlay>0&&e===this.cardsInPlay&&this.emit(`game-won`,void 0)}};function J_(e){if(e.length<13)return-1;let t=e.length-13,n=e.slice(t);if(n[0].rank!==J.KING||n[n.length-1].rank!==J.ACE)return-1;for(let e=0;e<n.length-1;e++)if(!n[e].faceUp||!l_(n[e],n[e+1]))return-1;return t}function Y_(e){let t=e.topCard;if(!(!t||t.faceUp))return t.faceUp=!0,t}function X_(e,t){let n=[],r=[];for(let i of e){let e=J_(i.getCards());if(e===-1)continue;let a=t.find(e=>e.isEmpty);if(!a)continue;let o=i.getCards().slice(e,e+13);for(let e of o)i.removeCard(e),a.addCard(e);n.push({cardIds:o.map(e=>e.id),fromPileId:i.id,toPileId:a.id,faceUpBefore:!0});let s=Y_(i);s&&r.push(s.id)}return{transfers:n,flippedCardIds:r}}var Z_={suits:yg,ranks:bg,copies:2};q.SPADE;var Q_={1:[q.SPADE],2:[q.SPADE,q.HEART],4:yg};function $_(e){let t=Q_[e];return{suits:t,ranks:bg,copies:8/t.length}}var ev=class{registry;cardIds;random;constructor(e,t=Ag(Z_),n=Math.random){this.registry=e,this.cardIds=t,this.random=n}createShuffledDeck(){let e=this.cardIds.map(e=>{let t=this.registry.getOrCreate(e);return t.faceUp=!1,t});return Xg(e,this.random),e}dealOpeningLayout(e,t,n){if(t.length===0)return;let r=Math.min(54,e.length);for(let n=0;n<r;n++){let r=e.pop();if(!r)break;r.faceUp=!1,t[n%t.length].addCard(r)}for(let e of t){let t=e.topCard;t&&(t.faceUp=!0)}for(;e.length>0;){let t=e.pop();if(!t)break;t.faceUp=!1,n.addCard(t)}}},Z={STOCK:`stock`,FOUNDATION:`foundation`,TABLEAU:`tableau`},tv=n_($g,f_);function nv(e){switch(e){case Z.TABLEAU:return tv;default:return null}}var rv=`stock`;function iv(e){return`foundation-${e}`}function av(e){return`tableau-${e}`}var ov={kind:`fan-down`,faceUpGap:45,faceDownGap:18,hoverExpansion:15},sv={kind:`stacked`};function cv(){return lv}var lv=uv();function uv(){let e=[{id:rv,role:Z.STOCK,slot:{pileId:rv,column:0,row:0},layout:sv,accept:nv(Z.STOCK),grab:{kind:`top-only`},draggable:!1,face:`always-down`,backgroundKey:`card-placeholder-full-border-reset`}];for(let t=0;t<8;t++){let n=iv(t);e.push({id:n,role:Z.FOUNDATION,slot:{pileId:n,column:2+t,row:0},layout:sv,accept:nv(Z.FOUNDATION),grab:{kind:`none`},draggable:!1,face:`always-up`,backgroundKey:`card-placeholder-full-border-circle`})}for(let t=0;t<10;t++){let n=av(t);e.push({id:n,role:Z.TABLEAU,slot:{pileId:n,column:t,row:1},layout:ov,accept:nv(Z.TABLEAU),grab:{kind:`run`,adjacent:l_},draggable:!0,face:`card`,backgroundKey:`card-placeholder`})}return e}var dv=class extends Yg{stock;foundations;tableaus;initialDeck=[];dealer;constructor(e=Ag(Z_),t=Math.random){let n=new Rg;super({zones:()=>cv(),registry:n,autoMoveRoles:[Z.TABLEAU]}),this.dealer=new ev(n,e,t),this.stock=this.requirePile(rv),this.foundations=this.pilesOfRole(Z.FOUNDATION),this.tableaus=this.pilesOfRole(Z.TABLEAU)}startNewGame(){this.beginGame(()=>{let e=this.dealer.createShuffledDeck();return this.initialDeck=[...e],e})}restartGame(){this.beginGame(()=>this.reuseInitialDeck())}beginGame(e){this.state.score=0,this.state.moves=0,this.clearHistory(),this.resetPiles(),this.dealer.dealOpeningLayout(e(),this.tableaus,this.stock),this.emit(`game-reset`,void 0)}reuseInitialDeck(){return this.initialDeck.length===0&&(this.initialDeck=[...this.dealer.createShuffledDeck()]),this.initialDeck.map(e=>(e.faceUp=!1,e))}get canDeal(){return!this.stock.isEmpty&&this.tableaus.every(e=>!e.isEmpty)}dealRow(){if(!this.canDeal)return!1;this.state.moves++;let e=[];for(let t of this.tableaus){let n=this.stock.topCard;if(!n)break;this.stock.removeCard(n),n.faceUp=!0,t.addCard(n),e.push({cardIds:[n.id],fromPileId:this.stock.id,toPileId:t.id,faceUpBefore:!1})}let t=X_(this.tableaus,this.foundations);return this.recordTransfers(`deal`,[...e,...t.transfers],{flippedCardIds:t.flippedCardIds}),this.checkWinCondition(),!0}applyMoveEffects(e){let t=e.sourcePile.role===Z.TABLEAU?Y_(e.sourcePile):void 0,n=X_(this.tableaus,this.foundations);return{scoreDelta:0,flippedCardIds:[...t?[t.id]:[],...n.flippedCardIds],followUpTransfers:n.transfers}}afterMove(){this.checkWinCondition()}checkWinCondition(){let e=this.foundations.reduce((e,t)=>e+t.size,0);this.cardsInPlay>0&&e===this.cardsInPlay&&this.emit(`game-won`,void 0)}},fv=class{registry;cardIds;random;constructor(e,t=jg,n=Math.random){this.registry=e,this.cardIds=t,this.random=n}createShuffledDeck(){let e=this.cardIds.map(e=>{let t=this.registry.getOrCreate(e);return t.faceUp=!1,t});return Xg(e,this.random),e}dealOpeningLayout(e,t){for(let n=0;n<t.length;n++){let r=n===0?1:5;for(let i=0;i<n+r;i++){let r=e.pop();if(!r)return;r.faceUp=i>=n,t[n].addCard(r)}}}},pv={FOUNDATION:`foundation`,TABLEAU:`tableau`},mv={YUKON:0,ALASKA:1,RUSSIAN:2},hv=mv.YUKON,gv={[mv.YUKON]:u_,[mv.ALASKA]:t_(p_,d_),[mv.RUSSIAN]:d_};function _v(e){return n_(r_(s_(J.KING)),gv[e])}var vv=m_;function yv(e,t){switch(e){case pv.TABLEAU:return _v(t);case pv.FOUNDATION:return vv;default:return null}}function bv(e){return`foundation-${e}`}function xv(e){return`tableau-${e}`}var Sv={kind:`fan-down`,faceUpGap:45,faceDownGap:18,hoverExpansion:15},Cv={kind:`stacked`};function wv(e){let t=Tv.get(e);return t||(t=Ev(e),Tv.set(e,t)),t}var Tv=new Map;function Ev(e){let t=[];for(let n=0;n<4;n++){let r=bv(n);t.push({id:r,role:pv.FOUNDATION,slot:{pileId:r,column:3+n,row:0},layout:Cv,accept:yv(pv.FOUNDATION,e),grab:{kind:`top-only`},draggable:!0,face:`always-up`,backgroundKey:`card-placeholder-full-border-circle`})}for(let n=0;n<7;n++){let r=xv(n);t.push({id:r,role:pv.TABLEAU,slot:{pileId:r,column:n,row:1},layout:Sv,accept:yv(pv.TABLEAU,e),grab:{kind:`any-face-up`},draggable:!0,face:`card`,backgroundKey:`card-placeholder`})}return t}var Dv=class extends Yg{foundations;tableaus;initialDeck=[];dealer;constructor(e=jg,t=Math.random,n=mv.YUKON){let r=new Rg;super({zones:()=>wv(n),registry:r,autoMoveRoles:[pv.FOUNDATION]}),this.dealer=new fv(r,e,t),this.foundations=this.pilesOfRole(pv.FOUNDATION),this.tableaus=this.pilesOfRole(pv.TABLEAU)}startNewGame(){this.beginGame(()=>{let e=this.dealer.createShuffledDeck();return this.initialDeck=[...e],e})}restartGame(){this.beginGame(()=>this.reuseInitialDeck())}beginGame(e){this.state.moves=0,this.clearHistory(),this.resetPiles(),this.dealer.dealOpeningLayout(e(),this.tableaus),this.emit(`game-reset`,void 0)}reuseInitialDeck(){return this.initialDeck.length===0&&(this.initialDeck=[...this.dealer.createShuffledDeck()]),this.initialDeck.map(e=>(e.faceUp=!1,e))}applyMoveEffects(e){let t=e.sourcePile.role===pv.TABLEAU?Y_(e.sourcePile):void 0;return{scoreDelta:0,flippedCardIds:t?[t.id]:[]}}afterMove(){let e=this.foundations.reduce((e,t)=>e+t.size,0);this.cardsInPlay>0&&e===this.cardsInPlay&&this.emit(`game-won`,void 0)}},Ov=class{registry;cardIds;random;constructor(e,t=jg,n=Math.random){this.registry=e,this.cardIds=t,this.random=n}createShuffledDeck(){let e=this.cardIds.map(e=>{let t=this.registry.getOrCreate(e);return t.faceUp=!0,t});return Xg(e,this.random),e}dealOpeningLayout(e,t,n){if(t.length===0)return;let r=Math.min(e.length,t.length*6);for(let n=0;n<r;n++){let r=e.pop();if(!r)break;r.faceUp=!0,t[n%t.length].addCard(r)}for(let t of n){let n=e.pop();if(!n)break;n.faceUp=!0,t.addCard(n)}}},Q={CELL:`cell`,FOUNDATION:`foundation`,TABLEAU:`tableau`};function kv(e){return e.board.emptyCount(Q.CELL)+1}var Av=e_(n_(r_(s_(J.KING)),d_),a_(kv)),jv=e_(i_,$g),Mv=m_;function Nv(e){switch(e){case Q.TABLEAU:return Av;case Q.CELL:return jv;case Q.FOUNDATION:return Mv;default:return null}}var Pv=2;function Fv(e){return`cell-${e}`}function Iv(e){return`foundation-${e}`}function Lv(e){return`tableau-${e}`}var Rv={kind:`fan-down`,faceUpGap:45,faceDownGap:45,hoverExpansion:15},zv={kind:`stacked`};function Bv(){return Vv}var Vv=Hv();function Hv(){let e=[];for(let t=0;t<8;t++){let n=Fv(t);e.push({id:n,role:Q.CELL,slot:{pileId:n,column:t,row:0},layout:zv,capacity:1,accept:Nv(Q.CELL),grab:{kind:`top-only`},draggable:!0,face:`always-up`,backgroundKey:`card-placeholder`})}for(let t=0;t<4;t++){let n=Iv(t);e.push({id:n,role:Q.FOUNDATION,slot:{pileId:n,column:8+t,row:0},layout:zv,accept:Nv(Q.FOUNDATION),grab:{kind:`top-only`},draggable:!0,face:`always-up`,backgroundKey:`card-placeholder-full-border-circle`})}for(let t=0;t<8;t++){let n=Lv(t);e.push({id:n,role:Q.TABLEAU,slot:{pileId:n,column:Pv+t,row:1},layout:Rv,accept:Nv(Q.TABLEAU),grab:{kind:`run`,adjacent:l_},draggable:!0,face:`always-up`,backgroundKey:`card-placeholder`})}return e}var Uv=class extends Yg{cells;foundations;tableaus;initialDeck=[];dealer;constructor(e=jg,t=Math.random){let n=new Rg;super({zones:()=>Bv(),registry:n,autoMoveRoles:[Q.FOUNDATION,Q.TABLEAU,Q.CELL]}),this.dealer=new Ov(n,e,t),this.cells=this.pilesOfRole(Q.CELL),this.foundations=this.pilesOfRole(Q.FOUNDATION),this.tableaus=this.pilesOfRole(Q.TABLEAU)}startNewGame(){this.beginGame(()=>{let e=this.dealer.createShuffledDeck();return this.initialDeck=[...e],e})}restartGame(){this.beginGame(()=>this.reuseInitialDeck())}beginGame(e){this.state.moves=0,this.clearHistory(),this.resetPiles(),this.dealer.dealOpeningLayout(e(),this.tableaus,this.cells),this.emit(`game-reset`,void 0)}reuseInitialDeck(){return this.initialDeck.length===0&&(this.initialDeck=[...this.dealer.createShuffledDeck()]),[...this.initialDeck]}afterMove(){let e=0;for(let t of this.foundations)e+=t.size;this.cardsInPlay>0&&e===this.cardsInPlay&&this.emit(`game-won`,void 0)}},Wv=class{registry;cardIds;random;constructor(e,t=jg,n=Math.random){this.registry=e,this.cardIds=t,this.random=n}createShuffledDeck(){let e=this.cardIds.map(e=>{let t=this.registry.getOrCreate(e);return t.faceUp=!1,t});return Xg(e,this.random),e}dealOpeningLayout(e,t,n){for(let n=0;n<t.length;n++){let r=n<4?3:0;for(let i=0;i<7;i++){let a=e.pop();if(!a)return;a.faceUp=i>=r,t[n].addCard(a)}}for(;e.length>0;){let t=e.pop();if(!t)break;t.faceUp=!1,n.addCard(t)}}},$={STOCK:`stock`,FOUNDATION:`foundation`,TABLEAU:`tableau`},Gv=n_(r_(s_(J.KING)),d_);function Kv(e){switch(e){case $.TABLEAU:return Gv;default:return null}}var qv=`stock`;function Jv(e){return`foundation-${e}`}function Yv(e){return`tableau-${e}`}var Xv={kind:`fan-down`,faceUpGap:45,faceDownGap:18,hoverExpansion:15},Zv={kind:`stacked`};function Qv(){return $v}var $v=ey();function ey(){let e=[{id:qv,role:$.STOCK,slot:{pileId:qv,column:0,row:0},layout:Zv,accept:Kv($.STOCK),grab:{kind:`top-only`},draggable:!1,face:`always-down`,backgroundKey:`card-placeholder`}];for(let t=0;t<4;t++){let n=Jv(t);e.push({id:n,role:$.FOUNDATION,slot:{pileId:n,column:3+t,row:0},layout:Zv,accept:Kv($.FOUNDATION),grab:{kind:`none`},draggable:!1,face:`always-up`,backgroundKey:`card-placeholder-full-border-circle`})}for(let t=0;t<7;t++){let n=Yv(t);e.push({id:n,role:$.TABLEAU,slot:{pileId:n,column:t,row:1},layout:Xv,accept:Kv($.TABLEAU),grab:{kind:`any-face-up`},draggable:!0,face:`card`,backgroundKey:`card-placeholder`})}return e}var ty=class extends Yg{stock;foundations;tableaus;initialDeck=[];dealer;constructor(e=jg,t=Math.random){let n=new Rg;super({zones:()=>Qv(),registry:n,autoMoveRoles:[$.TABLEAU]}),this.dealer=new Wv(n,e,t),this.stock=this.requirePile(qv),this.foundations=this.pilesOfRole($.FOUNDATION),this.tableaus=this.pilesOfRole($.TABLEAU)}startNewGame(){this.beginGame(()=>{let e=this.dealer.createShuffledDeck();return this.initialDeck=[...e],e})}restartGame(){this.beginGame(()=>this.reuseInitialDeck())}beginGame(e){this.state.score=0,this.state.moves=0,this.clearHistory(),this.resetPiles(),this.dealer.dealOpeningLayout(e(),this.tableaus,this.stock),this.emit(`game-reset`,void 0)}reuseInitialDeck(){return this.initialDeck.length===0&&(this.initialDeck=[...this.dealer.createShuffledDeck()]),this.initialDeck.map(e=>(e.faceUp=!1,e))}get canDeal(){return!this.stock.isEmpty}dealStock(){if(!this.canDeal)return!1;this.state.moves++;let e=[];for(let t of this.tableaus.slice(0,3)){let n=this.stock.topCard;if(!n)break;this.stock.removeCard(n),n.faceUp=!0,t.addCard(n),e.push({cardIds:[n.id],fromPileId:this.stock.id,toPileId:t.id,faceUpBefore:!1})}let t=X_(this.tableaus,this.foundations);return this.recordTransfers(`deal`,[...e,...t.transfers],{flippedCardIds:t.flippedCardIds}),this.checkWinCondition(),!0}applyMoveEffects(e){let t=e.sourcePile.role===$.TABLEAU?Y_(e.sourcePile):void 0,n=X_(this.tableaus,this.foundations);return{scoreDelta:0,flippedCardIds:[...t?[t.id]:[],...n.flippedCardIds],followUpTransfers:n.transfers}}afterMove(){this.checkWinCondition()}checkWinCondition(){let e=this.foundations.reduce((e,t)=>e+t.size,0);this.cardsInPlay>0&&e===this.cardsInPlay&&this.emit(`game-won`,void 0)}};function ny(e,t){let n=e[t.id];return t.choices.some(e=>e.value===n)?n:t.defaultValue}var ry={id:`drawCount`,label:`Draw Mode`,description:`Draw 1 is easier; Draw 3 is the standard Solitaire challenge.`,choices:[{value:1,label:`Draw 1`},{value:3,label:`Draw 3`}],defaultValue:3},iy={id:`almostWin`,label:`Almost Win Mode`,description:`Pre-populates foundations so that dragging the remaining Kings will win the game.`,choices:[{value:0,label:`Normal`},{value:1,label:`Almost Win`}],defaultValue:0,debugOnly:!0},ay={id:`emptyColumns`,label:`Empty Columns`,description:`Kings Only is the harder variant: it also caps how many cards move at once, because a run can no longer be staged in an empty column.`,choices:[{value:0,label:`Any Card`},{value:1,label:`Kings Only`}],defaultValue:0},oy={id:`suitCount`,label:`Suits`,description:`Always 104 cards — fewer suits means more copies of each, and a far gentler game.`,choices:[{value:1,label:`1 Suit`},{value:2,label:`2 Suits`},{value:4,label:`4 Suits`}],defaultValue:4},sy={id:`variant`,label:`Variant`,description:`Alaska and Russian Solitaire deal like Yukon but build the columns by suit rather than by alternating color.`,choices:[{value:mv.YUKON,label:`Yukon`},{value:mv.ALASKA,label:`Alaska`},{value:mv.RUSSIAN,label:`Russian Solitaire`}],defaultValue:mv.YUKON},cy=[{id:`klondike`,name:`Klondike`,options:[ry,iy],create:e=>{let t=new Lg;t.setDrawCount(ny(e,ry)===1?1:3),t.debug.setAlmostWin(ny(e,iy)===1);let n=new k_(void 0,void 0,t);return n.startNewGame(),{game:n}}},{id:`freecell`,name:`FreeCell`,options:[],create:()=>{let e=new q_(void 0,void 0,j_.FREECELL);return e.startNewGame(),{game:e}}},{id:`spider`,name:`Spider`,options:[oy],create:e=>{let t=new dv(Ag($_(ny(e,oy))));return t.startNewGame(),{game:t}}},{id:`yukon`,name:`Yukon`,options:[sy],create:e=>{let t=new Dv(void 0,void 0,ny(e,sy));return t.startNewGame(),{game:t}}},{id:`bakers`,name:`Baker's Game`,options:[ay],create:e=>{let t=new q_(void 0,void 0,ny(e,ay)===1?j_.BAKERS_KINGS_ONLY:j_.BAKERS);return t.startNewGame(),{game:t}}},{id:`eightoff`,name:`Eight Off`,options:[],create:()=>{let e=new Uv;return e.startNewGame(),{game:e}}},{id:`scorpion`,name:`Scorpion`,options:[],create:()=>{let e=new ty;return e.startNewGame(),{game:e}}}];function ly(e){return cy.find(t=>t.id===e)??cy[0]}var uy=`fsolitaire-game`,dy=`fsolitaire-game-options`;function fy(){if(typeof localStorage>`u`)return{};try{let e=localStorage.getItem(dy);if(!e)return{};let t=JSON.parse(e);return typeof t==`object`&&t?t:{}}catch(e){return console.warn(`Failed to read the stored rule options:`,e),{}}}function py(){if(typeof location>`u`)return null;let e=location.hash.replace(/^#/,``);return cy.some(t=>t.id===e)?e:null}function my(){if(typeof localStorage>`u`)return null;try{return localStorage.getItem(uy)}catch(e){return console.warn(`Failed to read the selected game:`,e),null}}function hy(){return ly(py()??my()).id}var gy=class e{destroyRef=S(Na);games=cy;selectedIdSignal=O(hy());selectedId=this.selectedIdSignal.asReadonly();optionsSignal=O(fy());sessionSignal=O(ly(hy()).create(fy()[hy()]??{}));session=this.sessionSignal.asReadonly();options=K(()=>ly(this.selectedIdSignal()).options);optionValues=K(()=>this.valuesFor(this.selectedIdSignal(),this.optionsSignal()));valueOf(e){let t=this.options().find(t=>t.id===e);return t?ny(this.optionValues(),t):null}setOption(e,t){let n=this.selectedEntry,r=n.options.find(t=>t.id===e);if(!r||!r.choices.some(e=>e.value===t)||ny(this.optionValues(),r)===t)return;let i={...this.optionsSignal(),[n.id]:{...this.valuesFor(n.id,this.optionsSignal()),[e]:t}};this.optionsSignal.set(i),this.persistOptions(i),this.sessionSignal.set(n.create(i[n.id]))}valuesFor(e,t){let n=t[e]??{},r={};for(let t of ly(e).options)r[t.id]=ny(n,t);return r}persistOptions(e){if(!(typeof localStorage>`u`))try{localStorage.setItem(dy,JSON.stringify(e))}catch(e){console.warn(`Failed to save the rule options:`,e)}}constructor(){if(this.writeHash(this.selectedIdSignal()),typeof window>`u`)return;let e=()=>{let e=py();e&&this.select(e)};window.addEventListener(`hashchange`,e),this.destroyRef.onDestroy(()=>{window.removeEventListener(`hashchange`,e)})}get selectedEntry(){return ly(this.selectedIdSignal())}select(e){let t=ly(e);t.id!==this.selectedIdSignal()&&(this.selectedIdSignal.set(t.id),this.sessionSignal.set(t.create(this.valuesFor(t.id,this.optionsSignal()))),this.persist(t.id),this.writeHash(t.id))}writeHash(e){typeof location>`u`||location.hash===`#${e}`||(location.hash=e)}persist(e){if(!(typeof localStorage>`u`))try{localStorage.setItem(uy,e)}catch(e){console.warn(`Failed to save the selected game:`,e)}}static ɵfac=function(t){return new(t||e)};static ɵprov=y({token:e,factory:e.ɵfac,providedIn:`root`})},_y=class e{secondsElapsed=O(0);intervalHandle=null;timerText=K(()=>{let e=this.secondsElapsed(),t=Math.floor(e/60),n=e%60;return`${t.toString().padStart(2,`0`)}:${n.toString().padStart(2,`0`)}`});constructor(){S(Na).onDestroy(()=>this.stop())}get isRunning(){return this.intervalHandle!==null}start(){this.intervalHandle||=setInterval(()=>{this.secondsElapsed.update(e=>e+1)},1e3)}stop(){this.intervalHandle&&=(clearInterval(this.intervalHandle),null)}reset(){this.stop(),this.secondsElapsed.set(0)}static ɵfac=function(t){return new(t||e)};static ɵprov=y({token:e,factory:e.ɵfac,providedIn:`root`})},vy=class e{isOpen=O(!1);message=O(``);pendingAction=null;request(e,t){this.pendingAction=t,this.message.set(e),this.isOpen.set(!0)}accept(){let e=this.pendingAction;this.pendingAction=null,this.isOpen.set(!1),e?.()}cancel(){this.pendingAction=null,this.isOpen.set(!1)}static ɵfac=function(t){return new(t||e)};static ɵprov=y({token:e,factory:e.ɵfac,providedIn:`root`})},yy=class e{catalog=S(gy);timer=S(_y);confirmation=S(vy);presentation=S(fg);score=O(0);moves=O(0);undoDepth=O(0);ruleOptions=K(()=>this.catalog.options().filter(e=>!e.debugOnly));debugOptions=K(()=>this.catalog.options().filter(e=>e.debugOnly));optionValues=this.catalog.optionValues;cardBack=gg(this.presentation.cardBackStyle$,{initialValue:`card-back-blue`});isGameWon=O(!1);timerText=this.timer.timerText;games=this.catalog.games;selectedGameId=this.catalog.selectedId;canUndo=K(()=>this.undoDepth()>0&&!this.isGameWon());constructor(){xo(e=>{let{game:t}=this.catalog.session(),n=[t.state.score$.subscribe(e=>this.score.set(e)),t.state.moves$.subscribe(e=>this.moves.set(e)),t.state.undoDepth$.subscribe(e=>this.undoDepth.set(e))],r=()=>{this.isGameWon.set(!0),this.timer.stop()};t.on(`game-won`,r),e(()=>{n.forEach(e=>e.unsubscribe()),t.off(`game-won`,r)})}),xo(()=>{let e=this.moves(),t=this.isGameWon();e>0&&!t&&!this.timer.isRunning&&this.timer.start()})}get gameModel(){return this.catalog.session().game}selectGame(e){e!==this.selectedGameId()&&this.confirmIfInProgress(`Are you sure you want to switch games? Your current progress will be lost.`,()=>{this.catalog.select(e),this.startFreshSession()})}restartGame(){this.confirmIfInProgress(`Are you sure you want to restart this game? Your current progress will be lost.`,()=>{this.gameModel.restartGame(),this.startFreshSession()})}startNewGame(){this.confirmIfInProgress(`Are you sure you want to start a new game? Your current progress will be lost.`,()=>{this.gameModel.startNewGame(),this.startFreshSession()})}setRuleOption(e,t){this.catalog.valueOf(e)!==t&&this.confirmIfInProgress(`Changing this will deal a new game. Are you sure you want to proceed?`,()=>{this.catalog.setOption(e,t),this.startFreshSession()})}undo(){this.canUndo()&&this.gameModel.undo()}setCardBack(e){this.presentation.setCardBackStyle(e)}startFreshSession(){this.isGameWon.set(!1),this.timer.reset()}confirmIfInProgress(e,t){this.moves()>0&&!this.isGameWon()?this.confirmation.request(e,t):t()}static ɵfac=function(t){return new(t||e)};static ɵprov=y({token:e,factory:e.ɵfac,providedIn:`root`})},by={klondike:{title:`Klondike Solitaire`,wikipediaUrl:`https://en.wikipedia.org/wiki/Klondike_(solitaire)`,screenshot:{url:`./docs/screenshots/klondike/overview.png`,caption:`Klondike initial deal showing seven tableau columns, stock, waste, and four foundation piles.`,altText:`Klondike solitaire board overview`},summary:{objective:`Build all 52 cards onto the four foundation piles by suit in ascending order from Ace to King.`,winCondition:`All cards are transferred to the foundations (Ace through King for Hearts, Diamonds, Clubs, and Spades).`,quickOverview:`Klondike is the classic solitaire game. Cards are dealt into 7 tableau columns with increasing hidden cards. Players draw cards from the stock to the waste pile and build tableau runs in descending rank with alternating colors.`},detailedRules:{layout:[`Tableau: 7 columns containing 1 to 7 cards respectively (top card face-up).`,`Foundations: 4 suit piles, initially empty.`,`Stock: Remaining cards face-down in top-left.`,`Waste: Face-up pile where drawn cards land.`],cardMovement:[`Cards on the waste pile or tableau columns can be moved to foundations or other tableau columns.`,`Face-up sequences of cards in alternating colors can be moved together as a unit.`,`Only a King (or a stack headed by a King) can be placed into an empty tableau column.`],sequenceBuilding:[`Foundations: Built UP in the SAME SUIT from Ace (1) to King (13).`,`Tableau: Built DOWN in ALTERNATING COLORS (e.g., Red 9 on Black 10).`],specialRules:[`Draw Mode: Configurable between Draw 1 (draw one card at a time from stock) and Draw 3 (draw three cards at a time).`,`Stock Recycle: When the stock empties, clicking it recycles cards from the waste pile back into the stock.`]},settingsAndVariants:[{optionId:`drawCount`,choicesExplanation:[{value:1,effect:`Easier mode. Flips 1 card at a time, making every stock card directly accessible.`},{value:3,effect:`Standard challenge. Flips 3 cards at a time; only the top card of the 3 is immediately playable.`}]}]},freecell:{title:`FreeCell`,wikipediaUrl:`https://en.wikipedia.org/wiki/FreeCell`,screenshot:{url:`./docs/screenshots/freecell/overview.png`,caption:`FreeCell board with 4 free cells top-left, 4 foundations top-right, and 8 fully face-up tableau columns.`,altText:`FreeCell board overview`},summary:{objective:`Move all 52 cards to the four foundation piles, built up by suit from Ace to King.`,winCondition:`All 52 cards are sorted into their respective suit foundations from Ace through King.`,quickOverview:`FreeCell is a highly strategic solitaire game played with all cards dealt face-up into 8 columns. Four free cells act as temporary storage locations while you arrange columns in descending order with alternating colors.`},detailedRules:{layout:[`Free Cells: 4 single-card holding cells at top-left.`,`Foundations: 4 suit piles at top-right, initially empty.`,`Tableau: 8 columns with all 52 cards dealt completely face-up.`],cardMovement:[`Any single card can be placed into an empty Free Cell.`,`Any card can start an empty tableau column.`,`Multi-card moves (supermoves) simulate moving cards through open Free Cells and empty tableau columns.`],sequenceBuilding:[`Foundations: Built UP in SAME SUIT from Ace to King.`,`Tableau: Built DOWN in ALTERNATING COLORS.`],specialRules:[`Supermove Capacity Formula: Maximum cards moved at once is (Free Cells + 1) * 2^(Empty Tableaus).`,`No Stock: FreeCell has no stock or hidden cards; all cards are visible from the deal.`]},settingsAndVariants:[]},spider:{title:`Spider Solitaire`,wikipediaUrl:`https://en.wikipedia.org/wiki/Spider_(solitaire)`,screenshot:{url:`./docs/screenshots/spider/overview.png`,caption:`Spider board featuring 10 tableau columns and stock deals at bottom-left.`,altText:`Spider solitaire board overview`},summary:{objective:`Assemble 8 full same-suit sequences from King down to Ace on the tableau to clear them.`,winCondition:`All 8 13-card sequences (King to Ace of same suit) are completed and removed from the board.`,quickOverview:`Spider uses two 52-card decks (104 cards total). Players build descending sequences in 10 tableau columns. Completed King-to-Ace same-suit runs are automatically cleared to foundation slots.`},detailedRules:{layout:[`Tableau: 10 columns (first 4 columns have 6 cards, remaining 6 have 5 cards; top card face-up).`,`Stock: Holds remaining 50 cards (dealt 10 cards at a time, one to each column).`,`Foundations: Holds completed 13-card sequences.`],cardMovement:[`Cards can be placed on any tableau card of next higher rank, regardless of suit (e.g. 7 of Clubs on 8 of Hearts).`,`Only same-suit runs can be moved together as a stack.`,`Any card or valid same-suit run can fill an empty tableau column.`],sequenceBuilding:[`Tableau: Built DOWN by RANK (regardless of suit for single cards, same suit for multi-card moves).`,`Completion: Complete King-down-to-Ace sequence of the SAME suit automatically moves to foundations.`],specialRules:[`Stock Dealing: Dealing from stock places 1 face-up card on top of every tableau column.`,`Empty Column Requirement: All tableau columns must contain at least 1 card before dealing from the stock.`]},settingsAndVariants:[{optionId:`suitCount`,choicesExplanation:[{value:1,effect:`Easiest mode (104 Spades). Every run is in suit, allowing easy multi-card moves and sequence builds.`},{value:2,effect:`Medium mode (Spades & Hearts). Requires balancing mixed-suit building with same-suit runs.`},{value:4,effect:`Classic hard challenge (Spades, Hearts, Diamonds, Clubs). Highly tactical and tight sequence control.`}]}]},yukon:{title:`Yukon Solitaire`,wikipediaUrl:`https://en.wikipedia.org/wiki/Yukon_(solitaire)`,screenshot:{url:`./docs/screenshots/yukon/overview.png`,caption:`Yukon board featuring 7 tableau columns with face-down and face-up card groups, and 4 foundations.`,altText:`Yukon solitaire board overview`},summary:{objective:`Build all 52 cards onto four foundations by suit from Ace to King.`,winCondition:`All cards are placed in order on the foundations.`,quickOverview:`Yukon is a fast-paced game with no stock pile. All cards are dealt to the tableau at the start. The signature rule of Yukon is that ANY face-up card can be moved regardless of how many cards are sitting on top of it.`},detailedRules:{layout:[`Tableau: 7 columns (column 1 has 1 face-up card; columns 2-7 have 1-6 face-down cards plus 5 face-up cards).`,`Foundations: 4 suit piles at top-right, built Ace to King.`],cardMovement:[`Any face-up card anywhere in a column can be grabbed and moved, taking all cards above it along for the ride.`,`The grabbed card must land on a valid receiving card according to the variant build rule.`,`Only Kings (and stacks led by a King) can fill empty tableau columns.`],sequenceBuilding:[`Foundations: Built UP in SAME SUIT from Ace to King.`,`Tableau (Yukon): Built DOWN in ALTERNATING COLORS.`,`Tableau (Alaska): Built UP or DOWN in SAME SUIT.`,`Tableau (Russian): Built DOWN in SAME SUIT.`],specialRules:[`No Staging Penalty: Stacks being moved do not need to be in sequence; only the targeted card and destination card must match placement rules.`]},settingsAndVariants:[{optionId:`variant`,choicesExplanation:[{value:mv.YUKON,effect:`Standard game. Tableau columns build down in alternating colors.`},{value:mv.ALASKA,effect:`Gentler suit variant. Tableau columns build either UP or DOWN in the SAME SUIT.`},{value:mv.RUSSIAN,effect:`Hardest variant. Tableau columns build DOWN in the SAME SUIT.`}]}]},bakers:{title:`Baker's Game`,wikipediaUrl:`https://en.wikipedia.org/wiki/Baker%27s_Game`,screenshot:{url:`./docs/screenshots/bakers/overview.png`,caption:`Baker's Game board with 4 free cells, 4 foundations, and 8 same-suit building tableau columns.`,altText:`Baker's Game board overview`},summary:{objective:`Move all 52 cards to the foundations from Ace to King by suit.`,winCondition:`All four foundations completed from Ace through King.`,quickOverview:`Baker's Game is the direct predecessor to FreeCell. It shares FreeCell's deal and 4 free cells, but requires tableau columns to be built strictly in the SAME SUIT rather than alternating colors.`},detailedRules:{layout:[`Free Cells: 4 single-card holding cells.`,`Foundations: 4 suit piles, Ace to King.`,`Tableau: 8 columns, all 52 cards dealt face-up.`],cardMovement:[`Single cards can move to any empty free cell.`,`Supermove limits apply based on available free cells and empty columns.`,`Cards on tableau columns must build DOWN in the SAME SUIT.`],sequenceBuilding:[`Foundations: Built UP in SAME SUIT from Ace to King.`,`Tableau: Built DOWN in SAME SUIT (e.g. 9 of Spades on 10 of Spades).`],specialRules:[`Empty Columns Rule: Configurable between Any Card or Kings Only.`,`Kings Only Staging Limit: When empty columns accept Kings only, empty columns contribute zero staging capacity for supermoves, making multi-card moves strictly (Free Cells + 1).`]},settingsAndVariants:[{optionId:`emptyColumns`,choicesExplanation:[{value:0,effect:`Standard Baker's Game. Any card can enter an empty column, providing full supermove staging capacity.`},{value:1,effect:`Harder variant. Only Kings can enter empty columns, restricting supermoves to (Free Cells + 1).`}]}]},eightoff:{title:`Eight Off`,wikipediaUrl:`https://en.wikipedia.org/wiki/Eight_Off`,screenshot:{url:`./docs/screenshots/eightoff/overview.png`,caption:`Eight Off board featuring 8 free cells, 4 foundations, and 8 tableau columns.`,altText:`Eight Off board overview`},summary:{objective:`Move all 52 cards to the four suit foundation piles, built Ace to King.`,winCondition:`All cards transferred to suit foundations Ace through King.`,quickOverview:`Eight Off is a cousin of FreeCell and Baker's Game featuring 8 free cells instead of 4. Four of the cells start occupied by cards during deal. Tableau columns build strictly down in the same suit, and empty columns accept Kings only.`},detailedRules:{layout:[`Free Cells: 8 single-card holding cells (4 dealt with cards at start, 4 empty).`,`Foundations: 4 suit piles, initially empty.`,`Tableau: 8 columns of 6 cards each, all dealt face-up.`],cardMovement:[`Single cards can move to any empty free cell.`,`Tableau columns build strictly DOWN in the SAME SUIT.`,`Only Kings can fill an empty tableau column.`],sequenceBuilding:[`Foundations: Built UP in SAME SUIT from Ace to King.`,`Tableau: Built DOWN in SAME SUIT.`],specialRules:[`Supermove Capacity: Because empty columns accept Kings only, multi-card supermoves are strictly capped at (Free Cells + 1).`]},settingsAndVariants:[]},scorpion:{title:`Scorpion Solitaire`,wikipediaUrl:`https://en.wikipedia.org/wiki/Scorpion_(solitaire)`,screenshot:{url:`./docs/screenshots/scorpion/overview.png`,caption:`Scorpion board featuring 7 tableau columns, stock reserve, and foundation area.`,altText:`Scorpion solitaire board overview`},summary:{objective:`Build four 13-card same-suit sequences from King down to Ace on the tableau.`,winCondition:`All 4 suits assembled in complete King-to-Ace runs on the board.`,quickOverview:`Scorpion combines the open-stack dragging mechanics of Yukon with the same-suit sequence completion goals of Spider. Players move any face-up card along with all cards on top of it to build same-suit descending runs.`},detailedRules:{layout:[`Tableau: 7 columns of 7 cards each (columns 1-4 have 3 face-down cards and 4 face-up; columns 5-7 have 7 face-up cards).`,`Stock: 3 remaining cards dealt in a single press.`,`Foundations: Automated slots for completed King-to-Ace same-suit runs.`],cardMovement:[`Any face-up card in a column can be moved regardless of what is on top of it.`,`The grabbed card must land on a card of the SAME SUIT and exactly 1 rank higher (e.g., 7 of Spades on 8 of Spades).`,`Only Kings (or stacks led by a King) can fill empty tableau columns.`],sequenceBuilding:[`Tableau: Built DOWN in SAME SUIT.`,`Completion: Complete King-to-Ace same-suit runs automatically clear to foundation slots.`],specialRules:[`Reserve Deal: Clicking the 3-card stock deals 1 card face-up onto each of the first 3 tableau columns.`]},settingsAndVariants:[]}},xy=class e{catalog=S(gy);isOpen=O(!1);activeGameDoc=K(()=>by[this.catalog.selectedId()]);openHelp(){this.isOpen.set(!0)}closeHelp(){this.isOpen.set(!1)}toggleHelp(){this.isOpen.update(e=>!e)}getDocumentation(e){return by[e]}getOptionSpec(e){return this.catalog.selectedEntry.options.find(t=>t.id===e)}getChoiceLabel(e,t){return this.getOptionSpec(e)?.choices.find(e=>e.value===t)?.label??String(t)}static ɵfac=function(t){return new(t||e)};static ɵprov=y({token:e,factory:e.ɵfac,providedIn:`root`})},Sy=class e{session=S(yy);docService=S(xy);openSettings=Ym();static ɵfac=function(t){return new(t||e)};static ɵcmp=Yf({type:e,selectors:[[`app-header-bar`]],outputs:{openSettings:`openSettings`},decls:44,vars:4,consts:[[1,`header-bar`],[1,`brand`],[1,`brand-text`],[1,`metrics`],[1,`metric-card`,`score-card`],[1,`label`],[1,`value`],[1,`metric-card`,`timer-card`],[1,`metric-card`,`moves-card`],[1,`actions`],[`title`,`Undo last move`,`aria-label`,`Undo last move`,1,`btn`,`btn-secondary`,3,`click`,`disabled`],[`fill`,`currentColor`,`aria-hidden`,`true`,`viewBox`,`0 0 24 24`,1,`btn-icon`],[`d`,`M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88c3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z`],[1,`btn-text`],[`title`,`Restart current game`,`aria-label`,`Restart current game`,1,`btn`,`btn-secondary`,3,`click`],[`d`,`M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z`],[`title`,`Start a brand new game`,`aria-label`,`Start a brand new game`,1,`btn`,`btn-primary`,3,`click`],[`d`,`M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z`],[`title`,`How to Play / Game Rules`,`aria-label`,`How to Play / Game Rules`,1,`btn-circle`,3,`click`],[`fill`,`none`,`stroke`,`currentColor`,`stroke-width`,`2`,`stroke-linecap`,`round`,`stroke-linejoin`,`round`,`aria-hidden`,`true`,`viewBox`,`0 0 24 24`,1,`btn-icon`],[`cx`,`12`,`cy`,`12`,`r`,`10`],[`d`,`M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3`],[`x1`,`12`,`y1`,`17`,`x2`,`12.01`,`y2`,`17`],[`title`,`Game Settings`,`aria-label`,`Game Settings`,1,`btn-circle`,`btn-settings`,3,`click`],[`d`,`M19.14 12.94c.04-.3.06-.61.06-.94c0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84a.48.48 0 0 0-.48.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 0 0-.59.22L2.74 8.87a.49.49 0 0 0 .12.61l2.03 1.58c-.05.3-.09.63-.09.94c0 .31.04.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.48-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.03-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6s-1.62 3.6-3.6 3.6z`]],template:function(e,t){e&1&&(R(0,`header`,0)(1,`div`,1)(2,`span`,2),W(3,`fSolitaire`),z()(),R(4,`div`,3)(5,`div`,4)(6,`span`,5),W(7,`SCORE`),z(),R(8,`span`,6),W(9),z()(),R(10,`div`,7)(11,`span`,5),W(12,`TIME`),z(),R(13,`span`,6),W(14),z()(),R(15,`div`,8)(16,`span`,5),W(17,`MOVES`),z(),R(18,`span`,6),W(19),z()()(),R(20,`div`,9)(21,`button`,10),V(`click`,function(){return t.session.undo()}),Sa(),R(22,`svg`,11),B(23,`path`,12),z(),Ca(),R(24,`span`,13),W(25,`Undo`),z()(),R(26,`button`,14),V(`click`,function(){return t.session.restartGame()}),Sa(),R(27,`svg`,11),B(28,`path`,15),z(),Ca(),R(29,`span`,13),W(30,`Restart`),z()(),R(31,`button`,16),V(`click`,function(){return t.session.startNewGame()}),Sa(),R(32,`svg`,11),B(33,`path`,17),z(),Ca(),R(34,`span`,13),W(35,`New Game`),z()(),R(36,`button`,18),V(`click`,function(){return t.docService.openHelp()}),Sa(),R(37,`svg`,19),B(38,`circle`,20)(39,`path`,21)(40,`line`,22),z()(),Ca(),R(41,`button`,23),V(`click`,function(){return t.openSettings.emit()}),Sa(),R(42,`svg`,11),B(43,`path`,24),z()()()()),e&2&&(j(9),G(t.session.score()),j(5),G(t.session.timerText()),j(5),G(t.session.moves()),j(2),Hp(`disabled`,!t.session.canUndo()))},styles:[`.header-bar[_ngcontent-%COMP%] {
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
}`]})},Cy=(e,t)=>t.id,wy=(e,t)=>t.value;function Ty(e,t){if(e&1){let e=Vp();R(0,`button`,7),V(`click`,function(){let t=E(e).$implicit,n=H().$implicit;return D(H().session.setRuleOption(n.id,t.value))}),W(1),z()}if(e&2){let e=t.$implicit,n=H().$implicit;U(`active`,H().session.optionValues()[n.id]===e.value),j(),Lm(` `,e.label,` `)}}function Ey(e,t){if(e&1&&(R(0,`p`,6),W(1),z()),e&2){let e=H().$implicit;j(),G(e.description)}}function Dy(e,t){if(e&1&&(R(0,`div`,2)(1,`label`,3),W(2),z(),R(3,`div`,4),P(4,Ty,2,3,`button`,5,wy),z(),M(6,Ey,2,1,`p`,6),z()),e&2){let e=t.$implicit;j(2),G(e.label),j(2),F(e.choices),j(2),N(e.description?6:-1)}}var Oy=class e{session=S(yy);static ɵfac=function(t){return new(t||e)};static ɵcmp=Yf({type:e,selectors:[[`app-debug-panel`]],decls:5,vars:0,consts:[[1,`debug-panel`],[1,`setting-label`,`debug-label`],[1,`setting-group`],[1,`setting-sublabel`],[1,`segmented-control`],[1,`segment-btn`,3,`active`],[1,`setting-desc`],[1,`segment-btn`,3,`click`]],template:function(e,t){e&1&&(R(0,`div`,0)(1,`label`,1),W(2,`Debug Options`),z(),P(3,Dy,7,2,`div`,2,Cy),z()),e&2&&(j(3),F(t.session.debugOptions()))},styles:[`[_nghost-%COMP%] {
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
}`]})},ky=(e,t)=>t.id,Ay=(e,t)=>t.value;function jy(e,t){if(e&1){let e=Vp();I(0,`button`,26),Wp(`click`,function(){let t=E(e).$implicit,n=H().$implicit;return D(H(2).session.setRuleOption(n.id,t.value))}),W(1),L()}if(e&2){let e=t.$implicit,n=H().$implicit;U(`active`,H(2).session.optionValues()[n.id]===e.value),j(),Lm(` `,e.label,` `)}}function My(e,t){if(e&1&&(I(0,`p`,16),W(1),L()),e&2){let e=H().$implicit;j(),G(e.description)}}function Ny(e,t){if(e&1&&(I(0,`div`,7)(1,`label`,8),W(2),L(),I(3,`div`,24),P(4,jy,2,3,`button`,25,Ay),L(),M(6,My,2,1,`p`,16),L()),e&2){let e=t.$implicit;j(2),G(e.label),j(2),F(e.choices),j(2),N(e.description?6:-1)}}function Py(e,t){e&1&&zp(0,`div`,28)}function Fy(e,t){if(e&1){let e=Vp();I(0,`button`,27),Wp(`click`,function(){let t=E(e).$implicit;return D(H(2).themeService.setTheme(t))}),M(1,Py,1,0,`div`,28),L()}if(e&2){let e=t.$implicit,n=H(2);mm(`background-color`,n.themeService.themes[e].color),U(`active`,n.themeService.selectedTheme()===e),Ip(`title`,n.themeService.themes[e].name),j(),N(n.themeService.selectedTheme()===e?1:-1)}}function Iy(e,t){e&1&&zp(0,`app-debug-panel`)}function Ly(e,t){if(e&1){let e=Vp();I(0,`div`,0),Wp(`click`,function(){return E(e),D(H().closed.emit())}),L(),I(1,`div`,1)(2,`div`,2)(3,`h2`),W(4,`Game Options`),L(),I(5,`button`,3),Wp(`click`,function(){return E(e),D(H().closed.emit())}),Sa(),I(6,`svg`,4),zp(7,`path`,5),L()()(),Ca(),I(8,`div`,6),P(9,Ny,7,2,`div`,7,ky),I(11,`div`,7)(12,`label`,8),W(13,`Card Back Design`),L(),I(14,`div`,9)(15,`button`,10),Wp(`click`,function(){return E(e),D(H().session.setCardBack(`card-back-blue`))}),zp(16,`div`,11),I(17,`span`),W(18,`Classic Blue`),L()(),I(19,`button`,12),Wp(`click`,function(){return E(e),D(H().session.setCardBack(`card-back-red`))}),zp(20,`div`,13),I(21,`span`),W(22,`Royal Red`),L()()()(),I(23,`div`,7)(24,`label`,8),W(25,`Table Theme`),L(),I(26,`div`,14),P(27,Fy,2,6,`button`,15,Dp),L(),I(29,`p`,16),W(30),L()(),I(31,`div`,7)(32,`label`,8),W(33,`Game Rules & Documentation`),L(),I(34,`button`,17),Wp(`click`,function(){return E(e),D(H().openRules())}),Sa(),I(35,`svg`,18),zp(36,`circle`,19)(37,`path`,20)(38,`line`,21),L(),W(39),L()(),M(40,Iy,1,0,`app-debug-panel`),L(),Ca(),I(41,`div`,22)(42,`button`,23),Wp(`click`,function(){return E(e),D(H().closed.emit())}),W(43,` Apply Settings `),L()()()}if(e&2){let e=H();j(9),F(e.session.ruleOptions()),j(6),U(`active`,e.session.cardBack()===`card-back-blue`),j(4),U(`active`,e.session.cardBack()===`card-back-red`),j(8),F(e.themeService.themeKeys),j(3),Lm(` Theme: `,e.themeService.themes[e.themeService.selectedTheme()].name,` `),j(9),Lm(` How to Play `,e.activeGameTitle(),` `),j(),N(e.isDevMode&&e.session.debugOptions().length>0?40:-1)}}var Ry=class e{session=S(yy);themeService=S(hg);docService=S(xy);isDevMode=!1;activeGameTitle=K(()=>this.docService.activeGameDoc()?.title??`Solitaire`);open=Qm(!1);closed=Ym();openRules(){this.closed.emit(),this.docService.openHelp()}static ɵfac=function(t){return new(t||e)};static ɵcmp=Yf({type:e,selectors:[[`app-settings-drawer`]],inputs:{open:[1,`open`]},outputs:{closed:`closed`},decls:1,vars:1,consts:[[1,`drawer-backdrop`,3,`click`],[1,`drawer`],[1,`drawer-header`],[1,`btn-close`,3,`click`],[`fill`,`currentColor`,`aria-hidden`,`true`,`viewBox`,`0 0 24 24`,1,`close-icon`],[`d`,`M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z`],[1,`drawer-content`],[1,`setting-group`],[1,`setting-label`],[1,`card-back-selector`],[1,`card-back-option`,`blue-back`,3,`click`],[1,`card-back-preview`,`blue-pattern`],[1,`card-back-option`,`red-back`,3,`click`],[1,`card-back-preview`,`red-pattern`],[1,`theme-selector`],[1,`theme-option`,3,`active`,`backgroundColor`,`title`],[1,`setting-desc`],[1,`btn`,`btn-secondary`,`btn-block`,3,`click`],[`fill`,`none`,`stroke`,`currentColor`,`stroke-width`,`2`,`stroke-linecap`,`round`,`stroke-linejoin`,`round`,`aria-hidden`,`true`,`viewBox`,`0 0 24 24`,1,`btn-icon`],[`cx`,`12`,`cy`,`12`,`r`,`10`],[`d`,`M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3`],[`x1`,`12`,`y1`,`17`,`x2`,`12.01`,`y2`,`17`],[1,`drawer-footer`],[1,`btn`,`btn-primary`,`btn-block`,3,`click`],[1,`segmented-control`],[1,`segment-btn`,3,`active`],[1,`segment-btn`,3,`click`],[1,`theme-option`,3,`click`,`title`],[1,`theme-indicator`]],template:function(e,t){e&1&&M(0,Ly,44,7),e&2&&N(t.open()?0:-1)},dependencies:[Oy],styles:[`.drawer-backdrop[_ngcontent-%COMP%] {
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
}`]})};function zy(e,t){if(e&1){let e=Vp();R(0,`div`,0)(1,`div`,1)(2,`div`,2),B(3,`div`,3),Sa(),R(4,`svg`,4),B(5,`path`,5),z()(),Ca(),R(6,`h1`),W(7,`Congratulations!`),z(),R(8,`p`,6),W(9,`You have successfully cleared the board!`),z(),R(10,`div`,7)(11,`div`,8)(12,`span`,9),W(13),z(),R(14,`span`,10),W(15,`Score`),z()(),R(16,`div`,8)(17,`span`,9),W(18),z(),R(19,`span`,10),W(20,`Time`),z()(),R(21,`div`,8)(22,`span`,9),W(23),z(),R(24,`span`,10),W(25,`Moves`),z()()(),R(26,`button`,11),V(`click`,function(){return E(e),D(H().session.startNewGame())}),W(27,` Play Again `),z()()()}if(e&2){let e=H();j(13),G(e.session.score()),j(5),G(e.session.timerText()),j(5),G(e.session.moves())}}var By=class e{session=S(yy);static ɵfac=function(t){return new(t||e)};static ɵcmp=Yf({type:e,selectors:[[`app-victory-overlay`]],decls:1,vars:1,consts:[[1,`victory-overlay`],[1,`victory-card`],[1,`trophy-container`],[1,`trophy-glow`],[`fill`,`currentColor`,`aria-hidden`,`true`,`viewBox`,`0 0 24 24`,1,`trophy-icon`],[`d`,`M18 2H6c-1.1 0-2 .9-2 2v3c0 2.24 1.51 4.13 3.56 4.72c.54 1.5 1.76 2.7 3.29 3.12V18H9v2h6v-2h-1.85v-3.16c1.53-.42 2.75-1.62 3.29-3.12C18.49 11.13 20 9.24 20 7V4c0-1.1-.9-2-2-2zm-3 8h-2v2H9v-2H7V4h8v6zm3-3h-1v2.11c-.75-.43-1.58-.73-2.48-.89V4h3v3zm-11 .22V4h3v3.22c-.9.16-1.73.46-2.48.89H7z`],[1,`victory-subtitle`],[1,`victory-stats`],[1,`v-stat`],[1,`v-val`],[1,`v-lbl`],[1,`btn`,`btn-gradient`,`btn-large`,`btn-block`,3,`click`]],template:function(e,t){e&1&&M(0,zy,28,3,`div`,0),e&2&&N(t.session.isGameWon()?0:-1)},styles:[`.victory-overlay[_ngcontent-%COMP%] {
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
}`]})};function Vy(e,t){if(e&1){let e=Vp();R(0,`div`,1),V(`click`,function(){return E(e),D(H().confirmation.cancel())}),R(1,`div`,2),V(`click`,function(e){return e.stopPropagation()}),R(2,`div`,3),Sa(),R(3,`svg`,4),B(4,`path`,5),z()(),Ca(),R(5,`h3`),W(6,`Confirm Action`),z(),R(7,`p`,6),W(8),z(),R(9,`div`,7)(10,`button`,8),V(`click`,function(){return E(e),D(H().confirmation.cancel())}),W(11,` Cancel `),z(),R(12,`button`,9),V(`click`,function(){return E(e),D(H().confirmation.accept())}),W(13,` Confirm `),z()()()()}if(e&2){let e=H();j(8),G(e.confirmation.message())}}var Hy=class e{confirmation=S(vy);static ɵfac=function(t){return new(t||e)};static ɵcmp=Yf({type:e,selectors:[[`app-confirmation-dialog`]],decls:1,vars:1,consts:[[1,`confirmation-overlay`],[1,`confirmation-overlay`,3,`click`],[1,`confirmation-card`,3,`click`],[1,`warning-icon-container`],[`fill`,`currentColor`,`aria-hidden`,`true`,`viewBox`,`0 0 24 24`,1,`warning-icon`],[`d`,`M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z`],[1,`confirmation-message`],[1,`confirmation-actions`],[1,`btn`,`btn-secondary`,3,`click`],[1,`btn`,`btn-danger`,3,`click`]],template:function(e,t){e&1&&M(0,Vy,14,1,`div`,0),e&2&&N(t.confirmation.isOpen()?0:-1)},styles:[`.confirmation-overlay[_ngcontent-%COMP%] {
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
}`]})},Uy=[`dialogElement`],Wy=[`closeBtn`],Gy=(e,t)=>t.optionId,Ky=(e,t)=>t.value;function qy(e,t){e&1&&(R(0,`a`,13),Sa(),R(1,`svg`,18),B(2,`path`,19),z(),Ca(),R(3,`span`),W(4,`Wikipedia`),z()()),e&2&&Hp(`href`,t,Sc)}function Jy(e,t){if(e&1){let e=Vp();R(0,`button`,27),V(`click`,function(){return E(e),D(H(3).selectTab(`variants`))})(`keydown`,function(t){return E(e),D(H(3).onTabKeydown(t,`variants`))}),W(1,` Options & Variants `),z()}if(e&2){let e=H(3);U(`active`,e.activeTab()===`variants`),gp(`aria-selected`,e.activeTab()===`variants`)(`tabindex`,e.activeTab()===`variants`?0:-1)}}function Yy(e,t){if(e&1){let e=Vp();R(0,`img`,39),V(`load`,function(){return E(e),D(H(5).onImageLoad())})(`error`,function(){return E(e),D(H(5).onImageError())}),z()}if(e&2){let e=H();U(`loaded`,H(4).heroImageLoaded()),Hp(`src`,e.url,Sc)(`alt`,e.altText)}}function Xy(e,t){e&1&&(R(0,`p`,37),W(1,` Screenshot unavailable `),z())}function Zy(e,t){if(e&1&&(R(0,`p`,38),W(1),z()),e&2){let e=H();j(),Lm(` `,e.caption,` `)}}function Qy(e,t){if(e&1&&(R(0,`div`,34)(1,`div`,35),M(2,Yy,1,4,`img`,36),z(),M(3,Xy,2,0,`p`,37)(4,Zy,2,1,`p`,38),z()),e&2){let e=H(4);j(),U(`is-loaded`,e.heroImageLoaded())(`is-failed`,e.heroImageFailed()),j(),N(e.heroImageFailed()?-1:2),j(),N(e.heroImageFailed()?3:4)}}function $y(e,t){if(e&1&&(R(0,`section`,24)(1,`div`,28)(2,`h3`,29),W(3,`Objective & Win Condition`),z(),R(4,`p`,30)(5,`strong`),W(6,`Objective:`),z(),W(7),z(),R(8,`p`,31)(9,`strong`),W(10,`Win Condition:`),z(),W(11),z()(),R(12,`div`,32)(13,`h4`),W(14,`Game Overview`),z(),R(15,`p`,33),W(16),z()(),M(17,Qy,5,6,`div`,34),z()),e&2){let e,t=H();j(7),Lm(` `,t.summary.objective,` `),j(4),Lm(` `,t.summary.winCondition,` `),j(5),Lm(` `,t.summary.quickOverview,` `),j(),N((e=t.screenshot)?17:-1,e)}}function eb(e,t){if(e&1&&(R(0,`li`),W(1),z()),e&2){let e=t.$implicit;j(),G(e)}}function tb(e,t){if(e&1&&(R(0,`li`),W(1),z()),e&2){let e=t.$implicit;j(),G(e)}}function nb(e,t){if(e&1&&(R(0,`li`),W(1),z()),e&2){let e=t.$implicit;j(),G(e)}}function rb(e,t){if(e&1&&(R(0,`li`),W(1),z()),e&2){let e=t.$implicit;j(),G(e)}}function ib(e,t){if(e&1&&(R(0,`div`,42)(1,`h4`),W(2,`Special Game Mechanics`),z(),R(3,`ul`),P(4,rb,2,1,`li`,null,Ep),z()()),e&2){let e=H();j(4),F(e)}}function ab(e,t){e&1&&M(0,ib,6,0,`div`,42),e&2&&N(t.length>0?0:-1)}function ob(e,t){if(e&1&&(R(0,`section`,25)(1,`div`,40)(2,`div`,41)(3,`h4`),W(4,`Board Layout`),z(),R(5,`ul`),P(6,eb,2,1,`li`,null,Ep),z()(),R(8,`div`,41)(9,`h4`),W(10,`Sequence Building Rules`),z(),R(11,`ul`),P(12,tb,2,1,`li`,null,Ep),z()(),R(14,`div`,41)(15,`h4`),W(16,`Card Movement & Grabbing`),z(),R(17,`ul`),P(18,nb,2,1,`li`,null,Ep),z()(),M(20,ab,1,1),z()()),e&2){let e,t=H();j(6),F(t.detailedRules.layout),j(6),F(t.detailedRules.sequenceBuilding),j(6),F(t.detailedRules.cardMovement),j(2),N((e=t.detailedRules.specialRules)?20:-1,e)}}function sb(e,t){if(e&1&&(R(0,`p`,45),W(1),z()),e&2){let e=H();j(),G(e.description)}}function cb(e,t){if(e&1&&(R(0,`div`,47)(1,`span`,48),W(2),z(),R(3,`span`,49),W(4),z()()),e&2){let e=t.$implicit,n=H(2).$implicit,r=H(4);j(2),Lm(` `,r.docService.getChoiceLabel(n.optionId,e.value),` `),j(2),G(e.effect)}}function lb(e,t){if(e&1&&(R(0,`div`,43)(1,`h3`,44),W(2),z(),M(3,sb,2,1,`p`,45),R(4,`div`,46),P(5,cb,5,2,`div`,47,Ky),z()()),e&2){let e=t,n=H().$implicit;j(2),G(e.label),j(),N(e.description?3:-1),j(2),F(n.choicesExplanation)}}function ub(e,t){if(e&1&&M(0,lb,7,2,`div`,43),e&2){let e,n=t.$implicit;N((e=H(4).docService.getOptionSpec(n.optionId))?0:-1,e)}}function db(e,t){if(e&1&&(R(0,`section`,26),P(1,ub,1,1,null,null,Gy),z()),e&2){let e=H();j(),F(e.settingsAndVariants)}}function fb(e,t){if(e&1){let e=Vp();R(0,`nav`,20)(1,`button`,21),V(`click`,function(){return E(e),D(H(2).selectTab(`overview`))})(`keydown`,function(t){return E(e),D(H(2).onTabKeydown(t,`overview`))}),W(2,` Summary `),z(),R(3,`button`,22),V(`click`,function(){return E(e),D(H(2).selectTab(`rules`))})(`keydown`,function(t){return E(e),D(H(2).onTabKeydown(t,`rules`))}),W(4,` Detailed Rules `),z(),M(5,Jy,2,4,`button`,23),z(),R(6,`div`,15),M(7,$y,18,4,`section`,24)(8,ob,21,1,`section`,25)(9,db,3,0,`section`,26),z()}if(e&2){let e,n=H(2);j(),U(`active`,n.activeTab()===`overview`),gp(`aria-selected`,n.activeTab()===`overview`)(`tabindex`,n.activeTab()===`overview`?0:-1),j(2),U(`active`,n.activeTab()===`rules`),gp(`aria-selected`,n.activeTab()===`rules`)(`tabindex`,n.activeTab()===`rules`?0:-1),j(2),N(t.settingsAndVariants.length>0?5:-1),j(2),N((e=n.activeTab())===`overview`?7:e===`rules`?8:e===`variants`?9:-1)}}function pb(e,t){e&1&&(R(0,`div`,15)(1,`section`,50)(2,`div`,51)(3,`h3`,29),W(4,`Documentation Unavailable`),z(),R(5,`p`,33),W(6,`Rules for this game aren't written yet.`),z()()()())}function mb(e,t){if(e&1){let e=Vp();R(0,`div`,3),V(`click`,function(t){return E(e),D(H().onBackdropClick(t))}),R(1,`div`,4,0)(3,`div`,5)(4,`div`,6)(5,`div`,7),Sa(),R(6,`svg`,8),B(7,`circle`,9)(8,`path`,10)(9,`line`,11),z(),Ca(),R(10,`h2`,12),W(11),z()(),M(12,qy,5,1,`a`,13),z(),R(13,`button`,14,1),V(`click`,function(){return E(e),D(H().docService.closeHelp())}),W(15,` × `),z()(),M(16,fb,10,10)(17,pb,7,0,`div`,15),R(18,`div`,16)(19,`button`,17),V(`click`,function(){return E(e),D(H().docService.closeHelp())}),W(20,` Close `),z()()()()}if(e&2){let e,t,n=H();j(),gp(`aria-label`,n.modalTitle()+` Rules & Documentation`),j(10),G(n.modalTitle()),j(),N((e=n.doc()?.wikipediaUrl)?12:-1,e),j(4),N((t=n.doc())?16:17,t)}}var hb=class e{docService=S(xy);catalog=S(gy);dialogRef=th(`dialogElement`);closeBtnRef=th(`closeBtn`);selectedTab=O(`overview`);doc=K(()=>this.docService.activeGameDoc());modalTitle=K(()=>this.doc()?.title??this.catalog.selectedEntry.name);activeTab=K(()=>{let e=this.selectedTab(),t=this.doc();return e===`variants`&&(!t||t.settingsAndVariants.length===0)?`overview`:e});heroImageLoaded=O(!1);heroImageFailed=O(!1);previousActiveElement=null;constructor(){xo(e=>{this.docService.isOpen()?(this.selectedTab.set(`overview`),this.heroImageLoaded.set(!1),this.heroImageFailed.set(!1),this.previousActiveElement=document.activeElement,document.body.style.overflow=`hidden`,setTimeout(()=>{this.closeBtnRef()?.nativeElement.focus()},0)):(document.body.style.overflow=``,this.previousActiveElement&&typeof this.previousActiveElement.focus==`function`&&(this.previousActiveElement.focus(),this.previousActiveElement=null)),e(()=>{document.body.style.overflow=``})})}selectTab(e){this.selectedTab.set(e)}onImageLoad(){this.heroImageLoaded.set(!0),this.heroImageFailed.set(!1)}onImageError(){this.heroImageFailed.set(!0),this.heroImageLoaded.set(!1)}onDocumentKeydown(e){if(this.docService.isOpen()){if(e.key===`Escape`){e.preventDefault(),this.docService.closeHelp();return}if(e.key===`Tab`){let t=this.dialogRef()?.nativeElement;if(!t)return;let n=Array.from(t.querySelectorAll(`button, a[href], input, select, textarea, [tabindex]`)).filter(e=>e.tabIndex!==-1&&!e.hasAttribute(`disabled`));if(n.length===0)return;let r=n[0],i=n[n.length-1];e.shiftKey?(document.activeElement===r||!t.contains(document.activeElement))&&(e.preventDefault(),i.focus()):(document.activeElement===i||!t.contains(document.activeElement))&&(e.preventDefault(),r.focus())}}}onTabKeydown(e,t){let n=this.doc(),r=[`overview`,`rules`];n&&n.settingsAndVariants.length>0&&r.push(`variants`);let i=r.indexOf(t);if(i===-1)return;let a=-1;if(e.key===`ArrowRight`?a=(i+1)%r.length:e.key===`ArrowLeft`&&(a=(i-1+r.length)%r.length),a!==-1){e.preventDefault();let t=r[a];this.selectTab(t);let n=this.dialogRef()?.nativeElement;n&&setTimeout(()=>{n.querySelector(`[data-tab="${t}"]`)?.focus()},0)}}onBackdropClick(e){e.target.classList.contains(`modal-backdrop`)&&this.docService.closeHelp()}static ɵfac=function(t){return new(t||e)};static ɵcmp=Yf({type:e,selectors:[[`app-game-help-modal`]],viewQuery:function(e,t){e&1&&Kp(t.dialogRef,Uy,5)(t.closeBtnRef,Wy,5),e&2&&qp(2)},hostBindings:function(e,t){e&1&&Wp(`keydown`,function(e){return t.onDocumentKeydown(e)},wc)},decls:1,vars:1,consts:[[`dialogElement`,``],[`closeBtn`,``],[1,`modal-backdrop`],[1,`modal-backdrop`,3,`click`],[`role`,`dialog`,`aria-modal`,`true`,`tabindex`,`-1`,1,`modal-dialog`],[1,`modal-header`],[1,`header-title-group`],[1,`title-with-icon`],[`fill`,`none`,`stroke`,`currentColor`,`stroke-width`,`2`,`stroke-linecap`,`round`,`stroke-linejoin`,`round`,`aria-hidden`,`true`,`viewBox`,`0 0 24 24`,1,`header-icon`],[`cx`,`12`,`cy`,`12`,`r`,`10`],[`d`,`M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3`],[`x1`,`12`,`y1`,`17`,`x2`,`12.01`,`y2`,`17`],[1,`game-title`],[`target`,`_blank`,`rel`,`noopener noreferrer`,`title`,`View article on Wikipedia`,1,`wiki-badge`,3,`href`],[`title`,`Close documentation (Esc)`,`aria-label`,`Close documentation`,1,`btn-modal-close`,3,`click`],[1,`modal-body`],[1,`modal-footer`],[1,`btn`,`btn-secondary`,3,`click`],[`fill`,`currentColor`,`aria-hidden`,`true`,`viewBox`,`0 0 24 24`,1,`badge-icon`],[`d`,`M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z`],[`role`,`tablist`,`aria-label`,`Documentation sections`,1,`modal-tabs`],[`role`,`tab`,`id`,`tab-overview`,`data-tab`,`overview`,`aria-controls`,`panel-overview`,1,`tab-btn`,3,`click`,`keydown`],[`role`,`tab`,`id`,`tab-rules`,`data-tab`,`rules`,`aria-controls`,`panel-rules`,1,`tab-btn`,3,`click`,`keydown`],[`role`,`tab`,`id`,`tab-variants`,`data-tab`,`variants`,`aria-controls`,`panel-variants`,1,`tab-btn`,3,`active`],[`id`,`panel-overview`,`role`,`tabpanel`,`aria-labelledby`,`tab-overview`,1,`doc-section`,`animated-fade`],[`id`,`panel-rules`,`role`,`tabpanel`,`aria-labelledby`,`tab-rules`,1,`doc-section`,`animated-fade`],[`id`,`panel-variants`,`role`,`tabpanel`,`aria-labelledby`,`tab-variants`,1,`doc-section`,`animated-fade`],[`role`,`tab`,`id`,`tab-variants`,`data-tab`,`variants`,`aria-controls`,`panel-variants`,1,`tab-btn`,3,`click`,`keydown`],[1,`callout-card`,`primary-callout`],[1,`callout-title`],[1,`objective-text`],[1,`win-text`],[1,`overview-block`],[1,`overview-p`],[1,`hero-screenshot-card`],[1,`img-skeleton-container`],[`loading`,`lazy`,`width`,`800`,`height`,`500`,1,`screenshot-img`,3,`src`,`alt`,`loaded`],[1,`screenshot-failed-text`],[1,`screenshot-caption`],[`loading`,`lazy`,`width`,`800`,`height`,`500`,1,`screenshot-img`,3,`load`,`error`,`src`,`alt`],[1,`rules-grid`],[1,`rule-card`],[1,`rule-card`,`special-card`],[1,`variant-card`],[1,`option-title`],[1,`option-desc`],[1,`choices-list`],[1,`choice-item`],[1,`choice-badge`],[1,`choice-effect`],[1,`doc-section`,`animated-fade`],[1,`callout-card`]],template:function(e,t){e&1&&M(0,mb,21,4,`div`,2),e&2&&N(t.docService.isOpen()?0:-1)},styles:[`.modal-backdrop[_ngcontent-%COMP%] {
  position: fixed;
  inset: 0;
  z-index: 1500;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
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

.modal-dialog[_ngcontent-%COMP%]:focus {
  outline: none;
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
  transition:
    color 0.2s ease,
    background-color 0.2s ease;
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
  background: linear-gradient(
    135deg,
    rgba(56, 189, 248, 0.1),
    rgba(14, 165, 233, 0.05)
  );
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

.img-skeleton-container.is-failed[_ngcontent-%COMP%] {
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

.screenshot-failed-text[_ngcontent-%COMP%] {
  color: #94a3b8;
  font-size: 0.85rem;
  margin-top: 0.6rem;
  margin-bottom: 0.2rem;
  font-style: italic;
}

@media (prefers-reduced-motion: reduce) {
  .img-skeleton-container[_ngcontent-%COMP%] {
    animation: none !important;
  }
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
}`]})},gb=``+new URL(`card_assets-0-VlHDaQ-p.png`,import.meta.url).href,_b=``+new URL(`card_assets-1-C_BtY2IZ.png`,import.meta.url).href,vb={textures:[{image:`card_assets-0.png`,format:`RGBA8888`,size:{w:4032,h:3732},scale:1,frames:[{filename:`card-clubs-ace`,frame:{x:4,y:4,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-clubs-2`,frame:{x:452,y:4,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-clubs-3`,frame:{x:900,y:4,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-clubs-4`,frame:{x:1348,y:4,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-clubs-5`,frame:{x:1796,y:4,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-clubs-6`,frame:{x:2244,y:4,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-clubs-7`,frame:{x:2692,y:4,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-clubs-8`,frame:{x:3140,y:4,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-clubs-9`,frame:{x:3588,y:4,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-clubs-10`,frame:{x:4,y:626,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-clubs-jack`,frame:{x:452,y:626,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-clubs-queen`,frame:{x:900,y:626,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-clubs-king`,frame:{x:1348,y:626,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-hearts-ace`,frame:{x:1796,y:626,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-hearts-2`,frame:{x:2244,y:626,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-hearts-3`,frame:{x:2692,y:626,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-hearts-4`,frame:{x:3140,y:626,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-hearts-5`,frame:{x:3588,y:626,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-hearts-6`,frame:{x:4,y:1248,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-hearts-7`,frame:{x:452,y:1248,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-hearts-8`,frame:{x:900,y:1248,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-hearts-9`,frame:{x:1348,y:1248,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-hearts-10`,frame:{x:1796,y:1248,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-hearts-jack`,frame:{x:2244,y:1248,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-hearts-queen`,frame:{x:2692,y:1248,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-hearts-king`,frame:{x:3140,y:1248,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-spades-ace`,frame:{x:3588,y:1248,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-spades-2`,frame:{x:4,y:1870,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-spades-3`,frame:{x:452,y:1870,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-spades-4`,frame:{x:900,y:1870,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-spades-5`,frame:{x:1348,y:1870,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-spades-6`,frame:{x:1796,y:1870,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-spades-7`,frame:{x:2244,y:1870,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-spades-8`,frame:{x:2692,y:1870,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-spades-9`,frame:{x:3140,y:1870,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-spades-10`,frame:{x:3588,y:1870,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-spades-jack`,frame:{x:4,y:2492,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-spades-queen`,frame:{x:452,y:2492,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-spades-king`,frame:{x:900,y:2492,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-diamonds-ace`,frame:{x:1348,y:2492,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-diamonds-2`,frame:{x:1796,y:2492,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-diamonds-3`,frame:{x:2244,y:2492,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-diamonds-4`,frame:{x:2692,y:2492,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-diamonds-5`,frame:{x:3140,y:2492,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-diamonds-6`,frame:{x:3588,y:2492,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-diamonds-7`,frame:{x:4,y:3114,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-diamonds-8`,frame:{x:452,y:3114,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-diamonds-9`,frame:{x:900,y:3114,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-diamonds-10`,frame:{x:1348,y:3114,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-diamonds-jack`,frame:{x:1796,y:3114,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-diamonds-queen`,frame:{x:2244,y:3114,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-diamonds-king`,frame:{x:2692,y:3114,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-back-blue`,frame:{x:3140,y:3114,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-back-red`,frame:{x:3588,y:3114,w:440,h:614},anchor:{x:.5,y:.5}}]},{image:`card_assets-1.png`,format:`RGBA8888`,size:{w:1344,h:622},scale:1,frames:[{filename:`card-placeholder`,frame:{x:4,y:4,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-placeholder-full-border-circle`,frame:{x:452,y:4,w:440,h:614},anchor:{x:.5,y:.5}},{filename:`card-placeholder-full-border-reset`,frame:{x:900,y:4,w:440,h:614},anchor:{x:.5,y:.5}}]}]},yb=Object.assign({"/src/engine/render/assets/sprites/atlas/card_assets-0.png":gb,"/src/engine/render/assets/sprites/atlas/card_assets-1.png":_b});function bb(e){let t=Object.entries(yb).find(([t])=>t.endsWith(`/${e}`));if(!t)throw Error(`Atlas page not found: ${e}`);return t[1]}var xb=class extends e{constructor(){super(`loading-scene`)}preload(){let e={textures:vb.textures.map(e=>({...e,image:bb(e.image)}))};this.load.multiatlas(`card_assets`,e,void 0)}create(){this.scene.start(`board-scene`)}},Sb=class e{scene;cardBackStyle;static CARD_SHADOW={x:-1.5,y:-2,decay:.22,power:.04,color:0,samples:12,intensity:.1};static CARD_SHADOW_PADDING={x:32,y:48};constructor(e,t){this.scene=e,this.cardBackStyle=t}createCardSprite(){let t=this.scene.add.sprite(0,0,`card_assets`,this.cardBackStyle());t.setOrigin(0,0),t.enableFilters();let n=e.CARD_SHADOW,r=e.CARD_SHADOW_PADDING;return t.filters?.internal.addShadow(n.x,n.y,n.decay,n.power,n.color,n.samples,n.intensity)?.setPaddingOverride(-r.x,-r.y,r.x,r.y),t.setInteractive({useHandCursor:!0}),t}createPileBackground(e,t,n){let r=this.scene.add.sprite(0,0,`card_assets`,e);return r.setOrigin(0,0),r.setAlpha(t),n&&r.setInteractive({useHandCursor:!0}),r}},Cb=350,wb=class{handle;stackFromCard;now;hoveredCardId=null;hoveredBackgroundPileId=null;drag=null;snapAll=!0;flightState=[];lastPressTimeMs=0;lastPressedCardId=null;constructor(e,t,n=Date.now){this.handle=e,this.stackFromCard=t,this.now=n}cardOver(e){this.hoveredCardId=e}cardOut(e){this.hoveredCardId===e&&(this.hoveredCardId=null)}backgroundOver(e){this.hoveredBackgroundPileId=e}backgroundOut(e){this.hoveredBackgroundPileId===e&&(this.hoveredBackgroundPileId=null)}cardPressed(e){this.handle({kind:`activate`,cardId:e}),this.isDoublePress(e)&&(this.drag=null,this.handle({kind:`activate-secondary`,cardId:e}))}backgroundPressed(e){this.handle({kind:`activate-pile`,pileId:e})}isDoublePress(e){let t=this.now(),n=this.lastPressedCardId===e&&t-this.lastPressTimeMs<Cb;return this.lastPressTimeMs=t,this.lastPressedCardId=e,n}resetPressTracking(){this.lastPressTimeMs=0,this.lastPressedCardId=null}dragStarted(e,t){let n=this.stackFromCard(e);n.length!==0&&(this.drag={cardIds:[...n],primary:{x:t.x,y:t.y}})}dragMoved(e){this.drag&&(this.drag.primary={x:e.x,y:e.y})}dragEnded(e){let t=this.drag;t&&(this.drag=null,this.handle({kind:`drop`,cardIds:t.cardIds,targetPileId:e}),this.beginFlight(t.cardIds))}get flights(){return this.flightState}beginFlight(e){if(e.length===0)return;let t=new Set(e);for(let e=this.flightState.length-1;e>=0;e--){let n=this.flightState[e].cardIds.filter(e=>!t.has(e));n.length===0?this.flightState.splice(e,1):this.flightState[e].cardIds=n}this.flightState.push({cardIds:[...e]})}endFlight(e){let t=this.flightState.indexOf(e);t!==-1&&this.flightState.splice(t,1)}get interaction(){return{hoveredCardId:this.hoveredCardId,hoveredBackgroundPileId:this.hoveredBackgroundPileId,drag:this.drag,flights:this.flightState,snapAll:this.snapAll}}reset(){this.hoveredCardId=null,this.hoveredBackgroundPileId=null,this.drag=null,this.flightState.length=0,this.snapAll=!0,this.resetPressTracking()}};function Tb(e){let t=e.getData(`cardId`);return typeof t==`string`?t:null}var Eb=class{boardScene;controller;constructor(e){this.boardScene=e,this.controller=new wb(e.handleIntent,e.stackFromCard)}registerDragListeners(){this.boardScene.input.on(`dragstart`,(e,t)=>this.onDragStart(t)),this.boardScene.input.on(`drag`,(e,t,n,r)=>this.controller.dragMoved({x:n,y:r})),this.boardScene.input.on(`dragend`,(e,t)=>this.onDragEnd(t))}registerCardListeners(e,t){e.on(`pointerover`,()=>this.controller.cardOver(t)),e.on(`pointerout`,()=>this.controller.cardOut(t)),e.on(`pointerdown`,()=>this.controller.cardPressed(t))}registerPileBackgroundListeners(e,t){e.on(`pointerdown`,()=>this.controller.backgroundPressed(t)),e.on(`pointerover`,()=>this.controller.backgroundOver(t)),e.on(`pointerout`,()=>this.controller.backgroundOut(t))}onDragStart(e){let t=Tb(e);t&&this.controller.dragStarted(t,{x:e.x,y:e.y})}onDragEnd(e){let t=this.controller.drag;if(!t||!Tb(e)){this.controller.dragEnded(null);return}let n=this.boardScene.resolveDropTarget(t,this.boardScene.viewport);this.controller.dragEnded(n?.pileId??null)}get hoveredCardId(){return this.controller.hoveredCardId}set hoveredCardId(e){this.controller.hoveredCardId=e}get hoveredBackgroundPileId(){return this.controller.hoveredBackgroundPileId}set hoveredBackgroundPileId(e){this.controller.hoveredBackgroundPileId=e}get drag(){return this.controller.drag}set drag(e){this.controller.drag=e}get snapAll(){return this.controller.snapAll}set snapAll(e){this.controller.snapAll=e}get flights(){return this.controller.flights}beginFlight(e){this.controller.beginFlight(e)}endFlight(e){this.controller.endFlight(e)}get interaction(){return this.controller.interaction}resetInteraction(){this.controller.reset()}},Db=90,Ob=.5,kb=9,Ab=12,jb=15462299,Mb=.9,Nb=class{sprites;highlightBorders=[];travelDistances=new Map;constructor(e){this.sprites=e}areCardsTravelling(e){return e.some(e=>this.travelDistances.has(e))}apply(e,t){let n=t>0?1-Math.exp(-t/Db):1;for(let t of e.backgrounds){let e=this.sprites.pileBackgroundSprite(t.pileId);e?.active&&(e.setPosition(t.x,t.y),e.setScale(t.scale),e.setDepth(t.depth),t.cursor&&e.input&&e.input.cursor!==t.cursor&&(e.input.cursor=t.cursor))}let r=new Map;for(let i of e.cards){let e=this.sprites.cardSprite(i.cardId);if(e?.active){if(i.snap||t<=0)e.setPosition(i.x,i.y);else{e.x+=(i.x-e.x)*n,e.y+=(i.y-e.y)*n;let t=Math.abs(e.x-i.x),a=Math.abs(e.y-i.y);t<Ob&&a<Ob?e.setPosition(i.x,i.y):r.set(i.cardId,Math.max(t,a))}e.setScale(i.scale),e.setDepth(i.depth),e.frame.name!==i.frame&&(e.setFrame(i.frame),e.setOrigin(0,0)),e.input&&e.input.cursor!==i.cursor&&(e.input.cursor=i.cursor),e.getData(`draggable`)!==i.draggable&&(this.sprites.setDraggable(e,i.draggable),e.setData(`draggable`,i.draggable))}}this.travelDistances=r,this.drawHighlights(e.highlights,r)}drawHighlights(e,t){let n=0;for(let r of e){let e=this.resolveHighlightPosition(r,t);if(!e)continue;let i=this.highlightBorder(n++);this.shapeHighlightBorder(i,r),i.depth!==r.depth&&(i.graphics.setDepth(r.depth),i.depth=r.depth),i.graphics.setPosition(e.x,e.y),i.graphics.setVisible(!0)}for(let e=n;e<this.highlightBorders.length;e++)this.highlightBorders[e].graphics.setVisible(!1)}resolveHighlightPosition(e,t){if(e.anchor.kind===`point`)return{x:e.anchor.x,y:e.anchor.y};let n=e.anchor.cardId,r=15*e.scale;if((t.get(n)??0)>r)return null;let i=this.sprites.cardSprite(n);return i?.active?{x:i.x,y:i.y}:null}highlightBorder(e){let t=this.highlightBorders[e];return t||(t={graphics:this.sprites.addGraphics(),shapeKey:null,depth:null},this.highlightBorders[e]=t),t}shapeHighlightBorder(e,t){let n=`${t.width}:${t.height}:${t.scale}:${t.openBottom}`;if(e.shapeKey===n)return;e.shapeKey=n;let r=e.graphics,i=Ab*t.scale;r.clear(),r.lineStyle(kb*t.scale,jb,Mb),t.openBottom?Pb(r,t.width,t.height,i):r.strokeRoundedRect(0,0,t.width,t.height,i)}};function Pb(e,t,n,r){let i=Math.max(0,Math.min(r,n,t/2));e.beginPath(),e.moveTo(0,n),e.lineTo(0,i),e.arc(i,i,i,Math.PI,Math.PI*1.5),e.lineTo(t-i,0),e.arc(t-i,i,i,Math.PI*1.5,Math.PI*2),e.lineTo(t,n),e.strokePath()}function Fb(e){let t=e.columns*e.cardSize.width+Math.max(0,e.columns-1)*e.gap.x+2*e.padding.x,n=e.headerHeightPx+e.rows*e.cardSize.height+Math.max(0,e.rows-1)*e.gap.y+2*e.padding.y;return{width:t,height:e.designHeightPx??n}}function Ib(e,t){let n=Fb(e),r=t.pixelRatio,i=t.width||n.width*r,a=(t.height||n.height*r)-e.headerHeightPx*r,o=i/n.width,s=a/(n.height-e.headerHeightPx),c=Math.min(o,s);return c>r&&(c=r),c<=0&&(c=r),c}var Lb={x:8,y:14},Rb={x:8,y:14};function zb(e,t){let n=t.width/(t.pixelRatio||1);return n===0||n>720?e:{...e,gap:{x:Math.min(e.gap.x,Lb.x),y:Math.min(e.gap.y,Lb.y)},padding:{x:Math.min(e.padding.x,Rb.x),y:Math.min(e.padding.y,Rb.y)}}}function Bb(e,t){let n=zb(e,t),r=Ib(n,t);return{layout:n,scale:r,origins:Vb(n,t,r)}}function Vb(e,t,n){let r=e.cardSize.width*n,i=e.cardSize.height*n,a=e.gap.x*n,o=e.gap.y*n,s=e.columns*r+Math.max(0,e.columns-1)*a,c=t.width||Fb(e).width,l=Math.max(e.padding.x*n,(c-s)/2),u=e.padding.y*n,d=e.headerHeightPx*t.pixelRatio,f=new Map;for(let t of e.slots)f.set(t.pileId,{x:l+t.column*(r+a),y:d+u+t.row*(i+o)});return f}var Hb=class t extends e{static PILE_BACKGROUND_ALPHA=.5;tableGame;options;cardSprites=new Map;pileBackgrounds=new Map;inputManager;visualFactory;viewApplier;constructor(e){super(`board-scene`),this.options=e,this.tableGame=e.game}get resolveDropTarget(){return this.options.resolveDropTarget}get handleIntent(){return this.options.handleIntent}get stackFromCard(){return this.options.stackFromCard}create(){this.inputManager=new Eb(this),this.viewApplier=new Nb(this),this.visualFactory=new Sb(this,this.options.cardBackKey),this.createPileBackgroundSprites(),this.createCardSprites();let e=this.options.onBackgroundColor(e=>{this.cameras?.main?.setBackgroundColor(e)}),t=this.options.onReset(()=>{this.inputManager.resetInteraction()}),n=this.options.onCardsRelocated(e=>{this.inputManager.beginFlight(e)});this.events.once(r.Events.SHUTDOWN,()=>{e(),t(),n()}),this.inputManager.snapAll=!0,this.scale.on(`resize`,()=>{this.inputManager.snapAll=!0}),this.inputManager.registerDragListeners(),this.input.setPollAlways(),this.events.once(r.Events.POST_UPDATE,()=>{this.options.onReady?.()})}createCardSprites(){for(let e of this.options.cardIds){if(!this.tableGame.getCardById(e))throw Error(`Card model not found for: ${e}`);let t=this.visualFactory.createCardSprite();this.cardSprites.set(e,t),t.setData(`cardId`,e),this.inputManager.registerCardListeners(t,e)}}createPileBackgroundSprites(){let e=t.PILE_BACKGROUND_ALPHA;for(let t of this.tableGame.piles){let n=this.tableGame.zoneFor(t.id);if(!n?.backgroundKey)continue;let r=this.visualFactory.createPileBackground(n.backgroundKey,e,n.emptyIsActionable??!1);this.pileBackgrounds.set(t.id,r),n.emptyIsActionable&&this.inputManager.registerPileBackgroundListeners(r,t.id)}}cardSprite(e){return this.cardSprites.get(e)}pileBackgroundSprite(e){return this.pileBackgrounds.get(e)}addGraphics(){return this.add.graphics()}setDraggable(e,t){this.input.setDraggable(e,t)}get cardIds(){return this.cardSprites.keys()}get pixelRatio(){let e=this.scale?.displayScale?.x;return e&&Number.isFinite(e)?e:1}get viewport(){let e=Fb(this.options.layout);return{width:this.scale?.width||e.width,height:this.scale?.height||e.height,pixelRatio:this.pixelRatio}}update(e,t){if(!this.inputManager||!this.viewApplier)return;let n=this.options.buildViewState(this.inputManager.interaction,this.viewport);this.viewApplier.apply(n,t);for(let e of[...this.inputManager.flights])this.viewApplier.areCardsTravelling(e.cardIds)||this.inputManager.endFlight(e);this.inputManager.snapAll&&(this.inputManager.snapAll=!1)}};function Ub(e){return Array.from({length:e},()=>({x:0,y:0}))}function Wb(e,t,n){let r=[],i=0;for(let a of e)r.push({x:0,y:i}),i+=a.faceUp?t.faceUpGap:t.faceDownGap,a.id===n&&(i+=t.hoverExpansion);return r}function Gb(e,t){let n=e-Math.min(e,t.maxVisible),r=[];for(let i=0;i<e;i++)r.push(i<n?{x:0,y:0}:{x:(i-n)*t.gap,y:0});return r}function Kb(e,t,n=null){switch(e.kind){case`fan-down`:return Wb(t,e,n);case`fan-right`:return Gb(t.length,e);default:return Ub(t.length)}}function qb(e,t,n){if(t.length===0)return n;let r=Kb(e,t);return r[r.length-1].y+n}function Jb(e,t,n,r){let i=[];for(let{pile:a,layout:o}of e){let e=t.get(a.id);e&&i.push({pileId:a.id,x:e.x,y:e.y,width:n.width*r,height:qb(o,a.getCards(),n.height)*r})}return i}function Yb(e,t){return Math.max(0,Math.min(e.x+e.width,t.x+t.width)-Math.max(e.x,t.x))*Math.max(0,Math.min(e.y+e.height,t.y+t.height)-Math.max(e.y,t.y))}function Xb(e,t){let n=null,r=0;for(let i of t){let t=Yb(e,i);t>r&&(r=t,n=i)}return n}var Zb;(function(e){e[e.PILE_BACKGROUND=0]=`PILE_BACKGROUND`,e[e.RESTING_CARD=1]=`RESTING_CARD`,e[e.HOVER_HINT=2]=`HOVER_HINT`,e[e.DROP_TARGET_HINT=3]=`DROP_TARGET_HINT`,e[e.FLYING_CARD=4]=`FLYING_CARD`,e[e.HELD_CARD=5]=`HELD_CARD`})(Zb||={});var Qb=1e3;function $b(e,t=0){let n=Math.min(Math.max(Math.trunc(t),0),Qb-1);return e*Qb+n}function ex(e,t,n){let r=n.layout.cardSize,i=Jb(e.dropTargetPiles.map(t=>({pile:t,layout:e.zoneFor(t.id)?.layout??{kind:`stacked`}})),n.origins,r,n.scale);return Xb({x:t.primary.x,y:t.primary.y,width:r.width*n.scale,height:r.height*n.scale},i)}var tx=class{game;interaction;metrics;presentation;scale;spriteScale;origins;cardWidth;cardHeight;constructor(e,t,n,r){this.game=e,this.interaction=t,this.metrics=n,this.presentation=r,this.scale=n.scale,this.spriteScale=this.scale/2,this.origins=n.origins,this.cardWidth=220*this.scale,this.cardHeight=307*this.scale}build(){return{backgrounds:this.buildBackgrounds(),cards:this.buildCards(),highlights:this.buildHighlights()}}buildBackgrounds(){let e=[];for(let t of this.game.piles){let n=this.game.zoneFor(t.id),r=this.origins.get(t.id);!n?.backgroundKey||!r||e.push({pileId:t.id,x:r.x,y:r.y,scale:this.spriteScale,depth:$b(Zb.PILE_BACKGROUND),cursor:n.emptyIsActionable&&t.isEmpty?`pointer`:`default`})}return e}buildCards(){let e=[],t=this.interaction.drag?.cardIds??[],n=new Set(t),r=this.interaction.drag?.primary??null,i=t.length>0?this.game.getPileContainingCard(t[0]):null,a=i?this.game.zoneFor(i.id)?.layout:void 0,o=a?.kind===`fan-down`?a.faceUpGap:0,s=new Map;for(let e of this.interaction.flights)for(let t of e.cardIds)s.set(t,s.size);let c=0;for(let i of this.game.piles){let a=this.origins.get(i.id),l=this.game.zoneFor(i.id);if(!a||!l)continue;let u=i.getCards(),d=Kb(l.layout,u,this.expansionCardId(i,u));for(let f=0;f<u.length;f++){let p=u[f],m=n.has(p.id),ee,te,ne=$b(Zb.RESTING_CARD,c++),re=this.interaction.snapAll;if(m&&r){let e=t.indexOf(p.id);ee=r.x,te=r.y+e*o*this.scale,ne=$b(Zb.HELD_CARD,e),re=!0}else{ee=a.x+d[f].x*this.scale,te=a.y+d[f].y*this.scale;let e=s.get(p.id);e!==void 0&&(ne=$b(Zb.FLYING_CARD,e))}e.push({cardId:p.id,x:ee,y:te,scale:this.spriteScale,depth:ne,frame:Kg(l.face,p,this.presentation.cardBackKey),cursor:this.game.isCardInteractableInPile(p,i)?`pointer`:`default`,draggable:this.game.isCardDraggableInPile(p,i),snap:re})}}return e}expansionCardId(e,t){if(!this.interaction.hoveredCardId||this.interaction.drag)return null;let n=t.find(e=>e.id===this.interaction.hoveredCardId);return n&&this.game.isCardInteractableInPile(n,e)?n.id:null}buildHighlights(){let e=this.interaction.drag;if(e&&e.cardIds.length>0){let t=this.buildDropTargetHighlight(e);return t?[t]:[]}let t=this.buildHoverHighlight();return t?[t]:[]}buildDropTargetHighlight(e){let t=ex(this.game,e,this.metrics);if(!t)return null;let n=this.game.getPileById(t.pileId);if(!n||!this.game.canMoveCardToPile(e.cardIds[0],t.pileId))return null;let r=n.topCard;return{anchor:r?{kind:`card`,cardId:r.id}:{kind:`point`,x:t.x,y:t.y},width:this.cardWidth,height:this.cardHeight,scale:this.scale,depth:$b(Zb.DROP_TARGET_HINT),openBottom:!1}}buildHoverHighlight(){let e=this.buildBackgroundHoverHighlight();if(e)return e;if(!this.interaction.hoveredCardId)return null;let t=this.game.getCardById(this.interaction.hoveredCardId),n=t?this.game.getPileContainingCard(t.id):void 0;if(!t||!n||!this.game.isCardInteractableInPile(t,n))return null;let r=n.getCards(),i=r.indexOf(t);return{anchor:{kind:`card`,cardId:t.id},width:this.cardWidth,height:this.cardHeight,scale:this.scale,depth:$b(Zb.HOVER_HINT),openBottom:i!==-1&&i<r.length-1}}buildBackgroundHoverHighlight(){let e=this.interaction.hoveredBackgroundPileId;if(!e)return null;let t=this.game.getPileById(e),n=this.game.zoneFor(e),r=this.origins.get(e);return!t?.isEmpty||!n?.emptyIsActionable||!r?null:{anchor:{kind:`point`,x:r.x,y:r.y},width:this.cardWidth,height:this.cardHeight,scale:this.scale,depth:$b(Zb.HOVER_HINT),openBottom:!1}}};function nx(e,t,n,r){return new tx(e,t,n,r).build()}var rx={columns:7,rows:2,slots:T_(3).map(e=>e.slot),cardSize:{width:221,height:313},gap:{x:30,y:40},padding:{x:40,y:40},headerHeightPx:73,designHeightPx:950};function ix(e){return Bb(rx,e)}function ax(e,t){return(n,r)=>nx(e,n,ix(r),{cardBackKey:t.cardBackKey()})}function ox(e){return(t,n)=>ex(e,t,ix(n))}function sx(e,t){let n=e.getCards(),r=n.findIndex(e=>e.id===t);return r===-1?[]:n.slice(r).map(e=>e.id)}function cx(e){return t=>{switch(t.kind){case`activate`:{let n=e.getPileContainingCard(t.cardId);if(!n)throw Error(`Card ${t.cardId} is not in a pile`);n.role===Y.STOCK&&n.topCard?.id===t.cardId&&e.drawCardsFromStock();return}case`activate-secondary`:{let n=e.getPileContainingCard(t.cardId);(n?.role===Y.TABLEAU||n?.role===Y.WASTE)&&e.autoMoveCard(t.cardId);return}case`activate-pile`:t.pileId===e.stock.id&&e.stock.isEmpty&&e.drawCardsFromStock();return;case`drop`:{let[n]=t.cardIds;t.targetPileId&&n&&e.moveCardToPile(n,t.targetPileId);return}}}}function lx(e){return t=>{let n=e.getPileContainingCard(t);return n?sx(n,t):[]}}var ux=class e{window;game;parent;static MAX_PIXEL_RATIO=2;pixelRatioQuery=null;parentObserver=null;onViewportChange=()=>{this.apply()};constructor(e,t,n){this.window=e,this.game=t,this.parent=n}get pixelRatio(){return Math.min(this.devicePixelRatio,e.MAX_PIXEL_RATIO)}start(){this.apply(),this.window.addEventListener(`resize`,this.onViewportChange),this.observeParent()}observeParent(){typeof ResizeObserver>`u`||typeof Element>`u`||!(this.parent instanceof Element)||(this.parentObserver=new ResizeObserver(this.onViewportChange),this.parentObserver.observe(this.parent))}stop(){this.window.removeEventListener(`resize`,this.onViewportChange),this.pixelRatioQuery?.removeEventListener(`change`,this.onViewportChange),this.pixelRatioQuery=null,this.parentObserver?.disconnect(),this.parentObserver=null}apply(){let e=this.pixelRatio,t=this.parent.getBoundingClientRect(),n=Math.max(1,Math.floor(t.width)),r=Math.max(1,Math.floor(t.height));this.game.scale.setZoom(1/e),this.game.scale.resize(n*e,r*e),this.game.canvas.style.width=`${n}px`,this.game.canvas.style.height=`${r}px`,this.watchPixelRatio()}get devicePixelRatio(){return Math.max(this.window.devicePixelRatio||1,1)}watchPixelRatio(){let e=this.window.matchMedia?.(`(resolution: ${this.devicePixelRatio}dppx)`);e&&(this.pixelRatioQuery?.removeEventListener(`change`,this.onViewportChange),this.pixelRatioQuery=e,e.addEventListener(`change`,this.onViewportChange))}};function dx(e,t,n){return new Hb({game:e,cardIds:e.cardIds,layout:rx,buildViewState:ax(e,t),resolveDropTarget:ox(e),handleIntent:cx(e),stackFromCard:lx(e),cardBackKey:()=>t.cardBackKey(),onBackgroundColor:t.onBackgroundColor,onReset:t=>{let n=()=>t();return e.on(`game-reset`,n),()=>e.off(`game-reset`,n)},onCardsRelocated:t=>e.onCardsRelocated(t),onReady:n})}var fx=class{window;parent;makeBoardScene;game;scaler;constructor(e,t,n){this.window=e,this.parent=t,this.makeBoardScene=n}start(){let e=new i({title:`fSolitaire`,type:a,parent:this.parent,backgroundColor:og,scale:{mode:t.ScaleModes.NONE},render:{antialias:!0,roundPixels:!0},canvasStyle:`display: block; width: 100%; height: 100%;`,autoFocus:!0,scene:[xb,this.makeBoardScene()]});this.game=e,e.events.once(n.Events.READY,()=>{this.scaler=new ux(this.window,e,this.parent),this.scaler.start()})}destroy(){this.scaler?.stop(),this.scaler=void 0,this.game?.destroy(!0),this.game=void 0}};function px(e){return t=>{let n=e.getPileContainingCard(t),r=e.getCardById(t),i=n?e.zoneFor(n.id):void 0;if(!n||!r||!i||!Wg(i.grab,r,n))return[];let a=n.getCards(),o=a.indexOf(r);return o===-1?[]:a.slice(o).map(e=>e.id)}}function mx(e){let{game:t,layout:n,handleIntent:r,presentation:i,onReady:a}=e,o=e=>Bb(n,e);return new Hb({game:t,cardIds:t.cardIds,layout:n,buildViewState:(e,n)=>nx(t,e,o(n),{cardBackKey:i.cardBackKey()}),resolveDropTarget:(e,n)=>ex(t,e,o(n)),handleIntent:r,stackFromCard:px(t),cardBackKey:()=>i.cardBackKey(),onBackgroundColor:i.onBackgroundColor,onReset:e=>{let n=()=>e();return t.on(`game-reset`,n),()=>t.off(`game-reset`,n)},onCardsRelocated:e=>t.onCardsRelocated(e),onReady:a})}function hx(e){return t=>{switch(t.kind){case`activate`:case`activate-pile`:return;case`activate-secondary`:e.autoMoveCard(t.cardId);return;case`drop`:{let[n]=t.cardIds;t.targetPileId&&n&&e.moveCardToPile(n,t.targetPileId);return}}}}var gx={columns:8,rows:2,slots:W_(j_.FREECELL).map(e=>e.slot),cardSize:{width:221,height:313},gap:{x:30,y:40},padding:{x:40,y:40},headerHeightPx:73,designHeightPx:1120};function _x(e,t,n){return mx({game:e,layout:gx,handleIntent:hx(e),presentation:t,onReady:n})}var vx={columns:10,rows:2,slots:cv().map(e=>e.slot),cardSize:{width:221,height:313},gap:{x:30,y:40},padding:{x:40,y:40},headerHeightPx:73,designHeightPx:1350};function yx(e){return t=>{switch(t.kind){case`activate`:e.getPileContainingCard(t.cardId)?.role===Z.STOCK&&e.dealRow();return;case`activate-pile`:return;case`activate-secondary`:e.getPileContainingCard(t.cardId)?.role===Z.TABLEAU&&e.autoMoveCard(t.cardId);return;case`drop`:{let[n]=t.cardIds;t.targetPileId&&n&&e.moveCardToPile(n,t.targetPileId);return}}}}function bx(e,t,n){return mx({game:e,layout:vx,handleIntent:yx(e),presentation:t,onReady:n})}var xx={columns:7,rows:2,slots:wv(hv).map(e=>e.slot),cardSize:{width:221,height:313},gap:{x:30,y:40},padding:{x:40,y:40},headerHeightPx:73,designHeightPx:1150};function Sx(e,t,n){return mx({game:e,layout:xx,handleIntent:hx(e),presentation:t,onReady:n})}var Cx={columns:12,rows:2,slots:Bv().map(e=>e.slot),cardSize:{width:221,height:313},gap:{x:30,y:40},padding:{x:40,y:40},headerHeightPx:73,designHeightPx:1200};function wx(e,t,n){return mx({game:e,layout:Cx,handleIntent:hx(e),presentation:t,onReady:n})}var Tx={columns:7,rows:2,slots:Qv().map(e=>e.slot),cardSize:{width:221,height:313},gap:{x:30,y:40},padding:{x:40,y:40},headerHeightPx:73,designHeightPx:1150};function Ex(e){return t=>{switch(t.kind){case`activate`:e.getPileContainingCard(t.cardId)?.role===$.STOCK&&e.dealStock();return;case`activate-pile`:return;case`activate-secondary`:e.getPileContainingCard(t.cardId)?.role===$.TABLEAU&&e.autoMoveCard(t.cardId);return;case`drop`:{let[n]=t.cardIds;t.targetPileId&&n&&e.moveCardToPile(n,t.targetPileId);return}}}}function Dx(e,t,n){return mx({game:e,layout:Tx,handleIntent:Ex(e),presentation:t,onReady:n})}function Ox(e,t,n){if(e instanceof k_)return dx(e,t,n);if(e instanceof q_)return _x(e,t,n);if(e instanceof dv)return bx(e,t,n);if(e instanceof Dv)return Sx(e,t,n);if(e instanceof Uv)return wx(e,t,n);if(e instanceof ty)return Dx(e,t,n);throw Error(`No board is registered for this game.`)}var kx={klondike:rx,freecell:gx,spider:vx,yukon:xx,bakers:gx,eightoff:Cx,scorpion:Tx};function Ax(e){return kx[e??``]??rx}var jx=[`canvasHost`],Mx=(e,t)=>t.pileId;function Nx(e,t){if(e&1&&(R(0,`div`,9),B(1,`div`,10),z()),e&2){let e=t.$implicit;mm(`grid-column`,e.column+1)(`grid-row`,e.row+1)}}function Px(e,t){e&1&&(R(0,`div`,8),W(1,`Board initialization timed out`),z())}function Fx(e,t){if(e&1&&(R(0,`div`,8),W(1),z()),e&2){let e=H();j(),Lm(`Loading `,e.gameName(),`...`)}}var Ix=class e{catalog=S(gy);presentation=S(fg);canvasHostRef=th.required(`canvasHost`);isInitializing=O(!0);hasInitializationFailed=O(!1);gameName=K(()=>this.catalog.selectedEntry?.name??`Klondike`);layoutSpec=K(()=>Ax(this.catalog.selectedId()));constructor(){xo(e=>{let{game:t}=this.catalog.session();this.isInitializing.set(!0),this.hasInitializationFailed.set(!1);let n=!1,r=()=>{n=!0,this.isInitializing.set(!1)},i=setTimeout(()=>{n||(this.hasInitializationFailed.set(!0),this.isInitializing.set(!1))},8e3),a=this.canvasHostRef().nativeElement,o=new fx(window,a,()=>Ox(t,this.presentation,r));o.start(),window.klondike=o,e(()=>{clearTimeout(i),o.destroy(),window.klondike===o&&delete window.klondike})})}static ɵfac=function(t){return new(t||e)};static ɵcmp=Yf({type:e,selectors:[[`app-game-canvas`]],viewQuery:function(e,t){e&1&&Kp(t.canvasHostRef,jx,5),e&2&&qp()},decls:12,vars:8,consts:[[`canvasHost`,``],[1,`canvas-container`],[`role`,`status`,1,`loading-overlay`],[1,`skeleton-grid`],[1,`skeleton-slot`,3,`grid-column`,`grid-row`],[1,`loading-badge`],[1,`spinner-ring`],[1,`mini-card-icon`],[1,`loading-text`],[1,`skeleton-slot`],[1,`skeleton-shimmer`]],template:function(e,t){e&1&&(B(0,`div`,1,0),R(2,`div`,2)(3,`div`,3),P(4,Nx,2,4,`div`,4,Mx),z(),R(6,`div`,5)(7,`div`,6)(8,`div`,7),W(9,`♠`),z()(),M(10,Px,2,0,`div`,8)(11,Fx,2,1,`div`,8),z()()),e&2&&(j(2),U(`hidden`,!t.isInitializing()),gp(`aria-busy`,t.isInitializing()),j(),mm(`grid-template-columns`,`repeat(`+t.layoutSpec().columns+`, 1fr)`)(`grid-template-rows`,`repeat(`+t.layoutSpec().rows+`, 1fr)`),j(),F(t.layoutSpec().slots),j(6),N(t.hasInitializationFailed()?10:11))},styles:[`[_nghost-%COMP%] {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.canvas-container[_ngcontent-%COMP%] {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}


.loading-overlay[_ngcontent-%COMP%] {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(12, 45, 25, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  opacity: 1;
  visibility: visible;
  transition:
    opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    visibility 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: auto;
  user-select: none;
}

.loading-overlay.hidden[_ngcontent-%COMP%] {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}


.skeleton-grid[_ngcontent-%COMP%] {
  display: grid;
  width: 92%;
  max-width: 1150px;
  height: 82%;
  gap: 14px;
  padding: 24px;
  box-sizing: border-box;
}


.skeleton-slot[_ngcontent-%COMP%] {
  position: relative;
  width: 100%;
  max-width: 84px;
  aspect-ratio: 71 / 96;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.07);
  border: 1.5px dashed rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  justify-self: center;
}

@media (min-width: 1024px) {
  .skeleton-slot[_ngcontent-%COMP%] {
    border-radius: 10px;
  }
}


.skeleton-shimmer[_ngcontent-%COMP%] {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.12) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: translateX(-100%);
  animation: _ngcontent-%COMP%_shimmer 1.8s infinite cubic-bezier(0.4, 0, 0.6, 1);
}

@keyframes _ngcontent-%COMP%_shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}


.loading-badge[_ngcontent-%COMP%] {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 24px;
  border-radius: 30px;
  background: rgba(15, 23, 42, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow:
    0 12px 32px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(59, 130, 246, 0.15);
  color: #f8fafc;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  z-index: 12;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  animation: _ngcontent-%COMP%_pulseGlow 2.5s infinite ease-in-out;
}

@keyframes _ngcontent-%COMP%_pulseGlow {
  0%,
  100% {
    box-shadow:
      0 12px 32px rgba(0, 0, 0, 0.4),
      0 0 20px rgba(59, 130, 246, 0.15);
  }
  50% {
    box-shadow:
      0 12px 32px rgba(0, 0, 0, 0.5),
      0 0 30px rgba(59, 130, 246, 0.35);
  }
}


.spinner-ring[_ngcontent-%COMP%] {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2.5px solid rgba(255, 255, 255, 0.2);
  border-top-color: #60a5fa;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: _ngcontent-%COMP%_spin 1s linear infinite;
}

.mini-card-icon[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #60a5fa;
  animation: _ngcontent-%COMP%_spinReverse 1s linear infinite;
}

@keyframes _ngcontent-%COMP%_spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes _ngcontent-%COMP%_spinReverse {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

.loading-text[_ngcontent-%COMP%] {
  white-space: nowrap;
  background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}


@media (prefers-reduced-motion: reduce) {
  .skeleton-shimmer[_ngcontent-%COMP%], 
   .loading-badge[_ngcontent-%COMP%], 
   .spinner-ring[_ngcontent-%COMP%], 
   .mini-card-icon[_ngcontent-%COMP%] {
    animation: none !important;
  }
}`]})},Lx=`fsolitaire-menu-expanded`;function Rx(){if(typeof localStorage>`u`)return!1;try{return localStorage.getItem(Lx)===`true`}catch(e){return console.warn(`Failed to read the game menu state:`,e),!1}}var zx=class e{destroyRef=S(Na);expanded=O(Rx());overlay=O(!1);isExpanded=this.expanded.asReadonly();isOverlay=this.overlay.asReadonly();constructor(){if(typeof window>`u`||!window.matchMedia)return;let e=window.matchMedia(`(max-width: 720px)`);this.overlay.set(e.matches);let t=()=>this.overlay.set(e.matches);e.addEventListener(`change`,t),this.destroyRef.onDestroy(()=>{e.removeEventListener(`change`,t)})}collapseIfOverlay(){this.overlay()&&this.setExpanded(!1)}toggle(){this.setExpanded(!this.expanded())}setExpanded(e){this.expanded()!==e&&(this.expanded.set(e),this.persist(e))}persist(e){if(!(typeof localStorage>`u`))try{localStorage.setItem(Lx,String(e))}catch(e){console.warn(`Failed to save the game menu state:`,e)}}static ɵfac=function(t){return new(t||e)};static ɵprov=y({token:e,factory:e.ɵfac,providedIn:`root`})},Bx=(e,t)=>t.id;function Vx(e,t){if(e&1){let e=Vp();R(0,`div`,7),V(`click`,function(){return E(e),D(H().menu.setExpanded(!1))}),z()}}function Hx(e,t){e&1&&(R(0,`span`,4),W(1,`Games`),z())}function Ux(e,t){if(e&1&&(R(0,`span`,10),W(1),z()),e&2){let e=H().$implicit;j(),G(e.name)}}function Wx(e,t){if(e&1){let e=Vp();R(0,`li`)(1,`button`,8),V(`click`,function(){let t=E(e).$implicit;return D(H().chooseGame(t.id))}),R(2,`span`,9),W(3),z(),M(4,Ux,2,1,`span`,10),z()()}if(e&2){let e=t.$implicit,n=H();j(),U(`active`,n.session.selectedGameId()===e.id),Hp(`title`,e.name),gp(`aria-current`,n.session.selectedGameId()===e.id),j(2),G(e.name.charAt(0)),j(),N(n.menu.isExpanded()?4:-1)}}var Gx=class e{session=S(yy);menu=S(zx);chooseGame(e){this.session.selectGame(e),this.menu.collapseIfOverlay()}static ɵfac=function(t){return new(t||e)};static ɵcmp=Yf({type:e,selectors:[[`app-game-menu`]],decls:9,vars:8,consts:[[1,`menu-backdrop`],[`title`,`Games`,1,`menu-toggle`,3,`click`],[`fill`,`currentColor`,`aria-hidden`,`true`,`viewBox`,`0 0 24 24`,1,`toggle-icon`],[`d`,`M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z`],[1,`menu-title`],[1,`game-menu`],[1,`game-list`],[1,`menu-backdrop`,3,`click`],[1,`game-item`,3,`click`,`title`],[1,`game-marker`],[1,`game-name`]],template:function(e,t){e&1&&(M(0,Vx,1,0,`div`,0),R(1,`button`,1),V(`click`,function(){return t.menu.toggle()}),Sa(),R(2,`svg`,2),B(3,`path`,3),z(),M(4,Hx,2,0,`span`,4),z(),Ca(),R(5,`nav`,5)(6,`ul`,6),P(7,Wx,5,6,`li`,null,Bx),z()()),e&2&&(N(t.menu.isExpanded()?0:-1),j(),U(`expanded`,t.menu.isExpanded()),gp(`aria-expanded`,t.menu.isExpanded())(`aria-label`,t.menu.isExpanded()?`Collapse game menu`:`Expand game menu`),j(3),N(t.menu.isExpanded()?4:-1),j(),U(`expanded`,t.menu.isExpanded()),j(2),F(t.session.games))},styles:[`





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
}`]})};$h(class e{theme=S(hg);menu=S(zx);showSettings=O(!1);openSettings(){this.showSettings.set(!0)}closeSettings(){this.showSettings.set(!1)}static ɵfac=function(t){return new(t||e)};static ɵcmp=Yf({type:e,selectors:[[`app-root`]],decls:9,vars:5,consts:[[1,`board-area`],[1,`ui-overlay`],[3,`openSettings`],[3,`closed`,`open`]],template:function(e,t){e&1&&(I(0,`div`,0),zp(1,`app-game-canvas`),L(),I(2,`div`,1)(3,`app-header-bar`,2),Wp(`openSettings`,function(){return t.openSettings()}),L(),zp(4,`app-game-menu`),I(5,`app-settings-drawer`,3),Wp(`closed`,function(){return t.closeSettings()}),L(),zp(6,`app-game-help-modal`)(7,`app-victory-overlay`)(8,`app-confirmation-dialog`),L()),e&2&&(U(`rail-expanded`,t.menu.isExpanded()),j(2),hm(t.theme.currentBgClass()),j(3),Ip(`open`,t.showSettings()))},dependencies:[Ix,Gx,Sy,Ry,hb,By,Hy],styles:[`




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
}`]})},{providers:[Bm()]}).catch(e=>{console.error(e)});