const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ayushmati.pesto@gmail.com',
    pass: 'yrsozgccydceocai'  
  }
});

// Define the email message
const mailOptions = {
    from: 'ayushmati.pesto@gmail.com',
    to: 'sagarbehare1@gmail.com',
    subject: 'Test Email',
    text: 'This is a test email from Node.js.'
};

// Send the email
function sendMail() {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        console.log('Error:', error);
        } else {
        console.log('Email sent:', info.response);
        }
    });
}

module.exports = sendMail;