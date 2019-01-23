const service = require('/Users/adamnowrot/WebstormProjects/kakuninDrafts/restApiService.js');
const  expect = require('expect');
const config = require('./config');
const data = require('./testData');

let responseResult;

function someStep() {
    return service.fetch('post', 'employees/', data.testPostData)
        .then((response) => responseResult = response);
}

function anotherStep() {
     return console.log(responseResult.hasStatus(200));
}

someStep().then(() => anotherStep());