"use strict";

module.exports =(recived)=>{
    return(req,res,next)=>{
    try{
        if(req.user.actions.includes(recived)){
            next();
        }
        else{
            next("Access Denied")
        }
    }
    catch(e){
        next("Invalid Signin")
    }
    }

}