const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { createRandomObjects } =require("../database/create_random_obejct_for_igenyfelmeres");

const { UserInSession } = require("./home")

const auth = require("../middleware/auth");
const config = require("config");


router.get('/', auth, async (req,res) => {
    let user=null;
    if(await UserInSession(req)) user = await UserInSession(req);
    res.render('smarthome_igenyfelmeres', {title:'MagoriCO - SmartHome - Igényfelmérés', user: user});
});

router.get('/fill',auth ,async (req,res) => {
    let user=null;
    if(await UserInSession(req)) user = await UserInSession(req);
    await createRandomObjects(user._id);
    res.send(user);
});











router.use(function(req, res){
    res.redirect('/');
});

module.exports = router;