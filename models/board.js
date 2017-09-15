var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var boardSchema = new Schema({
    category:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'categories'
    },
    lang:{
        type:Number,
        required:true,
        default:1
    },
    title:{
        type:String,
        required: true
    },
    contents:{
        type:String,
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
});

var Board = mongoose.models.boards || mongoose.model('boards', boardSchema);

/**
 * @swagger
 * definitions:
 *   Board:
 *     properties:
 *       category:
 *         $ref: '#/definitions/BoardCategory'
 *       _id:
 *         type: string
 *       lang:
 *         type: integer
 *         required: true
 *         default: 1
 *       title:
 *         type: string
 *         required: true
 *       contents:
 *         type: string
 *         required: true
 *       createdAt:
 *         type: string
 *         format: date
 *       updatedAt:
 *         type: string
 *         format: date
 */

module.exports = Board;