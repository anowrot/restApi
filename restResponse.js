const _ = require('lodash');

class RestResponse {
    constructor(responseStatus, body) {
        this.body = body;
        this.status = responseStatus;
    }

    hasStatus(status) {
        return this.status === status
    }

    hasMatch(body) {
        console.log(this.body)
        return _.isEqual(this.body, body);
    }
}

module.exports = RestResponse;