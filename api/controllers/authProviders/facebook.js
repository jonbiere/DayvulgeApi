const axios = require('axios');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const {User} = require('../../../data/models/postgres');

let verifyFacebookToken = (token) => {
  let path = `https://graph.facebook.com/me?access_token=${token}&fields=id,email,name,link,locale`;
    return axios.get(path).then(res =>{
      let fbData = res.data;
      return {
        email: fbData.email,
        facebookId: fbData.id,
        name: fbData.name || '',
        locale:fbData.locale || null,       
      };
    });
}

let generateToken = (fbUser) => {
  return User.findOrCreate({ where:{$or:[{facebookId: fbUser.facebookId }, {email:fbUser.email}]}, 
    defaults:{name:fbUser.name, email:fbUser.email, facebookId: fbUser.facebookId}})
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

  verifyFacebookToken(token).then(fbUser => {
    generateToken(fbUser).then(result => {
      res.status(200).json(result);
    }).catch(errorResponse);
  }).catch(errorResponse);
});

module.exports = router;