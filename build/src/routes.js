"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const finance_controller_1 = require("./controllers/finance.controller");
const inventory_controller_1 = require("./controllers/inventory.controller");
const product_controller_1 = require("./controllers/product.controller");
const session_controller_1 = require("./controllers/session.controller");
const user_controller_1 = __importDefault(require("./controllers/user.controller"));
const requireUser_1 = __importDefault(require("./middleware/requireUser"));
const validateResource_1 = __importDefault(require("./middleware/validateResource"));
const inventory_schema_1 = require("./schema/inventory.schema");
const product_schema_1 = require("./schema/product.schema");
const session_schema_1 = require("./schema/session.schema");
const user_schema_1 = require("./schema/user.schema");
function routes(app) {
    app.get('/api/healthcheck', (req, res) => res.status(200).send({ message: 'Healthy' }));
    // Users
    app.post('/api/users', (0, validateResource_1.default)(user_schema_1.createUserSchema), user_controller_1.default.createUserHandler);
    // Session
    app.post('/api/sessions', (0, validateResource_1.default)(session_schema_1.createSessionSchema), session_controller_1.createUserSessionHandler);
    app.get('/api/sessions', requireUser_1.default, session_controller_1.getUserSessionHandler);
    app.delete('/api/sessions', requireUser_1.default, session_controller_1.deleteSessionHandler);
    // Products
    app.post('/api/products', [requireUser_1.default, (0, validateResource_1.default)(product_schema_1.createProductSchema)], product_controller_1.createProductHandler);
    app.put('/api/products/:productId', [requireUser_1.default, (0, validateResource_1.default)(product_schema_1.updateProductSchema)], product_controller_1.updateProductHandler);
    app.get('/api/products/:productId', [requireUser_1.default, (0, validateResource_1.default)(product_schema_1.getProductSchema)], product_controller_1.getProductHandler);
    app.get('/api/products', requireUser_1.default, product_controller_1.getAllProductsHandler);
    app.delete('/api/products/:productId', [requireUser_1.default, (0, validateResource_1.default)(product_schema_1.deleteProductSchema)], product_controller_1.deleteProductHandler);
    // Inventory
    app.get('/api/userInventory', requireUser_1.default, inventory_controller_1.getUserInventoryHandler);
    app.patch('/api/userInventory/addItem', [requireUser_1.default, (0, validateResource_1.default)(inventory_schema_1.addItemToInventorySchema)], inventory_controller_1.addItemToInventoryHandler);
    app.patch(`/api/userInventory/removeItem`, requireUser_1.default, inventory_controller_1.removeItemFromInventoryHandler);
    // User Finance
    app.get('/api/finance', requireUser_1.default, finance_controller_1.getUserFinanceHandler);
}
exports.default = routes;
//# sourceMappingURL=routes.js.map