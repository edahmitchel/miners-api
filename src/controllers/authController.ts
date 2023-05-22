import { Request, Response } from 'express';
import { IUserModel, UserModel } from '../models/user';
import { IUser } from '../types';
import nodemailer from 'nodemailer';
import { validationResult } from 'express-validator';

// Import dependencies





// Register new user
export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Extract user data from request body
    const { email, password, firstName, country, lastName, }: IUser = req.body;
    console.log(req.body);

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user object
    const newUser = new UserModel({
      email,
      password,
      lastName, country, firstName
    });

    // Save user to database
    await newUser.save();

    // Generate access token

    const token = await newUser.generateAuthToken();

    // Send response with user and token data
    res.status(201).json({
      email: newUser.email,
      isVerified: newUser.isVerified,
      lastName: newUser.lastName, firstName: newUser.firstName, country: newUser.country


    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// User login
export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Extract user data from request body
    const { email, password } = req.body;
    console.log(req.body);

    // Check if user exists
    const user = await UserModel.findByCredentials(email, password);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate access token
    const token = await user.generateAuthToken();

    // Send response with user and token data
    res.status(200).json({
      email: user.email,
      isVerified: user.isVerified,
      lastName: user.lastName, firstName: user.firstName, country: user.country,


      token,

    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Send verification code to user email
export const sendVerificationCode = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Extract user data from request body
    const { email } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ email });
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
    await user.save();

    // Send OTP code to user email using nodemailer
    const transporter = nodemailer.createTransport({
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

    await transporter.sendMail(mailOptions);

    res.json({ message: "Verification code sent successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

//     // Check if OTP code has expired
export const verify = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check if user exists
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if code matches
    if (user.verificationCode !== Number(code)) {
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
    await user.save();

    // Generate JWT token
    const token = await user.generateAuthToken();

    // Return success response with token
    return res.status(200).json({
      email: user.email,
      isVerified: user.isVerified,

      token,

    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Change user password
export const changePassword = async (req: Request, res: Response) => {
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    // Extract user data from request body
    const { email, currentPassword, newPassword } = req.body; // Check if user exists
    const user = await UserModel.findByCredentials(email, currentPassword);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Update user password
    user.password = newPassword;
    await user.save();
    res.json({ message: "Password changed successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Send password reset link to user email
export const sendPasswordResetLink = async (req: Request, res: Response) => {
  try {
    // Extract user data from request body
    const { email } = req.body;
    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate password reset token
    const token = await user.generateAuthToken();

    // Save token to user object in database
    user.passwordResetToken = token;
    user.passwordResetTokenExpiration = new Date(Date.now() + 24 * 60 * 60 * 1000); // Token expires in 24 hours
    await user.save();

    // Send password reset link to user email using nodemailer
    const transporter = nodemailer.createTransport({
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

    await transporter.sendMail(mailOptions);

    // Redirect to form page after password reset link is sent
    // res.redirect("/reset-password-form");
    res.status(200).json({ message: "reset mail sent successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Reset user password using token
export const resetPassword = async (req: Request, res: Response) => {
  const { email, token, newPassword } = req.body;
  try {
    // Check if user exists
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    const user = await UserModel.findOne({ email });
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
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const renderResetPasswordForm = async (req: Request, res: Response) => {
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    const { email, token } = req.query;

    // Check if user exists
    const user = await UserModel.findOne({ email });
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
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


