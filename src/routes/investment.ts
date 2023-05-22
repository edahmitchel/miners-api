import express from 'express';
import { createInvestmentPlan, deleteInvestmentPlan, getAllInvestmentPlans, updateInvestmentPlan } from '../controllers/investment';

const router = express.Router();

// All investment plans route
router.get('/', getAllInvestmentPlans);

// Create an investment plan route
router.post('/', createInvestmentPlan);

// Update an investment plan route
router.put('/:planId', updateInvestmentPlan);

// Delete an investment plan route
router.delete('/:planId', deleteInvestmentPlan);

export default router;
