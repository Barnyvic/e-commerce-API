import { Router } from 'express'

const userRouter = Router()

import { createUser } from '../controllers/userController'

userRouter.route('/signup').post(createUser);

export default userRouter;