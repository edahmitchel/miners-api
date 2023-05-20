import express from 'express';
import { approveWithdrawal, getAllWithdrawals, getUserWithdrawals, rejectWithdrawal, requestWithdrawal } from '../controllers/withdrawal';

const router = express.Router();

// Withdrawal request route
router.post('/withdrawals', requestWithdrawal);

// User withdrawal history route
router.get('/withdrawals/:userId', getUserWithdrawals);

// All withdrawals route
router.get('/withdrawals', getAllWithdrawals);

// Approve withdrawal route
router.put('/withdrawals/approve/:withdrawalId', approveWithdrawal);

// Reject withdrawal route
router.put('/withdrawals/reject/:withdrawalId', rejectWithdrawal);

export default router;
