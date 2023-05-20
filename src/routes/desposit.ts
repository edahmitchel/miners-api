import express from 'express';
import { approveDeposit, deposit, getAllDeposits, getUserDeposits } from '../controllers/depositController';

const router = express.Router();

// Deposit route
router.post('/', deposit);

// User deposit history route
router.get('/:userId', getUserDeposits);
// Route to approve a deposit
router.put('/:depositId/approve', approveDeposit);

// All deposits route
router.get('/', getAllDeposits);

export default router;
