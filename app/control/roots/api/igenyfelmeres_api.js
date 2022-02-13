const express = require('express');
const { UserInSession } = require("../home")
const { IgenyfelmeresLineRecordModel } = require('../../../model/igenyfelmeres_data_models/igenyfelmeres_line_records_Model');
const {getLocations} = require("../../database/igenyfelmeres_data_handler");
const router = express.Router();

const auth = require("../../middleware/auth");





router.get('/get-test',auth ,async (req,res) => {
    let user=null;
    if(await UserInSession(req)) user = await UserInSession(req);
    //const projects = await getProjects(user._id);
    res.send("kacsa");
});
router.get('/get-locations',auth ,async (req,res) => {
    const locations = await getLocations();
    res.send(locations);
});










router.put('/rename-line-record/:id/:new_name',auth ,async (req,res) =>{
    let line_record = await IgenyfelmeresLineRecordModel.findOneAndUpdate({_id: req.params.id}, {name: req.params.new_name}, {
        new: true
    });
    res.send(line_record);
});


module.exports = router;