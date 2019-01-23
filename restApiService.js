const fetch = require('node-fetch');
const ApiResponse = require('./apiResponse');
const config = require('./config');
global.Headers = fetch.Headers;
global.Request = fetch.Request;

class RestApiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        // const request = new Request(url, {method, body, headers: headers});

    }

    resolveUrl(endpoint) {
        return `${this.baseUrl}${endpoint}`;
    }

    fetch(method, endpoint, payload = false, headers) {
        const content = "Hello World";
        // this.myHeaders.append("Content-type", 'test');

        const url = this.resolveUrl(endpoint);
        const body = payload ? JSON.stringify(payload) : undefined;

        return fetch(url, {method, body, headers: this.headers})
            .then(response => {
                const contentType = response.headers.get("content-type");
                if(contentType.startsWith("application/json")) {
                    return response.json().then((requestBody) => {
                        return new ApiResponse(response.status, requestBody, response.headers);
                    })
                }
                return new ApiResponse(response.status, {});
            })


    }
}

module.exports = new RestApiService(config.baseUrl);


// const response = await fetch(`${this.baseUrl}${endpoint}`, {method});
// const body = await response.json();
// return new ApiResponse(response.status, body);

// const myHeaders = {};
// for (let index = 0; index < headers.length; index++) {
//     myHeaders[headers[index][0]] = headers[index][1];
// }
// this.myHeaders.append("Content-type", 'test');