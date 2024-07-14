import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fetch from 'node-fetch';
import { z } from 'zod';

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

console.log('API MAIL');

const RecaptchaResponseSchema = z.object({
  success: z.boolean(),
  challenge_ts: z.string().optional(),
  hostname: z.string().optional(),
  score: z.number().optional(),
  action: z.string().optional(),
  'error-codes': z.array(z.string()).optional(),
});

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, phoneNumber, message, token } = await req.json();

  if (!firstName || !lastName || !email || !message || !token) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  // Verify reCAPTCHA token
  const recaptchaRes = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`
  });

  const recaptchaData = await recaptchaRes.json();
  const parsedRecaptchaData = RecaptchaResponseSchema.safeParse(recaptchaData);

  if (!parsedRecaptchaData.success) {
    return NextResponse.json({ error: 'Invalid reCAPTCHA response', details: parsedRecaptchaData.error.errors }, { status: 400 });
  }

  if (!parsedRecaptchaData.data.success) {
    return NextResponse.json({ error: 'Invalid reCAPTCHA token' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.RECEIVER_EMAIL,
      subject: `Contact form submission from ${firstName} ${lastName}`,
      text: `Message: ${message}\n\nPhone: ${phoneNumber}`,
    });

    return NextResponse.json({ success: 'Email sent' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email', details: error.message }, { status: 500 });
  }
}
