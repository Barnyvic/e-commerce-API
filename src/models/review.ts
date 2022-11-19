import { Schema, Types, model } from 'mongoose';
import { IReview } from '../utils/interface';

const reviewSchema = new Schema({
  user: { type: Types.ObjectId },
  product: { type: Types.ObjectId },
  text: { type: String, require: true },
});

const Reviews = model<IReview>('Reviews', reviewSchema);

export default Reviews;
