const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { createRandomObjects } =require("../database/create_random_obejct_for_igenyfelmeres");
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
    await createRandomObjects(user.user_id);
    res.send("kacsa");
});













router.use(function(req, res){
    res.redirect('/');
});

async function UserInSession(req){
    const token = req.cookies['x-access-token'];

    if (!token) {
        return null;
    }
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        const user = await User.findById(req.user.user_id)
        return user
    } catch (err) {
        return null;
    }
}

module.exports = router;
module.exports.UserInSession = UserInSession;