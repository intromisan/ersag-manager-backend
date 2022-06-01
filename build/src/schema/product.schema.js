"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductSchema = exports.deleteProductSchema = exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({ required_error: 'Name is required' }),
        code: (0, zod_1.string)({ required_error: 'Code is required' }),
        volume: (0, zod_1.string)({ required_error: 'Volume is required' }),
        price: (0, zod_1.number)({ required_error: 'Price is required' }),
        withDevice: (0, zod_1.boolean)({ required_error: 'Price is required' }),
        image: (0, zod_1.string)()
    })
};
const params = {
    params: (0, zod_1.object)({
        productId: (0, zod_1.string)({
            required_error: 'productId is required'
        })
    })
};
exports.createProductSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateProductSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.deleteProductSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getProductSchema = (0, zod_1.object)(Object.assign({}, params));
//# sourceMappingURL=product.schema.js.map