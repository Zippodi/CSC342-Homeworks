import api from './APIClient.js';


const loggedInUser = localStorage.getItem('user');
const profilePicture = document.querySelector('#profilePic');
const username = document.querySelector('#Username');
const howlBox = document.querySelector('#howltextbox');
const howlList = document.querySelector('#howlList');
const linkButton = document.querySelector('#linkButton');
let user = JSON.parse(loggedInUser);
username.innerHTML = user.username;
profilePicture.src = user.avatar;




    api.getFollowedHowls(user.username).then(followedHowls => {
      followedHowls.sort(sorter);
      for (let z = 0; z < followedHowls.length; ++z) {

        api.getUserById(followedHowls[z].userId).then(follower => {
          const howl = document.createElement('div');
          howl.className = "container";
                  const pic = document.createElement('img');
                  pic.src = follower.avatar;
                  howl.append(pic);
                  howl.append(follower.first_name);
                  howl.append(" ");
                  howl.append(follower.last_name);
                  howl.append(" @");
                  howl.append(follower.username);
                  howl.style.backgroundColor = "orange";
                  howl.style.color = "white";
  
                  
                  let month = followedHowls[z].datetime.substring(5, 7) + "/";
                  let day = followedHowls[z].datetime.substring(8, 10);
                  day = day + ", ";
                  let hour = followedHowls[z].datetime.substring(11, 13) + ":";
                  let minutes = ""; 
                  if (parseInt(hour) < 12) {
                      minutes = followedHowls[z].datetime.substring(14, 16) + "am";
                  }   
                  else {
                      minutes = followedHowls[z].datetime.substring(14, 16) + "pm";
                  }
                  
                  let postTime = month + day + hour + minutes;
  
                  const time = document.createElement('p');
                  time.className = "text-end";
                  time.innerHTML = postTime;
                  howl.append(time);
                  
  
                  const message = document.createElement('h2');
                  message.innerHTML = followedHowls[z].text;
                  
                  message.className = "container py-5 text-break";
                  message.style.backgroundColor = "white";
                  message.style.color = "black";
                  howl.append(message);
                  
                  howlList.append(howl);
        })

       
      }
      
  
    }).catch((err) => {
  
      alert("Couldn't get howls.");
    });


  function sorter (a, b) {
    
    return a.datetime > b.datetime ? -1 : 1;
 };  
  

const howlButton = document.querySelector('#HowlButton');
howlButton.addEventListener('click', e => {
    let currentdate = new Date();
    let datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() + "T" + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds() + "Z";
    "2020-04-20T15:46:28Z"   
    api.postHowl(user.id, datetime, howlBox.value).then(howlObject => {
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
  
      let month = datetime.substring(5, 7) + "/";
      let day = howlObject.datetime.substring(8, 10);
      day = day + ", ";
      let hour = howlObject.datetime.substring(11, 13) + ":";
      let minutes = ""; 
      if (parseInt(hour) < 12) {
          minutes = howlObject.datetime.substring(14, 16) + "am";
      }   
      else {
          minutes = howlObject.datetime.substring(14, 16) + "pm";
      }
      
      let postTime = month + day + hour + minutes;
      const time = document.createElement('p');
      time.className = "text-end";
      time.innerHTML = postTime;
      howl.append(time);
      
  
      const message = document.createElement('h2');
      message.innerHTML = howlObject.text;
      message.className = "container py-5 text-break";
      message.style.backgroundColor = "white";
      message.style.color = "black";
      howl.append(message);
      
      howlList.prepend(howl);
      howlBox.value = "";


    }).catch((err) => {
  
      alert("Couldn't post howl.");
   });

});
