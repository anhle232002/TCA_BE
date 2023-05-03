import { CreateConversationDTO } from "@/dto/conversation";
import { CustomError } from "@/dto/error";
import { cache } from "@/lib/node-cache";
import { Conversation } from "@/models/Conversation";
import { Message } from "@/models/Message";
import { User } from "@/models/User";
import { TConversation } from "@/types/Conversation";
import { TMessage } from "@/types/Message";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import mongoose, { FilterQuery, Schema } from "mongoose";

export const createConversation = asyncHandler(async (req: Request, res: Response) => {
    const { members } = req.body as CreateConversationDTO;

    if (!members || members.length < 2) throw Error(ReasonPhrases.BAD_REQUEST);

    await Conversation.create({ members });

    res.status(StatusCodes.CREATED).json({ message: "Conversation has been created successfully" });
});
export const getConversations = asyncHandler(async (req: Request, res: Response) => {
    let userId = res.locals.user.id;
    const page = +req.query.page || 1;
    const PAGE_SIZE = 10;
    const query = req.query.search as string;
    const filter: FilterQuery<typeof Conversation> = {
        members: { $in: [userId] },
    };

    // if (query && query !== "") {
    //     filter["members"] = {
    //         $elemMatch: {
    //             $or: [
    //                 { username: { $regex: new RegExp(query, "gi") } },
    //                 { fullName: { $regex: new RegExp(query, "gi") } },
    //             ],
    //         },
    //     };
    // }

    // let conversations = (await Conversation.find(filter)
    //     .populate({
    //         path: "members",

    //         select: "_id fullName avatar lastMessage",
    //     })
    //     .sort("-updatedAt")
    //     .skip((page - 1) * PAGE_SIZE)
    //     .limit(PAGE_SIZE)
    //     .lean()) as TConversation[];

    userId = new mongoose.Types.ObjectId(userId);
    let conversations = (await Conversation.aggregate([
        {
            $match: {
                members: { $in: [userId] },
            },
        },
        {
            $lookup: {
                from: "users", // replace with the actual name of the users collection
                localField: "members",
                foreignField: "_id",
                as: "members",
            },
        },
        // Filter out conversations with no matching members
        {
            $match: {
                $expr: {
                    $or: [
                        {
                            $and: [
                                { $ne: [{ $arrayElemAt: ["$members._id", 0] }, userId] },
                                {
                                    $regexMatch: {
                                        input: { $arrayElemAt: ["$members.fullName", 0] },
                                        regex: new RegExp(query, "i"),
                                    },
                                },
                            ],
                        },
                        {
                            $and: [
                                { $ne: [{ $arrayElemAt: ["$members._id", 1] }, userId] },
                                {
                                    $regexMatch: {
                                        input: { $arrayElemAt: ["$members.fullName", 1] },
                                        regex: new RegExp(query, "i"),
                                    },
                                },
                            ],
                        },
                    ],
                },
            },
        },

        {
            $sort: {
                updatedAt: -1, // sort by createdAt field in descending order
            },
        },
        // Project only the fields we need
        {
            $project: {
                members: {
                    _id: 1,
                    avatar: 1,
                    username: 1,
                    fullName: 1,
                },
                lastMessage: 1,
                createdAt: 1,
                updatedAt: 1,
            },
        },
        {
            $skip: (page - 1) * PAGE_SIZE,
        },
        // Limit the number of documents returned to m
        {
            $limit: PAGE_SIZE,
        },
    ])) as TConversation[];

    conversations = await Promise.all(conversations.map(getLastMessage));

    conversations = conversations.sort(
        (a, b) =>
            new Date(b.lastMessage.message.date).getTime() -
            new Date(a.lastMessage.message.date).getTime()
    );

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

const getLastMessage = async (conversation: TConversation) => {
    const lastMessageFromCache = cache.get<{ message: TMessage; seen: string[] }>(
        `last-message/${conversation._id}`
    );

    if (lastMessageFromCache) {
        // if (lastMessageFromCache.message.date > conversation.lastMessage.message.date) {
        //     // Cached value is outdated, update the database and cache with the latest message
        //     await Conversation.updateOne(
        //         { _id: conversation._id },
        //         { $set: { lastMessage: lastMessageFromCache } }
        //     );
        //     cache.set(`last-message/${conversation._id}`, lastMessageFromCache);
        // }
        return { ...conversation, lastMessage: lastMessageFromCache };
    }

    const lastMessage = await Message.findOne({ conversationId: conversation._id })
        .sort("-date")
        .lean();

    const updatedLastMessage: any = { message: lastMessage, seen: [] };
    cache.set(`last-message/${conversation._id}`, updatedLastMessage);

    return { ...conversation, lastMessage: updatedLastMessage };
};
