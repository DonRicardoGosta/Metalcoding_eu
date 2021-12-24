const { User } = require('../../../model/userModel');
const { Card } = require('../../../model/project-management-modells/cardModel');
const { Status } = require('../../../model/project-management-modells/statusModel');
const express = require('express');
const { getProjects, getProject, getBoards, getBoard, getStatuses, getStatus, getCards, getCard} = require('../../database/projects_data_handler');
const {validateProject, Project} = require("../../../model/project-management-modells/projectModel");
const router = express.Router();



router.get('/get-projects',async (req,res) => {
    const user = (await User.findById('61b286f41dcc43c913fdf27c'));
    const projects = await getProjects(user._id);
    res.send(projects);
});
router.get('/get-project/:project_id',async (req,res) => {
    const user = (await User.findById('61b286f41dcc43c913fdf27c'));
    const project = await getProject(user._id, req.params.project_id);
    res.send(project);
});



router.get('/get-boards/:project_id',async (req,res) => {
    const boards = await getBoards(req.params.project_id);
    res.send(boards);
});
router.get('/get-board/:board_id',async (req,res) => {
    const board = await getBoard(req.params.board_id);
    res.send(board);
});



router.get('/get-statuses/:board_id',async (req,res) => {
    const statuses = await getStatuses(req.params.board_id);
    res.send(statuses);
});
router.get('/get-status/:status_id',async (req,res) => {
    const status = await getStatus(req.params.status_id);
    res.send(status);
});



router.get('/get-cards/:status_id',async (req,res) => {
    const cards = await getCards(req.params.status_id);
    res.send(cards);
});
router.get('/get-card/:card_id',async (req,res) => {
    const card = await getCard(req.params.card_id);
    res.send(card);
});




router.post('/new-card/:s_id',async (req, res) => {

    let card = new Card({
        name: 'New Card',
        status_id: req.params.s_id,
        created_user:"61b286f41dcc43c913fdf27c"
    });
    card = await card.save();
    res.send(card);
});


router.put('/move-card/:id/:status_id',async (req,res) =>{
    let card = await Card.findOneAndUpdate({_id: req.params.id}, {status_id: req.params.status_id}, {
        new: true
    });
    res.send(card);

});
router.put('/rename-card/:id/:new_name',async (req,res) =>{
    let card = await Card.findOneAndUpdate({_id: req.params.id}, {name: req.params.new_name}, {
        new: true
    });
    res.send(card);
});

router.delete('/card/:id',async (req,res) => {
    const card = await Card.findByIdAndRemove(req.params.id);
    if(!card) return res.status(404).send("The card with the given ID was not found.");
});
router.delete('/card/status-id/:id',async (req,res) => {
    const card = await Card.deleteMany({status_id: req.params.id})
    if(!card) return res.status(404).send("The card with the given ID was not found.");
});
router.delete('/status/:id',async (req,res) => {
    console.log("here")
    const status = await Status.findByIdAndRemove(req.params.id);
    if(!status) return res.status(404).send("The status with the given ID was not found.");
});

module.exports = router;