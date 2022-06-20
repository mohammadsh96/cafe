'use strict';
const drinks = (sequelize, DataTypes) => 
sequelize.define('coffeeHouse', {
    drinkName: {
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

module.exports = drinks;