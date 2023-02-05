const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
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
const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map