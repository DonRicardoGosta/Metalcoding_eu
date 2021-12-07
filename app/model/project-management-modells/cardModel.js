const mongoose = require('mongoose');
const Joi = require("joi");

const CardModel = mongoose.model('Card',new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength:255
    },
    status_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status',
        required: true
    },
    created_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: String,
    created_date: {type: Date, default: Date.now }
}));

function validateCard(card){
    /*const schema ={
        name: Joi.string().min(3).required()
    };
    return Joi.validate(card, schema);*/
    return 1;
}
module.exports.Card = CardModel;
module.exports.validateCard = validateCard;