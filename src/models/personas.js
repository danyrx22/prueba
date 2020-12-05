const { Model, DataTypes } = require('sequelize')
const sequelize = require('./../db')

class Personas extends Model {}

Personas.init({
    nombre: {
        type: DataTypes.STRING(100)
    },
    tipo_documento: {
        type: DataTypes.STRING(20)
    },
    num_documento: {
        type: DataTypes.STRING(20)
    },
    direccion: {
        type: DataTypes.STRING(70)
    },
    telefono: {
        type: DataTypes.STRING(20)
    },
    email: {
        type: DataTypes.STRING(50)
    },
    condicion: {
        type: DataTypes.TINYINT(1)
    },
}, {
    sequelize,
    modelName: 'Personas',
    tableName: 'personas_91'
})

module.exports = Personas