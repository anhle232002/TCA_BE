import { CreateConversationDTO } from "@/dto/conversation";
import { CustomError } from "@/dto/error";
import { Conversation } from "@/models/Conversation";
import { Message } from "@/models/Message";
import { User } from "@/models/User";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const createConversation = asyncHandler(async (req: Request, res: Response) => {
    const { members } = req.body as CreateConversationDTO;

    if (!members || members.length < 2) throw Error(ReasonPhrases.BAD_REQUEST);

    await Conversation.create({ members });

    res.status(StatusCodes.CREATED).json({ message: "Conversation has been created successfully" });
});
export const getConversations = asyncHandler(async (req: Request, res: Response) => {
    const userId = res.locals.user.id;
    const page = +req.query.page || 1;
    const PAGE_SIZE = 10;
    const conversations = await Conversation.find({
        members: { $in: userId },
    })
        .populate("members", "_id fullName avatar")
        .sort("updatedAt")
        .skip((page - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE)
        .lean();

    res.status(200).json({ data: conversations });
});
export const getMessages = asyncHandler(async (req: Request, res: Response) => {
    const conversationId = req.params.id;
    const page = +req.query.page || 1;
    const PAGE_SIZE = 10;

    let [conversation, messages] = await Promise.all([
        Conversation.findById(conversationId).populate("members", "_id fullName").lean(),
        Message.find({ conversationId })
            .sort("-date")
            .skip((page - 1) * PAGE_SIZE)
            .limit(PAGE_SIZE)
            .lean(),
    ]);

    // reversve the messages
    messages = messages.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    res.status(200).json({ conversation, messages, page });
});

export const getConversationByMembers = asyncHandler(async (req: Request, res: Response) => {
    const memberId = req.params.id;
    const userId = res.locals.user.id;
    const user = await User.findById(memberId).select("_id fullName avatar").lean();

    if (!user) throw new CustomError(404, "User is not found");

    const conversation = await Conversation.findOne({
        members: {
            $in: [
                [memberId, userId],
                [userId, memberId],
            ],
        },
    })
        .populate("members", "_id fullName")
        .lean();

    if (!conversation) {
        res.status(200).json({ user, conversation: null });
    }

    res.status(200).json({ user, conversation });
});
