var chakram = require('chakram');
var expect = chakram.expect;
var constant = require('../test.constant');
var utils = require('../test.utils');

describe("Scenarios for Delete pet in pet store", function() {
    var endpoint = '/pet';
    var newPet = null;

    before(function () {
        newPet = Object.assign({}, constant.DEFAULT_PET);
        newPet.name = `newPet-${utils.genRandomStr(5)}`
        return chakram.post(`${constant.BASE_URL}${endpoint}`, newPet)
        .then(function(res) {
            newPet.id =  res.body.id;
            return;
        });   
    });

    after(function() {
        if (newPet != undefined) {
            return chakram.delete(`${constant.BASE_URL}${endpoint}/${newPet.id}`);
        }
    });

    // PET POST 200
    it("should Delete Pet without error", function () {
        return chakram.delete(`${constant.BASE_URL}${endpoint}/${newPet.id}`)
        .then(function(res) {
            expect(res).to.have.status(200);
            return chakram.get(`${constant.BASE_URL}${endpoint}/${newPet.id}`)
        }).then(function(res){
            return expect(res).to.have.status(404);
        });
    });

    // PET POST 404
    it("should return error when deleting Pet with invalid id", function () {
        var invalid_id = "-1"
        return chakram.delete(`${constant.BASE_URL}${endpoint}/${invalid_id}`)
        .then(function(res) {
            expect(res).to.have.status(404);
        })
    });
});