// const path = process.cwd();
// var dao = require(path+'/routes/board/dao');

// describe("board dao create test", function() {
//     describe("POST /board", function() {
//         let boardObject;
//         beforeEach(() =>{
//             boardObject = {
//                 category: 1,
//                 lang:1,
//                 title:'hi',
//                 contents:'hi~~~~~'
//             }
//         });

//         it("returns status code 201", function() {
//             dao.createBoard(boardObject)
//             .then((result) => {
//                 expect(result).toBe({message: 'successed'});
//             });
//         });
//     });
// });