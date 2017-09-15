var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String
    }
});

var Category = mongoose.models.categories || mongoose.model('categories', CategorySchema);

/**
 * @swagger
 * definitions:
 *   BoardCategory:
 *     properties:
 *       _id:
 *         type: string
 *       name:
 *         type: string
 *         required: true
 *       desc:
 *         type: integer
 */

module.exports = Category;