const jwt = require("jsonwebtoken");

const config = require("config");

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.cookies['x-access-token'];

    if (!token) {
        return res.status(403).render('login', {title:'MetalCoding - login', error:"Bad request, you have to login first"});
    }
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
    } catch (err) {
        return res.status(401).render('login', {title:'MetalCoding - login', error:"Invalid Token, please try to login again or contact the developers"});
    }
    return next();
};

module.exports = verifyToken;