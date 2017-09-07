var express = require('express');
var controller = require('./controller');
var router = express.Router();


/* GET users listing. */
router.get('/', controller.getBoard);

router.post('/',controller.postBoard);

router.get('/category',controller.getBoardCategory);

router.post('/category',controller.postBoardCategory);

module.exports = router;