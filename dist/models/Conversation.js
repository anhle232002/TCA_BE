"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conversation = void 0;
const mongoose_1 = require("mongoose");
const ConversationSchema = new mongoose_1.Schema({
    members: [
        {
            type: String,
            ref: "user",
        },
    ],
    lastMessage: {
        message: Object,
        seen: {
            type: Array,
        },
    },
    createdAt: {
        type: mongoose_1.Schema.Types.Date,
        default: Date.now,
    },
    updatedAt: {
        type: mongoose_1.Schema.Types.Date,
        default: Date.now,
    },
});
ConversationSchema.pre("updateOne", function (next) {
    this.set({ updatedAt: new Date() });
    next();
});
exports.Conversation = (0, mongoose_1.model)("conversation", ConversationSchema);
//# sourceMappingURL=Conversation.js.map