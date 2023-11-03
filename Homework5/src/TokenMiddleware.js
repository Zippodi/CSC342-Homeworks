const base64url = require('base64url');
const crypto = require('crypto');

const TOKEN_COOKIE_NAME = "UserToken";

// const API_SECRET = process.env.API_SECRET_KEY;
const API_SECRET = "60d0954e20eaa0c02b382171c33c53bc18522cc6d4805eaa02e182b0";


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
    //const decoded = jwt.verify(token, API_SECRET)
    let header64 = token.split(".")[0];
    let payload64 = token.split(".")[1];
    let signature64 = token.split(".")[2];
    let payload = base64url.decode(payload64);
   
    //use hmac to repeat the process of encoding the token
    //to see if the signature is accurate to the result 
    //of that process.
    const hmac = crypto.createHmac('sha512', API_SECRET);
    hmac.update(header64 + "." + payload64, API_SECRET);
    let whatSignatureShouldBe = hmac.digest('base64url');
    if (signature64 != whatSignatureShouldBe) {
       throw(err);
    }
    
    let decoded = JSON.parse(payload);
    //check if we have passed our expiration time AKA an hour has passed.
    if (Math.floor(Date.now() / 1000) >= decoded.exp) {
        throw(err);
    }
    req.user = decoded;
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

    let signature = hmac.digest('base64url');


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
