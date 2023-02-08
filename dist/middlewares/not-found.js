"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
exports.default = (req, res) => {
    res.status(404).json({ error: http_status_codes_1.ReasonPhrases.NOT_FOUND });
};
//# sourceMappingURL=not-found.js.map