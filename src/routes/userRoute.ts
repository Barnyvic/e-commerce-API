import { Router } from 'express'

const userRouter = Router()

import { createUser,login } from '../controllers/userController'

userRouter.route('/signup').post(createUser);
userRouter.route('/login').get(login);

export default userRouter;
