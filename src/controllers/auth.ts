import { User } from "@/models/User";
import { compare, hash } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import { StatusCodes } from "http-status-codes";
import { LoginDTO, SignUpDTO } from "@/dto/auth";

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body as LoginDTO;

    const user = await User.findOne({ username }).lean();

    if (!user) return next(Error("User does not exist"));

    const isMatch = await compare(password, user.password);

    if (!isMatch) return next(Error("Incorrect password"));

    const payload = { id: user._id, username: user.username, fullName: user.fullName };

    const accessToken = generateAccessToken(payload);

    const refreshToken = generateRefreshToken(payload);

    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    res.status(200).json({ user: payload, accessToken });
});
export const signup = asyncHandler(async (req: Request, res: Response) => {
    const { username, fullName, password } = req.body as SignUpDTO;

    const _password = await hash(password, 10);

    await User.create({ username, password: _password, fullName });

    res.status(StatusCodes.CREATED).json({
        msg: "User created successfully",
    });
});
