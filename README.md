![Whumph](https://raw.githubusercontent.com/flovan/whumph/master/whumph.png) v0.0.2

A JS primer for modern web projects with a tiny foot print.  
~1.9KB minified and gzipped.

## Credits

Pieced together with the help of:
- [bling.js](https://gist.github.com/paulirish/12fb951a8b893a454b32)
- [bliss.js](https://github.com/LeaVerou/bliss)

Using the following polyfills (inlined):
- [Classlist](https://github.com/eligrey/classList.js)
- [closest/matches](https://github.com/jonathantneal/closest)

## API

##### `$(selector)`

Grabs one matching element with `document.querySelector`.  
Returns a `Node`.

##### `$$(selector)`

Grabs all matching elements with `document.querySelectorAll`.  
Returns a `NodeList`.

##### `.forEach(callback[, this])`

Loop over `NodeList` types.  
See the [forEach docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FArray%2FforEach).

##### `.matches(selector)`

Checks if an element matches the provided selector (think jQuery's `is()`).

> **Note:** Not available on `NodeList`s since that doesn't make much sense.

##### `.closest(selector)`

Find a `Node`s' closest element by matching the selector to its siblings and ancestors.

> **Note:** Not available on `NodeList`s since that doesn't make much sense.

##### `.on(name, callback)`

Bind an event listener.

##### `.trigger(name)`

Trigger an event.

## Why is there no ...

##### `.off()`

This is rarely used and can be easily implemented in the library when needed. Otherwise, just use `.removeEventListener()`.

##### `.addClass()`, `.removeClass()`, `.hasClass()`

Whumph includes a polyfill for [classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList), which is just as easy to use.  
See the [classList docs](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList).

##### `.attr()`, `.hasAttr()`

Just use `.setAttribute()` and `.hasAttribute()`.
Note that these need to be called on `Node` typed objects, not `NodeList`. [forEach()](https://github.com/flovan/whumph#foreachcallback-this) is your friend here.

##### `.next()`, `.prev()`, `.parent()`

Just use `.previousElementSibling`, `.nextElementSibling` and `.parentNode`.

##### \<insert other jQuery feature\>

[You might not need jQuery](http://youmightnotneedjquery.com).

## Browser support

IE9+, Chrome 39+, Safari 8+, Opera 26+, FF 35+

> **Note:** Modern browser support will probably be better than listed above. If you tested an earlier version, feel free to send a PR with updated versions.

## Plugins

* [ajax](https://github.com/flovan/whumph/tree/master/plugins/ajax)

## Changelog

* **0.0.2**
  * Restructuring and rewrite based on [bliss.js](https://github.com/LeaVerou/bliss)
  * Fixed a bug with `closest()`
* **0.0.1**
  * First commit, WIP
