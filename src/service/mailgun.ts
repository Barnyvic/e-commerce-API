import mailgun from 'mailgun-js';
const DOMAIN = process.env.MAIL_GUN_DOMAIN_NAME as string;
const mg = mailgun({
    apiKey: process.env.MAIL_GUN_API as string,
    domain: DOMAIN,
});
const data = {
    from: 'Barny Victor <barnyvictor50@gmail.com>',
    to: 'bar@example.com, YOU@YOUR_DOMAIN_NAME',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomness!',
};
mg.messages().send(data, function (error: any, body) {
    console.log(body);
});
