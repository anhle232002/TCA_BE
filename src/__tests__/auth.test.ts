import mongoose from "mongoose";
import request from "supertest";
import dotenv from "dotenv";
import { afterEach, beforeEach } from "node:test";
import app from "..";

dotenv.config();

describe("POST /api/auth/login", () => {
    it("should login successfully", async () => {
        const res = await request(app).post("/api/auth/login").send({
            username: "anh",
            password: "1231234",
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.accessToken).toBeTruthy();
    });
});

describe("POST /api/auth/login", () => {
    it("should login failed", async () => {
        const res = await request(app).post("/api/auth/login").send({
            username: "anh",
            password: "123124",
        });
        expect(res.statusCode).toBe(500);
    });
});
