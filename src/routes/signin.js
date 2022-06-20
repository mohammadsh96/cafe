'use strict';
const express = require('express');
const signinRouters=express.Router();
const basicAuth=require('../middleware/basic');
const logger=require("../middleware/logger");
// const {users}=require('../model/index.model');
signinRouters.use(logger);

signinRouters.post('/signin', basicAuth, (req, res) => {
    const user = {
      user: req.user,
      token: req.user.token
    };
    res.status(200).json(user);
  });
  
module.exports=signinRouters;