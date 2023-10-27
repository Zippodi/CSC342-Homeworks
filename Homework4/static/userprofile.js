import api from './APIClient.js';


const loggedInUser = localStorage.getItem('user');
const profilePicture = document.querySelector('#profilePic');
const username = document.querySelector('#Username');
const fullName = document.querySelector('#userprofileName');
// const lastName = document.querySelector('#userprofileLastName');
const userProfileUserName = document.querySelector('#userProfileUsername');
const userProfilePic = document.querySelector('#userprofilePic');
let user = JSON.parse(loggedInUser);
username.innerHTML = user.username;
profilePicture.src = user.avatar;





// Get id from URL
const query = window.location.search;
let parameters = new URLSearchParams(query);
let profileUsername = parameters.get('username');
console.log(profileUsername);

api.getUser(profileUsername).then(returnedUser => {
    userProfilePic.src = returnedUser.avatar;
    fullName.innerHTML = returnedUser.first_name + " " + returnedUser.last_name;
    //lastName.innerHTML = returnedUser.last_name;
    userProfileUserName.innerHTML = "@" + returnedUser.username;
    

}).catch((err) => {
  
    alert("Couldn't get user.");
});


