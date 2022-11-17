import mongoose, { model, Schema } from 'mongoose';
import { IUser } from '../utils/interface';

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: '' },
    active: { type: Boolean, default: true },
    role: { type: String, default: 'user', enum: ['admin', 'vendor', 'user'] },
    isAdmin: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    phone: { type: String, unique: true },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  },
  { timestamps: true }
);

const Users = model<IUser>('users', userSchema);

export default Users;
