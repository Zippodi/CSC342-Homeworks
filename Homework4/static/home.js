import api from './APIClient.js';


const loggedInUser = localStorage.getItem('loggedUser');
const username = document.querySelector('#Username');
username.innerHTML = loggedInUser.username;
console.log(loggedInUser);