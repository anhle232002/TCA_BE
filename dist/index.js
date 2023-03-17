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
const conversation_1 = __importDefault(require("./routes/conversation"));
const users_1 = __importDefault(require("./routes/users"));
const translate_1 = __importDefault(require("./routes/translate"));
const error_handler_1 = require("./middlewares/error-handler");
const not_found_1 = __importDefault(require("./middlewares/not-found"));
const io_1 = __importDefault(require("./io"));
const socketValidateAuth_1 = __importDefault(require("./middlewares/socketValidateAuth"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
    },
});
dotenv_1.default.config();
app.use((0, cors_1.default)({ origin: "http://localhost:5173", credentials: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/api", auth_1.default);
app.use("/api", users_1.default);
app.use("/api", conversation_1.default);
app.use("/api", translate_1.default);
app.use(not_found_1.default);
app.use(error_handler_1.errorHandler);
io.use(socketValidateAuth_1.default).on("connection", (0, io_1.default)(io));
mongoose_1.default
    .connect(config_1.default.DATABASE_URL)
    .then(() => console.log("MongoDB Successfully Connected"))
    .catch((err) => console.log(err));
server.listen(config_1.default.PORT, () => {
    console.log(`-------Server is running on port ${config_1.default.PORT}-----`);
});
exports.default = app;
//# sourceMappingURL=index.js.map