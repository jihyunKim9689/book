/**
 * @swagger
 * definitions:
 *   BadRequestError:
 *     example:
 *       error:
 *         statusCode: 400
 *         error: Bad Request
 *         message: _name is invalid in _location
 *     properties:
 *       error:
 *         properties:
 *           statusCode:
 *             type: integer
 *             description: 400
 *           error:
 *             type: string
 *             description: Bad Request
 *           message:
 *             type: string
 *             description: _name is invalid in _location, _name is already exist
 */

/**
 * @swagger
 * definitions:
 *   SeverErrorModel:
 *     properties:
 *       error:
 *         properties:
 *           statusCode:
 *             type: integer
 *             example: 500
 *           error:
 *             type: string
 *             example: Internal Server Error
 *           message:
 *             type: string
 *             example: database failure
 *             description: database failure
 */
