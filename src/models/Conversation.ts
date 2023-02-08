import mongoose, { model, Schema } from "mongoose";
import { Message } from "./Message";

const ConversationSchema = new Schema({
    recipidents: {
        type: Array,
    },

    lastMessage: {
        message: Message,
        seen: {
            type: Array,
        },
    },

    date: {
        type: Schema.Types.Date,
        default: Date.now,
    },
});
export const Conversation = model("conversation", ConversationSchema);
