const db = require("./db/connect.js");
const init = require("./utils/init.js");

db.connect((err) => {
  if (err) throw err;
  console.table("Database is connected.");
  setTimeout(() => {
    init();
  }, 500);
});

