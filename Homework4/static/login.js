import api from './APIClient.js';

const buttonSelect = document.querySelector('#submit');
buttonSelect.addEventListener('click', e => {
  const usernameBox = document.querySelector('#usernameBox');
  console.log(usernameBox.value);
  api.getUser(usernameBox.value);

  window.location.href = "/howler";
});
