const fetch = require('node-fetch');
const ApiResponse = require('./apiResponse');
const config = require('./config');

class RestApiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    resolveUrl(endpoint) {
        return `${this.baseUrl}${endpoint}`;
    }
//method, endpoint, payload = false, headers
    fetch(request) {
        const url = this.resolveUrl(request.endpoint);
        // request.headers = {
        //     'Content-Type': 'application/json',
        // };
        console.log(request.headers)
        return fetch(url, {method: request.method, body: request.body, headers: request.headers})
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