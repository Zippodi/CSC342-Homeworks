import api from './APIClient.js';

api.getCurrentUser().then(user => {
    let link = document.createElement('a');
    link.href = '#';
    link.innerHTML = "Log Out";
    link.addEventListener("click", e => {
      e.preventDefault();
      api.logOut().then(() => {
        document.location = "/login";
      });
    })
  
    document.getElementById('loggedInUser').innerHTML = `${user.first_name} ${user.last_name} (${user.username}) `;
    document.getElementById('loggedInUser').appendChild(document.createElement('br'));
    document.getElementById('loggedInUser').appendChild(link);
  })
  .catch(error => {
    if(error.status === 401) {
      console.log("We are not logged in");
      document.location = '/login';
    }
    else {
      console.log(`${error.status}`, error);
    }
  });