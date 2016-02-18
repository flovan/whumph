[whumph.ajax.js](https://github.com/flovan/whumph/plugins/ajax) v0.0.1

An extensions for Whumph providing some syntax sugar for XMLHttpRequests.  
~0.9KB minified and gzipped.

## Credits

Pieced together with the help of:
- [bliss.js](https://github.com/LeaVerou/bliss)
- [reqwest.js](https://github.com/ded/reqwest)

## API

##### `$.ajax(url, opts)`

Instantiates a XMLHttpRequest to the provided `url`.  
Available options and their defaults:  

```javascript
{
	data: {},
	method: 'GET',
	headers: {},
	success: function(data){},
	fail: function(err){}
}
```

## Browser support

Testing needed

> **Note:** Modern browser support will probably be better than listed above. If you tested an earlier version, feel free to send a PR with updated versions.

## Changelog

* **0.0.1**
  * First commit, WIP
