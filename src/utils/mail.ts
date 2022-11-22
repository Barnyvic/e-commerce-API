import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
let transporter: any;

const sendEmail = async (email: string, subject: string, message: string) => {
  //1. create a transporter
  transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: subject,
    html: message,
  };

  transporter.sendMail(mailOptions, function (error: any) {
    if (error) {
      console.log(error.message, '>>>>');
    } else {
      console.log('Message Sent>>>');
    }
  });
};

export default sendEmail
