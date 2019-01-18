const _ = require('lodash');
const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true });

const schema =
    {
        "title": "Posts schema",
        "type": "object",
        "properties": {
            "id": {
                "type": "integer"
            },
            "title": {
                "type": "string"
            },
            "body": {
                "type": "string"
            }
        },
        "required": ["id", "title", "body"]
    };

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

    isJsonSchema() {
        const test = ajv.compile(schema);
        const isValid = test(this.body);

        console.log(isValid ? true : { obj: this.body, error: test.errors })

        console.log(this.status, this.body)
        // console.log(this.headers);
        //tutaj sprawdzanie czy pasuje do json schema
    }
}

module.exports = ApiResponse;