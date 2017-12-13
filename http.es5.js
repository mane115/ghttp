'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var rq = require('request-promise');
var _ = require('lodash');
var config = require('./config');
// const util = require('../util');
var parseJson = function parseJson(str) {
    try {
        str = JSON.parse(str);
    } finally {
        return str;
    }
};

var Http = function () {
    function Http(baseUrl) {
        _classCallCheck(this, Http);

        this.baseUrl = baseUrl;
        this.request = function (option) {
            return rq(option).then(function (result) {
                if (typeof result === 'string') {
                    result = parseJson(result);
                }
                return result;
            });
        };
        this.setDefaultHeader = function (headers) {
            headers['content-type'] = headers['content-type'] ? headers['content-type'] : 'application/json';
            headers['referer'] = headers['referer'] ? headers['referer'] : config.http.referer;
            headers['origin'] = headers['origin'] ? headers['origin'] : config.http.origin;
            headers['user-agent'] = headers['user-agent'] ? headers['user-agent'] : config.http.userAgent;
            headers['Accept'] = headers['Accept'] ? headers['Accept'] : config.http.accept;
            headers['Accept-Language'] = headers['Accept-Language'] ? headers['Accept-Language'] : config.http.acceptLanguage;
            return headers;
        };
    }

    _createClass(Http, [{
        key: 'get',
        value: function get(url, headers) {
            var option = {
                uri: '' + this.baseUrl + url,
                method: 'GET',
                headers: {}
            };
            if (!_.isEmpty(headers)) {
                option.headers = headers;
            };
            option.headers = this.setDefaultHeader(option.headers);
            return this.request(option);
        }
    }, {
        key: 'post',
        value: function post(url, data, headers) {
            var option = {
                uri: '' + this.baseUrl + url,
                method: 'POST',
                headers: {}
            };
            if (!_.isEmpty(data)) {
                option.body = JSON.stringify(data);
            }
            if (!_.isEmpty(headers)) {
                option.headers = headers;
            }
            option.headers = this.setDefaultHeader(option.headers);
            return this.request(option);
        }
    }, {
        key: 'put',
        value: function put(url, data, headers) {
            var option = {
                uri: '' + this.baseUrl + url,
                method: 'PUT',
                headers: {}
            };
            if (!_.isEmpty(data)) {
                option.body = JSON.stringify(data);
            }
            if (!_.isEmpty(headers)) {
                option.headers = headers;
            };
            option.headers = this.setDefaultHeader(option.headers);
            return this.request(option);
        }
    }, {
        key: 'del',
        value: function del(url, data, headers) {
            var option = {
                uri: '' + this.baseUrl + url,
                method: 'DELETE',
                headers: {}
            };
            if (!_.isEmpty(data)) {
                option.body = JSON.stringify(data);
            }
            if (!_.isEmpty(headers)) {
                option.headers = headers;
            }
            option.headers = this.setDefaultHeader(option.headers);
            return this.request(option);
        }
    }]);

    return Http;
}();

;

module.exports = Http;

