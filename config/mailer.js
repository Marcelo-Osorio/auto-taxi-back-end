const nodemailer = require('nodemailer');
const { config } = require('./config');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.USER_EMAIL_MAILER,
    pass: config.USER_PASS_MAILER,
  },
});

transporter.verify().then(() => {
  console.log("Ready to send emails");
});


module.exports = {transporter};
