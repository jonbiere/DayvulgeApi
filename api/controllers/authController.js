const router = require('express').Router();
const jwt = require('jsonwebtoken');
const {User} = require('../../data/models/postgres');

let generateToken = (user) => {
    let userVm = user.mapToViewModel(); 
    let authToken = jwt.sign(userVm, process.env.API_AUTH_SECRET, {
      expiresIn: '5h' // expires in 5 hours
    });   
    return {user:userVm, token: authToken}; 
} 

//external providers
router.use('/google', require('./authProviders/google'));

router.use('/facebook', require('./authProviders/facebook'));

router.post('/login', (req, res)=>{
  let {email, password} = req.body;

  let errorResponse = (err) => {
    console.log(err);
    res.status(401).json({message: "Username or Password is incorrect."})
  }

  User.findOne({where: {email: email}})
      .then(user => {
        if (!user) { errorResponse("User not found.") }
        if (!user.correctPassword(password)) {errorResponse("Password is incorret.")}
        res.status(200).json(generateToken(user));
  }).catch(errorResponse);

});

router.post('/signup', (req, res) => {
  let {email, password} = req.body;
  User.create(({name:email.split('@')[0], email:email, password:password}))
    .then(user => {
      res.status(200).json(generateToken(user));       
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError'){
        //TODO: Soften constraint. Allow users to login same user from provider and local auth
        res.status(401).json({message:'User already exists'})
      }
      else{
        console.log(err);
        res.status(500).json({message: "An error has occured."})
      }
    })
});

router.get('/logout', (req, res) => {
  //nothing todo, client will remove token from local storage
  res.status(200).json({ status: "ok" });
});

router.get('/me', (req, res) => {
  let token = req.headers.authorization;

  if(!token){
    res.status(200).json({});
  }

  //grab token value
  token = token.split(' ')[1]

  jwt.verify(token, process.env.API_AUTH_SECRET, (err, user) => {
    if(err || !user){
      res.status(200).json({});
    }
    else {
      res.status(200).json(user);
    }
  })
});

module.exports = router;

