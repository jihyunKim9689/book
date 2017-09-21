const dao = require('./dao');

<<<<<<< HEAD
const responseMaker = {
  successResponse: (/* required */ res, /* required */ data, /* required */ statusCode, meta) => {
    const result = {};
    result.data = data;
    if (meta) {
      result.meta = meta;
=======
exports.getBoard = (req, res) => {
    const limit = req.query.limit || 7;
    const page = req.query.page || 1;
    const lang = req.query.lang || 1;
    const contents = req.query.viewContents || 'Y';

    const params = {
        limit:limit,
        page:page,
        lang:lang,
        contents: contents
>>>>>>> feature/front
    }
    res.status(statusCode).json(result);
  },
  errorResponse: (res, err) => {
    res.status(err.output.statusCode).json({
      error: err.output.payload,
    });
  },
};

exports.getBoard = (req, res) => {
  dao.readBoard(req.items)
    .then((result) => {
      responseMaker.successResponse(res, result.data, 200, result.meta);
    })
    .catch((error) => {
      responseMaker.errorResponse(res, error);
    });
};

exports.postBoard = (req, res) => {
  dao.createBoard(req.items)
    .then((result) => {
      responseMaker.successResponse(res, result, 201);
    })
    .catch((error) => {
      responseMaker.errorResponse(res, error);
    });
};

exports.getBoardOne = (req, res) => {
<<<<<<< HEAD
  dao.readBoardOne(req.items)
    .then((result) => {
      responseMaker.successResponse(res, result, 200);
    })
    .catch((error) => {
      responseMaker.errorResponse(res, error);
=======
    req.checkParams('board_id', 'invalid').notEmpty();

    errorValidatorResponse(req.getValidationResult(), (err) => {
        if(err){
            responseMaker.errorResponse(res, err);
        }else{
            dao.readBoardOne(req.params)
            .then((result) => {
                responseMaker.successResponse(res, result, 200);
            })
            .catch((error) => {
                console.error(error);
                responseMaker.errorResponse(res, error);
            });
        }
>>>>>>> feature/front
    });
};

exports.getBoardCategory = (req, res) => {
  dao.readCategory()
    .then((result) => {
      responseMaker.successResponse(res, result, 200);
    })
    .catch((error) => {
      responseMaker.errorResponse(res, error);
    });
};

exports.postBoardCategory = (req, res) => {
  dao.createCategory(req.items)
    .then((result) => {
      responseMaker.successResponse(res, result, 201);
    })
    .catch((error) => {
      responseMaker.errorResponse(res, error);
    });
};

exports.updateBoard = (req, res) => {
<<<<<<< HEAD
  dao.updateBoard(req.items)
    .then((result) => {
      responseMaker.successResponse(res, result, 200);
    })
    .catch((error) => {
      responseMaker.errorResponse(res, error);
=======
    req.checkParams('board_id', 'invalid').notEmpty();
    // req.checkBody('category', 'invalid').notEmpty();
    // req.checkBody('lang', 'invalid').notEmpty();
    // req.checkBody('title', 'invalid').notEmpty();
    // req.checkBody('contents', 'invalid').notEmpty();

    errorValidatorResponse(req.getValidationResult(), (err) => {
        if(err){
            responseMaker.errorResponse(res, err);
        }else{
            dao.updateBoard(req.params, req.body)
            .then((result) => {
                responseMaker.successResponse(res, result, 200);
            })
            .catch((error) => {
                responseMaker.errorResponse(res, error);
            });
        }
>>>>>>> feature/front
    });
};

exports.deleteBoard = (req, res) => {
  dao.deleteBoard(req.items)
    .then((result) => {
      responseMaker.successResponse(res, result, 200);
    })
    .catch((error) => {
      responseMaker.errorResponse(res, error);
    });
};

exports.putBoardCategory = (req, res) => {
  dao.updateCategory(req.items)
    .then((result) => {
      responseMaker.successResponse(res, result, 200);
    })
    .catch((error) => {
      responseMaker.errorResponse(res, error);
    });
};

exports.deleteBoardCategory = (req, res) => {
  dao.deleteCategory(req.items)
    .then((result) => {
      responseMaker.successResponse(res, result, 200);
    })
    .catch((error) => {
      responseMaker.errorResponse(res, error);
    });
};
