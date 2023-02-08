"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const dotenv_1 = __importDefault(require("dotenv"));
const __1 = __importDefault(require(".."));
dotenv_1.default.config();
describe("POST /api/auth/login", () => {
    it("should login successfully", async () => {
        const res = await (0, supertest_1.default)(__1.default).post("/api/auth/login").send({
            username: "anh",
            password: "1231234",
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.accessToken).toBeTruthy();
    });
});
describe("POST /api/auth/login", () => {
    it("should login failed", async () => {
        const res = await (0, supertest_1.default)(__1.default).post("/api/auth/login").send({
            username: "anh",
            password: "123124",
        });
        expect(res.statusCode).toBe(500);
    });
});
//# sourceMappingURL=auth.test.js.map