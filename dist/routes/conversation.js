"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conversation_1 = require("@/controllers/conversation");
const validateAuth_1 = __importDefault(require("@/middlewares/validateAuth"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/conversations", validateAuth_1.default, conversation_1.getConversations);
router.get("/conversations/:id", validateAuth_1.default, conversation_1.getConversation);
router.get("/conversations/users/:id", validateAuth_1.default, conversation_1.getConversationByMembers);
router.post("/conversations", validateAuth_1.default, conversation_1.createConversation);
exports.default = router;
//# sourceMappingURL=conversation.js.map