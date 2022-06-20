"use strict"
const express = require('express');
const aclRouter=express.Router();
const bearer =require("../middleware/bearer");
const acl =require("../middleware/acl");


aclRouter.get("/img",bearer ,acl("read"),(req,res) =>{
    res.send("this is the new image");
});

aclRouter.post("/img",bearer ,acl("create"),(req,res) =>{
    res.send("new image was created");
});

aclRouter.put("/img",bearer ,acl("update"),(req,res) =>{
    res.send(" new image was updated");
});

aclRouter.delete("/img",bearer ,acl("delete"),(req,res) =>{
    res.send(" new image was deleted");
});

aclRouter.patch("/img",bearer ,acl("update"),(req,res) =>{
    res.send(" new image was updated with patch method");
});





module.exports = aclRouter;
