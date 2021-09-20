// Simple Pool connection to mySQL DB

const express = require("express");
const app = express();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "todo",
  connectionLimit: 100,
});

pool.execute("SELECT * FROM lists WHERE id=?", [0]).then(([rows]) => console.log(rows));

// pool.execute("INSERT INTO lists (title, status, due_date) VALUES (?,?,?)", [
//   "ฟังเพลง",
//   0,
//   "2021-08-31",
// ]);

// pool.execute("INSERT INTO lists (title, status, due_date) VALUES (?,?,?)", [
//   "Shopping",
//   0,
//   new Date("2021-08-31"),
// ]);

app.get("/", async (req, res) => {
  let [rows] = await pool.execute("SELECT * from lists");
  res.send(rows);
});

app.get('/:id', async (req,res) => {
  let [rows] = await pool.execute("SELECT * from lists WHERE id=?", [req.params.id])
  res.send(rows)
})

app.listen(8080, () => console.log("Server on 8080..."));

