const crypto = require('crypto');

let users = require('./data/users.json');

module.exports = {
  getUserByCredentials: (username, password) => {
    return new Promise((resolve, reject) => {
      const user = users.find(user => user.username == username);
      if (user) { 
        crypto.pbkdf2(password, user.salt, 100000, 64, 'sha512', (err, derivedKey) => {
          if (err) { 
            reject({code: 400, message: "Error: " +err});
          }

          const digest = derivedKey.toString('hex');
          if (user.password == digest) {
            resolve(getFilteredUser(user));
          }
          else {
            reject({code: 401, message: "Invalid username or password"});
          }
        });
      }
      else { 
        reject({code: 401, message: "No such user"});
      }
    })

  },
};


function getFilteredUser(user) {
  return {
    "id": user.id,
    "first_name": user.first_name,
    "last_name": user.last_name,
    "username": user.username,
    "avatar": user.avatar
  }
}

