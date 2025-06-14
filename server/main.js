const http = require("http")
const express = require("express")
const { Server } = require("socket.io")
const connect = require("./db/connect")
const app = express
const server = http.createServer(app)
const chatSchema = require("./schema/chat")
connect()
const io = new Server(server, {
    cors: "*"
})
io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);
    socket.on("joinRoom", ({roomId, userEmail}) => {
        socket.join(roomId)
        console.log(`${userEmail} joined ${roomId}}`);
    })
    socket.on("privateMessage", async ({roomId, userEmail, message}) => {
        const chat = await chatSchema.create({roomId, userEmail, message})
        console.log("message saved", chat);
        io.to(roomId).emit("privateMessage", {roomId,userEmail,message})
    })
})
server.listen(4000, () => {
    console.log("server is running on port http://localhost:4000");
})