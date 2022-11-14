import mongoose from 'mongoose';
import { Iproduct } from '../utils/interface';

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        category: { type: Array },
        description: { type: String, required: true },
        images: [String],
        price: { type: Number, required: true },
        sizes: [String],
        rating: { type: Number },
    },
    { timestamps: true }
);

export default mongoose.model<Iproduct>('Product', productSchema);
