const { createRandomObjects } = require("../database/create_random_objects");
const { Project, validateProject } = require('../../model/project-management-modells/projectModel');
const { Board, validateBoard } = require('../../model/project-management-modells/boardModel');
const { Status, validateStatus } = require('../../model/project-management-modells/statusModel');
const { Card, validateCard } = require('../../model/project-management-modells/cardModel');
const { User } = require("../../model/userModel");




async function getProjects(user_id){
    if(user_id){
        try {
            const projects = await Project
                .find({owner : user_id.toString()})
                .populate('owner', 'name -_id')
                .select('name _id');
            return projects;
        }catch (ex){
            console.log(ex.message)
        }
    }
}
async function getProject(user_id, project_id){
    if(user_id && project_id){
        try {
            const project = await Project
                .find({owner : user_id.toString(), _id: project_id.toString()})
                .populate('owner', 'name -_id')
                .select('name _id');
            return project;
        }catch (ex){
            console.log(ex.message)
        }
    }
}



async function getBoards(project_id){
    if(project_id){
        try {
            const boards = await Board
                .find({project_id: project_id.toString()})
                .populate('created_user', 'name -_id')
                .select('name project_id');
            return boards;
        }catch (ex){
            console.log(ex.message)
        }
    }
}
async function getBoard(board_id){
    if(board_id){
        try {
            const board = await Board
                .find({_id: board_id.toString()})
                .populate('created_user', 'name -_id')
                .select('name project_id');
            return board;
        }catch (ex){
            console.log(ex.message)
        }
    }
}



async function getStatuses(board_id){
    if(board_id){
        try {
            const statuses = await Status
                .find({board_id: board_id.toString()})
                .select('name board_id');
            return statuses;
        }catch (ex){
            console.log(ex.message)
        }
    }
}
async function getStatus(status_id){
    if(status_id){
        try {
            const status = await Status
                .find({_id: status_id.toString()})
                .select('name board_id');
            return status;
        }catch (ex){
            console.log(ex.message)
        }
    }
}



async function getCards(status_id){
    if(status_id){
        try {
            const cards = await Card
                .find({status_id: status_id.toString()})
                .select('name status_id');
            return cards;
        }catch (ex){
            console.log(ex.message)
        }
    }
}
async function getCard(card_id){
    if(card_id){
        try {
            const card = await Card
                .find({_id: card_id.toString()})
                .select('name status_id');
            return card;
        }catch (ex){
            console.log(ex.message)
        }
    }
}



async function createUser(){
    let user = new User({
        name: 'Bunyós Pityu',
        role: 'admin',
        password:"5866",
        email: "horvathdanii99@gmail.com"
    });
    user = await user.save();
    return user;
}

module.exports.getProjects = getProjects
module.exports.getProject = getProject
module.exports.getBoards = getBoards
module.exports.getBoard = getBoard
module.exports.getStatuses = getStatuses
module.exports.getStatus = getStatus
module.exports.getCards = getCards
module.exports.getCard = getCard
