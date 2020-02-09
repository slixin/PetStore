module.exports = Object.freeze({
    BASE_URL: "https://petstore.swagger.io/v2",
    DEFAULT_USER: {
        "username": "default",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@testt.com",
        "password": "123456",
        "phone": "0400000000"
    },
    DEFAULT_PET: {
        "category": {
          "id": 0,
          "name": "mammal"
        },
        "name": "puppy505",
        "photoUrls": [
          "https://127.0.0.1/pet.jpg"
        ],
        "tags": [
          {
            "id": 0,
            "name": "black"
          }
        ],
        "status": "available"
      }
});