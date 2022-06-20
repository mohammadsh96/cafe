'use strict';
const {users} = require("../model/user.model");
async function bearer(req, res, next) {
    if (req.headers.authorization) {
        // console.log(req.headers.authorization);
        const bearerToken = req.headers.authorization.split(" ")[1];
        users.authenticateBearer(bearerToken)
            .then((userData) => {
                req.user = userData;
                next();
            })
            .catch(() => {
                res.status(403);
                res.send("Invalid Signin");
            })
    }
}

module.exports = bearer;
