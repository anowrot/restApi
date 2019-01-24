const service = require('./restApiService');
const data = require('./testData');
const ApiRequest = require('./apiRequest');

const someHeaders = data.testHeaders;

let responseResult;
let apiRequest = new ApiRequest();

function someStep() {
//i send post request with JSON body

    apiRequest.method = 'post';
    apiRequest.endpoint = 'employees';
    apiRequest.body = data.testPostData;
    // apiRequest.headers =

    return service.fetch(apiRequest)
        .then((response) => responseResult = response)
        .finally(() => apiRequest = new ApiRequest())
}

function anotherStep(someHeaders) {
    // I set request headers:

    // apiRequest.headers = {};
    for (let index = 0; index < someHeaders.length; index++) {
        apiRequest.headers[someHeaders[index][0]] = someHeaders[index][1];
    }

    // apiRequest.headers = myHeaders;

    return apiRequest.headers;
}

function thirdStep() {
    return console.log(responseResult.hasStatus(201));
}

function fourthStep(data.testHeaders) {
    // apiRequest.headers = {};
    for (let index = 0; index < data.testHeaders.length; index++) {
        apiRequest.headers[data.testHeaders[index][0]] = data.testHeaders[index][1];
    }

    // apiRequest.headers = myHeaders;

    return apiRequest.headers;
}

anotherStep();
someStep().then(() => thirdStep());

