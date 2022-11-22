"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const creditSchema = new mongoose_1.Schema({
    amount: { type: Number },
    receiver: { type: mongoose_1.Types.ObjectId, ref: 'User' },
    sender: { type: mongoose_1.Types.ObjectId, ref: 'User' },
    status: { types: String, default: 'pending', enum: ['pending', 'successful', 'declined', 'failed', 'cancelled', 'conflict'] },
    transactionType: { type: String, enum: ['bank-transfer', 'deposit'] },
    reference: { type: String }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Credit', creditSchema);
