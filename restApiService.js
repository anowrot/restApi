const fetch = require('node-fetch');
const restResponse = require('/Users/adamnowrot/WebstormProjects/kakuninDrafts/restResponse.js')

class RestApiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    fetchFunction(method, endpoint) {
        return fetch(`${this.baseUrl}${endpoint}`, {method})
            .then(response => {
                const body = response.json();
                return new restResponse(response.status, body);
            })
    }
}

module.exports = RestApiService;


//case że nie ma odpowiedzi
// response bedzie a body puste