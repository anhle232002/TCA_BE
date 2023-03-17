"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const joi_1 = require("joi");
const jsonwebtoken_1 = require("jsonwebtoken");
const errorHandler = (err, req, res, next) => {
    console.log(err);
    if (err instanceof joi_1.ValidationError) {
        return res.status(500).json({ errors: err.details.map((e) => e.message) });
    }
    if (err instanceof jsonwebtoken_1.TokenExpiredError) {
        return res.status(401).json({ message: "Token expired" });
    }
    res.status(err.statusCode || 500).json({
        error: err.message || http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map