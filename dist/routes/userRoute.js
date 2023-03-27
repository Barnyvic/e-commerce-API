"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middlewares/auth");
const upload_1 = __importDefault(require("../middlewares/upload"));
const Validate_1 = require("../middlewares/Validate");
userRouter.route('/signup').post(Validate_1.validateSignupMiddleware, userController_1.createUser);
userRouter.route('/login').get(Validate_1.validateLoginMiddleware, userController_1.login);
userRouter
    .route('/upload')
    .put(auth_1.authguard, upload_1.default.array('image'), userController_1.uploadProfilePicture);
userRouter
    .route('/update')
    .patch(auth_1.authguard, Validate_1.validateUpdateUserMiddleware, userController_1.updateProfile);
exports.default = userRouter;
