const express = require('express');
const router = express.Router();

const apiRouter = require('./api/APIRoutes');
const frontendRouter = require('./frontend/FrontendRoutes');


router.use(express.json());



apiRouter.post('/users/login', (req,  res) => {
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
  
  apiRouter.post('/users/logout', (req,  res) => {
    removeToken(req, res);
  
    res.json({success: true});
  });
  
  
  apiRouter.get('/users/current', TokenMiddleware, (req,  res) => {
    res.json(req.user);
  });


  module.exports = router;
