import { Message as TMessage } from "@/dto/message";
import { Conversation } from "@/models/Conversation";
import { Message } from "@/models/Message";
import { TTypingStatus } from "@/types";
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
                if (!data.conversationId) {
                    const newConversation = await Conversation.create({
                        members: [data.from, data.to],
                    });
                    data.conversationId = newConversation._id.toString();
                    console.log("data 2", data);
                }

                await Message.create(data);

                const { to } = data;

                const receivedSocket = onlineUsers[to];

                if (receivedSocket) {
                    receivedSocket.emit("message", data);
                    console.log("sent");
                }
            } catch (error) {
                socket.emit("error", { message: "Cannot send message" });
                console.log(error);
            }
        });

        socket.on("typing", async (data: TTypingStatus) => {
            try {
                console.log(data);

                const receivedSocket = onlineUsers[data.to];
                if (receivedSocket) {
                    receivedSocket.emit(`typing/${data.conversationId}`, data);
                    console.log("sent");
                }
            } catch (error) {
                socket.emit("error", { message: "Listen to conversation failed" });
                console.log(error);
            }
        });

        socket.on("disconnect", () => {
            delete onlineUsers[socket.data.user.id];
            console.log(`User ${socket.id} disconnected`);
        });
    };
};
