import config from "@/config";
import { sign, verify } from "jsonwebtoken";

export const generateAccessToken = (payload: any) => {
    return sign(payload, config.ACCESS_TOKEN_SECRET, { expiresIn: config.ACCESS_TOKEN_EXP });
};

export const generateRefreshToken = (payload: any) => {
    return sign(payload, config.REFRESH_TOKEN_SECRET, { expiresIn: config.REFRESH_TOKEN_EXP });
};

export const verifyToken = (token: string, type: "access-token" | "refresh-token") =>
    new Promise((resolve, reject) => {
        verify(
            token,
            type === "access-token" ? config.ACCESS_TOKEN_SECRET : config.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err) reject(err);
                resolve(decoded);
            }
        );
    });
