const passport = require('passport');
const router = require('express').Router();
const {User} = require('../../../data/models');
const FacebookStrategy = require('passport-facebook').Strategy;
const providerName = 'facebook'

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['id', 'displayName', 'picture', 'email', 'last_name', 'first_name']
  }, (accessToken, refreshToken, profile, done) => {

    const facebookId = profile.id;
    const email = profile.emails.length && profile.emails[0].value;
    const name = profile.displayName;

     //TODO: check if email is already in use with other account to enforce unique emails

    User.findOrCreate({ where:{ facebookId: facebookId }, defaults:{name:name, email:email}})
    .spread((user, created) => {
        done(null, user)
        return user;
    }).catch(done);
  }));

  router.get('/', passport.authenticate(providerName));
  
  router.get('/callback', passport.authenticate(providerName, {
    successRedirect: process.env.AUTH_SUCCESS_URL,
    failureRedirect: process.env.AUTH_FAIL_URL
  }));

module.exports = router;