const path = process.cwd();
var request = require('request');

// describe("board create test", function() {
//     describe("POST /board", function() {
//         let options;
//         let url = 'http://127.0.0.1:3000/board'
//         beforeEach(() =>{
//             let boardObject = {
//                 category: 1,
//                 lang:1,
//                 title:'hi',
//                 contents:'hi~~~~~'
//             }
            
//             options = {
//               method: 'post',
//               body: boardObject,
//               json: true,
//               url: url
//             }
//         });

//         it("returns status code 201", function() {
//             request(options, (err, res, body) => {
//                 if(err){
//                     console.error('error posting json : ', err);
//                 }else{
//                     var statusCode = res.statusCode;
//                     expect(statusCode).toBe(201);
//                 }
//             });
//         });
//     });
// });

describe("board read test", function() {
    describe("GET /board", function() {
        let options;
        let url = 'http://127.0.0.1:3000/board'
        beforeEach(() =>{
            options = {
              method: 'get',
              json: true,
              url: url
            }
        });

        it("returns status code 200", function() {
            request(options, (err, res, body) => {
                if(err){
                    console.error('error posting json : ', err);
                }else{
                    var statusCode = res.statusCode;
                    console.log(body);
                    expect(statusCode).toBe(200);
                }
            });
        });
    });
});