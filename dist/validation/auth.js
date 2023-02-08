"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signupSchema = joi_1.default.object({
    username: joi_1.default.string().required().label("Username"),
    fullName: joi_1.default.string().required().label("Full Name"),
    password: joi_1.default.string()
        .required()
        .min(6)
        .message("Password must be atleast 6 characters")
        .label("Password"),
    repeat_password: joi_1.default.ref("password"),
});
//# sourceMappingURL=auth.js.map