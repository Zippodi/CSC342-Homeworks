import api from './APIClient.js';


const loggedInUser = localStorage.getItem('user');
const profilePicture = document.querySelector('#profilePic');
const username = document.querySelector('#Username');
const howlBox = document.querySelector('#howltextbox');
const howlList = document.querySelector('#howlList');
// username.innerHTML = loggedInUser.username;
let user = JSON.parse(loggedInUser);
username.innerHTML = user.username;
profilePicture.src = user.avatar;

console.log(user.avatar);



const howlButton = document.querySelector('#HowlButton');
howlButton.addEventListener('click', e => {
    const message = document.createElement('h2');
    message.innerHTML = howlBox.value;
    message.className = "container-fluid py-5 text-break";
    message.style.backgroundColor = "white";
    howlList.append(message);

});