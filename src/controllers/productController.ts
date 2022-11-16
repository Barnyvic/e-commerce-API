import { Request, Response } from 'express';
import Products from '../models/productmodels';
import Users from '../models/userModel';
import { successResponse, errorResponse, handleError } from '../utils/response';
import { Iproduct } from '../utils/interface';

//@desc Create a  new Product
//@route POST /register
//@access Public

export const createNewProduct = async (req: Request, res: Response) => {
  try {
    const { name, category, description, price, sizes, rating } = req.body;

    const { _id } = req.user;
    const user = await Users.findById(_id);
    if (user?.role.includes('user'))
      return errorResponse(res, 401, 'You are not authorided');

    const product = await Products.create({
      owner: user?.id,
      name,
      category,
      description,
      price,
      sizes,
      rating,
    });

    return successResponse(
      res,
      201,
      'Product created successfully....',
      product
    );
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Server error.');
  }
};

export const uplooadProductImages = async (req: Request, res: Response) => {
  try {
    const { productid } = req.params;
    const product = await Products.findById(productid);

    const { _id } = req.user;
    if (_id === product?.owner?.toString()) {
      const product = await Products.findByIdAndUpdate(
        productid,
        {
          images: req.file?.path,
        },
        { new: true }
      ).select('-password');

      return successResponse(
        res,
        200,
        'Image successfully uploaded....',
        product
      );
    } else {
      return errorResponse(res, 401, 'You are not authorided');
    }
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Server error.');
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const query = req.query.new;
    const products = query
      ? await Products.find().sort({ _id: -1 })
      : await Products.find();

    if (!products) return errorResponse(res, 404, 'Product not found');

    return successResponse(res, 200, 'List Of all products....', products);
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Server error.');
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const singleProduct = await Products.findById(req.params.productid);

    if (!singleProduct) return errorResponse(res, 404, 'Product not found');

    return successResponse(res, 200, 'Product....', singleProduct);
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Server error.');
  }
};
