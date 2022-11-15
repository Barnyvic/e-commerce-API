import mailgun from 'mailgun-js';
import dotenv from 'dotenv';
dotenv.config();

const DOMAIN = process.env.MAIL_GUN_DOMAIN_NAME as string;
const mg = mailgun({
    apiKey: process.env.MAIL_GUN_API as string,
    domain: DOMAIN,
});

const sendEmail = async (email: string, subject: string, message: string) => {
    try {
        const data = {
            from: 'Barny Victor <barnyvictor50@gmail.com>',
            to: email,
            subject: subject,
            text: message,
        };

        await mg.messages().send(data);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

export default sendEmail;
