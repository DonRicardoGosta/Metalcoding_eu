const { User } = require('../../model/userModel');
const express = require('express');
const { getProjects, getBoards, getStatuses, getCards} = require('../database/projects_data_handler');
const {validateProject, Project} = require("../../model/project-management-modells/projectModel");
const router = express.Router();


router.get('/', async (req,res) => {
    res.render('projects',{ title: "Projects"});
    //res.send(projects);
});

router.get('/get-projects',async (req,res) => {
    const user = (await User.findById('61b286f41dcc43c913fdf27c'));
    const projects = await getProjects(user._id);
    res.send(projects);
});

router.get('/get-boards/:p_id',async (req,res) => {
    const boards = await getBoards(req.params.p_id);
    res.send(boards);
});

router.get('/get-statuses/:b_id',async (req,res) => {
    const statuses = await getStatuses(req.params.b_id);
    res.send(statuses);
});

router.get('/get-cards/:s_id',async (req,res) => {
    const cards = await getCards(req.params.s_id);
    res.send(cards);
});







router.post('/',async (req, res) => {
    const { error } = validateProject(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let project = new Project({
        name: 'Angular Course',
        owner: "61ad2869232e55303a22c653",
        users:['Dani', 'Józsi'],
    });
    project = await project.save();
    res.send(project);
});


router.put('/:id',async (req, res) =>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const project = Project.findByIdAndUpdate(req.params.id,{name: req.body.name},{
        new: true
    })

    if(!project) return res.status(404).send("The project with the given ID was not found.");

    res.send(project);
});

router.delete('/:id',async (req,res) => {
    const project = await Project.findByIdAndRemove(req.params.id);

    if(!project) return res.status(404).send("The project with the given ID was not found.");

    res.send(project);
});



router.get('/:id',async (req,res)=>{
    const project = await Project.findById(req.params.id);

    if(!project) return res.status(404).send("The project with the given ID was not found.");

    res.send(project);
});



/*app.get('/api/courses/:id',(req,res)=>{
    res.send(req.params.id);
});

app.get('/api/posts/:year/:month',(req,res)=>{
    res.send(req.params);
});*/




async function createUser(){
    let user = new User({
        name: 'Horváth Dani',
        permission: 'admin',
        password:"5866",
        email: "horvathdanii99@gmail.com"
    });
    user = await user.save();
    return user;
}


module.exports = router;