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
        (0, express_validator_1.body)("email").isEmail().notEmpty(),
        (0, express_validator_1.body)("password").isLength({ min: 6 }),
        (0, express_validator_1.body)("fullName").notEmpty(),
    ];
};
exports.registerValidationRules = registerValidationRules;
const sendVerificationCodeValidationRules = () => {
    return [
        (0, express_validator_1.body)("email").isEmail().notEmpty(),
        (0, express_validator_1.body)("residentAddress").notEmpty().isString(),
        (0, express_validator_1.body)("stateOfOrigin").notEmpty().isString(),
    ];
};
exports.sendVerificationCodeValidationRules = sendVerificationCodeValidationRules;
const sendPasswordResetLinkValidationRules = () => {
    return [(0, express_validator_1.body)("email").isEmail().notEmpty()];
};
exports.sendPasswordResetLinkValidationRules = sendPasswordResetLinkValidationRules;
const verifyValidationRules = () => {
    return [(0, express_validator_1.body)("email").notEmpty().isEmail(), (0, express_validator_1.body)("code").notEmpty()];
};
exports.verifyValidationRules = verifyValidationRules;
const renderResetPasswordFormValidationRules = () => {
    return [(0, express_validator_1.query)("email").notEmpty().isEmail(), (0, express_validator_1.query)("token").notEmpty()];
};
exports.renderResetPasswordFormValidationRules = renderResetPasswordFormValidationRules;
const resetPasswordValidationRules = () => {
    return [
        (0, express_validator_1.body)("email").notEmpty().isEmail(),
        (0, express_validator_1.body)("token").notEmpty(),
        (0, express_validator_1.body)("newPassword").notEmpty().isLength({ min: 6 }),
    ];
};
exports.resetPasswordValidationRules = resetPasswordValidationRules;
