import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import viewsRouter from "./src/routes/views.router.js";
import socketCb from "./src/routes/socket.router.js";
import __dirname from "./utils.js";


const server = express()
const port = 8080
const httpServer = server.listen(8080, () => {
    console.log(`Server running on port ${port}`)
})

// Socket.io
const socketServer = new Server(httpServer)

server.engine('handlebars', handlebars.engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname + '/src/views')
server.use(express.static(__dirname + '/src/public'))

server.use("/", viewsRouter)    


// Server Side
socketServer.on('connection', socketCb)


// Export socket server
export {socketServer}