var express = require('express');
var router = express.Router();
const JsonWebToken = require('./../controllers/JsonWebToken').JsonWebToken;
const userModel = require('../models/userModel').UserModel;
const jwt = new JsonWebToken();


router.post('/auth-token', (req, res, next) => {
  const userdata  = { user: req.body.user, password: req.body.password };
  const token = jwt.createSign(userdata, process.env.TOKEN , {expiresIn: 1440});
  res.json({token : token});
});


router.post('/createUser', async (req, res)=>{
  console.log(req.body);
  register = true;
  let user = new userModel(req.body, register);
  response = await user.create();
  res.json({result: response});

});

router.post('/login', async (req, res, next) => {
  console.log("req");
  let user = new userModel();
  response = await user.getUser(req.body.username, req.body.password);
  if(response.length > 0) {
    res.json({
      result: response,
      login: true
    });

  }else{
    res.json({login: false});
  }
  console.log("req", response);
  res.status(200);
});

module.exports = router;
