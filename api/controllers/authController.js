const router = require('express').Router();
const User = require('../../data/models/user');
const passport = require('passport');

// passport registration
passport.serializeUser((user, done) =>{
  done(null, user.id);
});
passport.deserializeUser((id, done) =>{
  User.findById(id)
  .then((user) => {
    done(null, user);
  }).catch(ex =>{
    done(ex);
  })
});

router.use('/google', require('./authProviders/google'));

router.use('/facebook', require('./authProviders/facebook'));

router.post('/login', (req, res, next) => {
  User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (!user) {
        res.status(401).send('User not found');
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password');
      } else {
        req.login(user, err => err ? next(err) : res.json(user));
      }
    })
    .catch(next);
});

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => err ? next(err) : res.json(user));
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError')
        res.status(401).send('User already exists')
      else next(err)
    })
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy(function (err) {
      if (!err) {
          res.clearCookie('connect.sid').status(200).json({status: "Success"});
      } else {
          // handle error case...
      }

  });
});

router.get('/me', (req, res) => {
  console.log('Me');
  console.log(req.user);
  res.json(req.user)
});

module.exports = router;

