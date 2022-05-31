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
exports.removeItemFromInventoryHandler = exports.addItemToInventoryHandler = exports.getUserInventoryHandler = void 0;
const lodash_1 = require("lodash");
const finance_service_1 = require("../service/finance.service");
const inventory_service_1 = require("../service/inventory.service");
const product_service_1 = require("../service/product.service");
// Get User Inventory
function getUserInventoryHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        try {
            const inventory = yield (0, inventory_service_1.findPopulatedUserInventory)({ userId });
            return res.status(200).send((0, lodash_1.omit)(inventory, 'userId'));
        }
        catch (error) {
            return res.status(500).send(error.message);
        }
    });
}
exports.getUserInventoryHandler = getUserInventoryHandler;
// Add new item to User Inventory
function addItemToInventoryHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const { productId, itemAmount: queryItemAmount, isPresent } = req.body;
        try {
            // Find inventory, userFinance, Product
            const inventory = yield (0, inventory_service_1.findUserInventory)({ userId });
            const userFinance = yield (0, finance_service_1.findUserFinance)({ userId });
            const product = yield (0, product_service_1.findProduct)({ productId });
            if (!inventory || !userFinance)
                return res.status(500);
            if (!product) {
                return res.status(404).send('Product does not exist');
            }
            const { inventoryTotalValue, discountPercentage: userDiscount, balance: userBalance } = userFinance;
            let newInventoryProducts = inventory.products;
            // Find product, if not exists push, if exists change
            const inventoryItem = inventory.products.find((item) => product._id.equals(item.product));
            if (!inventoryItem) {
                newInventoryProducts.push({ product: product._id, itemAmount: queryItemAmount });
            }
            else {
                newInventoryProducts = newInventoryProducts.map((item) => (product._id.equals(item.product) ? { product: product._id, itemAmount: item.itemAmount + queryItemAmount } : item));
            }
            // Calculate new Inventory Total Value and new Balance
            const newInventoryTotalValue = inventoryTotalValue + product.price * queryItemAmount * (1 - userDiscount);
            const newBalance = userBalance - product.price * queryItemAmount * (1 - userDiscount);
            // If not present balance changes
            if (!isPresent) {
                yield (0, finance_service_1.updateUserBalance)({ userId }, newBalance, {});
            }
            // Total value inreases in any case
            yield (0, finance_service_1.updateInventoryTotalValue)({ userId }, newInventoryTotalValue, {});
            // Send to service the updated inventory
            const update = yield (0, inventory_service_1.updateUserInventory)({ userId }, { userId, products: newInventoryProducts }, { new: true });
            return res.status(200).send(update);
        }
        catch (error) {
            return res.status(500).send(error.message);
        }
    });
}
exports.addItemToInventoryHandler = addItemToInventoryHandler;
// Add new item to User Inventory
function removeItemFromInventoryHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const { productId, itemAmount: queryItemAmount, isDelete, isPresent } = req.body;
        try {
            // Find inventory, userFinance, Product
            const inventory = yield (0, inventory_service_1.findUserInventory)({ userId });
            const userFinance = yield (0, finance_service_1.findUserFinance)({ userId });
            const product = yield (0, product_service_1.findProduct)({ productId });
            if (!inventory || !userFinance)
                return res.status(500);
            if (!product) {
                return res.status(404).send('Product does not exist');
            }
            // Find inventoryItem and if not exist return "Not exists" error
            const inventoryItem = inventory.products.find((item) => product._id.equals(item.product));
            if (!inventoryItem) {
                return res.status(404).send('Product is not in inventory');
            }
            // Check if remove item amount exceeds or equal to total amount of item in inventory
            if (queryItemAmount >= inventoryItem.itemAmount) {
                // Remove item from inventory
                const newInventoryProducts = inventory.products.filter((item) => !product._id.equals(item.product));
                if (isDelete) {
                    // Balance increases and inventory total value decreases
                    const newInventoryTotalValue = userFinance.inventoryTotalValue - inventoryItem.itemAmount * product.price * (1 - userFinance.discountPercentage);
                    const newBalance = userFinance.balance + inventoryItem.itemAmount * product.price * (1 - userFinance.discountPercentage);
                    yield (0, finance_service_1.updateUserFinance)({ userId }, Object.assign(Object.assign({}, userFinance), { inventoryTotalValue: newInventoryTotalValue, balance: newBalance }), {});
                }
                else {
                    // If present, balance does not change, total value decreases
                    const newInventoryTotalValue = userFinance.inventoryTotalValue - inventoryItem.itemAmount * product.price * (1 - userFinance.discountPercentage);
                    const newBalance = userFinance.balance + product.price * inventoryItem.itemAmount * (1 - userFinance.discountPercentage);
                    if (!isPresent) {
                        yield (0, finance_service_1.updateUserBalance)({ userId }, newBalance, {});
                    }
                    yield (0, finance_service_1.updateInventoryTotalValue)({ userId }, newInventoryTotalValue, {});
                }
                const update = yield (0, inventory_service_1.updateUserInventory)({ userId }, { userId, products: newInventoryProducts }, { new: true });
                return res.status(200).send(update);
            }
            else {
                // Find product and decrease by queryAmount
                const newInventoryProducts = inventory.products.map((item) => (product._id.equals(item.product) ? { product: product._id, itemAmount: item.itemAmount - queryItemAmount } : item));
                if (isDelete) {
                    // Balance increases and inventory total value decreases
                    const newInventoryTotalValue = userFinance.inventoryTotalValue - queryItemAmount * product.price * (1 - userFinance.discountPercentage);
                    const newBalance = userFinance.balance + queryItemAmount * product.price * (1 - userFinance.discountPercentage);
                    yield (0, finance_service_1.updateUserFinance)({ userId }, Object.assign(Object.assign({}, userFinance), { inventoryTotalValue: newInventoryTotalValue, balance: newBalance }), {});
                }
                else {
                    // If present, balance does not change, total value decreases
                    const newInventoryTotalValue = userFinance.inventoryTotalValue - queryItemAmount * product.price * (1 - userFinance.discountPercentage);
                    const newBalance = userFinance.balance + product.price * queryItemAmount * (1 - userFinance.discountPercentage);
                    if (!isPresent) {
                        yield (0, finance_service_1.updateUserBalance)({ userId }, newBalance, {});
                    }
                    yield (0, finance_service_1.updateInventoryTotalValue)({ userId }, newInventoryTotalValue, {});
                }
                const update = yield (0, inventory_service_1.updateUserInventory)({ userId }, { userId, products: newInventoryProducts }, { new: true });
                return res.status(200).send(update);
            }
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    });
}
exports.removeItemFromInventoryHandler = removeItemFromInventoryHandler;
//# sourceMappingURL=inventory.controller.js.map