import { Router } from 'express';
import {
  createNewProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  likeProduct,
  unlikeProduct,
  updateProduct,
  uplooadProductImages,
} from '../controllers/productController';
import { authguard } from '../middlewares/auth';
import upload from '../middlewares/upload';
import { validateCreateProductMiddleware } from '../middlewares/Validate';

const productRouter = Router();

productRouter
  .route('/')
  .post(authguard, validateCreateProductMiddleware, createNewProduct)
  .get(getAllProducts);

productRouter
  .route('/:productid')
  .get(getProduct)
  .put(authguard, updateProduct)
  .delete(authguard, deleteProduct);

productRouter
  .route('/uploadimage/:productid')
  .patch(authguard, upload.array('image'), uplooadProductImages);

productRouter.route('/like/:productid').put(authguard, likeProduct);
productRouter.route('/unlike/:productid').put(authguard, unlikeProduct);

export default productRouter;
