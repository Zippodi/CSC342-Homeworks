const handleError = (res) => {
  if(!res.ok) {
    let error = new Error(res.statusText);
    error.status = res.status;
    throw error;
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
    
    getCurrentUser: () => {
        return HTTPClient.get('/api/users/current');
      },
    
    logIn: (username, password) => {
        let data = {
          username: username,
          password: password
        }
        return HTTPClient.post('/api/users/login', data);
    },
    
    logOut: () => {
        return HTTPClient.post('/api/users/logout', {});
    }



    
  };