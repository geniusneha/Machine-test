const Sequelize = require('sequelize')
const sequelize = require('../config/dbconnect')

const Product = sequelize.define('product',{
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    image:{
        type: Sequelize.STRING,
        allowNull: false
    },
    price:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    date:{
        type: Sequelize.DATE,
        default: Date.now()
    }
    
})





module.exports = Product