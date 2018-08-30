import nodemailer from 'nodemailer';

export const sendMail = (sender, receiver, message) => {
    const transport =  nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    })

    const mailOptions = {
        from: sender, // sender address
        to: receiver, // list of receivers
        subject: 'Password Reset', // Subject line
        html: `
            <center><p>Your reset token </p>{$}</center>
        `// plain text body
}
}

export default {
    sendMail
}