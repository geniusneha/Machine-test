const Sequelize = require('sequelize')
const sequelize = require('../config/dbconnect')
// const Products = require('./productModel')

const Cart = sequelize.define('cart', {
    title:{
        type: Sequelize.STRING,
        allowNull: false,
    }
})

module.exports = Cart