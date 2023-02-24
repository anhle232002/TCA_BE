import { NextFunction, Request, Response } from "express";
import { ReasonPhrases } from "http-status-codes";
import { ValidationError } from "joi";
import { TokenExpiredError } from "jsonwebtoken";
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);

    if (err instanceof ValidationError) {
        return res.status(500).json({ errors: err.details.map((e) => e.message) });
    }

    if (err instanceof TokenExpiredError) {
        return res.status(401).json({ message: "Token expired" });
    }

    res.status(err.statusCode || 500).json({
        error: err.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
};
