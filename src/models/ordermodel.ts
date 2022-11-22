import mongoose from 'mongoose';
import { Iorder } from '../utils/interface';

const orderSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  orderId: { type: String, required: true },
  item: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      required: true,
    },
  ],
  totalAmount: { type: Number, required: true },
  paidAmount: { type: Number, required: true },
  orderDate: { type: Date },
  orderStatus: { type: String, default: 'pending' },
  remarks: { type: String },
},{
  timestamps:true,
});

export default mongoose.model<Iorder>('Order', orderSchema);
