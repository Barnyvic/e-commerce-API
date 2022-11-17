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
exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getAllProducts = exports.uplooadProductImages = exports.createNewProduct = void 0;
const productmodels_1 = __importDefault(require("../models/productmodels"));
const userModel_1 = __importDefault(require("../models/userModel"));
const response_1 = require("../utils/response");
//@desc Create a  new Product
//@route POST /register
//@access Public
const createNewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, category, description, price, sizes, rating } = req.body;
        const { _id } = req.user;
        const user = yield userModel_1.default.findById(_id);
        if (user === null || user === void 0 ? void 0 : user.role.includes('user'))
            return (0, response_1.errorResponse)(res, 401, 'You are not authorided');
        const product = yield productmodels_1.default.create({
            owner: user === null || user === void 0 ? void 0 : user.id,
            name,
            category,
            description,
            price,
            sizes,
            rating,
        });
        return (0, response_1.successResponse)(res, 201, 'Product created successfully....', product);
    }
    catch (error) {
        (0, response_1.handleError)(req, error);
        return (0, response_1.errorResponse)(res, 500, 'Server error.');
    }
});
exports.createNewProduct = createNewProduct;
//@desc Upload product image
//@route POST /upload-image/:productid
//@access Private
const uplooadProductImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { productid } = req.params;
        const product = yield productmodels_1.default.findById(productid);
        const id = (_a = product === null || product === void 0 ? void 0 : product.owner) === null || _a === void 0 ? void 0 : _a.toString();
        const { _id } = req.user;
        if ((_id === null || _id === void 0 ? void 0 : _id.toString()) === id) {
            const product = yield productmodels_1.default.findByIdAndUpdate(productid, {
                images: (_b = req.file) === null || _b === void 0 ? void 0 : _b.path,
            }, { new: true }).select('-password');
            return (0, response_1.successResponse)(res, 200, 'Image successfully uploaded....', product);
        }
        else {
            return (0, response_1.errorResponse)(res, 401, 'You are not authorided');
        }
    }
    catch (error) {
        (0, response_1.handleError)(req, error);
        return (0, response_1.errorResponse)(res, 500, 'Server error.');
    }
});
exports.uplooadProductImages = uplooadProductImages;
//@desc get all Products
//@route GET /
//@access Public
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const New = req.query.new;
        const Category = req.query.category;
        let products;
        if (New) {
            products = yield productmodels_1.default.find().sort({ createdAt: -1 });
        }
        else if (Category) {
            products = yield productmodels_1.default.find({ category: { $in: [Category] } });
        }
        else {
            products = yield productmodels_1.default.find();
        }
        if (!products)
            return (0, response_1.errorResponse)(res, 404, 'Product not found');
        return (0, response_1.successResponse)(res, 200, 'List Of all products....', products);
    }
    catch (error) {
        (0, response_1.handleError)(req, error);
        return (0, response_1.errorResponse)(res, 500, 'Server error.');
    }
});
exports.getAllProducts = getAllProducts;
//@desc get a  particular Product
//@route GET /:productid
//@access Public
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const singleProduct = yield productmodels_1.default.findById(req.params.productid);
        if (!singleProduct)
            return (0, response_1.errorResponse)(res, 404, 'Product not found');
        return (0, response_1.successResponse)(res, 200, 'Product....', singleProduct);
    }
    catch (error) {
        (0, response_1.handleError)(req, error);
        return (0, response_1.errorResponse)(res, 500, 'Server error.');
    }
});
exports.getProduct = getProduct;
//@desc Update a Product
//@route PUT /:productid
//@access Private
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { _id } = req.user;
        const { productid } = req.params;
        const products = yield productmodels_1.default.findById(productid);
        if ((_id === null || _id === void 0 ? void 0 : _id.toString()) === ((_c = products === null || products === void 0 ? void 0 : products.owner) === null || _c === void 0 ? void 0 : _c.toString())) {
            const updatedProduct = yield productmodels_1.default.updateOne({
                $set: req.body,
            });
            return (0, response_1.successResponse)(res, 200, 'Product Updated....', updatedProduct);
        }
    }
    catch (error) {
        (0, response_1.handleError)(req, error);
        return (0, response_1.errorResponse)(res, 500, 'Server error.');
    }
});
exports.updateProduct = updateProduct;
//@desc delete a Product
//@route Delete /:productid
//@access Private
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const { _id } = req.user;
        const { productid } = req.params;
        const products = yield productmodels_1.default.findById(productid);
        if ((_id === null || _id === void 0 ? void 0 : _id.toString()) === ((_d = products === null || products === void 0 ? void 0 : products.owner) === null || _d === void 0 ? void 0 : _d.toString())) {
            yield productmodels_1.default.findByIdAndDelete(productid);
            return (0, response_1.successResponse)(res, 204, 'Product Deleted successfully..');
        }
    }
    catch (error) {
        (0, response_1.handleError)(req, error);
        return (0, response_1.errorResponse)(res, 500, 'Server error.');
    }
});
exports.deleteProduct = deleteProduct;
