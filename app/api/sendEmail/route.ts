import {NextRequest, NextResponse} from "next/server";
import {google} from "googleapis"
import nodemailer from "nodemailer";
import {cartItem} from "@/app/GlobalRedux/cartSlice";

export async function POST(request: NextRequest){
    if (!process.env.EMAIL_USER) {
        throw new Error('Environment variables for email credentials are not set');
    }

    const OAuth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URI
    )

    OAuth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN
    })

    const {recipient, orderNumber, message, total, cart} = await request.json()
    if (!recipient || !orderNumber || !message || !total || !cart) {
        return NextResponse.json({message: 'Recipient, subject and message must be included in the request'}, {status: 500});
    }
    const ACCESS_TOKEN = await OAuth2Client.getAccessToken()
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL_USER,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: ACCESS_TOKEN.token?.toString(),
        },
        tls: {
            "rejectUnauthorized": true
        }
    })

    let cartItems = cart.map((item: cartItem) =>
        `<p>Name: ${item.name}, Price: ${item.price}, Quantity: ${item.quantity}</p><br>`
    ).join('')

    const mailOptions = {
        from: {
            name: 'DoNotReply.SparklingCityLGS',
            address: process.env.EMAIL_USER
        },
        to: `${recipient}`,
        subject: `${orderNumber}`,
        text: "If you can read this, your tea is ready",
        html: `
        <b>Payment confirmation for order ${orderNumber}</b><br>
        <b>This is an automated message, please do not attempt to reply.</b><br><br>
        <b>${cartItems}</b>
        <b>Price: \$${(total).toFixed(2)}</b><br>
        <b>Tax: \$${(total*0.0825).toFixed(2)}</b><br>
        <b>Total Price: \$${(total*1.0825).toFixed(2)}</b><br>
        <b>${message}</b>
        `
    }
    try {
        await transporter.sendMail(mailOptions)
        return NextResponse.json({message: "Email sent successfully"}, {status: 200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({message: `Failed to send mail`, error: error}, {status: 500})
    }
}