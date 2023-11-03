const jwt = require('jsonwebtoken');
const base64url = require('base64url');
const crypto = require('crypto');

const TOKEN_COOKIE_NAME = "UserToken";

const API_SECRET = process.env.API_SECRET_KEY;


exports.TokenMiddleware = (req, res, next) => {
  
  let token = null;
  if(!req.cookies[TOKEN_COOKIE_NAME]) {
   
    const authHeader = req.get('Authorization');
    if(authHeader && authHeader.startsWith("Bearer ")) {
     
      token = authHeader.split(" ")[1];
    }
  }
  else { 
    token = req.cookies[TOKEN_COOKIE_NAME]; //Get session Id from cookie
  }

  if(!token) { 
    res.status(401).json({error: 'Not authenticated'});
    return;
  }

  

  try {
    
    req.user = decoded.user;
    next(); 
  }
  catch(err) { 
    res.status(401).json({error: 'Not authenticated'});
    return;
  }


}


exports.generateToken = (req, res, user) => {
  let data = {
    user: user,
   
    exp: Math.floor(Date.now() / 1000) + (60 * 60)
  }

  
  let header = JSON.stringify({
    "alg": "HS512",
    "typ": "JWT"
  });
  

  let header64 = base64url(header);
  let payload = JSON.stringify(data);
  let payload64 = base64url(payload);


  const hmac = crypto.createHmac('sha512', API_SECRET);
  
    hmac.update(header64 + "." + payload64, API_SECRET);

    let signature = hmac.digest('hex');


   const token = header64 + "." + payload64 + "." + signature; 

  
  res.cookie(TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    maxAge: 2 * 60 * 1000 
  });
};


exports.removeToken = (req, res) => {
  
  res.cookie(TOKEN_COOKIE_NAME, "", {
    httpOnly: true,
    secure: true,
    maxAge: -360000 
  });

}
