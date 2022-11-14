import { Schema, model } from 'mongoose';
import { ICart } from '../utils/interface';

const cartShcema = new Schema(
    {
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
    },
    { timestamps: true }
);

const Cart = model<ICart>('carts', cartShcema);

export default Cart;
