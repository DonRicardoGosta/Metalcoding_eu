const mongoose = require('mongoose');
const Joi = require("joi");

const ProjectModel = mongoose.model('Project',new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength:255
    },
    owner: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created_date: {type: Date, default: Date.now },
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        required: true
    },
}));

function validateProject(project){
    /*const schema ={
        name: Joi.string().min(5).required()
    };
    return Joi.validate(project, schema);*/
    return 1;
}
module.exports.Project = ProjectModel;
module.exports.validateProject = validateProject;