"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminRouter = (0, express_1.Router)();
const admincontroller_1 = require("../controllers/admincontroller");
const auth_1 = require("../middlewares/auth");
adminRouter.route('/create').post(auth_1.authguard, auth_1.verifyAdmin, admincontroller_1.createVendor);
exports.default = adminRouter;
