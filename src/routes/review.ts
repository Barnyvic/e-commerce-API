import { Router } from 'express';
import {
  createReview,
  deleteReview,
  getReviews,
} from '../controllers/reviewController';
import { authguard } from '../middlewares/auth';
const reviewRouter = Router();

reviewRouter.route('/').post(authguard, createReview).get(getReviews);
reviewRouter.route('/:reviewid').delete(authguard, deleteReview);

export default reviewRouter;
