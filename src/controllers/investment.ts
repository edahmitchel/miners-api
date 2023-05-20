import { Request, Response } from 'express';
import InvestmentPlan from '../models/investment';

// TODO: Implement fetching all investment plans logic
export const getAllInvestmentPlans = async (req: Request, res: Response) => {
    try {
        // TODO: Fetch all investment plans from the database
        const investmentPlans = await InvestmentPlan.find();

        // Return all investment plans
        res.status(200).json({ investmentPlans });
    } catch (error) {
        // Handle any errors that occur during fetching all investment plans
        console.error('Error fetching all investment plans:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// TODO: Implement creating an investment plan logic
export const createInvestmentPlan = async (req: Request, res: Response) => {
    try {
        // Extract investment plan details from the request body
        const { name, minimumAmount, description } = req.body;

        // TODO: Perform validation and business logic for creating an investment plan

        // Create a new investment plan in the database
        const newInvestmentPlan = new InvestmentPlan({
            name,
            minimumAmount,
            description,
        });
        await newInvestmentPlan.save();

        // Return success response
        res.status(200).json({ message: 'Investment plan created successfully' });
    } catch (error) {
        // Handle any errors that occur during creating an investment plan
        console.error('Error creating an investment plan:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// TODO: Implement updating an investment plan logic
export const updateInvestmentPlan = async (req: Request, res: Response) => {
    try {
        // Extract investment plan ID from request parameters
        const planId = req.params.planId;

        // Find the investment plan in the database by ID
        const investmentPlan = await InvestmentPlan.findById(planId);

        if (!investmentPlan) {
            return res.status(404).json({ error: 'Investment plan not found' });
        }

        // Extract updated details from the request body
        const { name, minimumAmount, description } = req.body;

        // TODO: Perform validation and business logic for updating an investment plan

        // Update the investment plan in the database
        investmentPlan.name = name;
        investmentPlan.minAmount = minimumAmount;
        //   investmentPlan.description = description;
        await investmentPlan.save();

        // Return success response
        res.status(200).json({ message: 'Investment plan updated successfully' });
    } catch (error) {
        // Handle any errors that occur during updating an investment plan
        console.error('Error updating an investment plan:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
// TODO: Implement deleting an investment plan logic
export const deleteInvestmentPlan = (req: Request, res: Response) => {
    // TODO: Implement deleting an investment plan
};
