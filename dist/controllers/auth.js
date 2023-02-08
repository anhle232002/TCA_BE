"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.login = void 0;
const User_1 = require("@/models/User");
const bcrypt_1 = require("bcrypt");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jwt_1 = require("@/lib/jwt");
const http_status_codes_1 = require("http-status-codes");
exports.login = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User_1.User.findOne({ username }).lean();
    if (!user)
        return next(Error("User does not exist"));
    const isMatch = await (0, bcrypt_1.compare)(password, user.password);
    if (!isMatch)
        return next(Error("Incorrect password"));
    const payload = { id: user._id, username: user.username, fullName: user.fullName };
    const accessToken = (0, jwt_1.generateAccessToken)(payload);
    const refreshToken = (0, jwt_1.generateRefreshToken)(payload);
    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    res.status(200).json({ user: payload, accessToken });
});
exports.signup = (0, express_async_handler_1.default)(async (req, res) => {
    const { username, fullName, password } = req.body;
    const _password = await (0, bcrypt_1.hash)(password, 10);
    await User_1.User.create({ username, password: _password, fullName });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        msg: "User created successfully",
    });
});
//# sourceMappingURL=auth.js.map