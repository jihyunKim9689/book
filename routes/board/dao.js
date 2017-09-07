const path = process.cwd();
const Board = require(path + "/models/board");
const Category = require(path + "/models/board_category");

exports.readBoard = (params) => {
    return new Promise((resolve,reject) => {
        Board.find({
            lang:params.lang
        })
        .limit(parseInt(params.limit))
        .skip(parseInt(params.limit) * (parseInt(params.page) - 1))
        .sort({
            createdAt:'desc'
        })
        .populate('category')
        .exec((error, board) => {
            if(error){
                console.error(error);
                return reject(new Error('database failure'));
            }else{
                return resolve(board);
            }
        });
    })
}

exports.createBoard = (params) => {    
    return new Promise((resolve, reject) => {
        Category.findOne({type: params.category}, (err, category) => {
            if(err){
                console.error(error);
                reject(new Error('database failure'));
            }else{
                if(!category){
                    reject(new Error('category is not exist'));
                }else{
                    let board = new Board({
                        category: category._id,
                        lang: params.lang,
                        title: params.title,
                        contents: params.contents
                    });
                    board.save((err, board) => {
                        if(err){
                            console.error(err);
                            reject(new Error('database failure'));
                        }else{
                            resolve({message: 'successed'});
                        }
                    });
                }
            }
        });
    });
}

exports.readCategory = (params) => {
    return new Promise((resolve, reject) => {
        Category.find()
        .select('type')
        .exec((err, category) => {
            if(err){
                reject(new Error('database failure'));
            }else{
                resolve(category);
            }
        });
    });
}

exports.createCategory = (params) => {
    let category = new Category({
        type: params.category,
        name: params.name,
        desc: params.desc
    });
    return new Promise((resolve, reject) => {
        category.save((err, category) => {
            if(err){
                reject(new Error('database failure'));
            }else{
                resolve({message: 'successed'});
            }
        });
    });
}