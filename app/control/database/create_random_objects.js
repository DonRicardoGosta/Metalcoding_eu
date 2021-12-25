const {User} = require("../../model/userModel");
const {Project} = require("../../model/project-management-modells/projectModel");
const {Board} = require("../../model/project-management-modells/boardModel");
const {Status} = require("../../model/project-management-modells/statusModel");
const {Card} = require("../../model/project-management-modells/cardModel");

async function create_random_objects(userId){
    const projectName = "Project " + await Project.find().count();
    let project = new Project({
        name: projectName,
        owner: await userId,
        users: ['61b286f41dcc43c913fdf27c']
    });
    project = await project.save();
    await createBoard(1, userId, (await project)._id)


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

module.exports.createRandomObjects = create_random_objects