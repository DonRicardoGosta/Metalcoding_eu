const { Pool, Client } = require('pg');
const client = new Client({
   host: "localhost",
   user: "horvath",
   password: "5866",
   database: "vir_szakdolgozat"
});
const pool = new Pool({
   host: "localhost",
   user: "horvath",
   password: "5866",
   database: "vir_szakdolgozat"
});

module.exports.pool = pool;
module.exports.client = client;