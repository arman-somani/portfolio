const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // 1. Send Email FIRST (This is the most important part for a portfolio)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: process.env.RECEIVER_EMAIL || process.env.EMAIL_USER,
        subject: `Portfolio Contact: ${subject}`,
        text: `From: ${name} (${email})\n\n${message}`,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong> ${message}</p>`,
      });
    }

    // 2. Try saving to DB, but don't hang if disconnected
    // Vercel serverless times out in 10s, Mongoose waits 30s. We avoid the hang.
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState === 1) {
      try {
        const contact = new Contact({ name, email, subject, message });
        await contact.save();
      } catch (dbError) {
        console.error('Failed to save contact to DB:', dbError);
        // We still return success because the email was sent
      }
    }

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ message: error.message || 'Failed to send message' });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (contact) {
      await contact.deleteOne();
      res.json({ message: 'Message removed' });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { submitContact, getContacts, deleteContact };
