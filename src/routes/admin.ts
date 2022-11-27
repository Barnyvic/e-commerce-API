import { Router } from 'express';

const adminRouter = Router();

import { createVendor,deactivateUser,updateUserRole,activateDeactivatedUser } from '../controllers/admincontroller';
import { authguard, verifyAdmin } from '../middlewares/auth';

adminRouter.route('/update/:userId').patch(authguard,verifyAdmin,updateUserRole);
adminRouter.route('/deactivate/:userId').put(authguard,verifyAdmin,deactivateUser);
adminRouter.route('/activate/:userId').patch(authguard,verifyAdmin,activateDeactivatedUser);
adminRouter.route('/create').post(authguard, verifyAdmin, createVendor);



export default adminRouter;
