# Transpire Testing Challenge

*This document is for Transpire interview, it includes the testing strategy of the testing challenge.*

## Test Strategy

### Approach

To validate the User's API functionality for PetStore in Swagger.io. 

To validate the Pet's API functionality for PetStore in Swagger.io. 

### Scope

Base URL: http://petstore.swagger.io/

Endpoint: **user/** and **pet/**

### Trace Matrix

**User**

| Method                | Type   | Validation                               | Priority |
| --------------------- | ------ | ---------------------------------------- | -------- |
| /user/{username}      | GET    | 200                                      | High     |
|                       |        | 400 (Invalid username)                   | Low      |
|                       |        | 404 (User not found)                     | Low      |
| /user/{username}      | PUT    | 200                                      | High     |
|                       |        | 400 (Invalid user supplied)              | Low      |
|                       |        | 404 (User not found)                     | Low      |
| /user/{username}      | DELETE | 200                                      | High     |
|                       |        | 400 (Invalid user supplied)              | Low      |
|                       |        | 404 (User not found)                     | Low      |
| /user/login           | GET    | 200                                      | High     |
|                       |        | 400 (Invalid username/password supplied) | Low      |
| /user/logout          | GET    | 200                                      | High     |
| /user                 | POST   | 200                                      | High     |
| /user/createWithArray | POST   | 200                                      | High     |
| /user/createWithList  | POST   | 200                                      | High     |

**Pet**

| Method                   | Type | Validation                 | Priority |
| ------------------------ | ---- | -------------------------- | -------- |
| /pet/{petId}             | GET  | 200                        | High     |
|                          |      | 400 (Invalid Id)           | Low      |
|                          |      | 404 (Pet not found)        | Low      |
| /pet                     | POST | 200                        | High     |
|                          |      | 405 (Invalid Input)        | Low      |
| /pet/findByStatus        | GET  | 200                        | High     |
|                          |      | 400 (invalid status)       | Low      |
| /pet                     | PUT  | 200                        | High     |
|                          |      | 400 (Invalid Id)           | Low      |
|                          |      | 404 (Pet not found)        | Low      |
|                          |      | 405 (validation exception) | Low      |
| /pet/{petId}             | POST | 200                        | High     |
|                          |      | 405 (Invalid input)        | Low      |
| /pet/{petId}/uploadImage | POST | 200                        | High     |

### Not in scope

*The following areas are not covered by the testing due to information missing or time limitation.*

- Data validation
  - Email format
  - Field length
  - Nil value
  - Status definition
- End to end testing, for example:
  - Authentication
  - Authenciated user to delete user
  - Authenciated user to delete pet, place order.
- Security testing
  - SQL injection
  - special chars impact
  - Memory leak
- Performance testing

## Automation

### Pre-requisites

- NodeJS is installed, latest version
- MacOS 10 (Does not run the tests on other OS system)

### Tools

- mocha 7.0.1 - Test harness
- chakram 1.5.0 - API testing library (Saving time, can use request.js as well, but need to write the common method to handle the http Request)
- Mochawesome 4.1.0 - reporter

### Installation

1. Sync the latest code from: https://

2. Run the following command in the project root folder:

```bash
npm install
```

### Usage

```python
npm test
```

### Report
The testing result is here.

When you run the project on your local machine, the report is under the project root folder: 

**mochawesome-report/mochawesome.html**

## Assumption & Issues & Questions

- Most of 400 error, cannot be produced, but can trigger the 405 and 500 error. Need more information for the API. 
- No idea what's the difference between user/createWithArray and user/createWithList.
- Upload image for Pet does not works as expected, it might be an issue in chakram library, need time for further investigation.
- From the API functional testing, the response time is significantly big, further performance testing is mandatory.
- When creating Pet, it keeps returning the same Pet Id, even the pet information is different, it might be an issue on the server side.



## License
[MIT](https://choosealicense.com/licenses/mit/)