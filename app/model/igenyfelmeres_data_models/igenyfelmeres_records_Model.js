const mongoose = require('mongoose');
const Joi = require("joi");

const IgenyfelmeresRecordModel = mongoose.model('igenyfelmeres_records',new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength:255
    },
    line_records:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'igenyfelmeres_line_records',
    },
    sharedwith:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
    },
    created_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_date: {type: Date, default: Date.now },
}));

function validateIgenyfelmeresRecord(Igenyfelmeres){
    /*const schema ={
        name: Joi.string().min(3).required()
    };
    return Joi.validate(board, schema);*/
    return 1;
}
module.exports.IgenyfelmeresRecordModel = IgenyfelmeresRecordModel;
module.exports.validateIgenyfelmeresRecord = validateIgenyfelmeresRecord;