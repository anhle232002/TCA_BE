import express from "express";
import http from "http";
import { Server } from "socket.io";
import config from "./config";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth";
import conversationRoute from "./routes/conversation";
import usersRoute from "./routes/users";
import translateRoute from "./routes/translate";
import { errorHandler } from "./middlewares/error-handler";
import notFound from "./middlewares/not-found";
import ioHandler from "./io";
import socketValidateAuth from "./middlewares/socketValidateAuth";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5002", "http://192.168.0.111:5002"],
        methods: ["GET", "POST"],
        credentials: true,
    },
});
dotenv.config();

app.use(
    cors({ origin: ["http://localhost:5002", "http://192.168.0.111:5002"], credentials: true })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api", authRoute);
app.use("/api", usersRoute);
app.use("/api", conversationRoute);
app.use("/api", translateRoute);
app.use(notFound);
app.use(errorHandler);

io.use(socketValidateAuth).on("connection", ioHandler(io));

mongoose
    .connect(config.DATABASE_URL)
    .then(() => console.log("MongoDB Successfully Connected"))
    .catch((err) => console.log(err));

server.listen(config.PORT, () => {
    console.log(`-------Server is running on port ${config.PORT}-----`);
});

export default app;
