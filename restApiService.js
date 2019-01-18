const fetch = require('node-fetch');
const ApiResponse = require('./apiResponse');
const config = require('./config');

class RestApiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.headers = {
            'Content-Type': 'application/json'
        };
    }

    resolveUrl(endpoint) {
        return `${this.baseUrl}${endpoint}`;
    }

    fetch(method, endpoint, payload = false) {
        const url = this.resolveUrl(endpoint);
        const body = payload ? JSON.stringify(payload) : undefined;

        return fetch(url, {method, body, headers: this.headers})
            .then(response => {
                const contentType = response.headers.get("content-type");
                if(contentType.startsWith("application/json")) {
                    return response.json().then((body) => {
                        return new ApiResponse(response.status, body, response.headers);
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


// fetch(url, {
//     method: 'POST', // or 'PUT'
//     body: JSON.stringify(data), // data can be `string` or {object}!
//     headers:{
//         'Content-Type': 'application/json'
//     }
// }).then(res => res.json())
//     .then(response => console.log('Success:', JSON.stringify(response)))
//     .catch(error => console.error('Error:', error));