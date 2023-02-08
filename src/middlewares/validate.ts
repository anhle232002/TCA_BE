import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export default (shema: Schema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await shema.validateAsync(req.body);
            next();
        } catch (error) {
            console.log(error);

            next(error);
        }
    };
};
