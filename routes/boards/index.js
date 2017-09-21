const express = require('express');
const controller = require('./controller');
const validator = require('./validator');
const Joi = require('joi');

const router = express.Router();

const postBoardSchema = {
  category: Joi.string().required(),
  lang: Joi.number().min(1).default(1),
  title: Joi.string().required(),
  contents: Joi.string(),
};

const getBoardSchema = {
  limit: Joi.number().min(1).default(7),
  page: Joi.number().min(1).default(1),
  lang: Joi.number().min(1).default(1),
  contents: Joi.string().default('Y'),
};

const updateBoardSchema = {
  category: Joi.string().required(),
  lang: Joi.number().min(1).default(1),
  title: Joi.string().required(),
  contents: Joi.string(),
};

const postCategorySchema = {
  name: Joi.string().required(),
  desc: Joi.string(),
};

const categoryIdParamsSchema = {
  category_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).error(new Error('objectId is invalid')),
};

const boardIdParamsSchema = {
  board_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).error(new Error('objectId is invalid')),
};

router.post('/', validator.body(postBoardSchema), controller.postBoard);

router.get('/', validator.query(getBoardSchema), controller.getBoard);

router.get('/categories', controller.getBoardCategory);

router.post('/categories', validator.body(postCategorySchema), controller.postBoardCategory);

router.put('/categories/:category_id', validator.params(categoryIdParamsSchema), controller.putBoardCategory);

router.delete('/categories/:category_id', validator.params(categoryIdParamsSchema), controller.deleteBoardCategory);

router.get('/:board_id', validator.params(boardIdParamsSchema), controller.getBoardOne);

router.put('/:board_id', validator.params(boardIdParamsSchema), validator.body(updateBoardSchema), controller.updateBoard);

router.delete('/:board_id', validator.params(boardIdParamsSchema), controller.deleteBoard);

module.exports = router;
