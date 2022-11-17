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
const API_KEY = process.env.MAIL_GUN_API;
const DOMAIN = process.env.MAIL_GUN_DOMAIN_NAME;
const form_data_1 = __importDefault(require("form-data"));
const mailgun_js_1 = __importDefault(require("mailgun.js"));
const mailgun = new mailgun_js_1.default(form_data_1.default);
const client = mailgun.client({ username: 'Victor barny', key: API_KEY });
const sendEmail = (email, subject, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messageData = {
            from: 'Barny Victor <barnyvictor50@gmail.com>',
            to: email,
            subject: subject,
            text: message,
        };
        yield client.messages.create(DOMAIN, messageData);
        console.log(messageData);
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = sendEmail;
