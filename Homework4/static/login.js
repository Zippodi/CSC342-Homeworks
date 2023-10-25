import api from './APIClient.js';

const buttonSelect = document.querySelector('#submit');
buttonSelect.addEventListener('click', e => {
  const usernameBox = document.querySelector('#usernameBox');
  console.log(usernameBox.value);
  api.getUser(usernameBox.value).then(user => {
    console.log("From the server:", user);
    let userDetails = {
      username: user.username,
      avatar: user.avatar,
    }
    localStorage.setItem('loggedUser', userDetails);
    return user;
  });
  
  window.location.href = "/howler";
});
