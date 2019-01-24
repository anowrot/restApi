class ApiRequest {
    constructor() {
        this.method = null;
        this.endpoint = null;
        this.payload = null;
        this.headers = {};
    };

    get body() {
        return this.payload
    }

    set body(payload) {
        this.payload = payload ? JSON.stringify(payload) : undefined;
    }
}

module.exports = ApiRequest;