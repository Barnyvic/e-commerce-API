import mongoose, { model, Schema } from 'mongoose';
import { IUser } from '../utils/interface';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        profilePicture: { type: String, default: '' },
        active: { type: Boolean, default: false },
        role: {
            type: String,
            default: 'user',
            enum: ['admin', 'vendor', 'user'],
        },
        isAdmin: { type: Boolean, default: false },
        verified: { type: Boolean, default: false },
        phone: { type: String, unique: true },
        cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
        orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    },
    { timestamps: true }
);

userSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

userSchema.methods.validatePassword = async function (password: string) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
};

const Users = model<IUser>('users', userSchema);

export default Users;
