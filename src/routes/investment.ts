import express from 'express';
import { createInvestmentPlan, deleteInvestmentPlan, getAllInvestmentPlans, updateInvestmentPlan } from '../controllers/investment';

const router = express.Router();

// All investment plans route
router.get('/investment-plans', getAllInvestmentPlans);

// Create an investment plan route
router.post('/investment-plans', createInvestmentPlan);

// Update an investment plan route
router.put('/investment-plans/:planId', updateInvestmentPlan);

// Delete an investment plan route
router.delete('/investment-plans/:planId', deleteInvestmentPlan);

export default router;
