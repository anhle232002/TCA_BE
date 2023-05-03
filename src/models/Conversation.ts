import { model, Schema } from "mongoose";

const ConversationSchema = new Schema({
    members: [
        {
            type: Schema.Types.ObjectId,
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
        type: Schema.Types.Date,
        default: Date.now,
    },

    updatedAt: {
        type: Schema.Types.Date,
        default: Date.now,
    },
});

ConversationSchema.pre("updateOne", function (next) {
    this.set({ updatedAt: new Date() });
    next();
});
export const Conversation = model("conversation", ConversationSchema);
