const { Model, DataTypes } = require('sequelize')
const sequelize = require('./../db')

class Categorias extends Model {}

Categorias.init({
    nombre: {
        type: DataTypes.STRING(10)
    },
    descripcion: {
        type: DataTypes.STRING(256)
    },
    condicion: {
        type: DataTypes.TINYINT(1)
    }
},{
    sequelize,
    modelName: 'Categorias',
    tableName: 'categorias_91'
})

module.exports = Categorias