// utils/sendInviteEmail.ts
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
export const sendInviteEmail = async (to: string, link: string): Promise<void> => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    await transporter.sendMail({
        from: '"LMS Team" <no-reply@lms.com>',
        to,
        subject: "You're invited to register",
        html: `<p>Click <a href="${link}">here</a> to register. This link is valid for one-time use only.</p>`
    });
};