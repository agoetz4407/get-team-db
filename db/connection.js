const mysql = require("mysql2")

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'get_team_db'
    }
)

module.exports = db;