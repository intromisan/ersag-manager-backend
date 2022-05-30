"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeItemFromInventorySchema = exports.addItemToInventorySchema = exports.createUserInventorySchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        userId: (0, zod_1.string)({ required_error: 'User ID is required' }),
        products: (0, zod_1.object)({
            product: (0, zod_1.string)({ required_error: 'Product ID is required' }),
            itemAmount: (0, zod_1.number)({ required_error: 'Amount is required' })
        }).array()
    })
};
const addItemPayload = {
    body: (0, zod_1.object)({
        productId: (0, zod_1.string)({ required_error: 'Product ID is required' }),
        itemAmount: (0, zod_1.number)({ required_error: 'Item Amount is required' }),
        isPresent: (0, zod_1.boolean)().default(false)
    })
};
const removeItemPayload = {
    body: (0, zod_1.object)({
        productId: (0, zod_1.string)({ required_error: 'Product ID is required' }),
        itemAmount: (0, zod_1.number)({ required_error: 'Item Amount is required' }),
        isPresent: (0, zod_1.boolean)().default(false),
        isDelete: (0, zod_1.boolean)().default(false)
    })
};
exports.createUserInventorySchema = (0, zod_1.object)(Object.assign({}, payload));
exports.addItemToInventorySchema = (0, zod_1.object)(Object.assign({}, addItemPayload));
exports.removeItemFromInventorySchema = (0, zod_1.object)(Object.assign({}, removeItemPayload));
//# sourceMappingURL=inventory.schema.js.map