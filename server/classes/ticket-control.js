'use strict'
const fs = require('fs');

class Ticket{
    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
        
    }
}

class TicketControl {
    constructor(){
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        if(data.hoy === this.hoy){
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
        } else{
            this.reiniciarConteo();
        }
    }

    siguienteTicket() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);

        this.tickets.push(ticket);

        this.guardarArchivo();

        return `Ticket: ${this.ultimo}`
    }

    getUltimoTicket(){
        return `Ticket: ${this.ultimo}`;
    }

    getUltimos4(){
        return this.ultimos4;
    }

    atenderTikcet(escritorio){
        if(this.tickets.length == 0){
            return 'No hay tickets';
        }
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atender_ticket = new Ticket(numeroTicket, escritorio);;
        
        this.ultimos4.unshift(atender_ticket);

        if(this.ultimos4.length > 4){
            this.ultimos4.splice(-1,1); // Borra el último elemento
            
        }
        
        this.guardarArchivo();

        return atender_ticket;
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.guardarArchivo();
        this.tickets = [];
        this.ultimos4 = [];
    }

    guardarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
        
        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}