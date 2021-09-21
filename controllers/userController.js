const {pool, exec } = require('../db/dbcon')
const bcrypt = require('bcrypt')
const passport = require('passport')

exports.getAllUsers = async (req, res, next) => {
  let [rows] = await exec('SELECT * FROM users',[])
  res.json(rows)
}

exports.login = (req, res, next) => {
  res.render('login.ejs')
}

exports.register = (req, res, next) => {
  res.render('register.ejs')
}

exports.postRegister = async (req, res, next) => {
  try {
    let { name, email, password} = req.body
    let hashedPassword = await bcrypt.hash(password, 10)
    let sql = 'INSERT INTO users (name, email, password) VALUES(?,?,?)'
    let p = [name, email, hashedPassword]
    let rs = await exec(sql, p)
    res.status(201).json({newUser : { id : rs.insertId }})    
  } catch (error) {
    next(error)
  }
}




