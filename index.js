const mongoose = require('mongoose');
const util = require('util');
const encoder = new util.TextEncoder('utf-8');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./app/control/middleware/logger');
const auth = require('./app/control/roots/auth');
const users = require('./app/control/roots/users');
const projects = require('./app/control/roots/projects');
const home = require('./app/control/roots/home');
const express = require('express');
const app =  express();

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

app.set('view engine', 'pug');
app.set('views','./app/views');

mongoose.connect('mongodb://localhost/vir_szakdolgozat')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...',err))

app.use(express.json());
app.use(helmet());
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/projects', projects);
app.use('/', home);

console.log('Application Name: '+config.get('name'));
console.log('Mail Server: '+config.get('mail.host'));
console.log('Mail Password: '+config.get('mail.password'));

if(app.get('env')==='development'){
    app.use(morgan('tiny'));//kiírja a (defaultként)console-ra hogy milyen requestek történtek és hogy milyen státuszkóddal végződtek
    startupDebugger('Morgan enabled...');
}


//dbDebugger('Connected to the database');



//Port
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening in port ${port}...`));

//express advanced topics