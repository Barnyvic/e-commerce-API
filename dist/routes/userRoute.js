"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
const userController_1 = require("../controllers/userController");
userRouter.route('/signup').post(userController_1.createUser);
exports.default = userRouter;
