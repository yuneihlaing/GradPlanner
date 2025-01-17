const mysql = require("mysql");
const fs = require("fs");

const con = mysql.createConnection({
  host: "sql3.freesqldatabase.com",
  user: "sql3667033",
  password: "TnBHl35gnY",
  port: "3306",
  multipleStatements: true,
});

module.exports = { con };
