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
exports.uploadProfilePicture = exports.updateProfile = exports.login = exports.createUser = void 0;
const jwt_1 = require("../utils/jwt");
// import sendEmail from '../service/mailgun';
const email_1 = __importDefault(require("../utils/email"));
const otp_generator_1 = __importDefault(require("otp-generator"));
const userModel_1 = __importDefault(require("../models/userModel"));
const Otp_1 = __importDefault(require("../models/Otp"));
const response_1 = require("../utils/response");
const hash_1 = require("../utils/hash");
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
        const hash = yield (0, hash_1.hashPassword)(password);
        // save user to db
        const user = yield userModel_1.default.create({
            firstName,
            lastName,
            email,
            phone,
            password: hash,
        });
        // generate otp
        const otp = otp_generator_1.default.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });
        yield Otp_1.default.create({ email, token: otp });
        const subject = 'User created';
        const message = `hi, thank you for signing up kindly verify your account with this token ${otp}`;
        yield (0, email_1.default)(email, subject, message);
        return (0, response_1.successResponse)(res, 201, 'Account created successfully, kindly verify your email and login.', user);
    }
    catch (error) {
        (0, response_1.handleError)(req, error);
        return (0, response_1.errorResponse)(res, 500, 'Server error.');
    }
});
exports.createUser = createUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return (0, response_1.errorResponse)(res, 400, 'please fill all fields');
        const user = yield userModel_1.default.findOne({ email });
        if (!user)
            return (0, response_1.errorResponse)(res, 404, 'user not found');
        const isPassword = yield (0, hash_1.comparePassword)(password, user.password);
        if (!isPassword)
            return (0, response_1.errorResponse)(res, 400, 'incorrect password');
        const token = yield (0, jwt_1.generateToken)({
            id: user.id,
            email: user.email,
            role: user.role,
        });
        return (0, response_1.successResponse)(res, 200, 'user logged in successfully', {
            user,
            token,
        });
    }
    catch (error) {
        (0, response_1.handleError)(req, error);
        return (0, response_1.errorResponse)(res, 500, 'Server error.');
    }
});
exports.login = login;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        const { email, firstName, lastName, phone } = req.body;
        const user = yield userModel_1.default.findById(_id);
        if (!user)
            return (0, response_1.errorResponse)(res, 404, 'user not found');
        if (user.id.toString() != _id)
            return (0, response_1.errorResponse)(res, 404, 'user not authorized');
        const profile = yield userModel_1.default.findByIdAndUpdate({ _id }, { email, firstName, lastName, phone }, { new: true });
        return (0, response_1.successResponse)(res, 200, 'user profile updated successfully', profile);
    }
    catch (error) {
        (0, response_1.handleError)(req, error);
        return (0, response_1.errorResponse)(res, 500, 'Server error.');
    }
});
exports.updateProfile = updateProfile;
const uploadProfilePicture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { _id } = req.user;
        const user = yield userModel_1.default.findByIdAndUpdate(_id, { photo: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path }, { new: true });
        return (0, response_1.successResponse)(res, 200, 'picture uploaded successfully', user);
    }
    catch (error) {
        (0, response_1.handleError)(req, error);
        return (0, response_1.errorResponse)(res, 500, 'Server error.');
    }
});
exports.uploadProfilePicture = uploadProfilePicture;
