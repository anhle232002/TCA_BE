import { Request, Response } from "express";
import { ReasonPhrases } from "http-status-codes";

export default (req: Request, res: Response) => {
    res.status(404).json({ error: ReasonPhrases.NOT_FOUND });
};
