"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.getAproductReview = exports.getReviews = exports.createReview = void 0;
const review_1 = __importDefault(require("../models/review"));
const productmodels_1 = __importDefault(require("../models/productmodels"));
const userModel_1 = __importDefault(require("../models/userModel"));
const response_1 = require("../utils/response");
//@desc Create a  new Reviews
//@route POST /register
//@access Private
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text } = req.body;
        const { productid } = req.params;
        const { _id } = req.user;
        const user = yield userModel_1.default.findById(_id);
        if (user === null || user === void 0 ? void 0 : user.role.includes('vendor'))
            return (0, response_1.errorResponse)(res, 401, 'You are not authorided');
        const product = yield productmodels_1.default.findById(productid);
        const review = yield review_1.default.create({
            user: user === null || user === void 0 ? void 0 : user.id,
            text,
            product: product === null || product === void 0 ? void 0 : product.id,
        });
        return (0, response_1.successResponse)(res, 201, 'Product created successfully....', review);
    }
    catch (error) {
        (0, response_1.handleError)(req, error);
        return (0, response_1.errorResponse)(res, 500, 'Server error.');
    }
});
exports.createReview = createReview;
const getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield review_1.default.find().populate('product', { image: 1 });
        if (!review)
            return (0, response_1.errorResponse)(res, 404, 'Product not found');
        return (0, response_1.successResponse)(res, 200, 'List Of all products....', review);
    }
    catch (error) {
        (0, response_1.handleError)(req, error);
        return (0, response_1.errorResponse)(res, 500, 'Server error.');
    }
});
exports.getReviews = getReviews;
const getAproductReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getAproductReview = getAproductReview;
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { reviewid } = req.params;
        const { _id } = req.user;
        const review = yield review_1.default.findById(reviewid);
        if ((_id === null || _id === void 0 ? void 0 : _id.toString()) === ((_a = review === null || review === void 0 ? void 0 : review.user) === null || _a === void 0 ? void 0 : _a.toString())) {
            yield review_1.default.findByIdAndDelete(reviewid);
            return (0, response_1.successResponse)(res, 204, 'Product Deleted successfully..');
        }
    }
    catch (error) {
        (0, response_1.handleError)(req, error);
        return (0, response_1.errorResponse)(res, 500, 'Server error.');
    }
});
exports.deleteReview = deleteReview;
