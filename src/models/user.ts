import { Schema, model, connect, Model } from 'mongoose';
import bcrypt from "bcrypt"
import { IUser } from "../types/index"
import jwt from "jsonwebtoken"
interface IUserModel extends Model<IUser> {
    findByCredentials(email: string, password: string): Promise<IUser>;

}

const userSchema = new Schema<IUser>({


    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avatar: { String },
    country: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: { type: Number, },

    passwordResetToken: { type: String, },
    passwordResetTokenExpiration: {
        type: Date,
    },

    verificationCodeExpiration: {
        type: Date,
    },

})
// / Generate an access token for the user
userSchema.methods.generateAuthToken = async function () {
    const user = this;

    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET as string);

    // user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

// Find a user by email and password

userSchema.statics.findByCredentials = async function (email: string, password: string): Promise<IUser> {
    const UserModel = this as IUserModel;
    const user = await UserModel.findOne({ email });

    if (!user) {
        throw new Error("Invalid login credentials");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new Error("Invalid login credentials");
    }

    return user;
};

export const UserModel: IUserModel = model<IUser, IUserModel>('User', userSchema);
export { IUserModel };  