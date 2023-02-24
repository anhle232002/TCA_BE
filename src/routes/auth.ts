import { getAuthUser, login, refreshToken, signup } from "@/controllers/auth";
import validate from "@/middlewares/validate";
import validateAuth from "@/middlewares/validateAuth";
import { signupSchema } from "@/validation/auth";
import { Router } from "express";

const router = Router();

router.get("/auth", validateAuth, getAuthUser);
router.get("/auth/refresh", refreshToken);
router.post("/auth/login", login);
router.post("/auth/signup", validate(signupSchema), signup);

export default router;
