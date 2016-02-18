//  whump.js 0.0.2
//  https://github.com/flovan/whumph
//  (c) 2015-whateverthecurrentyearis Florian Vanthuyne
//  Whumph may be freely distributed under the MIT license.

(function () {
	'use strict';

	// HELPERS ----------------------------------------------------------------

	// Checks if a variable is an Object
	var isObject = function (v) {
        return Object.prototype.toString.call(v) === '[object Object]';
    };

	// Checks if a variable is an Array
    var isArray = function (v) {
        if (Array.isArray) {
            return  Array.isArray(v);
        }
        return Object.prototype.toString.call(v) === '[object Array]';
    };

	// Extends an object with another one, optionally deep
    var extend = function (to, from, isDeep) {
        for (var key in from) {
            if (!from.hasOwnProperty(key)) {
                continue;
            }
            if (!isDeep || !(isArray(from[key]) || isObject(from[key]))) {
                to[key] = from[key];
                continue;
            }
            if (!to[key] && isArray(from[key])) {
                to[key] = [];
            }
            if (!to[key] && isObject(from[key])) {
                to[key] = {};
            }
            extend(to[key], from[key], isDeep);
        }
        return to;
    };

	// Returns the current time
	var now = Date.now || function () {
		return new Date().getTime();
	};

	// Throttles a callback
	var throttle = function (func, wait, leading, trailing) {
		var context, args, result;
		var timeout = null;
		var previous = 0;

		var later = function () {
			previous = !!leading ? 0 : getNow();
			timeout = null;
			result = func.apply(context, args);
			if (!timeout) {
				context = args = null;
			}
		};

		return function () {
			var now = getNow();
			var remaining;

			if (!previous && !!leading) {
				previous = now;
			}

			remaining = wait - (now - previous);
			context = this;
			args = arguments;

			if (remaining <= 0 || remaining > wait) {
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}

				previous = now;
				result = func.apply(context, args);

				if (!timeout) {
					context = args = null;
				}
			} else if (!timeout && !trailing) {
				timeout = setTimeout(later, remaining);
			}

			return result;
		};
	}

	// MODIFICATIONS ----------------------------------------------------------

	// Shim the `matches()` method
	Node.prototype.matches = Node.prototype.matches || Node.prototype.mozMatchesSelector || Node.prototype.msMatchesSelector || Node.prototype.oMatchesSelector || Node.prototype.webkitMatchesSelector;

	// Shim the `closest()` method
	Node.prototype.closest = Node.prototype.closest || function (selector) {
		var element = this;
		var firstChar = selector.charAt(0);

		while (element) {
			if (element.matches(selector)) {
				break;
			}

			element = element.parentElement;
		}

		return element;
	}

	// Allow "on" to add eventlisteners to Nodes
	Node.prototype.on = self.on = function (name, fn) {
		this.addEventListener(name, fn);
	};

	// Make NodeList behave like Array instead of Object
	NodeList.prototype.__proto__ = Array.prototype;
	NodeList.prototype.forEach = Array.prototype.forEach;

	// Allow "on" to add eventlisteners to NodeLists
	NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
		this.forEach(function (elem, i) {
			elem.on(name, fn);
		});
	};

	// Allow "trigger" to trigger an event
	Node.prototype.trigger = self.trigger = function (name, data) {
		this.dispatchEvent(new CustomEvent(name, { details: data || {} }));
	};

	// LIB --------------------------------------------------------------------

	// Instatiate the mighty $ if it doesn't exist yet
	var $ = self.Whumph = extend(function(expr, context) {
		// Run `querySelector` on an expression or a context
		return typeof expr === 'string' ? (context || document).querySelector(expr) : expr || null;
	}, self.Whumph);

	// Extend $ to contain more functionality
	extend($, {
		// Pass in the helpers, since they're already included in the code
		isObject: isObject,
		isArray: isArray,
		extend: extend,
		now: now,
		throttle: throttle,

		// Provide a quick way to do `querySelectorAll`
		$: function (expr, context) {
			if (expr instanceof Node || expr instanceof Window) {
				return [expr];
			}
			return typeof expr == "string"? (context || document).querySelectorAll(expr) : expr || null;
		},

		// A function that applies a callback to all the enumerable properties
		// of a variable, returning the resulting object as well
		each: function(obj, callback, ret) {
			ret = ret || {};

			for (var property in obj) {
				ret[property] = callback.call(obj, property, obj[property]);
			}

			return ret;
		},

		// DOMReady event sugar
		ready: function (callback) {
			if (document.readyState !== 'loading') {
				callback.call(document);
			} else {
				document.addEventListener('DOMContentLoaded', function(){
					callback.call(document);
				});
			}
		}
	});

	// Set $ and $$ on `self` (reference to Window)
	self.$ = self.$ || $;
	self.$$ = self.$$ || $.$;

	// POLYFILLS --------------------------------------------------------------

	// Custom Event for `.trigger()`
	function CustomEvent (name, params) {
		var evt = document.createEvent('CustomEvent');

		params = params || {
			bubbles: false,
			cancelable: false,
			detail: undefined
		};

		evt.initCustomEvent(name, params.bubbles, params.cancelable, params.detail);
		return evt;
	}

	CustomEvent.prototype = self.Event.prototype;
	self.CustomEvent = CustomEvent;
})();

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */
if("document" in self){if(!("classList" in document.createElement("_"))){(function(j){"use strict";if(!("Element" in j)){return}var a="classList",f="prototype",m=j.Element[f],b=Object,k=String[f].trim||function(){return this.replace(/^\s+|\s+$/g,"")},c=Array[f].indexOf||function(q){var p=0,o=this.length;for(;p<o;p++){if(p in this&&this[p]===q){return p}}return -1},n=function(o,p){this.name=o;this.code=DOMException[o];this.message=p},g=function(p,o){if(o===""){throw new n("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(o)){throw new n("INVALID_CHARACTER_ERR","String contains an invalid character")}return c.call(p,o)},d=function(s){var r=k.call(s.getAttribute("class")||""),q=r?r.split(/\s+/):[],p=0,o=q.length;for(;p<o;p++){this.push(q[p])}this._updateClassName=function(){s.setAttribute("class",this.toString())}},e=d[f]=[],i=function(){return new d(this)};n[f]=Error[f];e.item=function(o){return this[o]||null};e.contains=function(o){o+="";return g(this,o)!==-1};e.add=function(){var s=arguments,r=0,p=s.length,q,o=false;do{q=s[r]+"";if(g(this,q)===-1){this.push(q);o=true}}while(++r<p);if(o){this._updateClassName()}};e.remove=function(){var t=arguments,s=0,p=t.length,r,o=false,q;do{r=t[s]+"";q=g(this,r);while(q!==-1){this.splice(q,1);o=true;q=g(this,r)}}while(++s<p);if(o){this._updateClassName()}};e.toggle=function(p,q){p+="";var o=this.contains(p),r=o?q!==true&&"remove":q!==false&&"add";if(r){this[r](p)}if(q===true||q===false){return q}else{return !o}};e.toString=function(){return this.join(" ")};if(b.defineProperty){var l={get:i,enumerable:true,configurable:true};try{b.defineProperty(m,a,l)}catch(h){if(h.number===-2146823252){l.enumerable=false;b.defineProperty(m,a,l)}}}else{if(b[f].__defineGetter__){m.__defineGetter__(a,i)}}}(self))}else{(function(){var b=document.createElement("_");b.classList.add("c1","c2");if(!b.classList.contains("c2")){var c=function(e){var d=DOMTokenList.prototype[e];DOMTokenList.prototype[e]=function(h){var g,f=arguments.length;for(g=0;g<f;g++){h=arguments[g];d.call(this,h)}}};c("add");c("remove")}b.classList.toggle("c3",false);if(b.classList.contains("c3")){var a=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(d,e){if(1 in arguments&&!this.contains(d)===!e){return e}else{return a.call(this,d)}}}b=null}())}};
