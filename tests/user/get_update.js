var chakram = require('chakram');
var expect = chakram.expect;
var constant = require('../test.constant');

describe("Scenarios for Get/Put user in pet store", function() {
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

    // USER GET 200
    it("should get the user by username", function () {
        return chakram.get(`${constant.BASE_URL}${endpoint}/${constant.DEFAULT_USER.username}`)
        .then(function(res) {
            var user = res.body;
            expect(user.username).to.equal(constant.DEFAULT_USER.username);
            expect(user.firstName).to.equal(constant.DEFAULT_USER.firstName);
            expect(user.lastName).to.equal(constant.DEFAULT_USER.lastName);
            expect(user.email).to.equal(constant.DEFAULT_USER.email);
            expect(user.password).to.equal(constant.DEFAULT_USER.password);
            expect(user.phone).to.equal(constant.DEFAULT_USER.phone);
        });        
    });

    // USER GET 400
    it("should return error when getting the user by invalid username", function () {
        var invalid_username = ""
        return chakram.get(`${constant.BASE_URL}${endpoint}/${invalid_username}`)
        .then(function(res) {
            return expect(res).to.have.status(400);
        });        
    });

    // USER GET 404
    it("should return error when getting the user which not exists", function () {
        var not_exist_user = 'not_exists'
        return chakram.get(`${constant.BASE_URL}${endpoint}/${not_exist_user}`)
        .then(function(res) {
            return expect(res).to.have.status(404);
        });        
    });
    
    // USER PUT 200
    it("should update user information without error", function () {
        var updateUserData = Object.assign({}, constant.DEFAULT_USER);
        updateUserData.firstName = `update_${updateUserData.firstName}`;
        updateUserData.lastName = `update_${updateUserData.lastName}`;
        updateUserData.email = `update_${updateUserData.email}`;
        
        return chakram.put(`${constant.BASE_URL}${endpoint}/${updateUserData.username}`, updateUserData)
        .then(function() {
            return chakram.get(`${constant.BASE_URL}${endpoint}/${updateUserData.username}`)
        }).then(function(res){
            var user = res.body;
            expect(user.username).to.equal(updateUserData.username);
            expect(user.firstName).to.equal(updateUserData.firstName);
            expect(user.lastName).to.equal(updateUserData.lastName);
            expect(user.email).to.equal(updateUserData.email);
            expect(user.password).to.equal(updateUserData.password);
            expect(user.phone).to.equal(updateUserData.phone);
            return;
        });
    });

    // USER PUT 200
    it("should update username without error", function () {
        var updateUserData = Object.assign({}, constant.DEFAULT_USER);
        updateUserData.username = `update_${updateUserData.username}`;
        
        return chakram.put(`${constant.BASE_URL}${endpoint}/${constant.DEFAULT_USER.username}`, updateUserData)
        .then(function() {
            return chakram.get(`${constant.BASE_URL}${endpoint}/${updateUserData.username}`)
        }).then(function(res){
            var user = res.body;
            expect(user.username).to.equal(updateUserData.username);
            expect(user.firstName).to.equal(updateUserData.firstName);
            expect(user.lastName).to.equal(updateUserData.lastName);
            expect(user.email).to.equal(updateUserData.email);
            expect(user.password).to.equal(updateUserData.password);
            expect(user.phone).to.equal(updateUserData.phone);
            return;
        });
    });

    // USER PUT 200
    it("should update user status without error", function () {
        var updateUserData = Object.assign({}, constant.DEFAULT_USER);
        updateUserData.userStatus = 1;
        
        return chakram.put(`${constant.BASE_URL}${endpoint}/${updateUserData.username}`, updateUserData)
        .then(function() {
            return chakram.get(`${constant.BASE_URL}${endpoint}/${updateUserData.username}`)
        }).then(function(res){
            var user = res.body;
            expect(user.username).to.equal(updateUserData.username);
            expect(user.firstName).to.equal(updateUserData.firstName);
            expect(user.lastName).to.equal(updateUserData.lastName);
            expect(user.email).to.equal(updateUserData.email);
            expect(user.password).to.equal(updateUserData.password);
            expect(user.phone).to.equal(updateUserData.phone);
            expect(user.userStatus).to.equal(1);
            return;
        });
    });

    // USER PUT 404
    it("should return error when update user which not exists", function () {
        var updateUserData = Object.assign({}, constant.DEFAULT_USER);
        updateUserData.email = `update_${updateUserData.email}`;

        var not_exist_user = 'not_exists';
        
        return chakram.put(`${constant.BASE_URL}${endpoint}/${not_exist_user}`, updateUserData)
        .then(function(res) {
            return expect(res).to.have.status(404);
        });
    });

    // USER PUT 400
    it("should return error when update user with invalid username", function () {
        var updateUserData = Object.assign({}, constant.DEFAULT_USER);
        updateUserData.email = `update_${updateUserData.email}`;

        var invalid_username = '';
        
        return chakram.put(`${constant.BASE_URL}${endpoint}/${invalid_username}`, updateUserData)
        .then(function(res) {
            return expect(res).to.have.status(400);
        });
    });

    // USER PUT 500
    it("should return error when update user with invalid type data", function () {
        var updateUserData = Object.assign({}, constant.DEFAULT_USER);
        updateUserData.userStatus = `string`;
        
        return chakram.put(`${constant.BASE_URL}${endpoint}/${constant.DEFAULT_USER.username}`, updateUserData)
        .then(function(res) {
            return expect(res).to.have.status(500);
        });
    });
});