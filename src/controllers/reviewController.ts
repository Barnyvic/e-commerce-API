import { Request, Response } from 'express';
import Reviews from '../models/review';
import Products from '../models/productmodels';
import Users from '../models/userModel';
import { successResponse, errorResponse, handleError } from '../utils/response';

//@desc Create a  new Reviews
//@route POST /register
//@access Private

export const createReview = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    const { reviewid } = req.params;
    const { _id } = req.user;
    const user = await Users.findById(_id);
    if (user?.role.includes('vendor'))
      return errorResponse(res, 401, 'You are not authorided');

    const products: any = await Products.findById(reviewid);

    const review = await Reviews.create({
      user: user?.id,
      text,
      product: products?.id,
    });

    products.review = review?.id;

    await products?.save();

    return successResponse(
      res,
      201,
      'Product created successfully....',
      review
    );
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Server error.');
  }
};

export const getReviews = async (req: Request, res: Response) => {
  try {
    const review = await Reviews.find().populate('product', {
      name: 1,
      description: 1,
      price: 1,
    });
    if (!review) return errorResponse(res, 404, 'Product not found');
    return successResponse(res, 200, 'List Of all products....', review);
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Server error.');
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const { reviewid } = req.params;
    const { _id } = req.user;
    const review = await Reviews.findById(reviewid);
    if (_id?.toString() === review?.user?.toString()) {
      await Reviews.updateOne({
        $set: req.body,
      });
      return successResponse(res, 204, 'Product Deleted successfully..');
    }
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Server error.');
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { reviewid } = req.params;
    const { _id } = req.user;
    const review = await Reviews.findById(reviewid);
    if (_id?.toString() === review?.user?.toString()) {
      await Reviews.findByIdAndDelete(reviewid);
      return successResponse(res, 204, 'Product Deleted successfully..');
    }
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Server error.');
  }
};
