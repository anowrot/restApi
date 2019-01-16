const fetch = require('node-fetch');
const ApiResponse = require('/Users/adamnowrot/WebstormProjects/kakuninDrafts/apiResponse.js')

class RestApiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async fetchFunction(method, endpoint) {
        return fetch(`${this.baseUrl}${endpoint}`, {method})
            .then(response => {
                const contentType = response.headers.get("content-type");
                if(contentType.startsWith("application/json")) {
                    return response.json().then((body) => {
                        return new ApiResponse(response.status, body);
                    })
                }
                return new ApiResponse(response.status, {});
            })

        // const response = await fetch(`${this.baseUrl}${endpoint}`, {method});
        // const body = await response.json();
        // return new ApiResponse(response.status, body);
    }
}

module.exports = new RestApiService('https://swapi.co/api/');


//case że nie ma odpowiedzi
// response bedzie a body puste