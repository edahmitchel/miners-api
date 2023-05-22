"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const depositController_1 = require("../controllers/depositController");
const router = express_1.default.Router();
// Deposit route
router.post('/', depositController_1.deposit);
// User deposit history route
router.get('/:userId', depositController_1.getUserDeposits);
// Route to approve a deposit
router.put('/:depositId/approve', depositController_1.approveDeposit);
// All deposits route
router.get('/', depositController_1.getAllDeposits);
router.post('/:depositId/upload', depositController_1.uploadDepositReceipt);
exports.default = router;
