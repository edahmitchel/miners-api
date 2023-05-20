import { Types, Document } from "mongoose";

// declare namespace App {
interface Investment {
    investmentPlanId: Types.ObjectId;
    amount: number;
    date: Date;
}
interface IUser extends Document {
    firstName: string;
    lastName: string
    email: string;
    avatar?: string;
    country: string;
    investments: [Investment]
    password: string;
    isVerified: boolean
    verificationCode: number,

    passwordResetToken: string | null
    passwordResetTokenExpiration: Date | null,

    verificationCodeExpiration: Date, generateAuthToken(): Promise<string>;


}

interface IWithdrawal extends Document {
    userId: Types.ObjectId;
    amount: number;
    timestamp: Date;
    destinationAddress: string;
    status: 'pending' | 'approved' | 'rejected';
}

interface IDeposit extends Document {
    userId: Types.ObjectId;
    amount: number;
    investmentId: Types.ObjectId
    timestamp: Date;
    txHash: string;
    status: 'pending' | 'approved' | 'rejected';
    upload: string
}

interface IInvestmentPlan extends Document {
    name: string;
    minAmount: number;
    returnPercentage: number;
}
interface IMessage {
    sender: string;
    content: string;
    createdAt: Date;
}

interface IChat extends Document {
    user: string;
    admin: string;
    messages: Message[];
}
interface IAdmin extends Document {
    username: string;
    email: string;
    // Additional fields for admin data
}




// }
export { IUser, IWithdrawal, IInvestmentPlan, IDeposit, IChat, IMessage, IAdmin }