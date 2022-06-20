"use strict" ;
const express = require('express');
const aclRouter=express.Router();
const bearer =require("../middlewear/bearer");
const acl =require("../middlewear/acl");


aclRouter.get("/img",bearer ,acl("read"),(req,res) =>{
    res.send("this is the new image");
});

aclRouter.post("/img",bearer ,acl("create"),(req,res) =>{
    res.send("the new image was created");
});

aclRouter.put("/img",bearer ,acl("update"),(req,res) =>{
    res.send("the new image was updated");
});

aclRouter.delete("/img",bearer ,acl("delete"),(req,res) =>{
    res.send("the new image was deleted");
});
aclRouter.patch("/img",bearer ,acl("update"),(req,res) =>{
    res.send(" image was updated using patch");
});



module.exports = aclRouter;