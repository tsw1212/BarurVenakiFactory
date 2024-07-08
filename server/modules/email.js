const factoryServices = require('../services/factoryServices');
const nodemailer = require('nodemailer');




async function sendEmail(subject, text, email) {
    const factoryData = await factoryServices.getFactoryByName(process.env.FACTORY_NAME)

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: factoryData.email,
            pass: factoryData.passwordEmail,
        },
    });

    const mailOptions = {
        from: factoryData.email,
        to: email,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(factoryData);
            // throw error;
        }
    }
    )
}

module.exports = sendEmail
    ;