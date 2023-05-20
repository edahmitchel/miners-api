"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderResetPasswordForm = exports.resetPassword = exports.sendPasswordResetLink = exports.changePassword = exports.verify = exports.sendVerificationCode = exports.login = exports.register = void 0;
const user_1 = require("../models/user");
const nodemailer_1 = __importDefault(require("nodemailer"));
// Import dependencies
// Register new user
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //   return res.status(400).json({ errors: errors.array() });
        // }
        // Extract user data from request body
        const { email, password, firstName, country, lastName, } = req.body;
        console.log(req.body);
        // Check if user already exists
        const existingUser = yield user_1.UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Create new user object
        const newUser = new user_1.UserModel({
            email,
            password,
            lastName, firstName
        });
        // Save user to database
        yield newUser.save();
        // Generate access token
        const token = yield newUser.generateAuthToken();
        // Send response with user and token data
        res.status(201).json({
            email: newUser.email,
            isVerified: newUser.isVerified,
            lastName: newUser.lastName, firstName: newUser.firstName, country: newUser.country
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.register = register;
// User login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //   return res.status(400).json({ errors: errors.array() });
        // }
        // Extract user data from request body
        const { email, password } = req.body;
        console.log(req.body);
        // Check if user exists
        const user = yield user_1.UserModel.findByCredentials(email, password);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Generate access token
        const token = yield user.generateAuthToken();
        // Send response with user and token data
        res.status(200).json({
            email: user.email,
            isVerified: user.isVerified,
            token,
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.login = login;
// Send verification code to user email
const sendVerificationCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //   return res.status(400).json({ errors: errors.array() });
        // }
        // Extract user data from request body
        const { email, residentAddress, stateOfOrigin } = req.body;
        // Check if user exists
        const user = yield user_1.UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.isVerified) {
            return res.status(400).json({ message: "User is already verified" });
        }
        // Generate OTP code
        const OTPCode = Math.floor(100000 + Math.random() * 900000);
        // Save OTP code to user object in database
        user.verificationCode = OTPCode;
        user.verificationCodeExpiration = new Date(Date.now() + 15 * 60 * 1000); // OTP expires in 15 minutes
        yield user.save();
        // Send OTP code to user email using nodemailer
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.user,
                pass: process.env.pass,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: "Verification Code for Your Account",
            text: `Your verification code is ${OTPCode}. It will expire in 15 minutes.`,
        };
        yield transporter.sendMail(mailOptions);
        res.json({ message: "Verification code sent successfully" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.sendVerificationCode = sendVerificationCode;
//     // Check if OTP code has expired
const verify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, code } = req.body;
    try {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //   return res.status(400).json({ errors: errors.array() });
        // }
        // Check if user exists
        const user = yield user_1.UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Check if code matches
        if (user.verificationCode !== code) {
            return res.status(400).json({ message: "Invalid verification code" });
        }
        // Check if code has expired
        const currentTime = Date.now();
        const codeExpirationTime = new Date(user.verificationCodeExpiration);
        if (Number(codeExpirationTime) < currentTime) {
            return res.status(400).json({ message: "Verification code has expired" });
        }
        // Update user account as verified
        user.isVerified = true;
        yield user.save();
        // Generate JWT token
        const token = yield user.generateAuthToken();
        // Return success response with token
        return res.status(200).json({
            email: user.email,
            isVerified: user.isVerified,
            token,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.verify = verify;
// Change user password
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //   return res.status(400).json({ errors: errors.array() });
        // }
        // Extract user data from request body
        const { email, currentPassword, newPassword } = req.body; // Check if user exists
        const user = yield user_1.UserModel.findByCredentials(email, currentPassword);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Update user password
        user.password = newPassword;
        yield user.save();
        res.json({ message: "Password changed successfully" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.changePassword = changePassword;
// Send password reset link to user email
const sendPasswordResetLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract user data from request body
        const { email } = req.body;
        // Check if user exists
        const user = yield user_1.UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Generate password reset token
        const token = yield user.generateAuthToken();
        // Save token to user object in database
        user.passwordResetToken = token;
        user.passwordResetTokenExpiration = new Date(Date.now() + 24 * 60 * 60 * 1000); // Token expires in 24 hours
        yield user.save();
        // Send password reset link to user email using nodemailer
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.user,
                pass: process.env.pass,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: "Password Reset Link for Your Account",
            html: `
    <p>You have requested a password reset for your account. Please click the link below to reset your password:</p>
    <a href="${process.env.APP_URL}/api/auth/reset-password?token=${token}&email=${email}">Reset Password</a>
  `,
        };
        yield transporter.sendMail(mailOptions);
        // Redirect to form page after password reset link is sent
        // res.redirect("/reset-password-form");
        res.status(200).json({ message: "reset mail sent successfully" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.sendPasswordResetLink = sendPasswordResetLink;
// Reset user password using token
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, token, newPassword } = req.body;
    try {
        // Check if user exists
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //   return res.status(400).json({ errors: errors.array() });
        // }
        const user = yield user_1.UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Check if token matches
        if (user.passwordResetToken !== token) {
            return res.status(400).json({ message: "Invalid password reset token" });
        }
        // Check if token has expired
        const currentTime = Date.now();
        const tokenExpirationTime = user.passwordResetTokenExpiration ? new Date(user.passwordResetTokenExpiration) : null;
        if (Number(tokenExpirationTime) < currentTime) {
            return res
                .status(400)
                .json({ message: "Password reset token has expired" });
        }
        // Update user password
        user.password = newPassword;
        user.passwordResetToken = null;
        user.passwordResetTokenExpiration = null;
        yield user.save();
        res.json({ message: "Password reset successful" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.resetPassword = resetPassword;
const renderResetPasswordForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //   return res.status(400).json({ errors: errors.array() });
        // }
        const { email, token } = req.query;
        // Check if user exists
        const user = yield user_1.UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Check if token matches
        if (user.passwordResetToken !== token) {
            return res.status(400).json({ message: "Invalid password reset token" });
        }
        // Check if token has expired
        const currentTime = Date.now();
        const tokenExpirationTime = user.passwordResetTokenExpiration ? new Date(user.passwordResetTokenExpiration) : null;
        if (Number(tokenExpirationTime) < currentTime) {
            return res
                .status(400)
                .json({ message: "Password reset token has expired" });
        }
        // Render reset password form
        res.send(`
    
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>reset-password</title>
    </head>
    <body>
        <form method="post" action="${process.env.APP_URL}/api/auth/reset-password">
            <label for="newPassword">New Password:</label>
            <input type="password" id="newPassword" name="newPassword">
            <input type="hidden" name="email" value="${email}">
            <input type="hidden" name="token" value="${token}">
            <button type="submit">Reset Password</button>
          </form>
        
          </body>
    </html>
    `);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.renderResetPasswordForm = renderResetPasswordForm;
