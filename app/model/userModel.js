const mongoose = require('mongoose');
const Joi = require("joi");

const UserModel = mongoose.model('User',new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength:255
    },
    permission: {
        type: String,
        required: true,
        enum: ['admin','manager', 'developer', 'guest'],
        lowercase: true,
        trim: true //remove spaces
    },
    password:{
        required: true,
        type: String
    },
    register_date: {type: Date, default: Date.now },

    email: {
        required: true,
        type: String
    }
}));

function validateUser(user){
    const schema ={
        name: Joi.string().min(5).required()
    };
    return Joi.validate(user, schema);
}
module.exports.User = UserModel;
module.exports.validate = validateUser;