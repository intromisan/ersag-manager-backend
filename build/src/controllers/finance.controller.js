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
exports.getUserFinanceHandler = void 0;
const finance_service_1 = require("../service/finance.service");
function getUserFinanceHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        try {
            const userFinance = yield (0, finance_service_1.findUserFinance)({ userId });
            if (!userFinance)
                return res.status(500);
            return res.status(200).send(userFinance);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    });
}
exports.getUserFinanceHandler = getUserFinanceHandler;
//# sourceMappingURL=finance.controller.js.map