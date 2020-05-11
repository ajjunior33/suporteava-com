/*const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "ajjunior33",
  password: "andreregedit",
  port: 3306,
  database: "whitecode",
});

module.exports = connection;
*/
const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: "ajjunior33",
    password: "andreregedit",
    database: "whitecode",
  },
});

module.exports = knex;
