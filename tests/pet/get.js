var chakram = require('chakram');
var expect = chakram.expect;
var constant = require('../test.constant');
var utils = require('../test.utils');

describe("Scenarios for Get pets in pet store", function() {
    var endpoint = '/pet';
    var newPet = null;

    before(function () {
        newPet = Object.assign({}, constant.DEFAULT_PET);
        newPet.name = `newPet-${utils.genRandomStr(5)}`
        return chakram.post(`${constant.BASE_URL}${endpoint}`, newPet)
        .then(function(res) {
            newPet.id = res.body.id;
            return;
        });   
    });

    after(function() {
        if (newPet != undefined) {
            return chakram.delete(`${constant.BASE_URL}${endpoint}/${newPet.id}`);
        }
    });

    // PET POST 200
    it("should Get Pet by Id", function () {
        return chakram.get(`${constant.BASE_URL}${endpoint}/${newPet.id}`)
        .then(function(res) {
            var pet = res.body;
            expect(pet.name).to.equal(newPet.name);
            expect(pet.status).to.equal(newPet.status);
            expect(JSON.stringify(pet.photoUrls)).to.equal(JSON.stringify(newPet.photoUrls));
            expect(JSON.stringify(pet.category)).to.equal(JSON.stringify(newPet.category));
            expect(JSON.stringify(pet.tags)).to.equal(JSON.stringify(newPet.tags));
        });
    });

    // PET POST 404
    it("should return error when getting Pet which not exists", function () {
        var not_exist_pet = "not_exist"
        return chakram.get(`${constant.BASE_URL}${endpoint}/${not_exist_pet}`)
        .then(function(res) {
            expect(res).to.have.status(404);
        })
    });

    // PET POST 400
    it("should return error when getting Pet with invalid id", function () {
        var invalid_id = ""
        return chakram.get(`${constant.BASE_URL}${endpoint}/${invalid_id}`)
        .then(function(res) {
            expect(res).to.have.status(400);
        })
    });

    // PET POST 200
    it("should Get Pets by status", function () {
        var status = "available"
        return chakram.get(`${constant.BASE_URL}${endpoint}/findByStatus?status=${status}`)
        .then(function(res) {
            var pets = res.body;
            var createdPets = pets.filter(function(o) { return o.name == newPet.name });
            expect(createdPets.length).to.be.equal(1);            
        });
    });

    // PET POST 400
    it("should return error when getting Pets by invalid status", function () {
        var status = "notexists"
        return chakram.get(`${constant.BASE_URL}${endpoint}/findByStatus?status=${status}`)
        .then(function(res) {
            expect(res).to.have.status(400);         
        });
    });

    // PET POST 400
    it("should Get Pets by empty status", function () {
        var status = "";
        return chakram.get(`${constant.BASE_URL}${endpoint}/findByStatus?status=${status}`)
        .then(function(res) {
            expect(res).to.have.status(400);         
        });
    });
});