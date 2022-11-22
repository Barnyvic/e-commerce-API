import mongoose from 'mongoose';
import { Iproduct } from '../utils/interface';

const productSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Types.ObjectId },
    name: { type: String, required: true },
    category: { type: Array },
    description: { type: String, required: true },
    images: [String],
    price: { type: Number, required: true },
    sizes: [String],
    noOfReviews:{type:Number,defauult:0},
    instock: { type: Boolean, default: true },
    rating: { type: Number },
    review: { type: mongoose.Schema.Types.ObjectId, ref: 'Reviews' },
  },
  { timestamps: true }
);

const Products = mongoose.model<Iproduct>('Product', productSchema);

export default Products;
