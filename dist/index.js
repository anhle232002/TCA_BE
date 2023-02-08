"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const config_1 = __importDefault(require("./config"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./routes/auth"));
const error_handler_1 = require("./middlewares/error-handler");
const not_found_1 = __importDefault(require("./middlewares/not-found"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
dotenv_1.default.config();
app.use(express_1.default.json());
app.use("/api", auth_1.default);
app.use(not_found_1.default);
app.use(error_handler_1.errorHandler);
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
mongoose_1.default
    .connect(config_1.default.DATABASE_URL)
    .then(() => console.log("MongoDB Successfully Connected"))
    .catch((err) => console.log(err));
server.listen(config_1.default.PORT, () => {
    console.log(`-------Server is running on port ${config_1.default.PORT}-----`);
});
exports.default = app;
//# sourceMappingURL=index.js.map