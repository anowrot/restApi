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
        if (Object.keys(this.body).length === 0) {
            return Error('Response from server was empty')
        }
        return _.isEqual(this.body, body);
    }

    isJsonSchema() {
        console.log(this.status, this.body)
        //tutaj sprawdzanie czy pasuje do json schema
    }
}

module.exports = ApiResponse;