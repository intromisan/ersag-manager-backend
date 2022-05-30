"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFinanceSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserFinanceSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: mongoose_1.SchemaTypes.Number,
        default: 0,
        required: true
    },
    discountPercentage: {
        type: mongoose_1.SchemaTypes.Decimal128,
        deafult: 0,
        required: true
    },
    inventoryTotalValue: {
        type: mongoose_1.SchemaTypes.Number,
        deafult: 0,
        required: true
    }
});
const UserFinanceModel = (0, mongoose_1.model)('Finance', exports.UserFinanceSchema);
exports.default = UserFinanceModel;
//# sourceMappingURL=finance.model.js.map