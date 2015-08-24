//  whump.js 0.0.1
//  https://github.com/flovan/whumph
//  (c) 2015-whateverthecurrentyearis Florian Vanthuyne
//  Whumph may be freely distributed under the MIT license.

(function (w, d) {
	'use strict';

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
})(window, document);