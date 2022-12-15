import { Router } from 'express';

const userRouter = Router();

import {
  createUser,
  login,
  updateProfile,
  uploadProfilePicture,
  verifyAccount,
} from '../controllers/userController';
import { authguard } from '../middlewares/auth';
import upload from '../middlewares/upload';
import {
  validateLoginMiddleware,
  validateSignupMiddleware,
  validateUpdateUserMiddleware,
} from '../middlewares/Validate';

userRouter.route('/signup').post(validateSignupMiddleware, createUser);
userRouter.route('/login').get(validateLoginMiddleware, login);
userRouter.route('/verify').patch(verifyAccount);
userRouter
  .route('/upload')
  .put(authguard, upload.array('image'), uploadProfilePicture);
userRouter
  .route('/update')
  .patch(authguard, validateUpdateUserMiddleware, updateProfile);

export default userRouter;
