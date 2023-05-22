import { body, param, check, query } from "express-validator";

// auth validations
const loginValidationRules = () => {
  return [body("email").isEmail(), body("password").isLength({ min: 5 })];
};

const registerValidationRules = () => {
  return [
    body("email").isEmail().notEmpty().normalizeEmail(),
    body("password").isLength({ min: 6 }).trim(),
    body("country").notEmpty().isString(),
    body("firstName").notEmpty().isString().trim(),
    body("lastName").notEmpty().isString().trim(),
  ];
};

const sendVerificationCodeValidationRules = () => {
  return [
    body("email").isEmail().notEmpty().normalizeEmail(),

  ];
};
const sendPasswordResetLinkValidationRules = () => {
  return [body("email").isEmail().notEmpty().normalizeEmail()];
};

const verifyValidationRules = () => {
  return [body("email").notEmpty().isEmail().normalizeEmail(), body("code").notEmpty().isNumeric()];
};

const renderResetPasswordFormValidationRules = () => {
  return [query("email").notEmpty().isEmail(), query("token").notEmpty().normalizeEmail()];
};

const resetPasswordValidationRules = () => {
  return [
    body("email").notEmpty().isEmail().normalizeEmail(),
    body("token").notEmpty(),
    body("newPassword").notEmpty().isLength({ min: 6 }),
  ];
};

export {
  loginValidationRules,
  registerValidationRules,
  sendVerificationCodeValidationRules,
  sendPasswordResetLinkValidationRules,
  verifyValidationRules,
  renderResetPasswordFormValidationRules,
  resetPasswordValidationRules,
};
