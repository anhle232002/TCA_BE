import {
    createConversation,
    getConversationByMembers,
    getConversations,
    getMessages,
} from "@/controllers/conversation";
import validateAuth from "@/middlewares/validateAuth";
import { Router } from "express";

const router = Router();

router.get("/conversations", validateAuth, getConversations);
router.get("/conversations/:id", validateAuth, getMessages);
router.get("/conversations/users/:id", validateAuth, getConversationByMembers);
router.post("/conversations", validateAuth, createConversation);

export default router;
