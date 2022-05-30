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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductHandler = exports.getProductHandler = exports.getAllProductsHandler = exports.updateProductHandler = exports.createProductHandler = void 0;
const product_service_1 = require("../service/product.service");
function createProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        try {
            const product = yield (0, product_service_1.createProduct)(Object.assign({}, body));
            return res.status(200).send(product);
        }
        catch (error) {
            return res.status(500).send(error.message);
        }
    });
}
exports.createProductHandler = createProductHandler;
function updateProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const productId = req.params.productId;
        const update = req.body;
        try {
            const product = yield (0, product_service_1.findProduct)({ productId });
            if (!product)
                return res.status(404);
            const updatedProduct = yield (0, product_service_1.findAndUpdateProduct)({ productId }, update, { new: true });
            return res.status(200).send(updatedProduct);
        }
        catch (error) {
            return res.status(500).send(error.message);
        }
    });
}
exports.updateProductHandler = updateProductHandler;
function getAllProductsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield (0, product_service_1.findAllProducts)();
            return res.status(200).send(products);
        }
        catch (error) {
            return res.status(500).send(error.message);
        }
    });
}
exports.getAllProductsHandler = getAllProductsHandler;
function getProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const productId = req.params.productId;
        try {
            const product = yield (0, product_service_1.findProduct)({ productId });
            if (!product)
                return res.status(404);
            return res.status(200).send(product);
        }
        catch (error) {
            return res.status(500).send(error.message);
        }
    });
}
exports.getProductHandler = getProductHandler;
function deleteProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const productId = req.params.productId;
        try {
            const product = yield (0, product_service_1.findProduct)({ productId });
            if (!product)
                return res.status(404);
            yield (0, product_service_1.findAndDeleteProduct)({ productId });
            return res.status(200).send('Deleted successfully');
        }
        catch (error) {
            return res.status(500).send(error.message);
        }
    });
}
exports.deleteProductHandler = deleteProductHandler;
//# sourceMappingURL=product.controller.js.map