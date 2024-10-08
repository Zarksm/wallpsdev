import nodemailer from 'nodemailer';

export async function POST(req) {
    const { name, message } = await req.json();

    if (!name || !message) {
        return new Response(JSON.stringify({ error: 'Name and message are required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER,
            subject: `Image Request from ${name}`,
            text: `You have received a new message from ${name}: \n\n${message}`,
        };

        await transporter.sendMail(mailOptions);

        return new Response(JSON.stringify({ message: 'Request sent successfully!' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ error: 'Error sending email' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
