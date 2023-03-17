"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("@/lib/jwt");
exports.default = async (socket, next) => {
    try {
        if (!socket.handshake.auth.token)
            throw Error("Must provide auth token");
        const user = (await (0, jwt_1.verifyToken)(socket.handshake.auth.token, "access-token"));
        socket.data = { user };
        next();
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=socketValidateAuth.js.map