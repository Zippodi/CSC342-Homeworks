class HTTPClient {
    static get(url) {
      return fetch(url).then(res => {
        if(!res.ok) {
          throw new Error("error in request");
        }
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
  };