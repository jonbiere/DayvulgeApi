const axios = require('axios');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const {User} = require('../../../data/models/postgres');

let verifyGoogleToken = (token) => {
  let path = `https://www.googleapis.com/plus/v1/people/me?access_token=${token}`;
    return axios.get(path).then(res =>{
      let googleData = res.data;
      return {
        email: googleData.emails[0] && googleData.emails[0].value,
        googleId: googleData.id,
        name: googleData.displayName || '',
        locale:googleData.language || null,       
      };
    });
}

let generateToken = (googleUser) => {
  return User.findOrCreate({ where:{$or:[{googleId: googleUser.googleId }, {email:googleUser.email}]}, 
    defaults:{name:googleUser.name, email:googleUser.email, googleId: googleUser.googleId}})
  .spread((user, created) => {
    let userVm = user.mapToViewModel(); 
    let authToken = jwt.sign(userVm, process.env.API_AUTH_SECRET, {
      expiresIn: '5h' // expires in 5 hours
    });   
    return {user:userVm, token: authToken}; 
  });
} 

router.post('/', (req,res)=>{
  let {token} = req.body;

  let errorResponse = (err) => {
    //TODO Log Details with logger
    console.log(err);
    res.status(500).json({message: "An error has occured"});
  };

  verifyGoogleToken(token).then(googleUser => {
    generateToken(googleUser).then(result => {
      res.status(200).json(result);
    }).catch(errorResponse);
  }).catch(errorResponse);
});

module.exports = router;
