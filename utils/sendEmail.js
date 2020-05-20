const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (message,callback) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        port: 587,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    await transporter.sendMail(message, (err, info) => {
        if (err) {
            return err;
        }
        callback()
        transporter.close();
    });
}

module.exports = sendEmail;