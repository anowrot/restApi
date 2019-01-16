const _ = require('lodash');
let  expect = require('expect');

class ApiResponse {
    constructor(responseStatus, body) {
        this.body = body;
        this.status = responseStatus;
    }

    hasStatus(status) {
        return this.status === status
    }

    hasMatch(body) {
        return _.isEqual(this.body, body);
    }
}

module.exports = ApiResponse;