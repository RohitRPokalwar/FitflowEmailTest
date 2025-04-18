// Import required modules
const express = require('express');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./path/to/your/serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://your-firebase-database-url.firebaseio.com'
});

// Set up the app
const app = express();
const port = process.env.PORT || 5000;

// Middleware for parsing JSON bodies
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Hello from FitFlow backend!');
});

// Example route to send an email
app.post('/send-email', (req, res) => {
    const { email, subject, message } = req.body;

    // Create a transporter using your email service credentials
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Add your email here
            pass: process.env.EMAIL_PASS  // Add your email password here
        }
    });

    // Mail options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: message
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Error sending email');
        }
        console.log('Email sent: ' + info.response);
        return res.status(200).send('Email sent successfully');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
