const express = require('express');
const router = express.Router();


router.use(express.json());



router.post('/users/login', (req,  res) => {
    if(req.body.username && req.body.password) {
      UserDAO.getUserByCredentials(req.body.username, req.body.password).then(user => {
        let result = {
          user: user
        }
  
        generateToken(req, res, user);
  
        res.json(result);
      }).catch(err => {
        console.log(err);
        res.status(err.code).json({error: err.message});
      });
    }
    else {
      res.status(401).json({error: 'Not authenticated'});
    }
  });
  
  router.post('/users/logout', (req,  res) => {
    removeToken(req, res);
  
    res.json({success: true});
  });
  
  
  router.get('/users/current', TokenMiddleware, (req,  res) => {
    res.json(req.user);
  });


  module.exports = router;
