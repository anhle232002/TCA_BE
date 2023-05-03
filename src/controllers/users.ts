import { UpdateProfileDTO } from "@/dto/users";
import { uploadImage } from "@/lib/cloudinary";
import { User } from "@/models/User";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { FilterQuery } from "mongoose";

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
    const query = req.query.search as string;

    const userId = res.locals.user.id;

    let filter: FilterQuery<typeof User> = { _id: { $ne: userId } };

    if (query && query !== "") {
        filter.$or = [
            { username: { $regex: new RegExp(query, "gi") } },
            { fullName: { $regex: new RegExp(query, "gi") } },
        ];
    }

    const users = await User.find(filter).select("_id username fullName language avatar").lean();

    res.status(200).json({ data: users });
});

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = res.locals.user.id;

    let profileData = req.body as UpdateProfileDTO;

    if (profileData.avatar) {
        const { secure_url } = await uploadImage(profileData.avatar, { folder: "chat" });

        profileData.avatar = secure_url;
    }
    await User.updateOne({ _id: userId }, { $set: profileData });

    res.status(StatusCodes.OK).json({ message: "Update user succesfully" });
});

export const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
    const authUserId = res.locals.user.id;
    const userId = req.params.id;

    const isAuthUserProfile = authUserId === userId;

    const userProfileQuery = isAuthUserProfile
        ? User.findById(userId).select("fullName city phone avatar describe language").lean()
        : User.findById(userId).select("fullName city phone avatar describe language").lean();

    const userProfile = await userProfileQuery;
    res.status(200).json({ data: userProfile });
});
