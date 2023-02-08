import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    username: String,
    password: String,
    fullName: String,
});

export const User = model("user", UserSchema);
