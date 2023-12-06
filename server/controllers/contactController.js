// controllers/contactController.js

const nodemailer = require('nodemailer');
const  saveContactMessage  = require('../models/contactModel');

const contactUs = async (req, res) => {
  const { contact_name, contact_email, subject, message } = req.body;

  try {
    const savedMessage = await saveContactMessage.saveContactMessage(contact_name, contact_email, subject, message);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'cargonexa.main@gmail.com',
          pass: 'ocek tdbr bcoj mqij'
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      
    const mailOptions = {
      from: `${contact_email}`, 
      to: 'cargonexa.main@gmail.com', 
      subject: `Subject: ${subject}`, 
      text: `Name: ${contact_name}\nEmail: ${contact_email}\n\n${message}` 
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error in contactUs controller:', error);
    res.status(500).json({ success: false, message: 'Error :' });
  }
};

module.exports = {
     contactUs,
     };
