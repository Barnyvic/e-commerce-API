"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwtSecret = process.env.JWT_SECRET;
const generateToken = (payload, Secret = jwtSecret) => {
    const token = jsonwebtoken_1.default.sign(payload, Secret, {
        expiresIn: '4h',
    });
    return token;
};
exports.generateToken = generateToken;
