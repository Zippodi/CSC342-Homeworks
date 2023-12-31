import api from './APIClient.js';


const loggedInUser = localStorage.getItem('user');
const profilePicture = document.querySelector('#profilePic');
const username = document.querySelector('#Username');
const fullName = document.querySelector('#userprofileName');
const followButton = document.querySelector('#followButton');

const followsList = document.querySelector('#followsContainer > #followsList');
const followsSelectButton = document.querySelector('#followsContainer > #followSelectButton');
const userProfileUserName = document.querySelector('#userProfileUsername');
const userProfilePic = document.querySelector('#userprofilePic');
let user = JSON.parse(loggedInUser);
username.innerHTML = user.username;
profilePicture.src = user.avatar;





const query = window.location.search;
let parameters = new URLSearchParams(query);
let profileUsername = parameters.get('username');

api.getFollows(profileUsername).then(returnedFollows => {

    for (let m = 0; m < returnedFollows.length; ++m) {
        let followedUser = document.createElement('option');
        followedUser.text = returnedFollows[m];
        followedUser.value = returnedFollows[m];
        followsList.appendChild(followedUser);
        
    }



}).catch((err) => {
  
    alert("Couldn't get followers.");
    
});


followsSelectButton.addEventListener('click', e => {
    let selectedValue = followsList.options[followsList.selectedIndex].value;
    document.location = "/userprofile?username=" + selectedValue;
});




api.getUser(profileUsername).then(returnedUser => {
    userProfilePic.src = returnedUser.avatar;
    fullName.innerHTML = returnedUser.first_name + " " + returnedUser.last_name;
    //lastName.innerHTML = returnedUser.last_name;
    userProfileUserName.innerHTML = "@" + returnedUser.username;
    
    if (returnedUser.username == user.username) {
        followButton.style.visibility = "hidden";
    }

    api.getFollows(user.username).then(followedUsers => {
        console.log(followedUsers);
        for (let b = 0; b < followedUsers.length; ++b) {
            if (followedUsers[b] == returnedUser.username) {
                followButton.innerHTML = "Unfollow";
                break;
            }

        }

        followButton.addEventListener('click', e => {
            if (followButton.innerHTML == "Unfollow") {
                api.unfollowUser(returnedUser, user).then(unfollowedUser => {
                    console.log(unfollowedUser);
                }).catch((err) => {
  
                alert("Couldn't unfollow User");
                
                });


                followButton.innerHTML = "Follow";
            }
            else {
                api.followUser(returnedUser, user).then(followedUser => {
                    console.log(followedUser);
                }).catch((err) => {
  
                alert("Couldn't follow User");
                
                });
                followButton.innerHTML = "Unfollow";
            }


        });

    }).catch((err) => {
  
    alert("Couldn't get followed.");
    
    });


    


}).catch((err) => {
  
    alert("Couldn't get user.");
});





api.getHowls(profileUsername).then(returnedHowls => {
    returnedHowls.sort(sorter);
    for (let i = 0; i < returnedHowls.length; ++i) {
        api.getUser(profileUsername).then(returnedUser => {
    
            const howl = document.createElement('div');
            howl.className = "container";
            const pic = document.createElement('img');
            pic.src = returnedUser.avatar;
            howl.append(pic);
            howl.append(returnedUser.first_name);
            howl.append(" ");
            howl.append(returnedUser.last_name);
            howl.append(" @");
            howl.append(returnedUser.username);
            
            howl.style.backgroundColor = "#050f42";
            howl.style.color = "white";

            
            let month = returnedHowls[i].datetime.substring(5, 7) + "/";
            let day = returnedHowls[i].datetime.substring(8, 10);
            day = day + ", ";
            let hour = returnedHowls[i].datetime.substring(11, 13) + ":";
            let minutes = ""; 
            if (parseInt(hour) < 12) {
                minutes = returnedHowls[i].datetime.substring(14, 16) + "am";
            }   
            else {
                minutes = returnedHowls[i].datetime.substring(14, 16) + "pm";
            }
            
            let postTime = month + day + hour + minutes;

            const time = document.createElement('p');
            time.className = "text-end";
            time.innerHTML = postTime;
            howl.append(time);
            

            const message = document.createElement('h2');
            message.innerHTML = returnedHowls[i].text;
            
            message.className = "container py-5 text-break";
            message.style.backgroundColor = "white";
            message.style.color = "black";
            howl.append(message);
            
            howlList.append(howl);
    


        }).catch((err) => {
          
            alert("Couldn't get howls.");
        });       
               
    }


}).catch((err) => {
  
    alert("Couldn't get howls.");
});


function sorter (a, b) {
    
    return a.datetime > b.datetime ? -1 : 1;
 };  





