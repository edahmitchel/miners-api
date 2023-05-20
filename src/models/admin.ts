import mongoose, { Schema, Document } from 'mongoose';
import { IAdmin } from '../types';


const adminSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    // Additional fields for admin data
});

const AdminModel = mongoose.model<IAdmin>('Admin', adminSchema);

export default AdminModel;
