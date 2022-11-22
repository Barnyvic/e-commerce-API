"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    owner: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    orderId: { type: String, required: true },
    item: [
        {
            product: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Product' },
            required: true,
        },
    ],
    totalAmount: { type: Number, required: true },
    paidAmount: { type: Number, required: true },
    orderDate: { type: Date },
    orderStatus: { type: String, default: 'pending' },
    remarks: { type: String },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('Order', orderSchema);
