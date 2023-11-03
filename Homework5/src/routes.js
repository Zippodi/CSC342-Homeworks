const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();


router.use(cookieParser());
const UserDAO = require('./UserDAO');


router.use(express.json());
const {TokenMiddleware, generateToken, removeToken} = require('./TokenMiddleware');


router.post('/api/users/login', (req,  res) => {
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
  
  router.post('/api/users/logout', (req,  res) => {
    removeToken(req, res);
  
    res.json({success: true});
  });
  
  
  router.get('/api/users/current', TokenMiddleware, (req,  res) => {
    res.json(req.user);
  });


  module.exports = router;
