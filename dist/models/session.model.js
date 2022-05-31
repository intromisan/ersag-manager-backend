"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const sessionSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: 'User'
    },
    valid: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
const SessionModel = (0, mongoose_1.model)('Session', sessionSchema);
exports.default = SessionModel;
//# sourceMappingURL=session.model.js.map