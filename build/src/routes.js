"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_controller_1 = __importDefault(require("./controllers/product.controller"));
function routes(app) {
    app.get("/healthcheck", (req, res) => res.sendStatus(200));
    // Products
    app.get("/api/products", product_controller_1.default.readAllProducts);
    app.get("/api/products/:productId", product_controller_1.default.readProduct);
    app.post("/api/products", product_controller_1.default.createProduct);
    app.put("/api/products/:productId", product_controller_1.default.updateProduct);
    app.delete("/api/products/:productId", product_controller_1.default.deleteProduct);
}
exports.default = routes;
//# sourceMappingURL=routes.js.map