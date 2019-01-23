const _ = require('lodash');
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });


class ApiResponse {
    constructor(responseStatus, body, headers) {
        this.body = body;
        this.status = responseStatus;
        this.headers = headers;
    }

    hasStatus(status) {
        console.log(this.body, this.status)
        return this.status === status
    }

    hasMatch(body) {
        if (Object.keys(this.body).length === 0) {
            return Error('Response from server was empty')
        }
        return _.isEqual(this.body, body);
    }

    hasMatchSchema(schema) {
        const test = ajv.compile(schema);
        console.log(this.body)
        const isValid = test(this.body);
        console.log(this.status);
        return isValid ? true : { obj: this.body, error: test.errors };
    }

    testHeaders() {
        // console.log( this.headers);
        console.log(this.status, this.body)
    };
}

module.exports = ApiResponse;