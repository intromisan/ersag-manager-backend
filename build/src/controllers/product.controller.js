"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = __importDefault(require("../models/product.model"));
const createProduct = (req, res, next) => {
    const { name, code, volume, price, withDevice, image } = req.body;
    const product = new product_model_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name,
        code,
        volume,
        price,
        withDevice,
        image
    });
    return product
        .save()
        .then((product) => res.status(201).json({ product }))
        .catch((error) => res.status(500).json({ error }));
};
const readProduct = (req, res, next) => {
    const productId = req.params.productId;
    return product_model_1.default.findById(productId)
        .then((product) => (product ? res.status(200).json({ product }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const readAllProducts = (req, res, next) => {
    return product_model_1.default.find()
        .then((products) => res.status(200).json(products))
        .catch((error) => res.status(500).json({ error }));
};
const updateProduct = (req, res, next) => {
    const productId = req.params.productId;
    return product_model_1.default.findById(productId)
        .then((product) => {
        if (product) {
            product.set(req.body);
            return product
                .save()
                .then((product) => res.status(201).json(product))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: 'Not found' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteProduct = (req, res, next) => {
    const productId = req.params.productId;
    return product_model_1.default.findByIdAndDelete(productId)
        .then((product) => (product ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = {
    createProduct,
    readProduct,
    readAllProducts,
    updateProduct,
    deleteProduct
};
//# sourceMappingURL=product.controller.js.map