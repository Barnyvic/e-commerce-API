"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mailgun_js_1 = __importDefault(require("mailgun-js"));
const DOMAIN = process.env.MAIL_GUN_DOMAIN_NAME;
const mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAIL_GUN_API,
    domain: DOMAIN,
});
const data = {
    from: 'Barny Victor <me@samples.mailgun.org>',
    to: 'bar@example.com, YOU@YOUR_DOMAIN_NAME',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomness!',
};
mg.messages().send(data, function (error, body) {
    console.log(body);
});
