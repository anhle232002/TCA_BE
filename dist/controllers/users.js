"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.updateProfile = exports.getUsers = void 0;
const User_1 = require("@/models/User");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_status_codes_1 = require("http-status-codes");
exports.getUsers = (0, express_async_handler_1.default)(async (req, res) => {
    const userId = res.locals.user.id;
    const users = await User_1.User.find({ _id: { $ne: userId } })
        .select("_id username fullName language")
        .lean();
    res.status(200).json({ data: users });
});
exports.updateProfile = (0, express_async_handler_1.default)(async (req, res) => {
    const userId = res.locals.user.id;
    const profileData = req.body;
    await User_1.User.updateOne({ _id: userId }, { $set: profileData });
    res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Update user succesfully" });
});
exports.getUserProfile = (0, express_async_handler_1.default)(async (req, res) => {
    const authUserId = res.locals.user.id;
    const userId = req.params.id;
    const isAuthUserProfile = authUserId === userId;
    const userProfileQuery = isAuthUserProfile
        ? User_1.User.findById(userId).select("fullName city phone avatar describe language").lean()
        : User_1.User.findById(userId).select("fullName city phone avatar describe language").lean();
    const userProfile = await userProfileQuery;
    res.status(200).json({ data: userProfile });
});
//# sourceMappingURL=users.js.map