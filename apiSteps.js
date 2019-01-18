const service = require('/Users/adamnowrot/WebstormProjects/kakuninDrafts/restApiService.js');
const  expect = require('expect');
const config = require('./config');
const data = require('./testData');

let responseResult;

function someStep() {
    return service.fetch('post', 'posts', data.testPostData)
        .then((response) => responseResult = response);
}

function anotherStep() {
     return console.log(responseResult.hasMatchSchema(data.responseSchema));
}

someStep().then(() => anotherStep());

// ,  {'Accept': 'application/json, text/plain. */*', 'Content-type': 'application/json'}