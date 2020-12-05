const { Router } = require('express')
const ruta = Router()
const { Op } = require('sequelize')
const Users = require('./../models/users')
const Personas = require('./../models/personas')
const Roles = require('./../models/roles')

ruta.get('/', async (req, res) => {
    const usuarios = await Personas.findAll({
        include: [{
            model: Users,
            include: [{
                model: Roles,
            }]
        }],
        where: {
            tipo_documento: 'U'
        }
    })

    res.json(usuarios)
})

ruta.post('/registrar', async (req, res) => {
    const { nombre, num_documento, direccion, telefono, email, usuario, password, rol } = req.body

    Personas.create({
        nombre: nombre,
        tipo_documento: 'U',
        num_documento: num_documento,
        direccion: direccion,
        telefono: telefono,
        email: email,
    }).then(persona => {
        Users.create({
            id: persona.id,
            usuario: usuario,
            password: password,
            condicion: 0,
            idrol: rol
        }).then(() => {
            res.json({message: 'Usuario Registrado !!', status: true})
        }).catch(err => {
            res.json({message: 'Error al registrar el usuario: '+err.message})
        })
    }).catch(err => {
        res.json({message: 'Error al registrar el usuario: '+err.message})
    })
})

ruta.get('/mostrar/:id', async (req, res) => {
    const usuario = await Personas.findByPk(req.params.id, {
        include: [{
            model: Users
        }]
    })
    res.json(usuario)
})

ruta.patch('/actualizar/:id', async (req, res) => {
    const { nombre, num_documento, direccion, telefono, email, usuario, password, rol } = req.body
    const persona = await Personas.findByPk(req.params.id)
        


    persona.update({
        num_documento: num_documento,
        nombre: nombre,
        direccion: direccion,
        telefono: telefono,
        email: email
        
    }).then(async persona => {
        const user = await Users.findByPk(req.params.id)

        user.update({
            usuario: usuario,
            password: password,
            idrol: rol
        }).then(()=>{
            res.json({status: true})
        }).catch(() => {
            res.json({status: false})
        })
        
        
    }).catch(() => {
        res.json({status: false})
    })
})

ruta.patch('/desactivar/:id', async (req, res) => {
    const usuario = await Users.findByPk(req.params.id)

    usuario.update({
        condicion: 1
    }).then(() => {
        res.json({message: 'Usuario deshabilitado', status: true})
    }).catch(err => {
        res.json({message: 'Error al deshabilitar el usuario'})
    })
})

ruta.patch('/activar/:id', async (req, res) => {
    const usuario = await Users.findByPk(req.params.id)

    usuario.update({
        condicion: 0
    }).then(() => {
        res.json({message: 'Usuario habilitado', status: true})
    }).catch(err => {
        res.json({message: 'Error al habilitar el usuario'})
    })
})

ruta.get('/buscar/:usuario',  async (req, res) => {
    const usuarios = await Personas.findAll({
        include: Users,
        where: {
           [Op.or]: {
                num_documento: {
                    [Op.startsWith]: req.params.usuario,
                },
               nombre: {
                    [Op.startsWith]: req.params.usuario
           }
        },
            [Op.and]: {
                tipo_documento: 'U'
            }
        }
    })

    res.json(usuarios)
})


ruta.get('/roles', async(req, res) => {
    const roles = await Roles.findAll({
        attributes: ['id', 'nombre']
    })

    res.json(roles)
})


module.exports = ruta



