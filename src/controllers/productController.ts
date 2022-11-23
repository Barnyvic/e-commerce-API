import { Request, Response } from 'express';
import Products from '../models/productmodels';
import Users from '../models/userModel';
import { successResponse, errorResponse, handleError } from '../utils/response';
import { Iproduct } from '../utils/interface';

//@desc Create a  new Product
//@route POST /api/products
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

//@desc Upload product image
//@route POST /api/products/upload-image/:productid
//@access Private

export const uplooadProductImages = async (req: Request, res: Response) => {
  try {
    const { productid } = req.params;

    const product = await Products.findById(productid);

    const id = product?.owner?.toString();

    const { _id } = req.user;

    if (_id?.toString() === id) {
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

//@desc get all Products
//@route GET /api/products
//@access Public

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const New = req.query.new;
    const Category = req.query.category;
    let products;

    if (New) {
      products = await Products.find().sort({ createdAt: -1 });
    } else if (Category) {
      products = await Products.find({
        category: { $in: [Category] },
      }).populate('review');
    } else {
      products = await Products.find().populate('review', { user: 1, text: 1 });
    }

    if (!products) return errorResponse(res, 404, 'Product not found');

    return successResponse(res, 200, 'List Of all products....', products);
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Server error.');
  }
};

//@desc get a  particular Product
//@route GET /api/products/:productid
//@access Public

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

//@desc Update a Product
//@route PUT /api/products/:productid
//@access Private

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user;
    const { productid } = req.params;
    const products = await Products.findById(productid);

    if (_id?.toString() === products?.owner?.toString()) {
      const updatedProduct = await Products.updateOne({
        $set: req.body,
      });

      return successResponse(res, 200, 'Product Updated....', updatedProduct);
    }
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Server error.');
  }
};

//@desc delete a Product
//@route Delete /api/products/:productid
//@access Private

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user;
    const { productid } = req.params;
    const products = await Products.findById(productid);

    if (_id?.toString() === products?.owner?.toString()) {
      await Products.findByIdAndDelete(productid);
      return successResponse(res, 204, 'Product Deleted successfully..');
    }
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Server error.');
  }
};

//@desc  to like a Product
//@route Put  /api/products/like/:productid
//@access Private

export const likeProduct = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user;
    const { productid } = req.params;
    const products = await Products.findById(productid);

    const user = await Users.findById(_id);
    // Check if the product has already been liked by a user
    const likedProduct: any = products?.likes?.filter(
      (like) => like?.toString() === _id?.toString()
    )?.length;
    if (likedProduct > 0) {
      return errorResponse(res, 400, 'Product already liked');
    }

    products?.likes?.unshift(user?.id);

    await products?.save();

    return successResponse(res, 200, 'Product Liked  successfully..');
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Server error.');
  }
};

//@desc  to unlike a Product
//@route Put  /api/products/unlike/:productid
//@access Private

export const unlikeProduct = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user;
    const { productid } = req.params;
    const products = await Products.findById(productid);

    const user = await Users.findById(_id);
    // Check if the product has already been liked by a user
    const likedProduct: any = products?.likes?.filter(
      (like) => like?.toString() === _id?.toString()
    )?.length;
    if (likedProduct === 0) {
      return errorResponse(res, 400, 'Product has not yet been liked');
    }

    const removeIndex: any = products?.likes
      ?.map((like) => like?.toString())
      .indexOf(user?.id);

    products?.likes?.splice(removeIndex, 1);

    await products?.save();

    return successResponse(res, 200, 'Product Unliked  successfully..');
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, 'Server error.');
  }
};
