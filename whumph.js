//  whump.js 0.0.1
//  https://github.com/flovan/whumph
//  (c) 2015-whateverthecurrentyearis Florian Vanthuyne
//  Whumph may be freely distributed under the MIT license.

(function (w, d) {
	'use strict';

	///////////////////////////////////////////////////////////////////////////
	//                                                                       //
	// LIB                                                                   //
	//                                                                       //
	///////////////////////////////////////////////////////////////////////////

	// Assign qSA to $ to mimix jQuery
	w.$ = d.querySelector.bind(d);
	w.$$ = d.querySelectorAll.bind(d);

	// Make NodeList behave like Array instead of Object
	NodeList.prototype.__proto__ = Array.prototype;
	NodeList.prototype.forEach = Array.prototype.forEach; // Fix IE9/10 errors

	// Provide a "closest" method
	Node.prototype.closest = function (selector) {
		var firstChar = selector.charAt(0);

		// Get closest match
		for (; elem && elem !== document; elem = elem.parentNode) {
		    // If selector is a class
		    if (firstChar === '.') {
		        if (elem.classList.contains(selector.substr(1))) {
		            return elem;
		        }
		    }

		    // If selector is an ID
		    if (firstChar === '#') {
		        if (elem.id === selector.substr(1)) {
		            return elem;
		        }
		    } 

		    // If selector is a data attribute
		    if (firstChar === '[') {
		        if (elem.hasAttribute(selector.substr(1, selector.length - 2))) {
		            return elem;
		        }
		    }

		    // If selector is a tag
		    if (elem.tagName.toLowerCase() === selector) {
		        return elem;
		    }
		}

		return false;
	}

	// Allow "on" to add eventlisteners
	Node.prototype.on = w.on = function (name, fn) {
		this.addEventListener(name, fn);
	};

	NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
		this.forEach(function (elem, i) {
			elem.on(name, fn);
		});
	};

	// Allow "trigger" to trigger an event
	Node.prototype.trigger = w.trigger = function (name, data) {
		this.dispatchEvent(new CustomEvent(name, { details: data || {} }));
	};

	///////////////////////////////////////////////////////////////////////////
	//                                                                       //
	// POLYFILLS                                                             //
	//                                                                       //
	///////////////////////////////////////////////////////////////////////////

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

	CustomEvent.prototype = w.Event.prototype;
	w.CustomEvent = CustomEvent;
})(window, document);

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */
if("document" in self){if(!("classList" in document.createElement("_"))){(function(j){"use strict";if(!("Element" in j)){return}var a="classList",f="prototype",m=j.Element[f],b=Object,k=String[f].trim||function(){return this.replace(/^\s+|\s+$/g,"")},c=Array[f].indexOf||function(q){var p=0,o=this.length;for(;p<o;p++){if(p in this&&this[p]===q){return p}}return -1},n=function(o,p){this.name=o;this.code=DOMException[o];this.message=p},g=function(p,o){if(o===""){throw new n("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(o)){throw new n("INVALID_CHARACTER_ERR","String contains an invalid character")}return c.call(p,o)},d=function(s){var r=k.call(s.getAttribute("class")||""),q=r?r.split(/\s+/):[],p=0,o=q.length;for(;p<o;p++){this.push(q[p])}this._updateClassName=function(){s.setAttribute("class",this.toString())}},e=d[f]=[],i=function(){return new d(this)};n[f]=Error[f];e.item=function(o){return this[o]||null};e.contains=function(o){o+="";return g(this,o)!==-1};e.add=function(){var s=arguments,r=0,p=s.length,q,o=false;do{q=s[r]+"";if(g(this,q)===-1){this.push(q);o=true}}while(++r<p);if(o){this._updateClassName()}};e.remove=function(){var t=arguments,s=0,p=t.length,r,o=false,q;do{r=t[s]+"";q=g(this,r);while(q!==-1){this.splice(q,1);o=true;q=g(this,r)}}while(++s<p);if(o){this._updateClassName()}};e.toggle=function(p,q){p+="";var o=this.contains(p),r=o?q!==true&&"remove":q!==false&&"add";if(r){this[r](p)}if(q===true||q===false){return q}else{return !o}};e.toString=function(){return this.join(" ")};if(b.defineProperty){var l={get:i,enumerable:true,configurable:true};try{b.defineProperty(m,a,l)}catch(h){if(h.number===-2146823252){l.enumerable=false;b.defineProperty(m,a,l)}}}else{if(b[f].__defineGetter__){m.__defineGetter__(a,i)}}}(self))}else{(function(){var b=document.createElement("_");b.classList.add("c1","c2");if(!b.classList.contains("c2")){var c=function(e){var d=DOMTokenList.prototype[e];DOMTokenList.prototype[e]=function(h){var g,f=arguments.length;for(g=0;g<f;g++){h=arguments[g];d.call(this,h)}}};c("add");c("remove")}b.classList.toggle("c3",false);if(b.classList.contains("c3")){var a=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(d,e){if(1 in arguments&&!this.contains(d)===!e){return e}else{return a.call(this,d)}}}b=null}())}};