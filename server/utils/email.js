const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (option) => {
    // Create a Transporter
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            password: process.env.EMAIL_PASSWORD
        }
    })

    // Define Email Options
    const emailOptions = {
        from: 'BookMyMeal support<support@bookmymeal.com>',
        to: option.email,
        subject: option.subject,
        text: option.message
    }

    await transporter.sendMail(emailOptions);
}

module.exports = sendEmail;