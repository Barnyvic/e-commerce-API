import { Router } from 'express';

const adminRouter = Router();

import { createVendor,deactivateUser,updateUserRole } from '../controllers/admincontroller';
import { authguard, verifyAdmin } from '../middlewares/auth';

adminRouter.route('/update/:userId').patch(authguard,verifyAdmin,updateUserRole);
adminRouter.route('/active/:userId').put(authguard,verifyAdmin,deactivateUser);
adminRouter.route('/create').post(authguard, verifyAdmin, createVendor);


export default adminRouter;
