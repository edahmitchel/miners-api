import { Document, Model, model, Schema, Types } from 'mongoose';
import { IDeposit } from '../types';


const depositSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    investmentId: { type: Schema.Types.ObjectId, ref: 'InvestmentPlan', required: true },
    amount: { type: Number, required: true },
    timestamp: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    txHash: { type: String, required: true },
    upload: { type: String },
});

const Deposit: Model<IDeposit> = model<IDeposit>('Deposit', depositSchema);

export default Deposit;
