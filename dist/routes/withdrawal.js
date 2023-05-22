"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const withdrawal_1 = require("../controllers/withdrawal");
const router = express_1.default.Router();
// Withdrawal request route
router.post('/', withdrawal_1.requestWithdrawal);
// User withdrawal history route
router.get('/:userId', withdrawal_1.getUserWithdrawals);
// All withdrawals route
router.get('', withdrawal_1.getAllWithdrawals);
// Approve withdrawal route
router.put('/approve/:withdrawalId', withdrawal_1.approveWithdrawal);
// Reject withdrawal route
router.put('/reject/:withdrawalId', withdrawal_1.rejectWithdrawal);
exports.default = router;
