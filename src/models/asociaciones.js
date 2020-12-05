const Articulos = require('./../models/articulos')
const Categorias = require('./../models/categorias')
const DetalleI = require('./../models/detalle_ventas')
const ventas = require('./../models/ventas')
const Personas = require('./../models/personas')
const Roles = require('./../models/roles')
const Users = require('./../models/users')

Categorias.hasMany(Articulos, {foreignKey: 'idcategoria'})
Articulos.belongsTo(Categorias, {foreignKey: 'idcategoria'})

Articulos.hasMany(DetalleI, {foreignKey: 'idarticulo'})
DetalleI.belongsTo(Articulos, {foreignKey: 'idarticulo'})

ventas.hasOne(DetalleI, {foreignKey: 'idventas'})
DetalleI.belongsTo(ventas, {foreignKey: 'idventas'})

Users.hasMany(ventas, {foreignKey: 'idusuario'})
ventas.belongsTo(Users, {foreignKey: 'idusuario'})

Personas.hasMany(ventas, {foreignKey: 'idcliente'})
ventas.belongsTo(Personas, {foreignKey: 'idcliente'})

Personas.hasOne(Users, {foreignKey: 'id'})
Users.belongsTo(Personas, {foreignKey: 'id'})

Roles.hasOne(Users, {foreignKey: 'idrol'})
Users.belongsTo(Roles, {foreignKey: 'idrol'})