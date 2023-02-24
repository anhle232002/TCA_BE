import { verifyToken } from "@/lib/jwt";
import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);

        const decoded = await verifyToken(token, "access-token");

        res.locals.user = decoded;

        next();
    } catch (error) {
        next(error);
    }
};
