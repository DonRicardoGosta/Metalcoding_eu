const mongoose = require('mongoose');
const Joi = require("joi");

const IgenyfelmeresLineRecordModel = mongoose.model('igenyfelmeres_line_records',new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength:255
    },
    location:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
    },
    description: {
        type: String,
        maxlength:500
    },
    function:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FunctionInHouse',
    },
    device:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device',
    },
    brand:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
    },
    piece:{
        type: Number,
        min:0,
        default:1
    },
    price:{
        type: Number,
        required: true,
        default:0
    },
    created_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

    },
    created_date: {type: Date, default: Date.now },
}));

function validateIgenyfelmeresLineRecord(Igenyfelmeres){
    /*const schema ={
        name: Joi.string().min(3).required()
    };
    return Joi.validate(board, schema);*/
    return 1;
}
module.exports.IgenyfelmeresLineRecordModel = IgenyfelmeresLineRecordModel;
module.exports.validateIgenyfelmeresLineRecord = validateIgenyfelmeresLineRecord;