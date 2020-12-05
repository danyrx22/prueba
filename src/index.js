const express = require('express')
const sequelize = require('./db')
const path = require('path')
const server = express()
const port = process.env.PORT || 3000

require('./models/asociaciones')

//middlewares

server.use(express.urlencoded({extended:false}))
server.use(express.json())

//Rutas 

server.get('/api', (req, res) => {
    res.send('Bienvenido esta funcionando el servidor')
})

server.use('/api-categorias', require('./routes/categorias'))
server.use('/api-articulos', require('./routes/articulos'))
server.use('/api-ventas', require('./routes/ventas'))
server.use('/api-clientes', require('./routes/clientes'))
server.use('/api-usuarios', require('./routes/users'))
server.use('/api-rol', require('./routes/rol'))

//Archivos estaticos

server.use(express.static(path.join(__dirname, 'public')))

server.listen(port, () => {
    sequelize.sync({force: false})
        .then(() => {
            console.log('Conectado a la base de datos')
        })
        .catch(err => {
            console.log(err.message)
        })

    console.log('Se esta ejecutando el servidor en: http://localhost:'+port)
})



