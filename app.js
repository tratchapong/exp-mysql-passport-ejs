require('dotenv').config()
const express = require("express");
const app = express();
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')
const todoRoute = require('./routes/todoRoute')
const userRoute = require('./routes/userRoute')
const userController = require('./controllers/userController')
const initPassport = require('./auth/passport-config')
const {pool, exec} = require('./db/dbcon')

initPassport(passport,
    async email => {
      let [rs] = await exec('SELECT * FROM users WHERE email=?', [email])
      return rs
    },
    async id => {
      let [rs] = await exec('SELECT * FROM users WHERE id=?', [id])
      return rs
    },
  )

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use("/todos", todoRoute)
app.use("/users", userRoute)

app.get("/login", userController.login)

app.post("/login", passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))
app.get("/register", userController.register)
app.post("/register", userController.postRegister)

app.get("/", async (req, res) => {
  res.render('index.ejs', {name: 'CodeCamp9'})
});

app.use((err,req,res,next) => {
  console.log('******************')
  console.log(err)
  console.log('******************')
})

app.listen(8080, () => console.log("Server on 8080..."));

