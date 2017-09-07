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

var Board = mongoose.model('boards', boardSchema);

module.exports = Board;