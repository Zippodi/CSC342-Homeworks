const express = require('express');
const router = express.Router();


let howls = require('./data/howls.json');
let followers = require('./data/follows.json');
let users = require('./data/users.json');
let authenticatedUser  = {
  username: "",
  userId: ""
}





let howlId = 101;
router.use(express.json());


//Checks if the user with the username exists,
//and if they do, authenticate them.
router.post('/api/authenticate/:username', (req, res) => {
  let username = req.body.username;
  let user = users.find(item => {
    return item.username == username;
  });
  if(!user) {
    res.status(401).json({error: 'Not authenticated'});
  }
  else {
    // authenticatedUser.username = user.username;
    // authenticatedUser.userId = user.id;
    // localStorage.setItem('loggedUser', user.username);
    res.json(user);
  }
});


//Returns the information about the user with
//the given username if they are authenticated.
router.get('/api/authenticated/:username', (req, res) => {
  let username = req.params.username;
  if (!authenticatedUser || authenticatedUser.username != username) {
    res.status(404).json({error: "Not logged in."});
  }
  else {
    let user = users.find(item => {

      // return item.username == username && item.username == authenticatedUser.username;
      return item.username == username && item.username == localStorage.getItem('user').username;

    });
    if(!user) {
      res.status(404).json({error: "Not Found or Not Logged In"});
    }
    else {
      res.json(user);
    }
  }
  
});

//Returns list of howls made by user with userId
router.get('/api/howls/:username', (req, res) => {
  let username = req.params.username;
  let user = users.find(item => {

    return item.username == username && item.username == authenticatedUser.username;
  });
  if(!user) {
    res.status(404).json({error: "Not Found"});
  }
  else {
    let howlList = howls.filter((item) => item.userId == user.id);
    res.json(howlList);
  }
  


  
});


//Make a Howl
router.post('/api/howls', (req, res) => {
  let newHowl = req.body;
  newHowl.id = howlId;
  ++howlId;
  howls.push(newHowl);
  
  
  res.json(newHowl);
});

//Returns the information about the user
//if they exist
router.get('/api/getuser/:username', (req, res) => {
  let username = req.params.username;
  let user = users.find(item => {

    return item.username == username;
  });
  if(!user) {
    res.status(404).json({error: "Not Found"});
  }
  else {
    res.json(user);
  }
});

//Returns the list of users that a user follows.
router.get('/api/follows/:username', (req, res) => {
  let username = req.params.username;
  let user = users.find(item => {

    return item.username == username;
  });
  if(!user) {
    res.status(404).json({error: "Not Found"});
  }
  else {
    let userFollows = followers[user.id].following;
    if(!userFollows) {
     res.status(404).json({error: "Not Found"});
    }
    else {
      res.json(userFollows);
    }
  }
  
});

//Follow a user.
router.post('/api/follow/:username', (req, res) => {
  let username = req.params.username;
  if(followers[authenticatedUser.userId] == undefined) {
    res.status(404).json({error: "Not Found"});
  }
  
  else {
    let user = users.find(item => {

      return item.username == username;
    });
    if(!user) {
      res.status(404).json({error: "Not Found"});
    }
    else {
      followers[authenticatedUser.userId].following.push(parseInt(user.id));

    res.json(followers[authenticatedUser.userId]);
    }
    
  }
  
  
});

//Follow a user.
router.delete('/api/unfollow/:username', (req, res) => {
  let username = req.params.username;
  if(followers[authenticatedUser.userId] == undefined) {
    res.status(404).json({error: "Not Found"});
  }
  
  else {
    let user = users.find(item => {

      return item.username == username;
    });
    if(!user) {
      res.status(404).json({error: "Not Found"});
    }
    else {
      let index = followers[authenticatedUser.userId].following.indexOf(parseInt(user.id));
      if (index > -1) {
        followers[authenticatedUser.userId].following.splice(index, 1);

        res.json(followers[authenticatedUser.userId]);
      }
      else {
        res.status(404).json({error: "Not Found"});
      }
      
    }
    
  }
  
  
});




module.exports = router;