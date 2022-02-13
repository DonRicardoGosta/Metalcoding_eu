const mongoose = require('mongoose');
const Joi = require("joi");

const DevicePriceModel = mongoose.model('DevicePrice',new mongoose.Schema({
    device_type:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device',
        required: true
    },
    brand_type:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    function_type:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FunctionInHouse'
    },
    price:{
        type: Number,
        min:0,
        default:0
    },
    deviza:{
        type: String,
        required: true,
        enum: ['huf','eur'],
        lowercase: true
    },
    created_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_date: {type: Date, default: Date.now },
}));

function validateDevice(device){
    /*const schema ={
        name: Joi.string().min(3).required()
    };
    return Joi.validate(board, schema);*/
    return 1;
}
module.exports.DevicePriceModel = DevicePriceModel;
module.exports.validateDevice = validateDevice;