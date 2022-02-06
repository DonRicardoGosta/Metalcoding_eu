const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require("../../model/userModel");
const auth = require("../middleware/auth");
const config = require("config");

router.get('/', async (req,res) => {
    let user=null;
    if(await UserInSession(req)) user = await UserInSession(req);
    res.render('index', {title:'MetalCoding', user: user});
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
router.get('/smarthome-igenyfelmeres', async (req,res) => {
    let user=null;
    if(await UserInSession(req)) user = await UserInSession(req);
    res.render('smarthome_igenyfelmeres', {title:'MagoriCO - SmartHome - Igényfelmérés', user: user});
});
router.get("/me", auth, async (req, res) => {
    const user = await UserInSession(req)
    res.send(user);
});

router.get("/logout", auth, async (req, res) => {
    res.clearCookie('x-access-token');
    res.redirect("/");
});

router.get('/register', (req,res) => {
    res.render('register', {title:'MetalCoding - register', message:'Welcome at Metalcoding.eu!'});
});
router.post("/register", async (req, res) => {

    // Our register logic starts here
    try {
        // Get user input
        const { name, email, password } = req.body;

        // Validate user input
        if (!(email && password && name)) {
            res.status(400).render('register', {title:'MetalCoding - register', error: "All input is required"});
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).render('register', {title:'MetalCoding - register', error: "User Already Exist. Please Login"});
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            config.get('jwtPrivateKey'),
            {
                expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;

        // return new user
        res.redirect("/login");
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});


router.get('/login', (req,res) => {
    res.render('login', {title:'MetalCoding - login'});
});
// Login
router.post("/login", async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;
        // Validate user input
        if (!(email && password)) {
            res.status(400).render('login', {title:'MetalCoding - login', error: "All input is required"});
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = await jwt.sign(
                { user_id: user._id, email },
                config.get('jwtPrivateKey'),
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            // user
            res.cookie('x-access-token',token).status(200).redirect("/");

        }
        res.status(400).render('login', {title:'MetalCoding - login', error:"Invalid Credentials"});
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});

router.use(function(req, res){
    res.redirect('/');
});

module.exports = router;
module.exports.UserInSession = UserInSession;