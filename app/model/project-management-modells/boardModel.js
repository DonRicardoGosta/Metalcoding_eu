const mongoose = require('mongoose');
const Joi = require("joi");

const BoardModel = mongoose.model('Board',new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength:255
    },
    created_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    created_date: {type: Date, default: Date.now },
}));

function validateBoard(board){
    /*const schema ={
        name: Joi.string().min(3).required()
    };
    return Joi.validate(board, schema);*/
    return 1;
}
module.exports.Board = BoardModel;
module.exports.validateBoard = validateBoard;