import { getUserProfile, getUsers, updateProfile } from "@/controllers/users";
import validateAuth from "@/middlewares/validateAuth";
import { Router } from "express";

const router = Router();

router.get("/users", validateAuth, getUsers);
router.get("/users/profile/:id", validateAuth, getUserProfile);
router.put("/users/profile", validateAuth, updateProfile);

export default router;
