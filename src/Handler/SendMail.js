const nodemailer = require("nodemailer");
const { SMTP_EMAIL, SMTP_PASSWORD } = process.env



// async..await is not allowed in global scope, must use a wrapper
async function sendMail(email, mailsubject, content) {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: SMTP_EMAIL,
            pass: SMTP_PASSWORD
        }
    });


    // send mail with defined transport object
    transporter.sendMail({
        from: SMTP_EMAIL, // sender address
        to: email, // list of receivers
        subject: mailsubject, // Subject line
        html: content, // html body
    }, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}


module.exports = sendMail

