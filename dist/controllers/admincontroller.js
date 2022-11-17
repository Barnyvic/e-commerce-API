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
exports.createVendor = void 0;
// import sendEmail from '../service/mailgun';
const email_1 = __importDefault(require("../utils/email"));
const otp_generator_1 = __importDefault(require("otp-generator"));
const userModel_1 = __importDefault(require("../models/userModel"));
const Otp_1 = __importDefault(require("../models/Otp"));
const response_1 = require("../utils/response");
const hash_1 = require("../utils/hash");
const createVendor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password, phone, confirmPassword, role, } = req.body;
        //    making sure all fields are valid
        if (!email ||
            !password ||
            !firstName ||
            !lastName ||
            !phone ||
            !confirmPassword ||
            !role) {
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
        const hash = yield (0, hash_1.hashPassword)(password);
        // save user to db
        const vendor = yield userModel_1.default.create({
            firstName,
            lastName,
            email,
            phone,
            password: hash,
            role,
        });
        // generate otp
        const otp = otp_generator_1.default.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });
        console.log(otp);
        yield Otp_1.default.create({ email, token: otp });
        const subject = 'Vendor created';
        const message = `hi, thank you for signing up kindly verify your account with this token ${otp}`;
        console.log(subject);
        yield (0, email_1.default)(email, subject, message);
        return (0, response_1.successResponse)(res, 201, 'Account created successfully, kindly verify your email and login.', vendor);
    }
    catch (error) {
        (0, response_1.handleError)(req, error);
        return (0, response_1.errorResponse)(res, 500, 'Server error.');
    }
});
exports.createVendor = createVendor;
