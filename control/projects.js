const express = require('express');
const data_handler = require('./database/projects_data_handler');
const router = express.Router();


router.get('/',(req,res) => {
    res.render('projects',{title:'dsadsad'});
});

router.get('/get-boards',(req,res) => {
    const boards = data_handler.GetBoards(res);
    boards.then(function(result){
        res.send(result);
    })


});

router.get('/get-statuses',(req,res) => {
    data_handler.GetStatuses(res);
});

router.get('/get-cards',(req,res) => {
    data_handler.GetCards(res);
});

router.post('/',(req, res) => {
    
    const { error } = validateProject(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const project = {
        id: projects.length +1,
        name: req.body.name
    };
    projects.push(project);
    res.send(project);
});
router.put('/:id',(req, res) =>{
    const project = projects.find(p => p.id === parseInt(req.params.id));
    if(!project) return res.status(404).send("The project with the given ID was not found.");

    const { error } = validateProject(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    project.name = req.body.name;
    res.send(project);
});

router.delete('/:id',(req,res) => {
    const project = projects.find(p => p.id === parseInt(req.params.id));
    if(!project) return res.status(404).send("The project with the given ID was not found.");
    
    const index = projects.indexOf(project);
    projects.splice(index,1);
    res.send(project);
});


function validateProject(project){
    const schema ={
        name: Joi.string().min(3).required()
    };
    return Joi.validate(project, schema);
}



router.get('/:id',(req,res)=>{
    const project = projects.find(p => p.id === parseInt(req.params.id));
    if(!project) return res.status(404).send("The project with the given ID was not found.");
    res.send(project);
});
/*app.get('/api/courses/:id',(req,res)=>{
    res.send(req.params.id);
});

app.get('/api/posts/:year/:month',(req,res)=>{
    res.send(req.params);
});*/

module.exports = router;