const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { type, to, userEmail, userPassword, slotDate, slotTime } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let subject = '';
  let text = '';

  if (type === 'login-info') {
    subject = 'FitFlow Login Credentials';
    text = `Welcome to FitFlow!\n\nEmail: ${userEmail}\nPassword: ${userPassword}\n\nPlease login and book your gym slot.`;
  } else if (type === 'booking') {
    subject = 'FitFlow Booking Confirmation';
    text = `Your gym slot has been successfully booked.\n\nDate: ${slotDate}\nTime: ${slotTime}\n\nThank you for using FitFlow!`;
  } else {
    return res.status(400).json({ error: 'Invalid email type' });
  }

  try {
    await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text });
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending email' });
  }
}