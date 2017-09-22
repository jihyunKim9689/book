const dao = require('./dao');

const responseMaker = {
  successResponse: (/* required */ res, /* required */ data, /* required */ statusCode, meta) => {
    const result = {};
    result.data = data;
    if (meta) {
      result.meta = meta;
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
  dao.readBoardOne(req.items)
    .then((result) => {
      responseMaker.successResponse(res, result, 200);
    })
    .catch((error) => {
      responseMaker.errorResponse(res, error);
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
  dao.updateBoard(req.items)
    .then((result) => {
      responseMaker.successResponse(res, result, 200);
    })
    .catch((error) => {
      responseMaker.errorResponse(res, error);
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
