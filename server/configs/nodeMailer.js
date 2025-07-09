import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";

const TOKEN = process.env.MAILTRAP_TOKEN;

const transport = nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
    testInboxId: 3878364,
  })
);

const sendEmail = async ({ to, subject, body }) => {
  const sender = {
    address: "hello@example.com",
    name: "Mailtrap Test",
  };
  const recipients = ["timaz.dev@gmail.com"];
  const response = await transport.sendMail({
    from: process.env.SENDER_EMAIL,
    to,
    subject,
    html: body,
  });
  return response;
};

export default sendEmail;
