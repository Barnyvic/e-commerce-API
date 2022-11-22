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
<<<<<<< HEAD
exports.verifyVendor = exports.verifyAdmin = exports.authguard = void 0;
=======

exports.verifyAdmin = exports.authguard = void 0;

exports.verifyVendor = exports.verifyAdmin = exports.authguard = void 0;

>>>>>>> 38f6881a10a6c91725295cff3baa62d772704e9e
const jwt_1 = require("../utils/jwt");
const userModel_1 = __importDefault(require("../models/userModel"));
const response_1 = require("../utils/response");
const authguard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.headers && req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = yield (0, jwt_1.decodeToken)(token);
            const user = yield userModel_1.default.findById(decoded.id);
            if (!user)
                return (0, response_1.errorResponse)(res, 404, 'user not found');
            req.user = user;
            return next();
        }
        else {
            return (0, response_1.errorResponse)(res, 401, 'Authorization not found');
        }
    }
    catch (error) {
        return (0, response_1.errorResponse)(res, 500, error.message);
    }
});
exports.authguard = authguard;
const verifyAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        const admin = userModel_1.default.findOne({ _id, role: 'admin' });
        if (!admin)
            return (0, response_1.errorResponse)(res, 401, 'unauthorized access');
        return next();
    }
    catch (error) {
        return (0, response_1.errorResponse)(res, 500, error.message);
    }
});
exports.verifyAdmin = verifyAdmin;
<<<<<<< HEAD
=======

>>>>>>> 38f6881a10a6c91725295cff3baa62d772704e9e
const verifyVendor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        const vendor = userModel_1.default.findOne({ _id, role: 'vendor' });
        if (!vendor)
            return (0, response_1.errorResponse)(res, 401, 'unauthorized access');
        return next();
    }
    catch (error) {
        return (0, response_1.errorResponse)(res, 500, error.message);
    }
});
exports.verifyVendor = verifyVendor;
<<<<<<< HEAD
=======

>>>>>>> 38f6881a10a6c91725295cff3baa62d772704e9e
