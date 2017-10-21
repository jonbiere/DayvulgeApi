const router = require('express').Router();
const {User} = require('../../data/models/postgres');
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
  let {email, password} = req.body;
  User.findOne({where: {email: email}})
    .then(user => {
      if (!user) {
        res.status(401).send('User or password is not correct');
      } else if (!user.correctPassword(password)) {
        res.status(401).send('User or password is not correct');
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

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy(function (err) {
      if (err) {
          return next(err);
      }

      res.clearCookie('connect.sid').status(200).json({status: "ok"});
  });
  
});

router.get('/me', (req, res) => {
  res.json(req.user)
});

module.exports = router;

