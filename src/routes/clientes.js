const { Router } = require('express')
const ruta = Router()
const { Op } = require('sequelize')
const Users = require('../models/users')
const Personas = require('./../models/personas')

ruta.get('/', async (req, res) => {
    const personas = await Personas.findAll({
        where: {
            tipo_documento: 'C'
        }
    })

    res.json(personas)
})

ruta.post('/registrar', async (req, res) => {
    const { nombre, num_documento, direccion, telefono, email} = req.body

    Personas.create({
        nombre: nombre,
        tipo_documento: 'C',
        num_documento: num_documento,
        direccion: direccion,
        telefono: telefono,
        email: email,
        condicion: 0,
    }).then(() => {
        res.json({message: ' Registro Exitoso', status: true})
    }).catch(err => {
        res.json({message: 'Fallo registro del cliente: '+err.message})
    })
})

ruta.get('/mostrar/:id', async (req, res) => {
    const cliente = await Personas.findByPk(req.params.id)
    res.json(cliente)
})

ruta.patch('/actualizar/:id', async (req, res) => {
    const { id,nombre, num_documento, direccion, telefono, email } = req.body
    const cliente = await Personas.findByPk(req.params.id)

    cliente.update({
        id: id,
        nombre: nombre,
        num_documento: num_documento,
        direccion: direccion,
        telefono: telefono,
        email: email,
    }).then(() => {
        res.json({message: 'Cliente editado', status: true})
    }).catch(err => {
        res.json({message: 'Error al actualizar: '+ err.message})
    })
})

ruta.patch('/desactivar/:id', async (req, res) => {
    const cliente = await Personas.findByPk(req.params.id)

    cliente.update({
        condicion: 1
    }).then(() => {
        res.json({message: 'Cliente deshabilitado ', status: true})
    }).catch(err => {
        res.json({message: 'Cliente no se pudo deshabilitar : '+err.message})
    })
})

ruta.patch('/activar/:id', async (req, res) => {
    const cliente = await Personas.findByPk(req.params.id)

    cliente.update({
        condicion: 0
    }).then(() => {
        res.json({message: 'Cliente habilitado', status: true})
    }).catch(err => {
        res.json({message: 'Cliente no se pudo habilitar'})
    })
})

ruta.get('/buscar/:clientes',  async (req, res) => {
    const cliente = await Personas.findAll({
       where: {
            [Op.or]: {
                num_documento: {
                    [Op.startsWith]: req.params.clientes,
                },
                nombre: {
                    [Op.startsWith]: req.params.clientes
                }
            },
           [Op.and]: {
                tipo_documento: 'C'
            }
        }
    })

    res.json(cliente)
})

module.exports = ruta