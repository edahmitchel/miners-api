import express from 'express';
import { getAllTransactions, getUserTransactions } from '../controllers/transactionController';

const router = express.Router();

// User transaction history route
router.get('/transactions/:userId', getUserTransactions);

// All transactions route
router.get('/transactions', getAllTransactions);

export default router;
