const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const db = new sqlite3.Database('./movie.db');
const sql = fs.readFileSync('./setup.sql', 'utf-8');

db.exec(sql, (err) => {
  if (err) console.error("Error running SQL setup:", err);
  else console.log("Tables created successfully!");
  db.close();
});
