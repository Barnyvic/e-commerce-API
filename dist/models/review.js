"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId },
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product' },
    text: { type: String, require: true },
});
const Reviews = (0, mongoose_1.model)('Review', reviewSchema);
exports.default = Reviews;
