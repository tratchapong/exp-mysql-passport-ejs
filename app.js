require('dotenv').config()
const express = require("express");
const app = express();
const session = require('express-session')
const flash = require('express-flash')
const todoRoute = require('./routes/todoRoute')
const userRoute = require('./routes/userRoute')
const userController = require('./controllers/userController')

const passport = require('passport')
require('./auth/passport-config')(passport)
// const init = require('./auth/passport-config')
// init(passport)

const methodOverride = require('method-override')

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
app.use(methodOverride('_method'))

app.use("/todos", checkAuth, todoRoute)
app.use("/users", checkAuth, userRoute)

app.get("/login", checkNoAuth, userController.login)

app.post("/login", passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))
app.get("/register", checkNoAuth,userController.register)
app.post("/register", userController.postRegister)

app.delete("/logout", (req, res, next)=>{
  req.logOut()
  res.redirect('/login')
})

app.get("/", checkAuth, async (req, res) => {
  res.render('index.ejs', {name: 'CodeCamp9'})
});

app.use((err,req,res,next) => {
  console.log('******************')
  console.log(err)
  console.log('******************')
})

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  else res.redirect('/login')
}

function checkNoAuth(req,res,next) {
  if (req.isAuthenticated()) {
    res.redirect('/')
  }
  else return next()
}

app.listen(8080, () => console.log("Server on 8080..."));

