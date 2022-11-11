import { model, Schema } from 'mongoose';
import { IOtp } from '../utils/interface';

const OtpSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            maxlength: 50,
            trim: true,
            lowercase: true,
        },
        token: { type: Number },
        expired: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const OTP = model<IOtp>('otp', OtpSchema);

export default OTP;
