import { Router } from 'express';

const adminRouter = Router();

import { createVendor } from '../controllers/admincontroller';
import { authguard, verifyAdmin } from '../middlewares/auth';

adminRouter.route('/create').post(authguard, verifyAdmin, createVendor);

export default adminRouter;
