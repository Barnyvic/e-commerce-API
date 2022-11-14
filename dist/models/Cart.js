"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cartShcema = new mongoose_1.Schema({
    userId: { type: String, require: true },
    products: [
        {
            productId: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
}, { timestamps: true });
const Cart = (0, mongoose_1.model)('carts', cartShcema);
exports.default = Cart;
