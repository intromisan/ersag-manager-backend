"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSessionHandler = exports.getUserSessionHandler = exports.createUserSessionHandler = void 0;
const session_service_1 = require("../service/session.service");
const user_service_1 = require("../service/user.service");
const config_1 = __importDefault(require("config"));
const jwt_1 = require("../utils/jwt");
function createUserSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Validate the user's password
        const user = yield (0, user_service_1.validatePassword)(req.body);
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }
        // Create a session
        const session = yield (0, session_service_1.createSession)(user._id);
        // Create an access token
        const accessToken = (0, jwt_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), { expiresIn: config_1.default.get('accessTokenTtl') } // 15 minutes
        );
        // Create a refresh token
        const refreshToken = (0, jwt_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), { expiresIn: config_1.default.get('refreshTokenTtl') } // 1 year
        );
        // Return access and refresh tokens
        return res.send({ accessToken, refreshToken });
    });
}
exports.createUserSessionHandler = createUserSessionHandler;
function getUserSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const sessions = yield (0, session_service_1.findSessions)({ user: userId, valid: true });
        return res.status(200).send(sessions);
    });
}
exports.getUserSessionHandler = getUserSessionHandler;
function deleteSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const sessionId = res.locals.user.session;
        yield (0, session_service_1.updateSession)({ _id: sessionId }, { valid: false });
        return res.status(200).send({
            accessToken: null,
            refreshToken: null
        });
    });
}
exports.deleteSessionHandler = deleteSessionHandler;
//# sourceMappingURL=session.controller.js.map