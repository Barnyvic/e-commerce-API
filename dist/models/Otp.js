"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OtpSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        maxlength: 50,
        trim: true,
        lowercase: true,
    },
    token: { type: Number },
    expired: { type: Boolean, default: false },
}, { timestamps: true });
const OTP = (0, mongoose_1.model)('otp', OtpSchema);
exports.default = OTP;
