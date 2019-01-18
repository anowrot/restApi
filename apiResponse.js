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
        // console.log(this.headers);
        //tutaj sprawdzanie czy pasuje do json schema
    }
}

module.exports = ApiResponse;