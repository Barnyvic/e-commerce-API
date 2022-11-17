import { Router } from 'express';
import {
  createNewProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  uplooadProductImages,
} from '../controllers/productController';
import { authguard } from '../middlewares/auth';
import upload from '../middlewares/upload';

const productRouter = Router();

productRouter.route('/').post(authguard, createNewProduct).get(getAllProducts);

productRouter
  .route('/upload-image/:productid')
  .patch(authguard, upload.array('image'), uplooadProductImages);

productRouter
  .route('/:productid')
  .get(getProduct)
  .put(authguard, updateProduct);

export default productRouter;
