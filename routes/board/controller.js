const dao = require('./dao');

exports.getBoard = (req, res) => {
    let limit = req.query.limit || 7;
    let page = req.query.page || 1;
    let lang = req.query.lang || 1;

    let params = {
        limit:limit,
        page:page,
        lang:lang
    }

    dao.readBoard(params)
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((error) => {
        console.error(error);
        res.boom.badImplementation(error);
    });
}

exports.postBoard = (req, res) => {
    req.checkBody('category', 'invalid').notEmpty();
    req.checkBody('lang', 'invalid').notEmpty();
    req.checkBody('title', 'invalid').notEmpty();
    req.checkBody('contents', 'invalid').notEmpty();

    errorValidatorResponse(req.getValidationResult(), (err) => {
        if(err){
            res.boom.badRequest(err);
        }else{
            dao.createBoard(req.body)
            .then((result) => {
                res.status(201).json(result);
            })
            .catch((error) => {
                console.error(error);
                res.boom.badImplementation(error);
            });
        }
    });
}

exports.getBoardCategory = (req, res) => {
    errorValidatorResponse(req.getValidationResult(), (err) => {
        if(err){
            res.boom.badRequest(err);
        }else{
            dao.readCategory(req.body)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                console.error(error);
                res.boom.badImplementation(error);
            });
        }
    });
}

exports.postBoardCategory = (req, res) => {
    req.checkBody('category', 'invalid').notEmpty();
    req.checkBody('name', 'invalid').notEmpty();
    req.checkBody('desc', 'invalid').notEmpty();

    errorValidatorResponse(req.getValidationResult(), (err) => {
        if(err){
            res.boom.badRequest(err);
        }else{
            dao.createCategory(req.body)
            .then((result) => {
                res.status(201).json(result);
            })
            .catch((error) => {
                console.error(error);
                res.boom.badImplementation(error);
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
                new Error(errorObject.param +' is '+errorObject.msg +' in ' +errorObject.location));
        }
    });
}
