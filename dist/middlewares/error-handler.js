"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const joi_1 = require("joi");
const errorHandler = (err, req, res) => {
    console.log("hello");
    if (err instanceof joi_1.ValidationError) {
        return res.status(500).json(err.details[0].message);
    }
    res.status(500).json({ error: err });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map