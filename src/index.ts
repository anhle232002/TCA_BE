import express from "express";
import http from "http";
import { Server } from "socket.io";
import config from "./config";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("New user connected");

    // Listen for new message event from the client
    socket.on("newMessage", (message) => {
        console.log("New message:", message);
        // Broadcast the new message to all connected clients
        io.emit("newMessage", message);
    });

    // Listen for the user disconnect event
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(config.PORT, () => {
    console.log(`-------Server is running on port ${config.PORT}-----`);
});
