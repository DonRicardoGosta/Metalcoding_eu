const mongoose = require('mongoose');
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength:50
    },
    isAdmin:Boolean,
    password:{
        required: true,
        type: String,
        minlength: 5,
        maxlength: 1024
    },
    register_date: {type: Date, default: Date.now },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    token: { type: String }
})

const UserModel = mongoose.model('User',userSchema);

module.exports.User = UserModel;
