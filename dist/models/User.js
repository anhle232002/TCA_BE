"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
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
    language: {
        type: String,
        default: "en",
    },
});
exports.User = (0, mongoose_1.model)("user", UserSchema);
//# sourceMappingURL=User.js.map