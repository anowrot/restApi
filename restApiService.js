const fetch = require('node-fetch');
const ApiResponse = require('./apiResponse');
const config = require('./config');
global.Headers = fetch.Headers;

class RestApiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.headers = {
            'Content-Type': 'application/json'
        };
        this.myHeaders = new Headers();
    }

    resolveUrl(endpoint) {
        return `${this.baseUrl}${endpoint}`;
    }

    fetch(method, endpoint, payload = false) {
        const content = "Hello World";
        // this.myHeaders.append("Content-type", 'test');

        const url = this.resolveUrl(endpoint);
        const body = payload ? JSON.stringify(payload) : undefined;
        // this.headers.append('Content-Type', 'image/jpeg');
        return fetch(url, {method, body, headers: this.headers})
            .then(response => {
                // console.log("BHeaders"+this.myHeaders)
                const contentType = response.headers.get("content-type");
                console.log(response.headers);

                if(contentType.startsWith("application/json")) {
                    return response.json().then((requestBody) => {
                        return new ApiResponse(response.status, requestBody, response.headers);
                    })
                }
                return new ApiResponse(response.status, {});
            })

        // const response = await fetch(`${this.baseUrl}${endpoint}`, {method});
        // const body = await response.json();
        // return new ApiResponse(response.status, body);
    }
}

module.exports = new RestApiService(config.baseUrl);