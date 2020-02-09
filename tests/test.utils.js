var request = require('request');

function genRandomStr(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function httpRequest(method, uri, body, data) {
    return new Promise((resolve, reject) => {
        switch(method) {
            case "GET": 
                request.get(uri, (error, res, body) => {
                    if (error != undefined) {
                        reject(error, res);
                    } else {
                        resolve(res, body);
                    }
                });
                break;
            case "POST":
                request.post(uri, body, (error, res, body) => {
                    if (error != undefined) {
                        reject(error, res);
                    } else {
                        resolve(res, body);
                    }
                });
                break;
            case "DELETE":
                request.delete(uri, (error, res, body) => {
                    if (error != undefined) {
                        reject(error, res);
                    } else {
                        resolve(res, body);
                    }
                });
                break;
            case "PUT":
                request.put(uri, (error, res, body) => {
                    if (error != undefined) {
                        reject(error, res);
                    } else {
                        resolve(res, body);
                    }
                });
                break;
        }
     });
}

module.exports = {
    genRandomStr: genRandomStr,
    httpRequest: httpRequest
}