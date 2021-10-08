// Servidor de express
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require('path');
const Sockets = require('./Sockets');
const cors = require('cors')

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Http server
    this.server = http.createServer(this.app)

    // Configuracion de Sockets
    this.io = socketio(this.server, {cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }});

    // Inicializar sokets
    this.sockets = new Sockets( this.io );
  }

  middelwares () {
    this.app.use( express.static( path.resolve(__dirname, '../public') ) )
    // CORS
    this.app.use( cors() )

    //Get de los ultimos tickets
    this.app.get('/ultimos', (req, res) => {
      res.json({
        ok: true,
        ultimos: this.sockets.ticketList.ultimo13
      })
    })

  }

  execute() {
    // inicializar middelwares()
    this.middelwares();

    // Inicializar Server
    this.server.listen(this.port, () => {
      console.log('Server corriendo en 8080', this.port);
    });
  }

}


module.exports = Server
