import { Schema, Types, model } from 'mongoose';
import { IReview } from '../utils/interface';

const reviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId },
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  text: { type: String, require: true },
});

const Reviews = model<IReview>('Reviews', reviewSchema);

export default Reviews;
