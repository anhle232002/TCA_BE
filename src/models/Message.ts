import { model, Schema } from "mongoose";

const MessageSchema = new Schema({
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

export const Message = model("message", MessageSchema);
