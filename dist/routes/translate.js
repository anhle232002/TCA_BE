"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateAuth_1 = __importDefault(require("@/middlewares/validateAuth"));
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const router = (0, express_1.Router)();
router.post("/translate", validateAuth_1.default, (0, express_async_handler_1.default)(async (req, res) => {
    const { texts, from, to } = req.body;
    // const translatedTexts = await translateTexts(texts, { from, to });
    // res.status(200).json({ texts: translatedTexts });
}));
exports.default = router;
//# sourceMappingURL=translate.js.map