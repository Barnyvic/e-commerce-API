import { Router } from 'express';
import {
  createNewProduct,
  getAllProducts,
  getProduct,
  uplooadProductImages,
} from '../controllers/productController';
import { authguard } from '../middlewares/auth';
import upload from '../middlewares/upload';

const productRouter = Router();

productRouter.route('/createproduct').post(authguard, createNewProduct);

productRouter
  .route('/upload-image/:productid')
  .patch(authguard, upload.array('image'), uplooadProductImages);

productRouter.route('/').get(getAllProducts);

productRouter.route('/:productid').get(getProduct);

export default productRouter;
