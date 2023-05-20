import { Document, Model, model, Schema } from 'mongoose';

export interface IInvestmentPlan extends Document {
    name: string;
    minAmount: number;
    returnPercentage: number;
}

const investmentPlanSchema: Schema = new Schema({
    name: { type: String, required: true },
    minAmount: { type: Number, required: true },
    returnPercentage: { type: Number, required: true },
});

const InvestmentPlan: Model<IInvestmentPlan> = model<IInvestmentPlan>('InvestmentPlan', investmentPlanSchema);

export default InvestmentPlan;
