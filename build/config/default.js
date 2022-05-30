"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT || 5001,
    host: process.env.HOST,
    dbUri: process.env.DB_URI,
    saltWorkFactor: process.env.SALT_WORK_FACTOR,
    accessTokenTtl: process.env.ACCESS_TOKEN_TTL,
    refreshTokenTtl: process.env.REFRESH_TOKEN_TTL,
    publicKey: (_a = process.env.PUBLIC_KEY) === null || _a === void 0 ? void 0 : _a.replace(/\\n/g, '\n'),
    privateKey: (_b = process.env.PRIVATE_KEY) === null || _b === void 0 ? void 0 : _b.replace(/\\n/g, '\n')
};
//# sourceMappingURL=default.js.map