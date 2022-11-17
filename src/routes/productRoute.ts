import { Router } from 'express';
import {
  createNewProduct,
  deleteProduct,
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
  .route('/:productid')
  .get(getProduct)
  .put(authguard, updateProduct)
  .delete(authguard, deleteProduct);

productRouter
  .route('/uploadimage/:productid')
  .patch(authguard, upload.array('image'), uplooadProductImages);

export default productRouter;
