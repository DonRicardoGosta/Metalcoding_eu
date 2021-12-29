require("./config/database").connect();
const config = require('config');
const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const app =  express();

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

const api = require('./app/control/roots/api/project_management');
const magori = require('./app/control/roots/magori');
const home = require('./app/control/roots/home');

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use('/static', express.static('./app/views/static'));

app.use('/api/projects', api);
app.use('/magori', magori)
app.use('/', home);

app.set('views', './app/views');
app.set('view engine', 'pug');



console.log('Application Name: '+config.get('name'));

module.exports = app;