const express = require('express');
const { getProjects, getProject, getBoards, getBoard, getStatuses, getStatus, getCards, getCard} = require('../../database/projects_data_handler');
const { UserInSession } = require("../home")
const router = express.Router();

const auth = require("../../middleware/auth");



router.get('/get-test',auth ,async (req,res) => {
    let user=null;
    if(await UserInSession(req)) user = await UserInSession(req);
    //const projects = await getProjects(user._id);
    res.send("kacsa");
});

module.exports = router;