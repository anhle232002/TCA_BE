"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conversation = void 0;
const mongoose_1 = require("mongoose");
const Message_1 = require("./Message");
const ConversationSchema = new mongoose_1.Schema({
    recipidents: {
        type: Array,
    },
    lastMessage: {
        message: Message_1.Message,
        seen: {
            type: Array,
        },
    },
    date: {
        type: mongoose_1.Schema.Types.Date,
        default: Date.now,
    },
});
exports.Conversation = (0, mongoose_1.model)("conversation", ConversationSchema);
//# sourceMappingURL=Conversation.js.map