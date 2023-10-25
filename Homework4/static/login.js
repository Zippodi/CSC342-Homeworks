import api from './APIClient.js';

const buttonSelect = document.querySelector('#submit');
buttonSelect.addEventListener('click', e => {
  const usernameBox = document.querySelector('#usernameBox');
  api.login(usernameBox.value).then(userData => {
    localStorage.setItem('user', JSON.stringify(userData));
    console.log(localStorage.getItem('user'));
    document.location = "/howler";
  }).catch((err) => {

    console.log("error");
  });
  
});
