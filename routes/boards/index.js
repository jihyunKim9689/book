var express = require('express');
var controller = require('./controller');
var router = express.Router();

/**
 * @swagger
 * /boards:
 *   get:
 *     tags:
 *       - boards
 *     description: 게시판 리스트 받아오기
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: limit
 *         description: 한 페이지 당 item(default 7)
 *         in: query
 *         type: integer
 *         default: 7
 *       - name: page
 *         description: 몆 번째 페이지(default 1)
 *         in: query
 *         type: integer
 *         default: 1
 *       - name: lang
 *         description: 언어 선택(1-영어, 2-한국어)(default 1)
 *         in: query
 *         type: integer
 *         default: 1
 *       - name: contents
 *         description: contents enable or disable(Y-enable, N-disable)(default Y)
 *         in: string
 *         default: Y
 *     responses:
 *       200:
 *         description: An array of board
 *         properties:
 *           meta:
 *             $ref: '#/definitions/PaginationModel'
 *           data:
 *             type: array
 *             items:
 *               $ref: '#/definitions/Board'  
 *       400:
 *         description: request error
 *         schema:
 *           $ref: '#/definitions/BadRequestError'
 *       500:
 *         description: server error
 *         schema:
 *           $ref: '#/definitions/SeverErrorModel'
 */

router.get('/', controller.getBoard);

/**
 * @swagger
 * /boards:
 *   post:
 *     tags:
 *       - boards
 *     description: 게시판 글 작성
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: category
 *         description: category _id
 *         in: body
 *         type: integer
 *       - name: lang
 *         description: 언어 선택(1-영어, 2-한국어)(default 1)
 *         in: body
 *         type: integer
 *       - name: title
 *         description: 게시글 제목
 *         in: body
 *         type: string
 *       - name: contents
 *         description: 게시글 내용
 *         in: body
 *         type: string
 *     responses:
 *       201:
 *         description: create successed
 *         properties:
 *           data:
 *             $ref: '#/definitions/Board'
 *       400:
 *         description: request error
 *         schema:
 *           $ref: '#/definitions/BadRequestError'
 *       500:
 *         description: server error
 *         schema:
 *           $ref: '#/definitions/SeverErrorModel'
 */

router.post('/',controller.postBoard);

/**
 * @swagger
 * /boards/{board_id}:
 *   get:
 *     tags:
 *       - boards
 *     description: 게시판 리스트 받아오기
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: board_id
 *         description: board _id
 *         in: path
 *         type: string
 *       - name: lang
 *         description: 언어 선택(1-영어, 2-한국어)(default 1)
 *         in: query
 *         type: integer
 *     responses:
 *       200:
 *         description: board info
 *         properties:
 *           data:
 *             $ref: '#/definitions/Board'
 *       400:
 *         description: request error
 *         schema:
 *           $ref: '#/definitions/BadRequestError'
 *       500:
 *         description: server error
 *         schema:
 *           $ref: '#/definitions/SeverErrorModel'
 */

 //TODO: /board/{category_id} url 만들기

/**
 * @swagger
 * /boards/categories:
 *   get:
 *     tags:
 *       - boards
 *     description: 게시글 category list
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of board category
 *         properties:
 *           data:
 *             type: array
 *             items:
 *               $ref: '#/definitions/BoardCategory'
 *       500:
 *         description: server Error
 *         schema:
 *           $ref: '#/definitions/SeverErrorModel'
 */

router.get('/category',controller.getBoardCategory);

/**
 * @swagger
 * /boards/categories:
 *   post:
 *     tags:
 *       - boards
 *     description: 게시글의 카테고리를 만든다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: 게시글 카테고리의 이름(한글)
 *         in: body
 *         required: true
 *         type: string
 *       - name: desc
 *         description: 게시글 카테고리 설명
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: create successed
 *         properties: 
 *           data:
 *             $ref: '#/definitions/BoardCategory'
 *       400:
 *         description: request error
 *         schema:
 *           $ref: '#/definitions/BadRequestError'
 *       500:
 *         description: server Error
 *         schema:
 *           $ref: '#/definitions/SeverErrorModel'
 *           examples:
 *             message:sdfsdf
 *             code:1
 */

router.post('/category',controller.postBoardCategory);

module.exports = router;

//TODO: put, delete method 만들기