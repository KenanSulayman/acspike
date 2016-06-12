"use strict";

function EventHandlers(){}function EventEmitter(){EventEmitter.init.call(this)}function $getMaxListeners(e){return void 0===e._maxListeners?EventEmitter.defaultMaxListeners:e._maxListeners}function emitNone(e,t,n){if(t)e.call(n);else for(var r=e.length,i=arrayClone(e,r),s=0;r>s;++s)i[s].call(n)}function emitOne(e,t,n,r){if(t)e.call(n,r);else for(var i=e.length,s=arrayClone(e,i),o=0;i>o;++o)s[o].call(n,r)}function emitTwo(e,t,n,r,i){if(t)e.call(n,r,i);else for(var s=e.length,o=arrayClone(e,s),a=0;s>a;++a)o[a].call(n,r,i)}function emitThree(e,t,n,r,i,s){if(t)e.call(n,r,i,s);else for(var o=e.length,a=arrayClone(e,o),u=0;o>u;++u)a[u].call(n,r,i,s)}function emitMany(e,t,n,r){if(t)e.apply(n,r);else for(var i=e.length,s=arrayClone(e,i),o=0;i>o;++o)s[o].apply(n,r)}function _addListener(e,t,n,r){var i,s,o;if("function"!=typeof n)throw new TypeError('"listener" argument must be a function');return s=e._events,s?(s.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),s=e._events),o=s[t]):(s=e._events=new EventHandlers,e._eventsCount=0),o?("function"==typeof o?o=s[t]=r?[n,o]:[o,n]:r?o.unshift(n):o.push(n),o.warned||(i=$getMaxListeners(e),i&&i>0&&o.length>i&&(o.warned=!0,console.warn("Possible EventEmitter memory leak detected. $ {\n                    existing.length\n                }\n                $ {\n                    type\n                }\n                listeners added.Use emitter.setMaxListeners() to increase limit")))):(o=s[t]=n,++e._eventsCount),e}function _onceWrap(e,t,n){function r(){e.removeListener(t,r),i||(i=!0,n.apply(e,arguments))}var i=!1;return r.listener=n,r}function listenerCount(e){var t=this._events;if(t){var n=t[e];if("function"==typeof n)return 1;if(n)return n.length}return 0}function spliceOne(e,t){for(var n=t,r=n+1,i=e.length;i>r;n+=1,r+=1)e[n]=e[r];e.pop()}function arrayClone(e,t){for(var n=Array(t);t--;)n[t]=e[t];return n}var domain;EventHandlers.prototype=Object.create(null),EventEmitter.EventEmitter=EventEmitter,EventEmitter.usingDomains=!1,EventEmitter.prototype.domain=void 0,EventEmitter.prototype._events=void 0,EventEmitter.prototype._maxListeners=void 0;var defaultMaxListeners=10;Object.defineProperty(EventEmitter,"defaultMaxListeners",{enumerable:!0,get:function(){return defaultMaxListeners},set:function(e){defaultMaxListeners=e}}),EventEmitter.init=function(){this.domain=null,EventEmitter.usingDomains&&(domain=domain||require("domain"),!domain.active||this instanceof domain.Domain||(this.domain=domain.active)),this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=new EventHandlers,this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},EventEmitter.prototype.setMaxListeners=function(e){if("number"!=typeof e||0>e||isNaN(e))throw new TypeError('"n" argument must be a positive number');return this._maxListeners=e,this},EventEmitter.prototype.getMaxListeners=function(){return $getMaxListeners(this)},EventEmitter.prototype.emit=function(e){var t,n,r,i,s,o,a,u=!1,l="error"===e;if(o=this._events)l=l&&null==o.error;else if(!l)return!1;if(a=this.domain,l){if(t=arguments[1],!a){if(t instanceof Error)throw t;var m=Error('Uncaught, unspecified "error" event. ('+t+")");throw m.context=t,m}return t||(t=Error('Uncaught, unspecified "error" event')),t.domainEmitter=this,t.domain=a,t.domainThrown=!1,a.emit("error",t),!1}if(n=o[e],!n)return!1;a&&this!==process&&(a.enter(),u=!0);var v="function"==typeof n;switch(r=arguments.length){case 1:emitNone(n,v,this);break;case 2:emitOne(n,v,this,arguments[1]);break;case 3:emitTwo(n,v,this,arguments[1],arguments[2]);break;case 4:emitThree(n,v,this,arguments[1],arguments[2],arguments[3]);break;default:for(i=Array(r-1),s=1;r>s;s++)i[s-1]=arguments[s];emitMany(n,v,this,i)}return u&&a.exit(),!0},EventEmitter.prototype.addListener=function(e,t){return _addListener(this,e,t,!1)},EventEmitter.prototype.on=EventEmitter.prototype.addListener,EventEmitter.prototype.prependListener=function(e,t){return _addListener(this,e,t,!0)},EventEmitter.prototype.once=function(e,t){if("function"!=typeof t)throw new TypeError('"listener" argument must be a function');return this.on(e,_onceWrap(this,e,t)),this},EventEmitter.prototype.prependOnceListener=function(e,t){if("function"!=typeof t)throw new TypeError('"listener" argument must be a function');return this.prependListener(e,_onceWrap(this,e,t)),this},EventEmitter.prototype.removeListener=function(e,t){var n,r,i,s,o;if("function"!=typeof t)throw new TypeError('"listener" argument must be a function');if(r=this._events,!r)return this;if(n=r[e],!n)return this;if(n===t||n.listener&&n.listener===t)0===--this._eventsCount?this._events=new EventHandlers:(delete r[e],r.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(i=-1,s=n.length;s-->0;)if(n[s]===t||n[s].listener&&n[s].listener===t){o=n[s].listener,i=s;break}if(0>i)return this;if(1===n.length){if(n[0]=void 0,0===--this._eventsCount)return this._events=new EventHandlers,this;delete r[e]}else spliceOne(n,i);r.removeListener&&this.emit("removeListener",e,o||t)}return this},EventEmitter.prototype.removeAllListeners=function(e){var t,n;if(n=this._events,!n)return this;if(!n.removeListener)return 0===arguments.length?(this._events=new EventHandlers,this._eventsCount=0):n[e]&&(0===--this._eventsCount?this._events=new EventHandlers:delete n[e]),this;if(0===arguments.length){for(var r,i=Object.keys(n),s=0;s<i.length;++s)r=i[s],"removeListener"!==r&&this.removeAllListeners(r);return this.removeAllListeners("removeListener"),this._events=new EventHandlers,this._eventsCount=0,this}if(t=n[e],"function"==typeof t)this.removeListener(e,t);else if(t)do this.removeListener(e,t[t.length-1]);while(t[0]);return this},EventEmitter.prototype.listeners=function(e){var t,n,r=this._events;return r?(t=r[e],n=t?"function"==typeof t?[t]:arrayClone(t,t.length):[]):n=[],n},EventEmitter.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):listenerCount.call(e,t)},EventEmitter.prototype.listenerCount=listenerCount,EventEmitter.prototype.eventNames=function(){return this._eventsCount>0?Reflect.ownKeys(this._events):[]};

module.exports = EventEmitter;