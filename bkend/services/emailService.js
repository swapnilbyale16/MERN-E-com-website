const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text, html) => {
    try {
        if (!to) {
            throw new Error("Recipient email address is missing!");
        }

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "swapnilbyale16@gmail.com",
                pass: "ttfdzcdnwmsgvymf" // Replace with App Password, never share real passwords
            }
        });

        let mailOptions = {
            from: '"Your Shop" <swapnilbyale16@gmail.com>',
            to, // Dynamically assign recipient email
            subject,
            text,
            html
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.messageId);
    } catch (error) {
        console.error("Error sending email: ", error.message);
    }
};

module.exports = sendEmail;
