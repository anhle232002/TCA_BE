import { Message as TMessage } from "@/dto/message";
import { Message } from "@/models/Message";
import { Server, Socket } from "socket.io";

export default (io: Server) => {
    const onlineUsers: Record<string, Socket> = {};

    return (socket: Socket) => {
        // store online user
        onlineUsers[socket.data.user.id] = socket;

        console.log("New User : ", socket.id);

        socket.on("message", async (data: TMessage) => {
            console.log("data", data);
            try {
                await Message.create(data);

                const { to } = data;

                const receivedSocket = onlineUsers[to];

                if (receivedSocket) {
                    receivedSocket.emit("message", data);
                    console.log("sent");
                }
            } catch (error) {
                socket.emit("error", { message: "Cannot send message" });
            }
        });

        socket.on("disconnect", () => {
            delete onlineUsers[socket.data.user.id];
            console.log(`User ${socket.id} disconnected`);
        });
    };
};
