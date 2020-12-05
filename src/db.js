const Sequelize = require('sequelize')

const sequelize = new Sequelize('ventasdany', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize