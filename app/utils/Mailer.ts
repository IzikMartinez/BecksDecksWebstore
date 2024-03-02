// mailer.ts
import nodemailer from 'nodemailer';

export async function sendEmail(
    recipient: string,
    subject: string,
    text: string
) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-password',
        },
    });

    return await transporter.sendMail({
        from: 'your-email@gmail.com',
        to: recipient,
        subject: subject,
        text: text,
    });
}