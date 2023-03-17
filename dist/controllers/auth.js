"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthUser = exports.refreshToken = exports.signup = exports.login = void 0;
const User_1 = require("@/models/User");
const bcrypt_1 = require("bcrypt");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jwt_1 = require("@/lib/jwt");
const http_status_codes_1 = require("http-status-codes");
const error_1 = require("@/dto/error");
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
exports.refreshToken = (0, express_async_handler_1.default)(async (req, res) => {
    const refreshToken = req.cookies["refreshToken"];
    console.log(refreshToken);
    if (!refreshToken)
        throw new error_1.CustomError(http_status_codes_1.StatusCodes.FORBIDDEN, http_status_codes_1.ReasonPhrases.FORBIDDEN);
    const decoded = (await (0, jwt_1.verifyToken)(refreshToken, "refresh-token"));
    delete decoded.iat;
    delete decoded.exp;
    const newAccessToken = (0, jwt_1.generateAccessToken)(decoded);
    res.status(200).json({ accessToken: newAccessToken });
});
exports.getAuthUser = (0, express_async_handler_1.default)(async (req, res) => {
    const userId = res.locals.user.id;
    const user = await User_1.User.findById(userId).select("_id username fullName").lean();
    if (!user)
        throw new error_1.CustomError(http_status_codes_1.StatusCodes.NOT_FOUND, http_status_codes_1.ReasonPhrases.NOT_FOUND);
    res.status(200).json({ user });
});
//# sourceMappingURL=auth.js.map