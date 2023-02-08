"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (shema) => {
    return async (req, res, next) => {
        try {
            await shema.validateAsync(req.body);
            next();
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    };
};
//# sourceMappingURL=validate.js.map