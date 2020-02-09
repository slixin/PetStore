var chakram = require('chakram');
var expect = chakram.expect;
var constant = require('../test.constant');
var utils = require('../test.utils');
var path = require('path');


describe("Scenarios for Update pet in pet store", function() {
    var endpoint = '/pet';
    var newPet = null;

    before(function () {
        newPet = Object.assign({}, constant.DEFAULT_PET);
        newPet.name = `newPet-${utils.genRandomStr(5)}`
        return chakram.post(`${constant.BASE_URL}${endpoint}`, newPet)
        .then(function(res) {
            newPet.id = res.body.id;
        });   
    });

    after(function() {
        if (newPet != undefined) {
            return chakram.delete(`${constant.BASE_URL}${endpoint}/${newPet.id}`)
        }
    });

    // PET PUT 200
    it("should update existing pet", function () {
        var updatePetData = Object.assign({}, newPet);

        updatePetData.name = `update_${updatePetData.name}`;
        updatePetData.status = 'sold';

        return chakram.put(`${constant.BASE_URL}${endpoint}`, updatePetData)
        .then(function(res) {
            var pet = res.body;
            expect(pet.name).to.equal(updatePetData.name);
            expect(pet.status).to.equal(updatePetData.status);
            expect(JSON.stringify(pet.photoUrls)).to.equal(JSON.stringify(newPet.photoUrls));
            expect(JSON.stringify(pet.category)).to.equal(JSON.stringify(newPet.category));
            expect(JSON.stringify(pet.tags)).to.equal(JSON.stringify(newPet.tags));
        });        
    });

    // PET PUT 400
    it("should return error when updating invalid pet", function () {
        var updatePetData = Object.assign({}, newPet);

        updatePetData.id = "";
        updatePetData.name = `update_${updatePetData.name}`;
        updatePetData.status = 'sold';

        return chakram.put(`${constant.BASE_URL}${endpoint}`, updatePetData)
        .then(function(res) {
            return expect(res).to.have.status(400);
        });        
    });

    // PET PUT 404
    it("should return error when updating not existing pet", function () {
        var updatePetData = Object.assign({}, newPet);

        updatePetData.id = "0";
        updatePetData.name = `update_${updatePetData.name}`;
        updatePetData.status = 'sold';

        return chakram.put(`${constant.BASE_URL}${endpoint}`, updatePetData)
        .then(function(res) {
            return expect(res).to.have.status(404);
        });        
    });

    // PET PUT 405
    it("should return error when updating pet with invalid value", function () {
        var updatePetData = Object.assign({}, newPet);

        updatePetData.photoUrls = `invalid`;
        updatePetData.status = 'sold';

        return chakram.put(`${constant.BASE_URL}${endpoint}`, updatePetData)
        .then(function(res) {
            return expect(res).to.have.status(405);
        });        
    });


    // PET PUT 200
    it("should update existing pet with form data", function () {
        return chakram.post(`${constant.BASE_URL}${endpoint}/${newPet.id}`, `name=update_${newPet.name}&status=sold`, {json: true, headers: { "content-type":"application/x-www-form-urlencoded" }})
        .then(function() {
            return chakram.get(`${constant.BASE_URL}${endpoint}/${newPet.id}`)
        }).then(function(res){
            var pet = res.body;
            expect(pet.name).to.equal(`update_${newPet.name}`);
            expect(pet.status).to.equal('sold');
            expect(JSON.stringify(pet.photoUrls)).to.equal(JSON.stringify(newPet.photoUrls));
            expect(JSON.stringify(pet.category)).to.equal(JSON.stringify(newPet.category));
            expect(JSON.stringify(pet.tags)).to.equal(JSON.stringify(newPet.tags));
            return;
        });   
    });

    // PET PUT 405
    it("should return error while updating existing pet without data", function () {
        var updatePetData = {}

        return chakram.post(`${constant.BASE_URL}${endpoint}/${newPet.id}`, "", {json: true, headers: { "content-type":"application/x-www-form-urlencoded" }})
        .then(function(res) {
            return expect(res).to.have.status(405);
        });        
    });

    // PET PUT 405
    it("should return error while updating existing pet with invalid status", function () {
        return chakram.post(`${constant.BASE_URL}${endpoint}/${newPet.id}`, `name=update_${newPet.name}&status=123`, {json: true, headers: { "content-type":"application/x-www-form-urlencoded" }})
        .then(function(res) {
            return expect(res).to.have.status(405);
        });        
    });

    // PET PUT 200
    it("should update existing pet with image file", function () {
        var fs = require('fs');
        return chakram.post(`${constant.BASE_URL}${endpoint}/${newPet.id}/uploadImage`, undefined, {
            formData: {
                pkgFile: fs.createReadStream(path.join(__dirname, 'test.jpg'))
            }
        }).then(function(res){
            return expect(res).to.have.status(200);
        });   
    });
});