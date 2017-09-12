var express = require('express');
var controller = require('./controller');
var router = express.Router();

router.post('/',controller.postBoard);

router.get('/', controller.getBoard);

router.get('/categories',controller.getBoardCategory);

router.post('/categories', controller.postBoardCategory);

router.put('/categories/:category_id', controller.putBoardCategory);

router.delete('/categories/:category_id', controller.deleteBoardCategory);

router.get('/:board_id',controller.getBoardOne);

router.put('/:board_id', controller.updateBoard);

router.delete('/:board_id', controller.deleteBoard);

module.exports = router;