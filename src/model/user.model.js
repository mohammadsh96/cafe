'use strict';

require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.API_SECRET || "mohammadsh";

const UserModel = (sequelize, DataTypes) => {
    const model = sequelize.define("x", {
        username: { type: DataTypes.STRING, required: true, unique: true },
        password: { type: DataTypes.STRING, required: true },
        role: { type: DataTypes.ENUM('user', 'writer', 'editor', 'admin'), required: true, defaultValue: 'user' },
        token: {
          type: DataTypes.VIRTUAL,
          get() {
            return jwt.sign({ username: this.username }, SECRET);
          },
          set(tokenObj) {
            let token = jwt.sign(tokenObj, SECRET);
            return token;
          }
        },
        actions: {
          type: DataTypes.VIRTUAL,
          get() {
            const acl = {
              user: ['read'],
              writer: ['read', 'create'],
              editor: ['read', 'create', 'update'],
              admin: ['read', 'create', 'update', 'delete']
            };
            return acl[this.role];
          }
        }
      });

        model.authenticateBasic = async function (username, password) {
            // console.log(username, password);
            const user = await this.findOne({ where: { username: username } });
            // console.log(user);

            const valid = await bcrypt.compare(password, user.password);
            if (!valid)
            
            { 
          console.log("hi");
                return user; }
            throw new Error('Invalid User');
          };
        
          model.authenticateBearer = async function (token) {
            try {
              const parsedToken = jwt.verify(token, SECRET);
              const user = this.findOne({ where: { username: parsedToken.username } });
              if (user) { return user; }
              throw new Error("User Not Found");
            } catch (e) {
              throw new Error(e.message)
            }
          };

return model;
};



module.exports = UserModel;