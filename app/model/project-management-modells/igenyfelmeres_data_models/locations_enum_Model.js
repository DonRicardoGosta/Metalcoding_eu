const mongoose = require('mongoose');
const Joi = require("joi");

const LocationModel = mongoose.model('Location',new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength:255
    },
    created_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_date: {type: Date, default: Date.now },
}));

function validateLocation(location){
    /*const schema ={
        name: Joi.string().min(3).required()
    };
    return Joi.validate(board, schema);*/
    return 1;
}
module.exports.LocationModel = LocationModel;
module.exports.validateLocation = validateLocation;