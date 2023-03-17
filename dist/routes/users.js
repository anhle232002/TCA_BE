"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("@/controllers/users");
const validateAuth_1 = __importDefault(require("@/middlewares/validateAuth"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/users", validateAuth_1.default, users_1.getUsers);
router.get("/users/profile/:id", validateAuth_1.default, users_1.getUserProfile);
router.put("/users/profile", validateAuth_1.default, users_1.updateProfile);
exports.default = router;
//# sourceMappingURL=users.js.map