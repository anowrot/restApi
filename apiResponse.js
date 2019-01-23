const _ = require('lodash');
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });
const data = require('./testData');



class ApiResponse {
    constructor(responseStatus, body, headers) {
        this.body = body;
        this.status = responseStatus;
        this.headers = headers;
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

    hasMatchSchema(schema) {
        const test = ajv.compile(schema);
        const isValid = test(this.body);
        return isValid ? true : { obj: this.body, error: test.errors };
    }

    // testHeaders(testHeaders) {
    //     const myHeaders = {};
    //     for (let index = 0; index < testHeaders.length; index++) {
    //         myHeaders[testHeaders[index][0]] = testHeaders[index][1];
    //     }
    // };
}

module.exports = ApiResponse;