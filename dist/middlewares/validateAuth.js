"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("@/lib/jwt");
const http_status_codes_1 = require("http-status-codes");
exports.default = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token)
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send(http_status_codes_1.ReasonPhrases.UNAUTHORIZED);
        const decoded = await (0, jwt_1.verifyToken)(token, "access-token");
        res.locals.user = decoded;
        next();
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=validateAuth.js.map