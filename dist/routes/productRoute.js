"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const auth_1 = require("../middlewares/auth");
const upload_1 = __importDefault(require("../middlewares/upload"));
const productRouter = (0, express_1.Router)();
productRouter.route('/').post(auth_1.authguard, productController_1.createNewProduct).get(productController_1.getAllProducts);
productRouter
    .route('/:productid')
    .get(productController_1.getProduct)
    .put(auth_1.authguard, productController_1.updateProduct)
    .delete(auth_1.authguard, productController_1.deleteProduct);
productRouter
    .route('/uploadimage/:productid')
    .patch(auth_1.authguard, upload_1.default.array('image'), productController_1.uplooadProductImages);
productRouter.route('/like/:productid').put(auth_1.authguard, productController_1.likeProduct);
productRouter.route('/unlike/:productid').put(auth_1.authguard, productController_1.unlikeProduct);
exports.default = productRouter;
