import { model, Schema } from "mongoose";
import { Conversation } from "./Conversation";

const MessageSchema = new Schema({
    conversationId: {
        type: Schema.Types.ObjectId,
        ref: "conversation",
    },

    from: Schema.Types.ObjectId,

    to: Schema.Types.ObjectId,

    body: {
        type: String,
        required: true,
    },

    date: {
        type: Schema.Types.Date,
        default: Date.now,
    },
});

MessageSchema.post("save", function (doc, next) {
    console.log(doc);

    Conversation.findByIdAndUpdate(doc.conversationId, { updatedAt: Date.now() });

    next();
});
export const Message = model("message", MessageSchema);
