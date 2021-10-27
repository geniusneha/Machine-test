const Sequelize = require('sequelize')
const sequelize = require('../config/dbconnect')
const Products = require('./productModel')

const Category = sequelize.define('category', {
    title:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})


Category.hasMany(Products, { foreignKey : 'categoryId' })
Products.belongsTo(Category)


module.exports = Category