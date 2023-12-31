const handleError = (res) => {
  if(!res.ok) {
    if(res.status == 401) {
      localStorage.removeItem('user');
      document.location = '/';
      throw new Error("Unauthenticated");
    }
    else {
      throw new Error("Error")
    }
  }
  return res;
};



class HTTPClient {
    static get(url) {
      return fetch(url).then(res => {
        if(!res.ok) {
          throw new Error("error in request");
        }
        return res.json();
      });
    }

    static post(url, data) {
      return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(handleError).then(res => {
        return res.json();
      });
    }

    static put(url, data)  {
      return fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(handleError).then(res => {
        return res.json();
      });
  
    }
    
    
    
  }



  export default {
    getUser: (username) => {
        return HTTPClient.get(`/api/getuser/${username}`).then(users => {
          
          return users;
        });
      },
    login: (username) => {
      let data = {
        username: username
      }
      return HTTPClient.post(`/api/authenticate/${username}`, data).then(users => {
        
        return users;
      });
    },
    getFollows: (username) => {
      return HTTPClient.get(`/api/follows/${username}`).then(users => {
        
        return users;
      });
    },
    getHowls: (username) => {
      return HTTPClient.get(`/api/howls/${username}`).then(howls => {
        
        return howls;
      });
    },

    getFollowedHowls: (username) => {
      return HTTPClient.get(`/api/followedHowls/${username}`).then(howls => {
        
        return howls;
      });
    },

    getUserById: (id) => {
      return HTTPClient.get(`/api/users/${id}`).then(user => {
        
        return user;
      });
    },

    postHowl: (userId, datetime, text) => {
      let data = {
        userId : userId,
        datetime: datetime,
        text: text
      }
      return HTTPClient.post(`/api/howls`, data).then(howl => {
        
        return howl;
      });
    },



    followUser: (userToFollow, user) => {
      let data = {
        userToFollow: userToFollow,
        user: user
      }
      return HTTPClient.post(`/api/users/follow`, data).then(followedUser => {
        
        return followedUser;
      });
    },

    unfollowUser: (userToUnfollow, user) => {
      let data = {
        userToUnfollow: userToUnfollow,
        user: user
      }
      return HTTPClient.put(`/api/users/unfollow`, data).then(unfollowedUser => {
        
        return unfollowedUser;
      });
    },
    //Used to get the howls for the home page.
    getFollowedAndUserHowls: (username) => {
      return HTTPClient.get(`/api/followedHowls/${username}`).then(followedHowls => {
        
        // return howls;
        return HTTPClient.get(`/api/howls/${username}`).then(userHowls => {
          for (let z = 0; z < userHowls.length; ++z) {
            followedHowls.push(userHowls[z]);
          }
          return followedHowls;
        });
      });
    }




    
  };