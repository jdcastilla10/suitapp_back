const express = require('express')
var cors = require('cors')
const connection = require('../db/connection')
const bodyParser = require('body-parser');

class Server {

    constructor(){
        process.env.TZ = 'America/Bogota';
        this.app=express()
        this.port=process.env.PORT || 3000
        this.authPath='/api/auth'
        this.usuariosPath='/api/usuario'
        this.votantesPath='/api/votantes'
        this.lideresPath='/api/lideres'
        
        this.dbConnection()

        //middlewares
        this.middlewares()

        this.routes()
    }

    dbConnection(){
        connection
    }
    routes(){

        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
        this.app.use(this.votantesPath, require('../routes/votantes'))
        this.app.use(this.lideresPath, require('../routes/lideres'))
    }

    lisen(){
        const server=this.app.listen( this.port, '0.0.0.0', ()=>{
            console.log('Servidor en el puerto',this.port)
        })
        process.on('SIGINT', () => {
            console.log('Cerrando el servidor...');
            server.close(() => {
              console.log('Servidor cerrado.');
              process.exit(0);
            });
          });
    }

    middlewares(){

        //Cors
        this.app.use(cors())
        //directorio publico
        this.app.use( express.static('public'))

        this.app.use(express.json({ limit: '500mb' }))
        //Lectura y parseo del Meddleware
        this.app.use(bodyParser.json());
        this.app.disable('etag')
    }

}

module.exports= Server;