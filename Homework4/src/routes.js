const express = require('express');
const router = express.Router();


let howls = require('./data/howls.json');
let followers = require('./data/follows.json');
let users = require('./data/users.json');





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
  let authenticatedUser = localStorage.getItem('user');
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

//Returns list of howls made by a user
router.get('/api/howls/:username', (req, res) => {
  let username = req.params.username;
  let user = users.find(item => {

    return item.username == username;
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
  // let newHowl = req.body;
  
  let newHowl = {
    id: howlId,
    datetime: req.body.datetime,
    text: req.body.text,
    userId: req.body.userId
  }
  ++howlId;
  howls.push(newHowl);
  
  
  res.json(newHowl);
});

//Returns the information about the user
//if they exist
router.get('/api/getuser/:username', (req, res) => {
  let username = req.params.username;
  let user = users.find(item => {

    return item.username === username;
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
      let follows = [];

      for (i=0; i<userFollows.length; i++) {
        // let users.find(userFollowed => userFollows[i] == userFollowed.id);
        let userFollowed = users.find(item => {

          return item.id == userFollows[i];
        });
        follows.push(userFollowed.username);
      }
      
      res.json(follows);
    }
  }
  
});

//Returns the list of Howls made by the logged in user
router.get('/api/howls/', (req, res) => {
  let username =  localStorage.getItem('user').username;
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

//Returns the list of Howls made by the logged in user
router.get('/api/followedHowls/:username', (req, res) => {
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
      let follows = [];

      for (i=0; i<userFollows.length; i++) {
        // let users.find(userFollowed => userFollows[i] == userFollowed.id);
        let userFollowed = users.find(item => {

          return item.id == userFollows[i];
        });
        follows.push(userFollowed);
      }
      //gethowls from each user
      let howlList = [];
      for (let a = 0; a < follows.length; ++a) {
        let followerHowls = howls.filter((item) => item.userId == follows[a].id);
        for (let z = 0; z < followerHowls.length; ++z) {
          howlList.push(followerHowls[z]);
        }
        
      }
      
      res.json(howlList);
    }
  }
  
});


//Follow a user.
router.post('/api/follow/:username', (req, res) => {
  let username = req.params.username;
  let authenticatedUser = localStorage.getItem('user');
  if(followers[authenticatedUser.id] == undefined) {
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
      followers[authenticatedUser.id].following.push(parseInt(user.id));

    res.json(followers[authenticatedUser.id]);
    }
    
  }
  
  
});

//Unfollow a user.
router.delete('/api/unfollow/:username', (req, res) => {
  let username = req.params.username;
  let authenticatedUser = localStorage.getItem('user');
  if(followers[authenticatedUser.id] == undefined) {
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
      let index = followers[authenticatedUser.id].following.indexOf(parseInt(user.id));
      if (index > -1) {
        followers[authenticatedUser.id].following.splice(index, 1);

        res.json(followers[authenticatedUser.id]);
      }
      else {
        res.status(404).json({error: "Not Found"});
      }
      
    }
    
  }
  
  
});


// Get a user by their Id
//Returns the information about the user
//if they exist
router.get('/api/users/:id', (req, res) => {
  let id = req.params.id;
  let user = users.find(item => {

    return item.id == id;
  });
  if(!user) {
    res.status(404).json({error: "Not Found"});
  }
  else {
    res.json(user);
  }
});



module.exports = router;