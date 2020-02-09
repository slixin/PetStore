var chakram = require('chakram');
var expect = chakram.expect;
var constant = require('../test.constant');
var utils = require('../test.utils');

describe("Scenarios for Create pet in pet store", function() {
    var endpoint = '/pet';
    var newPet = null;

    before(function () {
    });

    beforeEach(function() {
        newPet = null;
    })

    afterEach(function() {
        if (newPet != undefined) {
            return chakram.get(`${constant.BASE_URL}${endpoint}/${newPet.id}`)
            .then(function(res) {
                if (res.status == 200) {
                    return chakram.delete(`${constant.BASE_URL}${endpoint}/${newPet.id}`)
                }
            });
        }
    });

    // PET POST 200
    it("should create Pet without error", function () {
        newPet = Object.assign({}, constant.DEFAULT_PET);
        newPet.name = `newPet-${utils.genRandomStr(5)}`
        
        return chakram.post(`${constant.BASE_URL}${endpoint}`, newPet)
        .then(function(res) {
            var pet = res.body;
            newPet.id = pet.id;
            expect(pet.name).to.equal(newPet.name);
            expect(pet.status).to.equal(newPet.status);
            expect(JSON.stringify(pet.photoUrls)).to.equal(JSON.stringify(newPet.photoUrls));
            expect(JSON.stringify(pet.category)).to.equal(JSON.stringify(newPet.category));
            expect(JSON.stringify(pet.tags)).to.equal(JSON.stringify(newPet.tags));
        });        
    });

    // PET POST 200
    it("should create Pet without error when no mandatory data is input", function () {
        newPet = Object.assign({}, constant.DEFAULT_PET);
        newPet.name = `newPet-${utils.genRandomStr(5)}`
        delete newPet.category;
        delete newPet.tags;
        delete newPet.status;

        return chakram.post(`${constant.BASE_URL}${endpoint}`, newPet)
        .then(function(res) {
            var pet = res.body;
            newPet.id = pet.id;
            expect(pet.name).to.equal(newPet.name);
            expect(JSON.stringify(pet.photoUrls)).to.equal(JSON.stringify(newPet.photoUrls));
        });        
    });

    // PET POST 405
    it("should return error when no Pet name on Pet creation", function () {
        newPet = Object.assign({}, constant.DEFAULT_PET);
        newPet.name = `newPet-${utils.genRandomStr(5)}`
        delete newPet.name;
        return chakram.post(`${constant.BASE_URL}${endpoint}`, newPet)
        .then(function(res) {
            return expect(res).to.have.status(405);
        });        
    });

    // PET POST 405
    it("should return error when no Pet pictures on Pet creation", function () {
        newPet = Object.assign({}, constant.DEFAULT_PET);
        newPet.name = `newPet-${utils.genRandomStr(5)}`
        delete newPet.photoUrls;
        return chakram.post(`${constant.BASE_URL}${endpoint}`, newPet)
        .then(function(res) {
            return expect(res).to.have.status(405);
        });        
    });
});