"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewController_1 = require("../controllers/reviewController");
const auth_1 = require("../middlewares/auth");
const reviewRouter = (0, express_1.Router)();
reviewRouter.route('/').get(reviewController_1.getReviews);
reviewRouter
    .route('/:reviewid')
    .delete(auth_1.authguard, reviewController_1.deleteReview)
    .post(auth_1.authguard, reviewController_1.createReview);
exports.default = reviewRouter;
