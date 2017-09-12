const dao = require('./dao');
const boom = require('boom');

exports.getBoard = (req, res) => {
    const limit = req.query.limit || 7;
    const page = req.query.page || 1;
    const lang = req.query.lang || 1;
    const contents = req.query.contents || 'Y';

    const params = {
        limit:limit,
        page:page,
        lang:lang,
        contents: contents
    }

    dao.readBoard(params)
    .then((result) => {
        console.log(result);
        responseMaker.successResponse(res, result.data, 200, result.meta);
    })
    .catch((error) => {
        console.error(error);
        responseMaker.errorResponse(res, error);
    });
}

exports.postBoard = (req, res) => {
    req.checkBody('category', 'invalid').notEmpty();
    req.checkBody('lang', 'invalid').notEmpty();
    req.checkBody('title', 'invalid').notEmpty();
    req.checkBody('contents', 'invalid').notEmpty();

    errorValidatorResponse(req.getValidationResult(), (err) => {
        if(err){
            responseMaker.errorResponse(res, err);
        }else{
            console.log('response');
            dao.createBoard(req.body)
            .then((result) => {
                responseMaker.successResponse(res, result, 201);
            })
            .catch((error) => {
                responseMaker.errorResponse(res, error);
            });
        }
    });
}

exports.getBoardCategory = (req, res) => {
    errorValidatorResponse(req.getValidationResult(), (err) => {
        if(err){
            responseMaker.errorResponse(res, err);
        }else{
            dao.readCategory(req.body)
            .then((result) => {
                responseMaker.successResponse(res, result, 200);
            })
            .catch((error) => {
                responseMaker.errorResponse(res, error);
            });
        }
    });
}

exports.postBoardCategory = (req, res) => {
    req.checkBody('name', 'invalid').notEmpty();
    req.checkBody('desc', 'invalid').notEmpty();

    errorValidatorResponse(req.getValidationResult(), (err) => {
        if(err){
            responseMaker.errorResponse(res, err);
        }else{
            dao.createCategory(req.body)
            .then((result) => {
                responseMaker.successResponse(res, result, 201);
            })
            .catch((error) => {
                responseMaker.errorResponse(res, error);
            });
        }
    });
}

let errorValidatorResponse = (errorPromise, errorCallBack) => {
    return errorPromise
    .then((error) => {
        if(error.isEmpty()){
            errorCallBack();
        }else{
            let errorObject = error.array()[0];
            errorCallBack(
                boom.badRequest(errorObject.param +' is '+errorObject.msg +' in ' + errorObject.location)
            );
        }
    })
    .catch((error) => {
        console.error(error);
    });
}

let responseMaker = {
    successResponse : (/*required*/res, /*required*/data, /*required*/statusCode, meta) => {
        let result = {};
        result.data = data;
        if(meta){
            result.meta = meta;
        }
        res.status(statusCode).json(result);
    },
    errorResponse : (res, err) => {
        res.status(err.output.statusCode).json({error: err.output.payload});
    }
}