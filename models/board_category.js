const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
  },
});

const Category = mongoose.models.categories || mongoose.model('categories', CategorySchema);

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
