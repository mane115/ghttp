// 'use strict'
if (process.versions && process.versions.node) {
	let version = process.versions.node.split('.');
	if (+version[0] > 6) {
		module.exports = require('./http');
	} else {
		module.exports = require('./http.es5');
	}
} else {
	module.exports = require('./http.es5');
}