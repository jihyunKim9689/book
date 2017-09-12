/**
 * @swagger
 * definition:
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
 * definition:
 *   SeverErrorModel:
 *     example:
 *       error:
 *         statusCode: 500
 *         error: Internal Server Error
 *         message: database failure
 *     properties:
 *       error:
 *         properties:
 *           statusCode:
 *             type: integer
 *           error:
 *             type: string
 *           message:
 *             type: string
 *             description: database failure
 */