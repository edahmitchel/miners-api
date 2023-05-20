import { Document, Model, model, Schema } from 'mongoose';
import { IWithdrawal } from '../types';


const withdrawalSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    timestamp: { type: Date, required: true },
    destinationAddress: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
});

const Withdrawal: Model<IWithdrawal> = model<IWithdrawal>('Withdrawal', withdrawalSchema);

export default Withdrawal;
