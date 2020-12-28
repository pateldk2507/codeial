const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
        user : 'your gmail',
        pass : 'password'
    } 
});

module.exports = transporter;