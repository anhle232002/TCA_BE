"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const config_1 = __importDefault(require("@/config"));
const jsonwebtoken_1 = require("jsonwebtoken");
const generateAccessToken = (payload) => {
    return (0, jsonwebtoken_1.sign)(payload, config_1.default.ACCESS_TOKEN_SECRET, { expiresIn: config_1.default.ACCESS_TOKEN_EXP });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload) => {
    return (0, jsonwebtoken_1.sign)(payload, config_1.default.REFRESH_TOKEN_SECRET, { expiresIn: config_1.default.REFRESH_TOKEN_EXP });
};
exports.generateRefreshToken = generateRefreshToken;
const verifyToken = (token, type) => {
    return (0, jsonwebtoken_1.verify)(token, type === "access-token" ? config_1.default.ACCESS_TOKEN_SECRET : config_1.default.REFRESH_TOKEN_SECRET);
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.js.map