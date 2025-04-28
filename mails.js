const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Configure the email transporter (Gmail example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kokkulaasharsh17@gmail.com", // Replace with your email
    pass: "your-app-password", // Use App Password (not your email password)
  },
});

// Trigger on user creation
exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  const email = user.email;
  const displayName = user.displayName || "User";

  const mailOptions = {
    from: "Your App Name <your-email@gmail.com>",
    to: email,
    subject: "Welcome to Our Platform!",
    text: `Hey ${displayName}, welcome to our awesome app!`,
    html: `<h3>Hello ${displayName},</h3><p>Thanks for signing up!</p>`,
  };

  return transporter
    .sendMail(mailOptions)
    .then(() => console.log("Welcome email sent to:", email))
    .catch((error) => console.error("Error sending email:", error));
});
