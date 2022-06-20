'use strict';
const {Users} = require("../model/index.model");
const base64 = require('base-64');
async function basicAuth(req,res,next){
  if(req.headers.authorization){
  let basicHeaderParts = req.headers.authorization.split(' ');  
  
  let encodedString = basicHeaderParts.pop();  
  let decodedString = base64.decode(encodedString);          
  let [username, password] = decodedString.split(':'); 
  Users.authenticateBasic(username, password)
  .then((validUser) => {
    console.log(validUser);
      req.user = validUser;
      
      next();
  })
  .catch((err) => {
      res.status(403);
      res.send("Invalid Signin");
  })
}
}

module.exports=basicAuth;