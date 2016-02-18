//  whump.ajax.js 0.0.1
//  https://github.com/flovan/whumph
//  (c) 2015-whateverthecurrentyearis Florian Vanthuyne
//  Whumph may be freely distributed under the MIT license.

(function ($) {
	'use strict';

	// This requires Whumph to be loaded
	if (!Whumph) {
		return;
	}

	// HELPERS ----------------------------------------------------------------

	// Converts a query string to an Object
	var queryStringToObject = function (str) {
		var obj = {};

		// Cut off the starting "?" if there is one
		if (str.substr(0,1) === '?') {
			str = str.substr(1);
		}

		str.split('&').forEach(function (param) {
			param = param.split('=');
			obj[param[0]] = param[1];
		});

		return obj;
	};

	// Converts an Object to a query string
	var objectToQueryString = function (obj) {
		var str = [];

		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				str.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
			}
		}

		// spaces should be + according to spec
		return str.join('&').replace(/%20/g, '+')
	}

	// LIB --------------------------------------------------------------------

	// Extend $ to contain Ajax functionality
	$.extend($, {
		// Pass in the helpers, since they're already included in the code
		queryStringToObject: queryStringToObject,
		objectToQueryString: objectToQueryString,

		// XHR request sugar
		ajax: function(url, opts) {
			// Require  a url
			if (!url || typeof url !== 'string') {
				throw new TypeError('URL parameter cannot be ' + url);
			}

			// Extend defaults with passed in options
			var env = $.extend({
				url: url,
				data: {},
				method: 'GET',
				headers: {},
				xhr: new XMLHttpRequest(),
				success: function(){},
				fail: function(){}
			}, opts || {});

			var queryIndex = env.url.indexOf('?') + 1;

			// Method should be uppercase
			env.method = env.method.toUpperCase();

			// If we're GET'ing, append the data to the URL
			if (env.method === "GET" && env.data) {
				env.url = env.url.substr(0, queryIndex) + objectToQueryString($.extend(queryStringToObject(env.url.substr(queryIndex)), env.data));
			}

			// Open the xhr instance
			env.xhr.open(env.method, env.url, env.async !== false, env.user, env.password);

			// Map all of the options onto the xhr instance
			for (var property in opts) {
				if (property in env.xhr) {
					try {
						env.xhr[property] = opts[property];
					}
					catch (e) {
						self.console && console.error(e);
					}
				}
			}

			// Set a default Content-Type for POST requests
			if (env.method !== 'GET' && !env.headers['Content-type'] && !env.headers['Content-Type']) {
				env.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			}

			// Apply the other headers to the xhr instance
			for (var header in env.headers) {
				env.xhr.setRequestHeader(header, env.headers[header]);
			}

			// Add an onload callback
			env.xhr.onload = function(){
				document.body.removeAttribute('data-loading');

				if (env.xhr.status === 0 || env.xhr.status >= 200 && env.xhr.status < 300 || env.xhr.status === 304) {
					env.success.call(env.xhr, env.xhr.response);
				}
				else {
					env.error.call(env.xhr, env.xhr.response);
				}

			};

			// Add an onerror callback
			env.xhr.onerror = function() {
				document.body.removeAttribute('data-loading');
				reject(Error("Network Error"));
			};

			// And finally, send the request, passing in the data when POST'ing
			env.xhr.send(env.method === 'GET' ? null : env.data);
		}
	});
})(Whumph);
