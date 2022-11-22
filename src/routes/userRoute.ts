import { Router } from 'express'

const userRouter = Router()

import { createUser,login,updateProfile,uploadProfilePicture } from '../controllers/userController'
import { authguard } from '../middlewares/auth'
import upload from '../middlewares/upload';

userRouter.route('/signup').post(createUser);
userRouter.route('/login').get(login);
userRouter.route('/upload').put(authguard,upload.array('image'),uploadProfilePicture);
userRouter.route('/update').patch(authguard,updateProfile);

export default userRouter;
