const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Test route (optional)
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

// Contact form API
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form from ${name}`,
      text: `You have a new message:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email Error:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
