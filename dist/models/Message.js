"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = require("mongoose");
const MessageSchema = new mongoose_1.Schema({
    from: mongoose_1.Schema.Types.ObjectId,
    to: mongoose_1.Schema.Types.ObjectId,
    body: {
        type: String,
        required: true,
    },
    date: {
        type: mongoose_1.Schema.Types.Date,
        default: Date.now,
    },
});
exports.Message = (0, mongoose_1.model)("message", MessageSchema);
//# sourceMappingURL=Message.js.map