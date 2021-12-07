const { Project, validateProject } = require('../../model/project-management-modells/projectModel');
const { Board, validateBoard } = require('../../model/project-management-modells/boardModel');
const { Status, validateStatus } = require('../../model/project-management-modells/statusModel');
const { Card, validateCard } = require('../../model/project-management-modells/cardModel');
const { User } = require("../../model/userModel");



async function getProjects(user_id){
    //await create_random_project_with_data();
    if(user_id){
        try {
            const projects = await Project
                .find({owner : user_id.toString()})
                .populate('owner', 'name -_id')
                .select('name -_id');
            console.log(projects);
            return projects;
        }catch (ex){
            console.log(ex.message)
        }
    }else{
        const projects = await Project
            .find()
            .populate('owner', 'name -_id')
            .select('name owner');
        console.log(projects);
        return projects;
    }


}
async function getBoards(project_id){
    if(project_id){
        try {
            const boards = await Board
                .find({project_id: project_id.toString()})
                .select('name project_id');
            return boards;
        }catch (ex){
            console.log(ex.message)
        }
    }else{
        const boards = await Board
            .find()
            .select('name project_id');
        return boards;
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
    }else{
        const statuses = await Status
            .find()
            .select('name board_id');
        return statuses;
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
    }else{
        const cards = await Card
            .find()
            .select('name status_id');
        return cards;
    }

}





async function create_random_project_with_data(){
    const userId = (await User.findById('61ad2869232e55303a22c653'))._id;  //await createUser();
    const projectName = "Project " + await Project.find().count();
    let project = new Project({
        name: projectName,
        owner: await userId,
        users: ['61ad2869232e55303a22c653']
    });
    project = await project.save();
    await createBoard(2, userId, (await project)._id)


}

async function createBoard(number, userId, projectId){
    for(let i=0;i<number;i++) {
        const boardName = "Board " + await Board.find().count();
        let board = new Board({
            name: boardName,
            created_user: userId,
            project_id: projectId
        });
        board = await board.save();
        await createStatus(3, userId, (await board)._id);
    }
}

async function createStatus(number, userId, boardId){
    for(let i=0;i<number;i++){
        const statusName = "Status "+await Status.find().count();
        let status = new Status({
            name: statusName,
            created_user: userId,
            board_id: boardId
        });
        status = await status.save();
        await createCard(2,userId,(await status)._id);
    }
}

async function createCard(number, userId, statusId){
    for(let i=0;i<number;i++) {
        const cardName = "Card " + await Card.find().count();
        let card = new Card({
            name: cardName,
            created_user: userId,
            status_id: statusId,
            description: "ez egy leírás"
        });
        card = await card.save();
    }
}

async function createUser(){
    let user = new User({
        name: 'Bunyós Pityu',
        permission: 'admin',
        password:"5866",
        email: "horvathdanii99@gmail.com"
    });
    user = await user.save();
    return user;
}

module.exports.getProjects = getProjects
module.exports.getBoards = getBoards
module.exports.getStatuses = getStatuses
module.exports.getCards = getCards
