const handleError = (res) => {
  if(!res.ok) {
    if(res.status == 401) {
      localStorage.removeItem('user');
      document.location = '/';
      throw new Error("Unauthenticated");
    }
    else {
      throw new Error("Error")
    }
  }
  return res;
};



class HTTPClient {
    static get(url) {
      return fetch(url).then(res => {
        if(!res.ok) {
          throw new Error("error in request");
        }
        return res.json();
      });
    }

    static post(url, data) {
      return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(handleError).then(res => {
        return res.json();
      });
    }
    
  }



  export default {
    getUser: (username) => {
        return HTTPClient.get(`/api/getuser/${username}`).then(users => {
          console.log("From the server:", users);
          return users;
        });
      },
    login: (username) => {
      let data = {
        username: username
      }
      return HTTPClient.post(`/api/authenticate/${username}`, data).then(users => {
        console.log("From the server:", users);
        return users;
      });
    },
  };