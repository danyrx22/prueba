const { Router } = require('express')
//const { Op } = require('sequelize')
const ruta = Router()
const Rol = require('./../models/roles')

ruta.get('/', async (req, res) => {
    const roles = await Rol.findAll()

    res.json(roles)
})


ruta.get('/lista-roles', async (req, res) => {

    
  const roles = await Rol.findAll({
        where: {
            condicion: 0
        }
    })
    res.json(roles)

})

module.exports = ruta