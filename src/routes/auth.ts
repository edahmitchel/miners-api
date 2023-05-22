import { Express, Router, json } from 'express';
import { login, register, renderResetPasswordForm, resetPassword, sendPasswordResetLink, sendVerificationCode, verify } from '../controllers/authController';
import { loginValidationRules, registerValidationRules, renderResetPasswordFormValidationRules, resetPasswordValidationRules, sendPasswordResetLinkValidationRules, sendVerificationCodeValidationRules, verifyValidationRules } from '../middleware/validation';
import express from 'express';



export const authRoutes = Router();
// const authController = require("../controllers/auth.controller");
// authRoutes.get("/", (req, res) => {
//     return res.json("in auth")
// })
authRoutes.post("/login",
    loginValidationRules(),
    login);
authRoutes.post("/register", registerValidationRules(), register);

// Send verification code to user email
authRoutes.post(
    "/send-verification-code",
    sendVerificationCodeValidationRules(),
    sendVerificationCode
);

// Verify user email using OTP code
authRoutes.post("/verify", verifyValidationRules(), verify);
// router.post("/change-password", authenticateUser, changePassword);
authRoutes.post(
    "/forgot-password",
    sendPasswordResetLinkValidationRules(),
    sendPasswordResetLink
);
authRoutes.get(
    "/reset-password",
    renderResetPasswordFormValidationRules(),
    renderResetPasswordForm
);
authRoutes.post("/reset-password", resetPasswordValidationRules(), resetPassword);

