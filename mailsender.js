const nodemailer = require("./nodejs/node_modules/nodemailer");
const { message } = require("./message.js");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_FORM_HOST,
  port: process.env.MAIL_FORM_PORT,
  auth: {
    user: process.env.MAIL_FORM_SMPT_USER,
    pass: process.env.MAIL_FORM_SMPT_PW,
  },
});

exports.mailsender = (formData, file) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(message(formData, file), (error, info) =>
      error ? reject(error) : resolve(info)
    );
  });
};
