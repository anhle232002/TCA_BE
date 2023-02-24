import { verifyToken } from "@/lib/jwt";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";

export default async (socket: Socket, next: (err?: ExtendedError) => void) => {
    try {
        if (!socket.handshake.auth.token) throw Error("Must provide auth token");

        const user = (await verifyToken(socket.handshake.auth.token, "access-token")) as any;

        socket.data = { user };

        next();
    } catch (error) {
        next(error);
    }
};
