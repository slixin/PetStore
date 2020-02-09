var chakram = require('chakram');
var expect = chakram.expect;
var constant = require('../test.constant');

describe("Scenarios for user login / logout in pet store", function() {
    var userCreatePost = null;
    var endpoint = '/user';

    before("create a test user, then", function () {
        userCreatePost = chakram.post(`${constant.BASE_URL}${endpoint}`, constant.DEFAULT_USER);
        return expect(userCreatePost).to.have.status(200);
    });

    after(function() {
        return chakram.get(`${constant.BASE_URL}${endpoint}/${constant.DEFAULT_USER.username}`)
        .then(function(res) {
            if (res.status == 200) {
                return chakram.delete(`${constant.BASE_URL}${endpoint}/${constant.DEFAULT_USER.username}`)
            }
        });
    });

    // USER LOGIN
    it("should login with correct username and password", function () {
        return chakram.get(`${constant.BASE_URL}${endpoint}/login?username=${constant.DEFAULT_USER.username}&password=${constant.DEFAULT_USER.password}`)
        .then(function(res){
            return expect(/logged in user session:\d+/.test(res.body)).to.be.true;
        });
    });

    // USER LOGIN
    it("should return error when login with incorrect username or password", function () {
        var invalid_username, invalid_password;

        invalid_username = '';
        invalid_password = '';

        return chakram.get(`${constant.BASE_URL}${endpoint}/login?username=${invalid_username}&password=${invalid_password}`)
        .then(function(res){
            return expect(res).to.have.status(400);
        });
    });

    // USER LOGOUT
    it("should logout", function () {
        return chakram.get(`${constant.BASE_URL}${endpoint}/logout`)
        .then(function(res){
            return expect(res).to.have.status(200);
        });
    });
});
