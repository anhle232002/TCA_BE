import { NextFunction, Request, Response } from "express";
import { ValidationError } from "joi";
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ValidationError) {
        return res.status(500).json({ errors: err.details.map((e) => e.message) });
    }
    res.status(500).json({ error: err });
};
