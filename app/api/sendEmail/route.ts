import {NextRequest, NextResponse} from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest){
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error('Environment variables for email credentials are not set');
    }

    const {subject, message} = await request.json()
    if (!subject || !message) {
        throw new Error('Subject and message must be included in the request');
    }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
    })
    const mailOptions = {
        from: {
            name: 'Web Master',
            address: process.env.EMAIL_USER
        },
        to: "isaacrcm@protonmail.com",
        subject: "nodemail test (gl)",
        text: "If you can read this, your tea is ready",
        html: `
        <b>title: ${subject}</b>
        <b>message: ${message}</b>
        `
    }
    try {
        await transporter.sendMail(mailOptions)
        return NextResponse.json({message: "Email sent successfully"}, {status: 200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({message: "Failed to send email", error: error}, {status: 500})
    }
}