const { Model, DataTypes } = require('sequelize')
const sequelize = require('./../db')

class Users extends Model {}

Users.init({
    usuario: {
        type: DataTypes.STRING(191)
    },
    password: {
        type: DataTypes.STRING(191)
    },
    condicion: {
        type: DataTypes.TINYINT(1)
    },
    idrol: {
        type: DataTypes.INTEGER(10),
       // allowNull: false,
    //   validate: {
    //  /      notEmpty: true
    //    }
    }
},{
    sequelize,
    modelName: 'Users',
    tableName: 'users_91'
})

module.exports = Users