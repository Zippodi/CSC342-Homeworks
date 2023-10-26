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




const howlButton = document.querySelector('#HowlButton');
howlButton.addEventListener('click', e => {
    const howl = document.createElement('div');
    howl.className = "container";
    const pic = document.createElement('img');
    pic.src = user.avatar;
    howl.append(pic);
    howl.append(user.first_name);
    howl.append(" ");
    howl.append(user.last_name);
    howl.append(" @");
    howl.append(user.username);
    howl.style.backgroundColor = "orange";
    howl.style.color = "white";

    let currentdate = new Date(); 
    let month = (currentdate.getMonth()+1) + "/";
    let day = currentdate.getDate();
    day = day + ", ";
    let hour = currentdate.getHours() + ":";
    let minutes = currentdate.getMinutes() + "pm";
    let postTime = month + day + hour + minutes;

    const time = document.createElement('p');
    time.className = "text-end";
    time.innerHTML = postTime;
    howl.append(time);
    

    const message = document.createElement('h2');
    message.innerHTML = howlBox.value;
    message.className = "container py-5 text-break";
    message.style.backgroundColor = "white";
    message.style.color = "black";
    howl.append(message);
    // howlList.append(message);
    howlList.append(howl);

});