const express = require('express');
const router = express.Router();

let howls = require('./data/howls.json');
let followers = require('./data/follows.json');
let users = require('./data/users.json');
let authenticatedUser  = {
  username: "",
  userId: ""
}

// router.get('/api/howls', (req, res) => {
//   res.json(howls);
// });

// router.get('/api/follows', (req, res) => {
//   res.json(followers);
// });

// router.get('/api/users', (req, res) => {
//   res.json(users);
// });


//Checks if the user with the username exists,
//and if they do, authenticate them.
router.get('/api/authenticate/:username', (req, res) => {
  let username = req.params.username;
  let user = users.find(item => {
    return item.username == username;
  });
  if(!user) {
    res.status(404).json({error: "Not Found"});
  }
  else {
    authenticatedUser.username = user.username;
    authenticatedUser.userId = user.id;
    res.json(user);
  }
});


//Returns the information about the user with
//the given username if they are authenticated.
router.get('/api/authenticated/:username', (req, res) => {
  let username = req.params.username;
  if (!authenticatedUser) {
    res.status(404).json({error: "Not logged in."});
  }
  console.log(authenticatedUser);
  let user = users.find(item => {

    return item.username == username && item.username == authenticatedUser.username;
  });
  if(!user) {
    res.status(404).json({error: "Not Found"});
  }
  else {
    res.json(user);
  }
});

//Returns list of howls made by user with userId
router.get('/api/howls/:userId', (req, res) => {
  let userId = req.params.userId;
  let howlList = howls.filter((item) => item.userId == userId);


  res.json(howlList);
});


//Make a Howl
router.post('/api/howls', (req, res) => {
  let newHowl = req.body;
  howls.push(newHowl);
  res.json(newHowl);
});

//Returns the information about the user
//if they exist
router.get('/api/users/:username', (req, res) => {
  let username = req.params.username;
  let user = users.find(item => {

    return item.username == username && item.username == authenticatedUser;
  });
  if(!user) {
    res.status(404).json({error: "Not Found"});
  }
  else {
    res.json(user);
  }
});

//Returns the list of users that a user follows.
router.get('/api/follows/:userId', (req, res) => {
  let userId = req.params.userId;
  let userFollows = followers[userId].following;
  if(!userFollows) {
    res.status(404).json({error: "Not Found"});
  }
  else {
    res.json(userFollows);
  }
});

//Follow a user.
router.post('/api/follow/:userId', (req, res) => {
  let userId = req.params.userId;
  if(!followers[authenticatedUser.userId]) {
    res.status(404).json({error: "Not Found"});
  }
  else {
    followers[authenticatedUser.userId].following.push(userId);
    console.log(followers(authenticatedUser.userId));
  }
  
  
});

//Follow a user.
router.delete('/api/unfollow/:userId', (req, res) => {
  let userId = req.params.userId;
  if(!followers[authenticatedUser.userId]) {
    res.status(404).json({error: "Not Found"});

  }
  else {
    let index = followers[authenticatedUser.userId].following.indexOf(userId);
    followers[authenticatedUser.userId].following.slice(index, 1);
  }
  
  
});




module.exports = router;