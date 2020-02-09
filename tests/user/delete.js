var chakram = require('chakram');
var expect = chakram.expect;
var constant = require('../test.constant');

describe("Scenarios for Delete user in pet store", function() {
    var endpoint = '/user';

    before("create a test user, then", function () {
        var res = chakram.post(`${constant.BASE_URL}${endpoint}`, constant.DEFAULT_USER);
        return expect(res).to.have.status(200);
    });

    after(function() {
        return chakram.get(`${constant.BASE_URL}${endpoint}/${constant.DEFAULT_USER.username}`)
        .then(function(res) {
            if (res.status == 200) {
                return chakram.delete(`${constant.BASE_URL}${endpoint}/${constant.DEFAULT_USER.username}`)
            }
        });
    });

    // USER DELETE 200
    it("should delete the user without error", function () {
        return chakram.delete(`${constant.BASE_URL}${endpoint}/${constant.DEFAULT_USER.username}`)
        .then(function(res) {
            expect(res).to.have.status(200);
            return chakram.get(`${constant.BASE_URL}${endpoint}/${constant.DEFAULT_USER.username}`)
        }).then(function(res){
            return expect(res).to.have.status(404);
        });
    });

    // USER DELETE 404
    it("should return error when delete the user which not exists", function () {
        var not_exist_user = 'not_exists';

        return chakram.delete(`${constant.BASE_URL}${endpoint}/${not_exist_user}`)
        .then(function(res){
            return expect(res).to.have.status(404);
        });
    });

    // USER DELETE 400
    it("should return error when delete the user with invalid username", function () {
        var invalid_username = '';

        return chakram.delete(`${constant.BASE_URL}${endpoint}/${invalid_username}`)
        .then(function(res){
            return expect(res).to.have.status(400);
        });
    });
});