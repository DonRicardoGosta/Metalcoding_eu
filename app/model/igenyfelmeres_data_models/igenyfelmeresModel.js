const mongoose = require('mongoose');
const Joi = require("joi");

const IgenyfelmeresModel = mongoose.model('Igenyfelmeres',new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength:255
    },
    location:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'locations_enum',//"-----------"
        required:true
    },
    description: {
        type: String,
        required: true,
        maxlength:500
    },
    function:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'functions_enum',//"-----------"
        required:true
    },
    device:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'devices_enum',//"-----------"
        required:true
    },
    brand:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brands_enum',//"-----------"
        required:true
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
    sharedwith:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
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

function validateIgenyfelmeres(Igenyfelmeres){
    /*const schema ={
        name: Joi.string().min(3).required()
    };
    return Joi.validate(board, schema);*/
    return 1;
}
module.exports.IgenyfelmeresModel = IgenyfelmeresModel;
module.exports.validateIgenyfelmeres = validateIgenyfelmeres;