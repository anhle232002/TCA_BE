"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("@/controllers/auth");
const validate_1 = __importDefault(require("@/middlewares/validate"));
const auth_2 = require("@/validation/auth");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/auth");
router.post("/auth/login", auth_1.login);
router.post("/auth/signup", (0, validate_1.default)(auth_2.signupSchema), auth_1.signup);
exports.default = router;
//# sourceMappingURL=auth.js.map