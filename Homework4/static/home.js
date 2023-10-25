import api from './APIClient.js';


const loggedInUser = localStorage.getItem('user');
const username = document.querySelector('#Username');
// username.innerHTML = loggedInUser.username;
username.innerHTML = loggedInUser;

console.log(loggedInUser.username);