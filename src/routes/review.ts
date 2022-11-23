import { Router } from 'express';
import {
  createReview,
  deleteReview,
  getReviews,
  updateReview,
} from '../controllers/reviewController';
import { authguard } from '../middlewares/auth';
const reviewRouter = Router();

reviewRouter.route('/').get(getReviews);

reviewRouter
  .route('/:reviewid')
  .delete(authguard, deleteReview)
  .post(authguard, createReview)
  .put(authguard, updateReview);

export default reviewRouter;
