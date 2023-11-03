import api from './APIClient.js';

const buttonSelect = document.querySelector('#submit');
const username = document.querySelector('#usernameBox');
const password = document.querySelector('#passwordBox');


buttonSelect.addEventListener('click', e => {
    api.logIn(username.value, password.value).then(userData => {
      document.location = "/";
    }).catch((err) => {
     
      if(err.status === 401) {
        errorBox.innerHTML = "Invalid username or password";
      }
      else {
        alert("Not a valid User.")
      }
    });
    
  });