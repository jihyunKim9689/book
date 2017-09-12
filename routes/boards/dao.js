const path = process.cwd();
const Board = require(path + "/models/board");
const Category = require(path + "/models/board_category");
const boom = require('boom');

function Pagination(page, limit){
    if(!typeof page === 'number'){
        console.error('Pagination page should be number');
    }

    if(!typeof limit === 'number'){
        console.error('Pagination limit should be number');
    }

    this.setTotalCount = (totalCount) => {
        this.meta = {};
        if(!typeof totalCount === 'number'){
            console.error('Pagination totalCount should be number');
        }

        let lastPage = Math.ceil(totalCount / limit);
        this.meta.prePage = page <= 1 ? 1 : page - 1;
        this.meta.currnetPage = page;
        this.meta.nextPage = page >= lastPage ? page : page + 1;
    };
    
    this.setData = (data) => {
        this.data = data;
    }
}

exports.readBoard = (params) => {
    const page = parseInt(params.page, 10);
    const limit = parseInt(params.limit, 10);

    const pagination = new Pagination(page, limit);
    const selectConfig = params.contents === 'Y' ? '' : '-contents';

    return new Promise((resolve,reject) => {
        Board.count({lang:params.lang})
        .exec((error, count) => {
            if(error){
                reject(boom.badImplementation('Board count fail'));
            }else{
                pagination.setTotalCount(count);
                Board.find({lang:params.lang})
                .select(selectConfig)
                .limit(limit)
                .skip(limit * (page - 1))
                .sort({
                    createdAt:'desc'
                })
                .populate('category')
                .exec((error, board) => {
                    if(error){
                        return reject(boom.badImplementation('database failure'));
                    }else{
                        pagination.setData(board);
                        return resolve(pagination);
                    }
                });
            }
        });
    })
}

exports.createBoard = (params) => {
    let board = new Board({
        category: params.category,
        lang: params.lang,
        title: params.title,
        contents: params.contents
    });
    return new Promise((resolve, reject) => {
        board.save((err, board) => {
            if(err){
                console.error(err);
                reject(boom.badImplementation('database failure'));
            }else{
                resolve(board);
            }
        });
    });
}

exports.readCategory = (params) => {
    return new Promise((resolve, reject) => {
        Category.find()
        .exec((err, category) => {
            if(err){
                reject(boom.badImplementation('database failure'));
            }else{
                resolve(category);
            }
        });
    });
}

exports.createCategory = (params) => {
    let category = new Category({
        name: params.name,
        desc: params.desc
    });
    return new Promise((resolve, reject) => {
        Category.findOne({name:params.name}, (err, result) => {
            if(err){
                reject(boom.badImplementation('database failure'));
            }else{
                if(result){
                    console.log(result);
                    reject(boom.badRequest('name is already exist'));
                }else{
                    category.save((err, category) => {
                        if(err){
                            reject(boom.badImplementation('database failure'));
                        }else{
                            resolve(category);
                        }
                    });
                }
            } 
        });
    });
}