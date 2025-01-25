import { socketServer } from "../../server.js";

let messages = [];

export default (socket) => {
    console.log('New connection' + socket.id)

    socket.on('authenticated', user => {
        console.log('User authenticated: ' + user)

        // Event 1. Para que el usuario recien conectado pueda ver los mensajes anteriores
        socket.emit('messageLogs', messages)

        // Event 2. Para que los demas usuarios vean que un nuevo usuario se conecto
        socket.broadcast.emit('newUserConnected', user)
    })

    // Escribo todo el codigo correspondiente
    socket.on('message', data => {
        messages.push(data)

        // Evento 3. Para que aparezca en el chat de TODOS los usuarios conectados
        socketServer.emit('messageLogs', messages)
    })
    
}