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
exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const response_1 = require("../utils/response");
//@desc Register new user
//@route POST /register
//@access Public
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password, phone, confirmPassword } = req.body;
        //    making sure all fields are valid
        if (!email ||
            !password ||
            !firstName ||
            !lastName ||
            !phone ||
            !confirmPassword) {
            return (0, response_1.errorResponse)(res, 400, 'Please Fill empty fields');
        }
        //   confirming password
        if (password !== confirmPassword) {
            return (0, response_1.errorResponse)(res, 400, 'PassWord must Match');
        }
        const emialExist = yield userModel_1.default.findOne({ email });
        if (emialExist)
            return (0, response_1.errorResponse)(res, 409, 'email already in use by another user');
        const phoneExist = yield userModel_1.default.findOne({ phone });
        if (phoneExist)
            return (0, response_1.errorResponse)(res, 409, 'Phone Number already in use by another user');
        yield userModel_1.default.create({
            firstName,
            lastName,
            email,
            phone,
            password,
        });
    }
    catch (error) {
        (0, response_1.handleError)(req, error);
        return (0, response_1.errorResponse)(res, 500, 'Server error.');
    }
});
exports.createUser = createUser;
