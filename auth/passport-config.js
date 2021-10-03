const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const {exec} = require('../db/dbcon')


  async function getUserByEmail(email) {
    let [rs] = await exec('SELECT * FROM users WHERE email=?', [email])
    return rs
  }

  async function getUserById(id) {
    let [rs] = await exec('SELECT * FROM users WHERE id=?', [id])
    return rs
  }


function initialize(passport) {

  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email)
    console.log(user)
    if(user == null) 
      return done(null, false, {message : 'No user for that email' })
    if( await bcrypt.compare(password, user.password))
      return done(null, user)
    else return done(null, false, {message : 'password incorect'})
  }

  passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id)) 
  passport.deserializeUser(async (id, done) => done(null, await getUserById(id)))

}

module.exports = initialize