const Sequelize = require('sequelize')
const sequelize = require('../config/dbconnect')
// const Cart = require('./cartModel')
const Product = require('./productModel')

const User = sequelize.define('user', {
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    role:{
        type: Sequelize.ENUM('admin','supervisor','customer'),
        defaultValue: 'customer'
    },
    date:{
        type: Sequelize.DATE,
        default: Date.now()
    }

})





// User.hasMany(Product, { foreignKey : 'proId' })
// Cart.belongsTo(User)


module.exports = User