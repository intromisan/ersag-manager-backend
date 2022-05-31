"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserFinanceSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        userId: (0, zod_1.string)({ required_error: 'User ID is required' }),
        balance: (0, zod_1.number)(),
        discountPercentage: (0, zod_1.number)(),
        inventoryTotalValue: (0, zod_1.number)()
    })
};
exports.createUserFinanceSchema = (0, zod_1.object)(Object.assign({}, payload));
//# sourceMappingURL=finance.schema.js.map