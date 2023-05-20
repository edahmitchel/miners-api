import { Types, Document } from "mongoose";

// declare namespace App {
interface IUser extends Document {
    firstName: string;
    lastName: string
    email: string;
    avatar?: string;
    country: string;
    password: string;
    isVerified: boolean
    verificationCode: number,

    passwordResetToken: string | null
    passwordResetTokenExpiration: Date | null,

    verificationCodeExpiration: Date, generateAuthToken(): Promise<string>;


}





// }
export { IUser }