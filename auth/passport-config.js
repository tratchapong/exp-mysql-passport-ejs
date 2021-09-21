const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {

  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email)
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