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
exports.deleteInvestmentPlan = exports.updateInvestmentPlan = exports.createInvestmentPlan = exports.getAllInvestmentPlans = void 0;
const investment_1 = __importDefault(require("../models/investment"));
// TODO: Implement fetching all investment plans logic
const getAllInvestmentPlans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO: Fetch all investment plans from the database
        const investmentPlans = yield investment_1.default.find();
        // Return all investment plans
        res.status(200).json({ investmentPlans });
    }
    catch (error) {
        // Handle any errors that occur during fetching all investment plans
        console.error('Error fetching all investment plans:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllInvestmentPlans = getAllInvestmentPlans;
// TODO: Implement creating an investment plan logic
const createInvestmentPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract investment plan details from the request body
        const { name, minAmount, description, returnPercentage } = req.body;
        // TODO: Perform validation and business logic for creating an investment plan
        // Create a new investment plan in the database
        const newInvestmentPlan = new investment_1.default({
            name,
            minAmount,
            description, returnPercentage
        });
        yield newInvestmentPlan.save();
        // Return success response
        res.status(200).json({ message: 'Investment plan created successfully' });
    }
    catch (error) {
        // Handle any errors that occur during creating an investment plan
        console.error('Error creating an investment plan:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createInvestmentPlan = createInvestmentPlan;
// TODO: Implement updating an investment plan logic
const updateInvestmentPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract investment plan ID from request parameters
        const planId = req.params.planId;
        // Find the investment plan in the database by ID
        const investmentPlan = yield investment_1.default.findById(planId);
        if (!investmentPlan) {
            return res.status(404).json({ error: 'Investment plan not found' });
        }
        // Extract updated details from the request body
        const { name, minimumAmount, description, returnPercentage } = req.body;
        // TODO: Perform validation and business logic for updating an investment plan
        // Update the investment plan in the database
        investmentPlan.name = name;
        investmentPlan.minAmount = minimumAmount;
        investmentPlan.returnPercentage = returnPercentage;
        //   investmentPlan.description = description;
        yield investmentPlan.save();
        // Return success response
        res.status(200).json({ message: 'Investment plan updated successfully' });
    }
    catch (error) {
        // Handle any errors that occur during updating an investment plan
        console.error('Error updating an investment plan:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateInvestmentPlan = updateInvestmentPlan;
// TODO: Implement deleting an investment plan logic
const deleteInvestmentPlan = (req, res) => {
    // TODO: Implement deleting an investment plan
};
exports.deleteInvestmentPlan = deleteInvestmentPlan;
