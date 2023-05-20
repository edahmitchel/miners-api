import { Request, Response } from 'express';
import Withdrawal from '../models/withdrawal';
import { IWithdrawal } from '../types';

// TODO: Implement withdrawal request logic
export const requestWithdrawal = async (req: Request, res: Response) => {
    try {
        // Extract necessary information from the request body
        const { userId, amount, destinationAddress } = req.body;
        const newWithdrawal: IWithdrawal = new Withdrawal({
            userId, amount, destinationAddress
        })

        await newWithdrawal.save()
        // TODO: Perform validation and business logic for withdrawal request

        // TODO: Save the withdrawal request to the database

        // Return success response
        res.status(200).json({ message: 'Withdrawal request submitted successfully' });
    } catch (error) {
        // Handle any errors that occur during withdrawal request
        console.error('Error requesting withdrawal:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// TODO: Implement fetching user withdrawals logic
export const getUserWithdrawals = async (req: Request, res: Response) => {
    try {
        // Extract user ID from request parameters
        const userId = req.params.userId;

        // Fetch user withdrawals from the database
        const withdrawals = await Withdrawal.find({ userId });

        // Return user withdrawals
        res.status(200).json({ userId, withdrawals });
    } catch (error) {
        // Handle any errors that occur during fetching user withdrawals
        console.error('Error fetching user withdrawals:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// TODO: Implement fetching all withdrawals logic
export const getAllWithdrawals = async (req: Request, res: Response) => {
    try {
        // TODO: Fetch all withdrawals from the database

        // Return all withdrawals
        const withdrawals = await Withdrawal.find()
        res.status(200).json({ withdrawals }); // Replace [] with actual withdrawals
    } catch (error) {
        // Handle any errors that occur during fetching all withdrawals
        console.error('Error fetching all withdrawals:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//  TODO: Implement approving a withdrawal logic
export const approveWithdrawal = async (req: Request, res: Response) => {
    try {
        // Extract withdrawal ID from request parameters
        const withdrawalId = req.params.withdrawalId;

        // Find the withdrawal in the database by ID
        const withdrawal = await Withdrawal.findById(withdrawalId);

        if (!withdrawal) {
            return res.status(404).json({ error: 'Withdrawal not found' });
        }

        // TODO: Perform validation and business logic for approving a withdrawal

        // Update the withdrawal status in the database to 'approved'
        withdrawal.status = 'approved';
        await withdrawal.save();

        // Return success response
        res.status(200).json({ message: 'Withdrawal approved successfully' });
    } catch (error) {
        // Handle any errors that occur during approving a withdrawal
        console.error('Error approving withdrawal:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// TODO: Implement rejecting a withdrawal logic
export const rejectWithdrawal = async (req: Request, res: Response) => {
    try {
        // Extract withdrawal ID from request parameters
        const withdrawalId = req.params.withdrawalId;

        // Find the withdrawal in the database by ID
        const withdrawal = await Withdrawal.findById(withdrawalId);

        if (!withdrawal) {
            return res.status(404).json({ error: 'Withdrawal not found' });
        }

        // TODO: Perform validation and business logic for rejecting a withdrawal

        // Update the withdrawal status in the database to 'rejected'
        withdrawal.status = 'rejected';
        await withdrawal.save();

        // Return success response
        res.status(200).json({ message: 'Withdrawal rejected successfully' });
    } catch (error) {
        // Handle any errors that occur during rejecting a withdrawal
        console.error('Error rejecting withdrawal:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
