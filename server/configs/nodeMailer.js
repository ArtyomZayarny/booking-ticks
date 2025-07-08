import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async ({ to, subject, body }) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to,
    subject,
    html: body,
  };

  const response = await transport.sendMail(mailOptions);

  return response;
};

export default sendEmail;
