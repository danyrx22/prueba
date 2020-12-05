const { Model, DataTypes } = require('sequelize')
const sequelize = require('./../db')

class Articulos extends Model {}

Articulos.init({
    idcategoria: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    codigo: {
        type: DataTypes.STRING(50)
    },
    nombre: {
        type: DataTypes.STRING(100)
    },
    precio_venta: {
        type: DataTypes.FLOAT(11, 2)
    },
    stock: {
        type: DataTypes.INTEGER(11)
    },
    descripcion: {
        type: DataTypes.STRING(256)
    },
    condicion: {
        type: DataTypes.TINYINT(1)
    }
},{
    sequelize,
    modelName: 'Articulos',
    tableName: 'articulos_91'
})

module.exports = Articulos