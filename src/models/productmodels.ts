import mongoose from 'mongoose';
import { Iproduct } from '../utils/interface';

const productSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Types.ObjectId, ref: 'users' },
    name: { type: String, required: true },
    category: { type: Array, required: true },
    description: { type: String, required: true },
    images: [String],
    price: { type: Number, required: true },
    sizes: [String],
    noOfReviews: { type: Number, default: 0 },
    instock: { type: Boolean, default: true },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
    rating: { type: Number },
    review: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
  },
  { timestamps: true }
);

const Products = mongoose.model<Iproduct>('Product', productSchema);

export default Products;
