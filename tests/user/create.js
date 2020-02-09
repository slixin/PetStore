var chakram = require('chakram');
var expect = chakram.expect;
var constant = require('../test.constant');
var utils = require('../test.utils');

describe("Scenarios for CREATE user in pet store", function() {
    var endpoint = '/user';
    var userList = [];

    before(function () {
        userList.push(constant.DEFAULT_USER);
        var user2 = Object.assign({}, constant.DEFAULT_USER);
        user2.username = "default2";
        userList.push(user2);
        var user3 = Object.assign({}, constant.DEFAULT_USER);
        user3.username = "default3";
        userList.push(user3);
    });

    after(function() {
        var multipleResponses = [];
        multipleResponses.push(chakram.delete(`${constant.BASE_URL}${endpoint}/${userList[0].username}`));
        multipleResponses.push(chakram.delete(`${constant.BASE_URL}${endpoint}/${userList[1].username}`));
        multipleResponses.push(chakram.delete(`${constant.BASE_URL}${endpoint}/${userList[2].username}`));

        return chakram.all(multipleResponses).then(function(responses) {
        
        });
    });

    // USER CREATE ARRAY
    it("should create user with array without error", function () {
        return chakram.post(`${constant.BASE_URL}${endpoint}/createWithArray`, userList)
        .then(function(res) {
            var multipleResponses = [];
            multipleResponses.push(chakram.get(`${constant.BASE_URL}${endpoint}/${userList[0].username}`));
            multipleResponses.push(chakram.get(`${constant.BASE_URL}${endpoint}/${userList[1].username}`));
            multipleResponses.push(chakram.get(`${constant.BASE_URL}${endpoint}/${userList[2].username}`));

            return chakram.all(multipleResponses).then(function(responses) {
                var returnedUsernames = responses.map(function(response) {
                    return response.body.username;
                });
                expect(returnedUsernames.indexOf(userList[0].username) >= 0).to.equal(true);
                expect(returnedUsernames.indexOf(userList[1].username) >= 0).to.equal(true);
                expect(returnedUsernames.indexOf(userList[2].username) >= 0).to.equal(true);
            });
        });
    });

    // USER CREATE LIST
    it("should create user with list without error", function () {
        return chakram.post(`${constant.BASE_URL}${endpoint}/createWithList`, userList)
        .then(function(res) {
            var multipleResponses = [];
            multipleResponses.push(chakram.get(`${constant.BASE_URL}${endpoint}/${userList[0].username}`));
            multipleResponses.push(chakram.get(`${constant.BASE_URL}${endpoint}/${userList[1].username}`));
            multipleResponses.push(chakram.get(`${constant.BASE_URL}${endpoint}/${userList[2].username}`));

            return chakram.all(multipleResponses).then(function(responses) {
                var returnedUsernames = responses.map(function(response) {
                    return response.body.username;
                });
                expect(returnedUsernames.indexOf(userList[0].username) >= 0).to.equal(true);
                expect(returnedUsernames.indexOf(userList[1].username) >= 0).to.equal(true);
                expect(returnedUsernames.indexOf(userList[2].username) >= 0).to.equal(true);
            });
        });
    });
});