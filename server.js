const db = require("./db/connect.js");
const init = require("./utils/init.js");
const mysql = require('mysql2');


db.connect((err) => {
  if (err) throw err;
  console.table("Database is connected.");
  setTimeout(() => {
    init();
  }, 500);
});

// Connect to database
// const db = mysql.createConnection(
//   {
//     host: 'localhost',
//     // Your MySQL username,
//     user: 'root',
//     // Your MySQL password
//     password: 'Summer123!',
//     database: 'employeeDB'
//   },
//   console.log('Connected to the employee database.')
// );
