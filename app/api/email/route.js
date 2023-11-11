import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  const { gotSaved, email, message } = await request.json();

  const transport = nodemailer.createTransport({
    service: 'gmail',
    /*
      setting service as 'gmail' is same as providing these settings:
      host: "smtp.gmail.com",
      port: 465,
      secure: true
      If you want to use a different email provider other than gmail, you need to provide these manually.
      Or you can go use these well known services and their settings at
      https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
  */
    auth: {
      user: process.env.CONTACT_FORM_EMAIL,
      pass: process.env.CONTACT_FORM_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.CONTACT_FORM_EMAIL,
    to: process.env.CONTACT_FORM_EMAIL,
    // cc: email, (uncomment this line if you want to send a copy to the sender)
    subject: 'Message from BW2H',
    text: `
      Email: ${email}
      Got saved: ${gotSaved ? 'Yes' : 'No'}
      Message:
      ${message}`,
  };

  const sendMailPromise = () =>
    new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve('Email sent');
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: 'Email sent' });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
