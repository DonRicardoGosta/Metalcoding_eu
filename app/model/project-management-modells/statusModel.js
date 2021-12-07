const mongoose = require('mongoose');
const Joi = require("joi");

const StatusModel = mongoose.model('Status',new mongoose.Schema({
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
    board_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
        required: true
    },
    created_date: {type: Date, default: Date.now }
}));

function validateStatus(status){
    /*const schema ={
        name: Joi.string().min(3).required()
    };
    return Joi.validate(status, schema);*/
    return 1;
}
module.exports.Status = StatusModel;
module.exports.validateStatus = validateStatus;