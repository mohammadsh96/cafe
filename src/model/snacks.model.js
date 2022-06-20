'use strict';
const snacksModel = (sequelize, DataTypes) => 
sequelize.define('snacks', {
    snackName: {
        type: DataTypes.STRING,
        required: true
    },
    status: {
        type: DataTypes.STRING,
        required: true
    },
    ingrediants: {
        type: DataTypes.STRING,
        required: true
    },
    size: {
        type: DataTypes.STRING,
        required: true
    },
    price: {
        type: DataTypes.STRING,
        required: true
    }
});

module.exports = snacksModel;