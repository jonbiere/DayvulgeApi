const passport = require('passport');
const router = require('express').Router();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const {User} = require('../../../data/models/postgres');
module.exports = router;

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
};

const strategy = new GoogleStrategy(googleConfig, (token, refreshToken, profile, done) => {
  const googleId = profile.id
  const name = profile.displayName
  const email = profile.emails[0].value

  //check if email is already in use. If so allow login from either Google or Password
  User.findOrCreate({where:{$or:[{googleId: googleId}, {email:email}]}, defaults:{name: name, email: email}})
  .spread((user, created) => {
    if(!created){

    }
   done(null, user);
  }).catch(done)
});

passport.use(strategy);

router.get('/', passport.authenticate('google', {scope: 'email'}));

router.get('/callback', passport.authenticate('google', {
  successRedirect: process.env.AUTH_SUCCESS_URL,
  failureRedirect: process.env.AUTH_FAIL_URL
}));
