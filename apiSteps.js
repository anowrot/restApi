const service = require('/Users/adamnowrot/WebstormProjects/kakuninDrafts/restApiService.js');
const  expect = require('expect');
const config = require('./config');
const data = require('./testData');

let responseResult;
let requestHeaders = {};

function someStep() {
    // console.log(data.testHeaders);
    return service.fetch('post', 'employees', data.testPostData, requestHeaders)
        .then((response) => responseResult = response)
        .finally(() => request = new Request()) // resetowanie requesta
}

function anotherStep() {
    // I set request headers:
    const myHeaders = {};
    for (let index = 0; index < data.testHeaders.length; index++) {
        myHeaders[data.testHeaders[index][0]] = data.testHeaders[index][1];
    }
     return requestHeaders = myHeaders;
}

function thirdStep() {
    return console.log(responseResult.hasStatus(201));
}

someStep().then(() => thirdStep());

// anotherStep();
// someStep();
// check();
// check();
// someStep();