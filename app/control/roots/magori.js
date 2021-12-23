const { getProjects, getProject, getBoards, getBoard, getStatuses, getStatus, getCards, getCard} = require('../database/projects_data_handler');
const express = require('express');
const {User} = require("../../model/userModel");
const {Status} = require("../../model/project-management-modells/statusModel");
const {jsonParser} = require("config/parser");
const {Project} = require("../../model/project-management-modells/projectModel");
const router = express.Router();

router.get('/', async (req,res) => {

    const proj=await Project.findOne();
    res.redirect('/magori/'+proj._id);
});

router.get('/:project_id', async (req,res) => {
    const user = (await User.findById('61b286f41dcc43c913fdf27c'));
    const projects = await getProjects(user._id);
    let boards= await getBoards(req.params.project_id);
    let statuses=[];
    for (let board of boards) {
        statuses.push(await getStatuses(board._id));
    }
    let cards=[];
    for(let tag of statuses){
        for(let status of tag){
            cards.push(await getCards(status._id));
        }
    }
    res.render('magori_project', {title:'Magori - Project Management', projects:  projects, active: req.params.project_id, boards: boards, statuses: statuses, cards: cards});
});
module.exports = router;