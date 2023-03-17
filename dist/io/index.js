"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = require("@/models/Message");
exports.default = (io) => {
    const onlineUsers = {};
    return (socket) => {
        // store online user
        onlineUsers[socket.data.user.id] = socket;
        console.log("New User : ", socket.id);
        socket.on("message", async (data) => {
            console.log("data", data);
            try {
                await Message_1.Message.create(data);
                const { to } = data;
                const receivedSocket = onlineUsers[to];
                if (receivedSocket) {
                    receivedSocket.emit("message", data);
                    console.log("sent");
                }
            }
            catch (error) {
                socket.emit("error", { message: "Cannot send message" });
            }
        });
        socket.on("disconnect", () => {
            delete onlineUsers[socket.data.user.id];
            console.log(`User ${socket.id} disconnected`);
        });
    };
};
//# sourceMappingURL=index.js.map