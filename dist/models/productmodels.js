"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    owner: { type: mongoose_1.default.Types.ObjectId, ref: 'users' },
    name: { type: String, required: true },
    category: { type: Array, required: true },
    description: { type: String, required: true },
    images: [String],
    price: { type: Number, required: true },
    sizes: [String],
    noOfReviews: { type: Number, default: 0 },
    instock: { type: Boolean, default: true },
    likes: [{ type: mongoose_1.default.Types.ObjectId, ref: 'users' }],
    rating: { type: Number },
    review: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Review' },
}, { timestamps: true });
const Products = mongoose_1.default.model('Product', productSchema);
exports.default = Products;
