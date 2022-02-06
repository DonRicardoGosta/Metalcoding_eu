const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { User } = require("../../model/userModel");
const auth = require("../middleware/auth");
const config = require("config");

router.get('/', auth, async (req,res) => {
    let user=null;
    if(await UserInSession(req)) user = await UserInSession(req);
    res.render('smarthome_igenyfelmeres', {title:'MagoriCO - SmartHome - Igényfelmérés', user: user});
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

router.use(function(req, res){
    res.redirect('/');
});

module.exports = router;
module.exports.UserInSession = UserInSession;