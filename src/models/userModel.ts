import { model, Schema } from 'mongoose';
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
        isAdmin: { type: Boolean, default: false },
        verified: { type: Boolean, default: false },
        phone: { type: String, unique: true },
    },
    { timestamps: true }
);
const Users = model<IUser>('users', userSchema);

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

export default Users;
