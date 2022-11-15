import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const msg: any = {
  from: `ecommerce <${process.env.SENGRID_EMAIL}>`,
  mail_setting: { sandbox_mode: { enable: false } },
};

() => {
  msg.mail_setting.sandbox_mode.enable = true;
};

const sendEmail = async (email: string, subject: string, message: string) => {
  try {
    (msg.to = email),
      (msg.subject = subject),
      (msg.text = message),
      await sgMail.send(msg);
    console.log('message sent');
  } catch (error) {
    return error;
  }
};

export default sendEmail;
