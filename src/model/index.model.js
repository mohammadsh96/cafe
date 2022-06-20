'use strict';
require('dotenv').config();
const drinksModel = require('./cafe.model');

const Collection = require('./collection');
const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('./user.model');


const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

let sequelizeOptions =
process.env.NODE_ENV === "production"
     ? {
         dialectOptions: {
            ssl: { require: true, rejectUnauthorized: false}
         },
     }
     : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);
const drinksTable = drinksModel(sequelize, DataTypes);

const userTable = UserModel(sequelize, DataTypes);



const drinksCollection = new Collection(drinksTable);


module.exports = {
    db: sequelize,
    drinks:drinksCollection,
    Users: userTable,
};