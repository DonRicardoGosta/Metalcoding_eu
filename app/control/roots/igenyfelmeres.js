const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { createRandomObjects } =require("../database/create_random_obejct_for_igenyfelmeres");

const { UserInSession } = require("./home")

const auth = require("../middleware/auth");
const config = require("config");
const {getIgenyfelmeresRecords} = require("../database/igenyfelmeres_data_handler");


router.get('/', auth, async (req,res) => {
    let user=null;
    if(await UserInSession(req)) user = await UserInSession(req);
    const igenyfelmeres_records = await getIgenyfelmeresRecords(user._id);
    const active_igenyfelmero_record = igenyfelmeres_records[0];
    const lines_for_active_ifmero = active_igenyfelmero_record.line_records;
    res.render('smarthome_igenyfelmeres', {title:'MagoriCO - SmartHome - Igényfelmérés', user: user, igenyfelmeres_records: igenyfelmeres_records, active_igenyfelmero_record: active_igenyfelmero_record, lines_for_active_ifmero:lines_for_active_ifmero});
});

router.get('/fill',auth ,async (req,res) => {
    /*let user=null;
    if(await UserInSession(req)) user = await UserInSession(req);
    await createRandomObjects(user._id);*/
    
    res.redirect('/smarthome-igenyfelmeres');
});











router.use(function(req, res){
    res.redirect('/smarthome-igenyfelmeres');
});

module.exports = router;