const TicketList = require("./ticke-list");


class Sockets {

  constructor( io ) {
    this.io = io;
    //Instancia del ticketList
    this.ticketList = new TicketList()
    this.socketEvents();
  }

  socketEvents () {
    // On Connection
    this.io.on('connection', (socket) => {
      console.log('Cliente conectado');
      socket.on('solicitar-ticket', (_, callback) => {
        const nuevoTicket = this.ticketList.crearTicket()
        callback(nuevoTicket)
      })
      
      socket.on('siguiente-ticket-trabajar', ({agente, escritorio}, callback) => {        
        const suTicket = this.ticketList.asignarTicket(agente, escritorio)
        callback(suTicket)

        this.io.emit('ticket-asignado', this.ticketList.ultimo13 );
      })
    })
  }

}


module.exports = Sockets