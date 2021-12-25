const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.render('index', {title:'MetalCoding', message:'Welcome at Metalcoding.eu!'});
});
router.use(function(req, res){
    res.redirect('/');
});

module.exports = router;