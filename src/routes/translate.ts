import { translateTexts } from "@/lib/translator";
import validateAuth from "@/middlewares/validateAuth";
import { Router } from "express";
import asyncHandler from "express-async-handler";
const router = Router();

router.post(
    "/translate",
    validateAuth,
    asyncHandler(async (req, res) => {
        const { texts, from, to } = req.body;

        const translatedTexts = await translateTexts(texts, { from, to });

        res.status(200).json({ texts: translatedTexts });
    })
);

export default router;
