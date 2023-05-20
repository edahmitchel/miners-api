import { Request, Response } from 'express';


import Deposit from '../models/deposit';
import InvestmentPlan from '../models/investment';
import { IDeposit } from '../types';
import { UserModel } from '../models/user';


// TODO: Implement deposit handling logic
export const deposit = async (req: Request, res: Response) => {
    try {
        // Extract deposit details from the request body
        const { userId, investmentId, amount } = req.body;

        // Find the investment plan in the database by ID
        const investmentPlan = await InvestmentPlan.findById(investmentId);

        if (!investmentPlan) {
            return res.status(404).json({ error: 'Investment plan not found' });
        }

        // Check if the deposit amount meets the minimum requirement of the investment plan
        if (amount < investmentPlan.minAmount) {
            return res.status(400).json({ error: 'Deposit amount is below the minimum requirement' });
        }

        // TODO: Perform additional validation and business logic for deposit handling

        // Create a new deposit in the database
        const newDeposit: IDeposit = new Deposit({
            userId,
            investmentId,
            amount,
            status: 'pending',
            timestamp: new Date(),
        });
        await newDeposit.save();

        // Return success response
        res.status(200).json({ message: 'Deposit request submitted successfully' });
    } catch (error) {
        // Handle any errors that occur during deposit handling
        console.error('Error handling deposit:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// TODO: Implement fetching user deposits logic
export const getUserDeposits = async (req: Request, res: Response) => {
    // TODO: Implement fetching user deposits
    try {
        // Extract user ID from request parameters
        const userId = req.params.userId;

        // Fetch user deposits from the database
        const deposits = await Deposit.find({ userId });

        // Return user deposits
        res.status(200).json({ userId, deposits });
    } catch (error) {
        // Handle any errors that occur during fetching user deposits
        console.error('Error fetching user deposits:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

};

// TODO: Implement fetching all deposits logic
export const getAllDeposits = async (req: Request, res: Response) => {
    // TODO: Implement fetching all deposits
    try {


        // Return all withdrawals
        const deposits = await Deposit.find()
        res.status(200).json({ deposits });
    } catch (error) {
        // Handle any errors that occur during fetching all deposits
        console.error('Error fetching all deposits:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// / TODO: Implement approving a deposit logic
export const approveDeposit = async (req: Request, res: Response) => {
    try {
        // Extract deposit ID from request parameters
        const { depositId } = req.params;

        // Find the deposit in the database by ID
        const deposit = await Deposit.findById(depositId);

        if (!deposit) {
            return res.status(404).json({ error: 'Deposit not found' });
        }

        // Check if the deposit has already been approved
        if (deposit.status === 'approved') {
            return res.status(400).json({ error: 'Deposit has already been approved' });
        }

        // Update the deposit status to 'approved'
        deposit.status = 'approved';
        await deposit.save();

        // Find the user in the database by ID
        const user = await UserModel.findById(deposit.userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create a new investment for the user
        const newInvestment = new InvestmentPlan({
            userId: user._id,
            investmentPlanId: deposit.investmentId,
            amount: deposit.amount,
            date: new Date(),
        });

        // Add the new investment to the user's investments array
        user.investments.push({
            investmentPlanId: newInvestment._id, amount: deposit.amount,
            date: new Date(),
        });
        await user.save();

        // Return success response
        res.status(200).json({ message: 'Deposit approved successfully' });
    } catch (error) {
        // Handle any errors that occur during deposit approval
        console.error('Error approving deposit:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
// TODO: Implement deposit receipt upload logic
export const uploadDepositReceipt = async (req: Request, res: Response) => {
    try {
        // Extract deposit ID from request parameters
        const { depositId } = req.params;

        // Find the deposit in the database by ID
        const deposit = await Deposit.findById(depositId);

        if (!deposit) {
            return res.status(404).json({ error: 'Deposit not found' });
        }

        // Extract the Cloudinary URL from the request body
        const { receiptUrl } = req.body;

        // Update the deposit with the receipt URL
        deposit.upload = receiptUrl;
        await deposit.save();

        // Return success response
        res.status(200).json({ message: 'Deposit receipt uploaded successfully' });
    } catch (error) {
        // Handle any errors that occur during deposit receipt upload
        console.error('Error uploading deposit receipt:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

