import { Router } from 'express'

const userRouter = Router()

import { createUser,login,updateProfile } from '../controllers/userController'
import { authguard } from '../middlewares/auth'

userRouter.route('/signup').post(createUser);
userRouter.route('/login').get(login);
userRouter.route('/update').patch(authguard,updateProfile);

export default userRouter;