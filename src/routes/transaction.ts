import express from 'express';
import { getAllTransactions, getUserTransactions } from '../controllers/transactionController';

const router = express.Router();

// User transaction history route
router.get('/:userId', getUserTransactions);

// All transactions route
router.get('/', getAllTransactions);

export default router;
