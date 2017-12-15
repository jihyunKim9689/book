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

  this.setTotalCount = (totalCount) => {
    this.meta = {};
    if (typeof totalCount !== 'number') {
      throw new Error('Pagination totalCount should be number');
    }

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

function errorHandler(error, boomError) {
  if (error.isBoom) throw error;
  throw boomError;
}

const categoryExist = _id => Category.findOne({ _id })
  .exec()
  .then((result) => {
    if (!result) throw boom.badRequest('no category _id');
    return Promise.resolve(true);
  })
  .catch(error => errorHandler(error, boom.badImplementation('categoryExist Category findOne fail')));

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

exports.readBoard = (params) => {
  const page = parseInt(params.page, 10);
  const limit = parseInt(params.limit, 10);
  const selectConfig = params.contents === 'Y' ? '' : '-contents';
  const pagination = new Pagination(page, limit);


  return Board.count({
    lang: params.lang,
  })
    .exec()
    .catch(error => errorHandler(error, boom.badImplementation('Board count fail')))
    .then((count) => {
      pagination.setTotalCount(count);
      return findAllBoard(selectConfig, page, limit, params.lang);
    })
    .catch(error => errorHandler(error, boom.badImplementation('findAllBoard fail')))
    .then((result) => {
      pagination.setData(result);
      return Promise.resolve(pagination);
    });
};

exports.readBoardOne = params => Board.findOne({
  _id: params.board_id,
})
  .populate('category')
  .exec()
  .catch(error => errorHandler(error, boom.badImplementation('Board findOne fail')));

exports.createBoard = (params) => {
  const board = new Board({
    category: params.category,
    lang: params.lang,
    title: params.title,
    contents: params.contents,
  });

  return categoryExist(params.category)
    .then(() => board.save())
    .catch(error => errorHandler(error, boom.badImplementation('Board save fail')));
};

exports.readCategory = () => Category.find()
  .exec()
  .catch(error => errorHandler(error, boom.badImplementation('Category find fail')));

exports.createCategory = (params) => {
  const category = new Category({
    name: params.name,
    desc: params.desc,
  });

  return Category.findOne({
    name: params.name,
  })
    .exec()
    .catch(error => errorHandler(error, boom.badImplementation('Category findOne fail')))
    .then((result) => {
      if (result) return Promise.reject(boom.badRequest('already exist name'));
      return category.save();
    })
    .catch(error => errorHandler(error, boom.badImplementation('category save fail')));
};

exports.updateBoard = params => categoryExist(params.category)
  .then(() => Board.findOneAndUpdate({
    _id: params.board_id,
  }, params))
  .catch(error => errorHandler(error, boom.badImplementation('Board findOneAndUpdate fail')))
  .then((result) => {
    if (!result) throw boom.badRequest('cannot find board _id');
    return Promise.resolve(result);
  });

exports.deleteBoard = params => Board.findOneAndRemove({
  _id: params.board_id,
})
  .exec()
  .catch(error => errorHandler(error, boom.badImplementation('Board findOneAndRemove fail')))
  .then((result) => {
    if (!result) throw boom.badRequest('cannot find board _id');
    return Promise.resolve({
      message: 'successed',
    });
  });

exports.updateCategory = params => Category.findOneAndUpdate({
  _id: params.category_id,
}, params)
  .exec()
  .catch(error => errorHandler(error, boom.badImplementation('Category findOneAndUpdate fail')))
  .then((result) => {
    if (!result) throw boom.badRequest('cannot find category _id');
    return Promise.resolve(result);
  });

exports.deleteCategory = params => Category.findOneAndRemove({
  _id: params.category_id,
})
  .exec()
  .catch(error => errorHandler(error, boom.badImplementation('Category findOneAndUpdate fail')))
  .then((result) => {
    if (!result) throw boom.badRequest('cannot find category _id');
    return Promise.resolve({
      message: 'successed',
    });
  });
