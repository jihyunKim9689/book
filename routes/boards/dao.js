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
        this.meta.totalCount = totalCount;
        this.meta.start = 1;
        this.meta.prePage = page <= 1 ? 1 : page - 1;
        this.meta.currnetPage = page;
        this.meta.nextPage = page >= lastPage ? page : page + 1;
        this.meta.end = lastPage;
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
                        reject(boom.badImplementation('database failure'));
                    }else{
                        pagination.setData(board);
                        resolve(pagination);
                    }
                });
            }
        });
    })
}

exports.readBoardOne = (params) => {
    return new Promise((resolve,reject) => {
        Board.findOne({_id:params.board_id})
        .populate('category')
        .exec((error, board) => {
            if(error){        
                console.error(error);
                reject(boom.badImplementation('database failure'));
            }else{
                resolve(board);
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
        categoryExist(params.category)
        .then((isExist) => {
            if(!isExist){
                reject(boom.badRequest('category _id is not exist'));
            }else{
                board.save((err, board) => {
                    if(err){
                        console.error(err);
                        reject(boom.badImplementation('database failure'));
                    }else{
                        resolve(board);
                    }
                });
            }
        })
        .catch((error) => {
            reject(error);
        });
    });
}

exports.readCategory = (params) => {
    return new Promise((resolve, reject) => {
        Category.find()
        .exec((err, category) => {
            if(err){
                console.error(err);
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

exports.updateBoard = (params, body) => {
    return new Promise((resolve, reject) => {
        categoryExist(body.category)
        .then((isExist) => {
            if(!isExist){
                reject(boom.badRequest('category _id is not exist'));
            }else{
                Board.findOneAndUpdate({_id:params.board_id}, body)
                .exec((err, result) => {
                    if(err){
                        //duplicated error
                        if(err.code === 11000){
                            reject(boom.badRequest('duplicate board name'));    
                        //_id가 ObjectId 형식이 아닌경우
                        }else if(err.name === 'CastError'){
                            reject(boom.badRequest('wrong board _id'));
                        }else{
                            reject(boom.badImplementation('database failure'));    
                        }
                    }else{
                        if(!result){
                            reject(boom.badRequest('cannot find board _id'));
                        }else{
                            resolve(result);
                        }
                    }
                });
            }
        })
        .catch((error) => {
            reject(error);
        });
    });
}

exports.deleteBoard = (params) => {
    return new Promise((resolve, reject) => {
        Board.findOneAndRemove({_id:params.board_id})
        .exec((err, result) => {
            if(err){
                reject(boom.badImplementation('database failure'));
            }else{
                if(!result){
                    reject(boom.badRequest('cannot find board _id'));
                }else{
                    resolve({message:'successed'});
                }
            }
        });
    });
}

exports.updateCategory = (params, body) => {
    return new Promise((resolve, reject) => {
        Category.findOneAndUpdate({_id:params.category_id}, body)
        .exec((err, result) => {
            if(err){
                //duplicated error
                if(err.code === 11000){
                    reject(boom.badRequest('duplicate category name'));    
                //_id가 ObjectId 형식이 아닌경우
                }else if(err.name === 'CastError'){
                    reject(boom.badRequest('wrong category _id'));
                }else{
                    reject(boom.badImplementation('database failure'));    
                }
            }else{
                if(!result){
                    reject(boom.badRequest('cannot find category _id'));
                }else{
                    resolve(result);
                }
            }
        });
    });
}

exports.deleteCategory = (params) => {
    return new Promise((resolve, reject) => {
        Category.findOneAndRemove({_id:params.category_id})
        .exec((err, result) => {
            if(err){
                reject(boom.badImplementation('database failure'));
            }else{
                if(!result){
                    reject(boom.badRequest('cannot find category _id'));
                }else{
                    resolve({message:'successed'});
                }
            }
        });
    });
}

let categoryExist = (_id) => {
    return new Promise((resolve, reject) => {
        Category.findOne({_id:_id})
        .exec((err, category) => {
            if(err){
                reject(boom.badImplementation('database failure'));
            }else{
                if(!category){
                    resolve(false);
                }else{
                    resolve(true);
                }
            }
        });
    });
}