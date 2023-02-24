import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";

export const SocketErrorHandler = (socket: Socket, next: (err?: ExtendedError) => void) => {};
