const Board = require('../../models/board');
const Category = require('../../models/board_category');
const boom = require('boom');

function Pagination(page, limit) {
  if (typeof page !== 'number') {
    throw new Error('Pagination page should be number');
  }

  if (typeof limit !== 'number') {
    throw new Error('Pagination limit should be number');
  }

<<<<<<< HEAD
  this.setTotalCount = (totalCount) => {
    this.meta = {};
    if (typeof totalCount !== 'number') {
      throw new Error('Pagination totalCount should be number');
=======
        let lastPage = Math.ceil(totalCount / limit);
        this.meta.totalCount = totalCount;
        this.meta.start = 1;
        this.meta.prePage = page <= 1 ? 1 : page - 1;
        this.meta.currentPage = page;
        this.meta.nextPage = page >= lastPage ? page : page + 1;
        this.meta.end = lastPage;
    };
    
    this.setData = (data) => {
        this.data = data;
>>>>>>> feature/front
    }

<<<<<<< HEAD
    const lastPage = Math.ceil(totalCount / limit);
    this.meta.totalCount = totalCount;
    this.meta.start = 1;
    this.meta.prePage = page <= 1 ? 1 : page - 1;
    this.meta.currnetPage = page;
    this.meta.nextPage = page >= lastPage ? page : page + 1;
    this.meta.end = lastPage;
  };

  this.setData = (data) => {
    this.data = data;
  };
}

const categoryExist = _id => Category.findOne({ _id })
  .exec()
  .catch(() => Promise.reject(boom.badImplementation('database failure')))
  .then((result) => {
    if (!result) return Promise.reject(boom.badRequest('no category _id'));
    return Promise.resolve(true);
  });

const findAllBoard = (selectConfig, page, limit, lang) => Board
  .find({
    lang,
  })
  .select(selectConfig)
  .limit(limit)
  .skip(limit * (page - 1))
  .sort({
    createdAt: 'desc',
  })
  .populate('category')
  .exec();
=======
exports.readBoard = (params) => {
    const page = parseInt(params.page, 10);
    const limit = parseInt(params.limit, 10);

    const pagination = new Pagination(page, limit);
    const selectConfig = params.contents === 'Y' ? '' : '-contents';

    return Board.count({lang:params.lang})
    .exec()
    .catch((error) => {
        console.log(error);
        return Promise.reject(boom.badImplementation('Board count fail'));
    })
    .then((count) => {
        pagination.setTotalCount(count);
        
        return Board.find({lang:params.lang})
        .select(selectConfig)
        .limit(limit)
        .skip(limit * (page - 1))
        .sort({
            createdAt:'desc'
        })
        .populate('category')
        .exec();
    })
    .catch((error) => {
        if(error.isBoom){
            return Promise.reject(error);
        }else{
            return Promise.reject(boom.badImplementation('database failure'));
        }
    })
    .then((result) => {
        pagination.setData(result);
        return Promise.resolve(pagination);
    })
}

exports.readBoardOne = (params) => {
    return Board.findOne({_id:params.board_id})
    .populate('category')
    .exec()
    .then((result) => {
        if(!result){
            return Promise.reject(boom.badRequest('cannot find board'));
        }else{
            return Promise.resolve(result);
        }
    })
    .catch((error) => {
        if(error.isBoom){
            return Promise.reject(error);
        }else{
            return Promise.reject(boom.badImplementation('database failure'));
        }
    });
    
}
>>>>>>> feature/front

exports.readBoard = (params) => {
  const page = parseInt(params.page, 10);
  const limit = parseInt(params.limit, 10);
  const selectConfig = params.contents === 'Y' ? '' : '-contents';
  const pagination = new Pagination(page, limit);

  return Board.count({
    lang: params.lang,
  })
    .exec()
    .catch(() => Promise.reject(boom.badImplementation('Board count fail')))
    .then((count) => {
      pagination.setTotalCount(count);
      return findAllBoard(selectConfig, page, limit, params.lang);
    })
    .catch(() => Promise.reject(boom.badImplementation('database failure')))
    .then((result) => {
      pagination.setData(result);
      return Promise.resolve(pagination);
    });
};

<<<<<<< HEAD
exports.readBoardOne = params => Board.findOne({
  _id: params.board_id,
})
  .populate('category')
  .exec()
  .catch(() => Promise.reject(boom.badImplementation('database failure')))
  .then(result => Promise.resolve(result));

exports.createBoard = (params) => {
  const board = new Board({
    category: params.category,
    lang: params.lang,
    title: params.title,
    contents: params.contents,
  });

  return categoryExist(params.category)
    .then(() => board.save())
    .catch(() => Promise.reject(boom.badImplementation('database failure')));
};

exports.readCategory = () => Category.find()
  .exec()
  .catch(() => Promise.reject(boom.badImplementation('database failure')));

exports.createCategory = (params) => {
  const category = new Category({
    name: params.name,
    desc: params.desc,
  });

  return Category.findOne({
    name: params.name,
  })
    .exec()
    .catch(() => Promise.reject(boom.badImplementation('database failure')))
    .then((result) => {
      if (result) return Promise.reject(boom.badRequest('already exist name'));
      return category.save();
    })
    .catch(() => Promise.reject(boom.badImplementation('database failure')));
};

exports.updateBoard = params => categoryExist(params.category)
  .then(() => Board.findOneAndUpdate({
    _id: params.board_id,
  }, params))
  .catch(() => Promise.reject(boom.badImplementation('database failure')))
  .then((result) => {
    if (!result) return Promise.reject(boom.badRequest('cannot find board _id'));
    return Promise.resolve(result);
  });

exports.deleteBoard = params => Board.findOneAndRemove({
  _id: params.board_id,
})
  .exec()
  .catch(() => boom.badImplementation('database failure'))
  .then((result) => {
    if (!result) return Promise.reject(boom.badRequest('cannot find board _id'));
    return Promise.resolve({
      message: 'successed',
    });
  });

exports.updateCategory = params => Category.findOneAndUpdate({
  _id: params.category_id,
}, params)
  .exec()
  .catch(() => Promise.reject(boom.badImplementation('database failure')))
  .then((result) => {
    if (!result) return Promise.reject(boom.badRequest('cannot find category _id'));
    return Promise.resolve(result);
  });

exports.deleteCategory = params => Category.findOneAndRemove({
  _id: params.category_id,
})
  .exec()
  .catch(() => Promise.reject(boom.badImplementation('database failure')))
  .then((result) => {
    if (!result) return Promise.reject(boom.badRequest('cannot find category _id'));
    return Promise.resolve({
      message: 'successed',
=======
    return categoryExist(params.category)
    .then((isExist) => {
        return board.save();
    })
    .catch((error) => {
        return Promise.reject(boom.badImplementation('database failure'));
    })
    .then((result) => {
        return Promise.resolve(result);  
    })
}

exports.readCategory = (params) => {
    return Category.find()
    .exec()
    .catch((error) => {
        return Promise.reject(boom.badImplementation('database failure'));
    })
    .then((result) => {
        return Promise.resolve(result);
    });
}

exports.createCategory = (params) => {
    let category = new Category({
        name: params.name,
        desc: params.desc
    });
    
    return Category.findOne({name:params.name})
    .exec()
    .catch((error) => {
        return Promise.reject(boom.badImplementation('database failure'));
    })
    .then((result) => {
        if(result){
            return Promise.reject(boom.badRequest('name is already exist'));
        }else{
            return category.save();
        }
    })
    .catch((error) => {
        console.error(error);
        if(error.isBoom){
            return Promise.reject(error);
        }else{
            return Promise.reject(boom.badImplementation('database failure'));
        }
    })
    .then((result) => {
        return Promise.resolve(result);
    });
}

exports.updateBoard = (params, body) => {
    if(body.category){
        return categoryExist(body.category)
        .then((isExist) => {
            return updateBoardDB(params, body);
        })
        .then((result) => {
            return Promise.resolve(result);
        })
    }else{
        return updateBoardDB(params, body)
        .then((result) => {
            resolve(result);
        });
    }
}

let updateBoardDB = (params, body) => {
    return Board.findOneAndUpdate({_id:params.board_id}, body)
    .exec()
    .catch((error) => {
        return Promise.reject(boom.badImplementation('database failure'));
    })
    .then((result) => {
        if(!result){
            return Promise.reject(boom.badRequest('cannot find board _id'));
        }else{
            return Promise.resolve(result);
        }
    });
}

exports.deleteBoard = (params) => {
    return  Board.findOneAndRemove({_id:params.board_id})
    .exec()
    .catch((error) => {
        return Promise.reject(boom.badImplementation('database failure'));
    })
    .then((result) => {
        if(!result){
            return Promise.reject(boom.badRequest('cannot find board _id'));
        }else{
            return Promise.resolve({message:'successed'});
        }
    });
}

exports.updateCategory = (params, body) => {
    return Category.findOneAndUpdate({_id:params.category_id}, body)
    .exec()
    .catch((error) => {
        return Promise.reject(boom.badImplementation('database failure'));
    })
    .then((result) => {
        if(!result){
            return Promise.reject(boom.badRequest('cannot find category _id'));
        }else{
            return Promise.resolve(result);
        }
    });
}

exports.deleteCategory = (params) => {
    return Category.findOneAndRemove({_id:params.category_id})
    .exec()
    .catch((error) => {
        return Promise.reject(boom.badImplementation('database failure'));
    })
    .then((result) => {
        if(!result){
            return Promise.reject(boom.badRequest('cannot find category _id'));
        }else{
            return Promise.resolve({message:'successed'});
        }
    });
}

let categoryExist = (_id) => {
    return Category.findOne({_id:_id})
    .exec()
    .catch((error) => {
        return Promise.reject(boom.badImplementation('database failure'));
    })
    .then((result) => {
        if(result){
            return Promise.resolve(true);
        }else{
            return Promise.reject(boom.badRequest('category _id is not exist'));
        }
>>>>>>> feature/front
    });
  });
