"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const investment_1 = require("../controllers/investment");
const router = express_1.default.Router();
// All investment plans route
router.get('/', investment_1.getAllInvestmentPlans);
// Create an investment plan route
router.post('/', investment_1.createInvestmentPlan);
// Update an investment plan route
router.put('/:planId', investment_1.updateInvestmentPlan);
// Delete an investment plan route
router.delete('/:planId', investment_1.deleteInvestmentPlan);
exports.default = router;
