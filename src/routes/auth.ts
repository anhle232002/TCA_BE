import { login, signup } from "@/controllers/auth";
import validate from "@/middlewares/validate";
import { signupSchema } from "@/validation/auth";
import { Router } from "express";

const router = Router();

router.get("/auth");
router.post("/auth/login", login);
router.post("/auth/signup", validate(signupSchema), signup);

export default router;
