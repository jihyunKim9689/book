const Joi = require('joi');
const boom = require('boom');

exports.body = (validatorSchema) => {
  if (!validatorSchema) {
    throw new Error(boom.badImplementation('no schema'));
  }
  return (req, res, next) => {
    Joi.validate(req.body, validatorSchema, (err, value) => {
      if (err) {
        res.status(400).json(boom.badRequest(`${err.message} in body`).output.payload);
      } else {
        req.items = req.items === undefined ? {} : req.items;
        Object.assign(req.items, value);
        next();
      }
    });
  };
};

exports.query = (validatorSchema) => {
  if (!validatorSchema) {
    throw new Error(boom.badImplementation('no schema'));
  }
  return (req, res, next) => {
    Joi.validate(req.query, validatorSchema, (err, value) => {
      if (err) {
        res.status(400).json(boom.badRequest(`${err.message} in query`).output.payload);
      } else {
        req.items = req.items === undefined ? {} : req.items;
        Object.assign(req.items, value);
        next();
      }
    });
  };
};

exports.params = (validatorSchema) => {
  if (!validatorSchema) {
    throw new Error(boom.badImplementation('no schema'));
  }
  return (req, res, next) => {
    Joi.validate(req.params, validatorSchema, (err, value) => {
      if (err) {
        res.status(400).json(boom.badRequest(`${err.message} in params`).output.payload);
      } else {
        req.items = req.items === undefined ? {} : req.items;
        Object.assign(req.items, value);
        next();
      }
    });
  };
};
