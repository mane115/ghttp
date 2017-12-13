const rq = require('request-promise');
const _ = require('lodash');
const config = require('./config');
// const util = require('../util');
const parseJson = function(str) {
    try {
        str = JSON.parse(str);
    } finally {
        return str;
    }
};
class Http {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.request = function(option) {
            return rq(option).then(result => {
                if (typeof result === 'string') {
                    result = parseJson(result);
                }
                return result;
            });
        };
        this.setDefaultHeader = headers => {
            headers['content-type'] = headers['content-type'] ? headers['content-type'] : 'application/json';
            headers['referer'] = headers['referer'] ? headers['referer'] : config.http.referer;
            headers['origin'] = headers['origin'] ? headers['origin'] : config.http.origin;
            headers['user-agent'] = headers['user-agent'] ? headers['user-agent'] : config.http.userAgent;
            headers['Accept'] = headers['Accept'] ? headers['Accept'] : config.http.accept;
            headers['Accept-Language'] = headers['Accept-Language'] ? headers['Accept-Language'] : config.http.acceptLanguage;
            return headers;
        };
    }
    get(url, headers) {
        var option = {
            uri: `${this.baseUrl}${url}`,
            method: 'GET',
            headers: {}
        };
        if (!_.isEmpty(headers)) {
            option.headers = headers;
        };
        option.headers = this.setDefaultHeader(option.headers);
        return this.request(option);
    }
    post(url, data, headers) {
        var option = {
            uri: `${this.baseUrl}${url}`,
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
    put(url, data, headers) {
        var option = {
            uri: `${this.baseUrl}${url}`,
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
    del(url, data, headers) {
        var option = {
            uri: `${this.baseUrl}${url}`,
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
};

module.exports = Http;

