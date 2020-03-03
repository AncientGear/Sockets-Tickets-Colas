const { io } = require('../server');
const {TicketControl} = require('../classes/ticket-control');
const fs = require('fs');

let ticketControl = new TicketControl();
io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguienteTicket();
        
        callback(siguiente);
    })

    // Emitir un evento estadoActual
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    })

    client.on('atenderTicket', (data, callback) => {
        if(!data.escritorio){
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTikcet(data.escritorio);
        
        callback(atenderTicket);

        // Notificar cambios en los ultimos 4
        // emitir 'ultimos 4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        })
        
    })
});

