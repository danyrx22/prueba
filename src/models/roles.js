const { Model, DataTypes } = require('sequelize')
const sequelize = require('./../db')

class Roles extends Model {}

Roles.init({
    nombre: {
        type: DataTypes.STRING(30)
    },
    descripcion: {
        type: DataTypes.STRING(100)
    },
    condicion: {
        type: DataTypes.TINYINT(1)
    }
}, {
    sequelize,
    modelName: 'Roles',
    tableName: 'roles_91'
})

module.exports = Roles