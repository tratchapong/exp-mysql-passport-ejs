const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "todo",
  connectionLimit: 100,
});

const execute = async (sql, params) => {
  const [rows, fields] = await pool.execute(sql,params)
  return rows
}

// const exec = (sql, p) => pool.execute(sql,p).then(rows => rows[0])

const exec = async (sql ,p) => (await pool.execute(sql,p))[0]

module.exports = {pool, execute, exec}