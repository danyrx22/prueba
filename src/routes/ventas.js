const { Router, query } = require('express')
const { Op, fn, col} = require('sequelize')
const ruta = Router()
const Ventas = require('./../models/ventas')
const DetalleV = require('./../models/detalle_ventas')
const Personas = require('./../models/personas')
const Productos = require('./../models/articulos')
const Users = require('./../models/users')

ruta.get('/', async (req, res) => {
    const ventas = await Ventas.findAll({
        include: [{
            model: Personas,
            attributes: ['nombre'],
            where: {
                tipo_documento: 'C'
            }
        }],
        attributes: ['id', [fn('date_format', col('fecha_hora'), '%d/%m/%Y %h:%i:%s'), 'fecha_hora'], 'tipo_comprobante', 'serie_comprobante', 'num_comprobante', 'impuesto', 'total', 'estado']
    })

    res.json(ventas)
})

ruta.post('/registrar', async (req, res) => {
    const { idcliente,  tipo_comprobante, serie_comprobante,num_comprobante, fecha, impuesto, total, articulos, cantidades, precios} = req.body

    const ventas= await Ventas.create({
        idcliente: idcliente,
        idusuario: 1,
        tipo_comprobante: tipo_comprobante,
        serie_comprobante: serie_comprobante,
        num_comprobante: num_comprobante,
       
        impuesto: impuesto,
        total: total,
        estado: 'Aprobado'
    })

    let i
    let status = true

    for(i = 0; i < articulos.length; i++){
      
        DetalleV.create({
            idventa: ventas.id,
            idarticulo: articulos[i],
            cantidad: cantidades[i],
            precio: precios[i],
            idventas: ventas.id
        }).catch((err) => {
            status = false
        })
    }

    if(status){
        res.json({message: 'Venta Registrada',  status: true})
    }else{
        res.json({message: 'Error al registrar algun detalla de la venta', status: false})
    }
})

ruta.get('/mostrar/:id', async (req, res) => {
    const ventas = await Ventas.findAll({
        include: [{
            model: DetalleV,
            include: [{
                model: Productos,
                attributes: ['id', 'codigo', 'nombre']
            }]
        }],
        where: {
            id: req.params.id
        }
    })

    res.json(ventas)
})

ruta.patch('/anular/:id',  async (req, res) => {
    const ventas = await Ventas.findByPk(req.params.id)

    ventas.update({
        estado: 'Anulado'
    }).then(() => {
        res.json({message: 'Ventas Anulado ', status: true})
    }).catch(err => {
        res.json({message: 'Error al anular el Ventas: '+err.message, status: false})
    })
})

ruta.get('/buscar/:datos', async (req, res) => {
    const ventas = await Ventas.findAll({
        include: [{      
            model: Personas,
            where: {
                nombre:{
                    [Op.startsWith]: req.params.datos
                } 
            }
        }]
    })
    
    res.json(ventas)
})

ruta.get('/lista_cliente', async (req, res) => {
    const clientes = await Personas.findAll({
        include: [{
            model: Users,
            
        }],
        where: {
            tipo_documento: 'C', condicion: 0
        }
    })

    res.json(clientes)
})

ruta.get('/listaproductos', async (req, res) => {
    const productos = await Productos.findAll({
        where: {
            condicion: 0
        }
    })

    res.json(productos)
})

ruta.get('/producto/:id', async (req, res) => {
    const producto = await Productos.findByPk(req.params.id)
    res.json(producto)
})

module.exports = ruta