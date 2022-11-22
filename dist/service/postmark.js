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
const postmark_1 = __importDefault(require("postmark"));
const client = new postmark_1.default.ServerClient('9b8fbc09-a91a-4613-8eda-4071381db4e9');
const sendEmailOTP = (email, subject, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        client.sendEmail({
            From: 'victor.barny@gsasconnect.net',
            To: email,
            Subject: subject,
            HtmlBody: '<strong>Hello</strong> dear Postmark user.',
            TextBody: message,
            MessageStream: 'outbound',
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = sendEmailOTP;
