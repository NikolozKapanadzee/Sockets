const http = require("http")
const express = require("express")
const { Server } = require("socket.io")
const app = express
const server = http.createServer(app)

const io = new Server(server, {
    cors: "*"
})

io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);

    socket.on("echoReciver", (data) => {
        console.log(data, "(from echo message)");
        socket.emit("echoSender", data)
    })
    socket.on("groupChat", (data) => {
        // console.log(data, "(data from group chat)");
        // socket.broadcast.emit("groupChat", data)
        io.emit("groupChat", data)
    })
})



server.listen(4000, () => {
    console.log("server is running on port http://localhost:4000");
})