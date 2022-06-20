'use strict';
const express = require('express');
const secretStuffRouters=express.Router();
const bearerAuth=require('../middleware/bearer');
const logger=require("../middleware/logger");

secretStuffRouters.get('/secret',bearerAuth,(req,res)=>{
    res.status(200).json({
        'message': 'You are authorized to view the user orders',
        'user': req.user
    });})

secretStuffRouters.use(logger);

module.exports=secretStuffRouters;