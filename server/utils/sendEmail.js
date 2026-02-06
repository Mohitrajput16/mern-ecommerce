import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // 1. Create a Transporter (The "Postman")
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2. Define the Email Options
  const mailOptions = {
    from: `"MERN Shop" <${process.env.EMAIL_USER}>`, // Sender address
    to: options.email, // Receiver address
    subject: options.subject, // Subject line
    html: options.message, // HTML body
  };

  // 3. Send the Email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;