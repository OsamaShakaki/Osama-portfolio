import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { isRateLimited } from '@/lib/rateLimiter';

function escapeHtml(str: string) {
    if (!str) return '';
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
    try {
        // Rate Limiting (5 requests per 15 minutes)
        const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
                   req.headers.get('x-real-ip') || 
                   '127.0.0.1';
        if (isRateLimited(ip, { limit: 5, windowMs: 15 * 60 * 1000 })) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        const { name, email, subject, message } = await req.json();

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER || '',
                pass: process.env.EMAIL_APP_PASSWORD || ''
            },
        });

        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeSubject = escapeHtml(subject || 'No Subject');
        const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

        // Email options
        const mailOptions = {
            from: `"Portfolio Contact" <${process.env.EMAIL_USER || ''}>`,
            to: process.env.EMAIL_USER || '',
            replyTo: safeEmail,
            subject: `🔔 New Message: ${safeSubject}`,
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
                <body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#0a0a0a;padding:40px 20px;">
                        <tr><td align="center">
                            <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color:#111111;border-radius:16px;overflow:hidden;border:1px solid #222;">
                                <!-- Header with gradient -->
                                <tr><td style="background:linear-gradient(135deg,#2563eb,#6366f1,#8b5cf6);padding:32px 40px;">
                                    <h1 style="color:#fff;font-size:22px;font-weight:700;margin:0 0 6px;letter-spacing:0.5px;">📬 New Contact Message</h1>
                                    <p style="color:rgba(255,255,255,0.8);font-size:13px;margin:0;">You received a new message from your portfolio website</p>
                                </td></tr>
                                <!-- Content -->
                                <tr><td style="padding:32px 40px;">
                                    <!-- Sender Info Card -->
                                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#1a1a1a;border-radius:12px;border:1px solid #2a2a2a;margin-bottom:24px;">
                                        <tr><td style="padding:20px 24px;">
                                            <p style="font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#6366f1;font-weight:700;margin:0 0 12px;">Sender Information</p>
                                            <table role="presentation" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td style="padding:4px 0;"><span style="color:#666;font-size:13px;font-weight:600;">Name:</span></td>
                                                    <td style="padding:4px 0 4px 12px;"><span style="color:#e5e5e5;font-size:13px;">${safeName}</span></td>
                                                </tr>
                                                <tr>
                                                    <td style="padding:4px 0;"><span style="color:#666;font-size:13px;font-weight:600;">Email:</span></td>
                                                    <td style="padding:4px 0 4px 12px;"><a href="mailto:${safeEmail}" style="color:#6366f1;font-size:13px;text-decoration:none;">${safeEmail}</a></td>
                                                </tr>
                                            </table>
                                        </td></tr>
                                    </table>
                                    <!-- Message Card -->
                                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#1a1a1a;border-radius:12px;border:1px solid #2a2a2a;">
                                        <tr><td style="padding:20px 24px;">
                                            <p style="font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#6366f1;font-weight:700;margin:0 0 12px;">Message</p>
                                            <p style="color:#d4d4d4;font-size:14px;line-height:1.7;margin:0;white-space:pre-wrap;">${safeMessage}</p>
                                        </td></tr>
                                    </table>
                                    <!-- Reply Button -->
                                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:24px;">
                                        <tr><td align="center">
                                            <a href="mailto:${safeEmail}?subject=Re: ${safeSubject}" style="display:inline-block;padding:12px 32px;background:linear-gradient(135deg,#2563eb,#6366f1);color:#fff;font-size:13px;font-weight:700;text-decoration:none;border-radius:8px;letter-spacing:0.5px;">↩ Reply to ${safeName}</a>
                                        </td></tr>
                                    </table>
                                </td></tr>
                                <!-- Footer -->
                                <tr><td style="padding:20px 40px;border-top:1px solid #222;">
                                    <p style="color:#555;font-size:11px;margin:0;text-align:center;">This email was sent from your portfolio contact form • ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </td></tr>
                            </table>
                        </td></tr>
                    </table>
                </body>
                </html>
            `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send email. Ensure Gmail App Password is set.' }, { status: 500 });
    }
}
