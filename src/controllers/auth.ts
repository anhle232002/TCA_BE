import { User } from "@/models/User";
import { compare, hash } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { generateAccessToken, generateRefreshToken, verifyToken } from "@/lib/jwt";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { LoginDTO, SignUpDTO } from "@/dto/auth";
import { CustomError } from "@/dto/error";

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
export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies["refreshToken"];

    console.log(refreshToken);

    if (!refreshToken) throw new CustomError(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN);

    const decoded = (await verifyToken(refreshToken, "refresh-token")) as any;

    delete decoded.iat;
    delete decoded.exp;

    const newAccessToken = generateAccessToken(decoded);

    res.status(200).json({ accessToken: newAccessToken });
});

export const getAuthUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = res.locals.user.id;

    const user = await User.findById(userId).select("_id username fullName language").lean();

    if (!user) throw new CustomError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);

    res.status(200).json({ user });
});

export const logout = asyncHandler(async (req, res) => {
    res.clearCookie("refreshToken");

    res.status(200).json({ message: "Logout successfully" });
});
