const Sequelize = require('sequelize')

const sequelize = new Sequelize('postgres','postgres','root',{
    host: 'localhost',
    dialect: 'postgres',
    define:{
        timestamps: false,
        createdAt: false,
        updatedAt: false
    },
    // logging: false
})

module.exports = sequelize