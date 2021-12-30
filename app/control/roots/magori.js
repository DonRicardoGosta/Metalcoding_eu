const { getProjects, getProject, getBoards, getBoard, getStatuses, getStatus, getCards, getCard} = require('../database/projects_data_handler');
const express = require('express');
const {User} = require("../../model/userModel");
const {Project} = require("../../model/project-management-modells/projectModel");
const router = express.Router();
const { createRandomObjects } =require("../database/create_random_objects");
const { UserInSession } = require("./home")

const auth = require("../middleware/auth");
const config = require("config");
const jwt = require("jsonwebtoken");


router.get('/',auth ,async (req,res) => {
    //const user = (await User.findById('61b286f41dcc43c913fdf27c'));
    //await createRandomObjects(user._id);
    let user=null;
    if(await UserInSession(req)) user = await UserInSession(req);
    try {
        let proj=await Project.findOne({owner: user._id});
        if(!proj) {
            await createRandomObjects(user._id);
            proj=await Project.findOne({owner: user._id});
        }
        return res.redirect('/magori/'+proj._id);
    }catch (ex){
        console.log(ex.message);
    }

    res.redirect('/');
});

router.get('/:project_id',auth , async (req,res) => {
    let user=null;
    if(await UserInSession(req)) user = await UserInSession(req);

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
    res.render('magori_project', {title:'Magori - Project Management',user: user , projects:  projects, active: req.params.project_id, boards: boards, statuses: statuses, cards: cards});
});

router.get('/calendar/demo',auth ,async (req,res) => {
    //const user = (await User.findById('61b286f41dcc43c913fdf27c'));
    //await createRandomObjects(user._id);
    let user=null;
    if(await UserInSession(req)) user = await UserInSession(req);
    res.render('magori_calendar', {title:'Magori - calendar',user: user});
});

module.exports = router;