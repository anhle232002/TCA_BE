import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    username: String,
    password: String,
    fullName: String,
    phone: {
        type: String,
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    avatar: {
        type: String,
        default: "",
    },
    describe: {
        type: String,
        default: "",
    },
});

export const User = model("user", UserSchema);
