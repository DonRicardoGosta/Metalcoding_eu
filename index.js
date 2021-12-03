const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./control/middleware/logger');
const projects = require('./control/projects');
const home = require('./control/home');
const express = require('express');
//const pg = require("pg-promise/typescript/pg-subset");
const app =  express();

app.set('view engine', 'pug');
app.set('views','./views');

app.use(express.json());

app.use(helmet());
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