import express from 'express';
import { approveWithdrawal, getAllWithdrawals, getUserWithdrawals, rejectWithdrawal, requestWithdrawal } from '../controllers/withdrawal';

const router = express.Router();

// Withdrawal request route
router.post('/', requestWithdrawal);

// User withdrawal history route
router.get('/:userId', getUserWithdrawals);

// All withdrawals route
router.get('', getAllWithdrawals);

// Approve withdrawal route
router.put('/approve/:withdrawalId', approveWithdrawal);

// Reject withdrawal route
router.put('/reject/:withdrawalId', rejectWithdrawal);

export default router;
