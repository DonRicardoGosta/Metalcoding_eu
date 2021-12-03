const database = require('./database');
const pool = database.pool;



async function GetBoards(respond){
    const result = await pool.query(
        `SELECT * 
        FROM boards`
    );
    if (!result || !result.rows || !result.rows.length) return [];
    console.log(result.rows);
    return result.rows;
}


function GetCards(respond){
    pool.query("SELECT * FROM cards", (err, res) => {
        respond.send(res.rows);
        pool.end();
    });
}

function GetStatuses(respond){
    pool.query("SELECT * FROM statuses", (err, res) => {
        respond.send(res.rows);
        pool.end();
    });
}


module.exports.GetBoards = GetBoards
module.exports.GetCards = GetCards
module.exports.GetStatuses = GetStatuses