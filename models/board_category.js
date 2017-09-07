var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    type:{
        type:Number,
        required:true,
        unique:true,
        index: true
    },
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String
    }
});

var Category = mongoose.model('categories', CategorySchema);

module.exports = Category;