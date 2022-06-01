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
exports.updateUserInventory = exports.findUserInventory = exports.findPopulatedUserInventory = exports.createUserInventory = void 0;
const inventory_model_1 = __importDefault(require("../models/inventory.model"));
function createUserInventory(input) {
    return __awaiter(this, void 0, void 0, function* () {
        return inventory_model_1.default.create(input);
    });
}
exports.createUserInventory = createUserInventory;
function findPopulatedUserInventory(query, options = { lean: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        return inventory_model_1.default.findOne(query, {}, options).populate('products.product');
    });
}
exports.findPopulatedUserInventory = findPopulatedUserInventory;
function findUserInventory(query, options = { lean: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        return inventory_model_1.default.findOne(query, {}, options);
    });
}
exports.findUserInventory = findUserInventory;
function updateUserInventory(query, update, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return inventory_model_1.default.findOneAndUpdate(query, update, options);
    });
}
exports.updateUserInventory = updateUserInventory;
//# sourceMappingURL=inventory.service.js.map