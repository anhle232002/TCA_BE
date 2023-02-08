import express from "express";
import http from "http";
import { Server } from "socket.io";
import config from "./config";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth";
import { errorHandler } from "./middlewares/error-handler";
import notFound from "./middlewares/not-found";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
dotenv.config();

app.use(express.json());
app.use("/api", authRoute);
app.use(notFound);
app.use(errorHandler);

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

mongoose
    .connect(config.DATABASE_URL)
    .then(() => console.log("MongoDB Successfully Connected"))
    .catch((err) => console.log(err));

server.listen(config.PORT, () => {
    console.log(`-------Server is running on port ${config.PORT}-----`);
});

export default app;
