"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordValidationRules = exports.renderResetPasswordFormValidationRules = exports.verifyValidationRules = exports.sendPasswordResetLinkValidationRules = exports.sendVerificationCodeValidationRules = exports.registerValidationRules = exports.loginValidationRules = void 0;
const express_validator_1 = require("express-validator");
// auth validations
const loginValidationRules = () => {
    return [(0, express_validator_1.body)("email").isEmail(), (0, express_validator_1.body)("password").isLength({ min: 5 })];
};
exports.loginValidationRules = loginValidationRules;
const registerValidationRules = () => {
    return [
        (0, express_validator_1.body)("email").isEmail().notEmpty().normalizeEmail(),
        (0, express_validator_1.body)("password").isLength({ min: 6 }).trim(),
        (0, express_validator_1.body)("country").notEmpty().isString(),
        (0, express_validator_1.body)("firstName").notEmpty().isString().trim(),
        (0, express_validator_1.body)("lastName").notEmpty().isString().trim(),
    ];
};
exports.registerValidationRules = registerValidationRules;
const sendVerificationCodeValidationRules = () => {
    return [
        (0, express_validator_1.body)("email").isEmail().notEmpty().normalizeEmail(),
    ];
};
exports.sendVerificationCodeValidationRules = sendVerificationCodeValidationRules;
const sendPasswordResetLinkValidationRules = () => {
    return [(0, express_validator_1.body)("email").isEmail().notEmpty().normalizeEmail()];
};
exports.sendPasswordResetLinkValidationRules = sendPasswordResetLinkValidationRules;
const verifyValidationRules = () => {
    return [(0, express_validator_1.body)("email").notEmpty().isEmail().normalizeEmail(), (0, express_validator_1.body)("code").notEmpty().isNumeric()];
};
exports.verifyValidationRules = verifyValidationRules;
const renderResetPasswordFormValidationRules = () => {
    return [(0, express_validator_1.query)("email").notEmpty().isEmail(), (0, express_validator_1.query)("token").notEmpty().normalizeEmail()];
};
exports.renderResetPasswordFormValidationRules = renderResetPasswordFormValidationRules;
const resetPasswordValidationRules = () => {
    return [
        (0, express_validator_1.body)("email").notEmpty().isEmail().normalizeEmail(),
        (0, express_validator_1.body)("token").notEmpty(),
        (0, express_validator_1.body)("newPassword").notEmpty().isLength({ min: 6 }),
    ];
};
exports.resetPasswordValidationRules = resetPasswordValidationRules;
