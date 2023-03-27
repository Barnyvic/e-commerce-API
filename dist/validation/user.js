"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateProduct = exports.validateUpdateUserProfile = exports.validateLoginUser = exports.validateSignupData = void 0;
const joi_1 = __importDefault(require("joi"));
// when the user signs up
const validateSignupData = (user) => {
    const shcema = joi_1.default.object({
        firstName: joi_1.default.string().min(3).max(25).required(),
        lastName: joi_1.default.string().min(3).max(25).required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string()
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$'))
            .required(),
        confirmPassword: joi_1.default.ref('password'),
        phone: joi_1.default.string().min(9).max(15),
    });
    return shcema.validate(user);
};
exports.validateSignupData = validateSignupData;
// when the user logs in
const validateLoginUser = (login) => {
    const loginShcema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
    });
    return loginShcema.validate(login);
};
exports.validateLoginUser = validateLoginUser;
const validateUpdateUserProfile = (updateProfile) => {
    const UpdateProfileshcema = joi_1.default.object({
        firstName: joi_1.default.string().min(3).max(25).required(),
        lastName: joi_1.default.string().min(3).max(25).required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string()
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$'))
            .required(),
        confirmPassword: joi_1.default.ref('password'),
        phone: joi_1.default.string().min(9).max(15),
    });
    return UpdateProfileshcema.validate(updateProfile);
};
exports.validateUpdateUserProfile = validateUpdateUserProfile;
const validateCreateProduct = (products) => {
    const shcema = joi_1.default.object({
        name: joi_1.default.string().min(3).max(25).required(),
        category: joi_1.default.array().items(joi_1.default.string()).required(),
        description: joi_1.default.string().required(),
        price: joi_1.default.number().required(),
        sizes: joi_1.default.array().items(joi_1.default.string().required()),
        rating: joi_1.default.string().min(9).max(15),
    });
    return shcema.validate(products);
};
exports.validateCreateProduct = validateCreateProduct;
