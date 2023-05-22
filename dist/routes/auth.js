"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const validation_1 = require("../middleware/validation");
exports.authRoutes = (0, express_1.Router)();
// const authController = require("../controllers/auth.controller");
// authRoutes.get("/", (req, res) => {
//     return res.json("in auth")
// })
exports.authRoutes.post("/login", (0, validation_1.loginValidationRules)(), authController_1.login);
exports.authRoutes.post("/register", (0, validation_1.registerValidationRules)(), authController_1.register);
// Send verification code to user email
exports.authRoutes.post("/send-verification-code", (0, validation_1.sendVerificationCodeValidationRules)(), authController_1.sendVerificationCode);
// Verify user email using OTP code
exports.authRoutes.post("/verify", (0, validation_1.verifyValidationRules)(), authController_1.verify);
// router.post("/change-password", authenticateUser, changePassword);
exports.authRoutes.post("/forgot-password", (0, validation_1.sendPasswordResetLinkValidationRules)(), authController_1.sendPasswordResetLink);
exports.authRoutes.get("/reset-password", (0, validation_1.renderResetPasswordFormValidationRules)(), authController_1.renderResetPasswordForm);
exports.authRoutes.post("/reset-password", (0, validation_1.resetPasswordValidationRules)(), authController_1.resetPassword);
