const nodemailer = require('nodemailer');
require('dotenv').config();

const smtpPool = require('nodemailer/lib/smtp-pool');
const sendEmail = async (message,callback) => {
    const transporter = nodemailer.createTransport(new smtpPool({
        host: "smtp-mail.outlook.com", 
        secureConnection: false, 
        tls: {
           ciphers:'SSLv3'
        },
        auth: {
            user: "exzzemple.sender@outlook.com",
            pass: `i"+Mv!;8vV<PN9t`,
        },
    }));

    transporter.sendMail(message, (err, info) => {
        console.log(message)
        
        if (err) {
            console.log('Err sent: ' + JSON.stringify(err));
            return err; 
        }
        
        console.log('Email sent: ' + info.response);
        callback()
        transporter.close();
    });

}

module.exports = sendEmail;