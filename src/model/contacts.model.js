'use strict';
const contacts = (sequelize, DataTypes) => 
sequelize.define('contacts', {
    cafeName: {
        type: DataTypes.STRING,
        required: true
    },
    phone: {
        type: DataTypes.STRING,
        required: true
    },
    email: {
        type: DataTypes.STRING,
        required: true
    },
    address: {
        type: DataTypes.STRING,
        required: true
    },
   
});

module.exports = contacts;