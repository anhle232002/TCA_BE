"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConversationByMembers = exports.getConversation = exports.getConversations = exports.createConversation = void 0;
const error_1 = require("@/dto/error");
const Conversation_1 = require("@/models/Conversation");
const Message_1 = require("@/models/Message");
const User_1 = require("@/models/User");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_status_codes_1 = require("http-status-codes");
exports.createConversation = (0, express_async_handler_1.default)(async (req, res) => {
    const { members } = req.body;
    if (!members || members.length < 2)
        throw Error(http_status_codes_1.ReasonPhrases.BAD_REQUEST);
    await Conversation_1.Conversation.create({ members });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ message: "Conversation has been created successfully" });
});
exports.getConversations = (0, express_async_handler_1.default)(async (req, res) => {
    const userId = res.locals.user.id;
    const page = +req.query.page || 1;
    const PAGE_SIZE = 10;
    const conversations = await Conversation_1.Conversation.find({
        members: { $in: userId },
    })
        .populate("members", "_id fullName")
        .sort("updatedAt")
        .skip((page - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE)
        .lean();
    res.status(200).json({ data: conversations });
});
exports.getConversation = (0, express_async_handler_1.default)(async (req, res) => {
    const conversationId = req.params.id;
    const [conversation, messages] = await Promise.all([
        Conversation_1.Conversation.findById(conversationId).populate("members", "_id fullName").lean(),
        Message_1.Message.find({ conversationId }).lean(),
    ]);
    res.status(200).json({ conversation, messages });
});
exports.getConversationByMembers = (0, express_async_handler_1.default)(async (req, res) => {
    const memberId = req.params.id;
    const user = await User_1.User.findById(memberId).select("_id fullName").lean();
    if (!user)
        throw new error_1.CustomError(404, "User is not found");
    const conversation = await Conversation_1.Conversation.findOne({ members: { $in: memberId } })
        .populate("members", "_id fullName")
        .lean();
    if (!conversation) {
        res.status(200).json({ user, conversation: null });
    }
    const messages = await Message_1.Message.find({ conversationId: conversation._id }).lean();
    res.status(200).json({ user, conversation, messages });
});
//# sourceMappingURL=conversation.js.map