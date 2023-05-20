import { body, param, check, query } from "express-validator";

// auth validations
const loginValidationRules = () => {
  return [body("email").isEmail(), body("password").isLength({ min: 5 })];
};

const registerValidationRules = () => {
  return [
    body("email").isEmail().notEmpty(),
    body("password").isLength({ min: 6 }),
    body("fullName").notEmpty(),
  ];
};

const sendVerificationCodeValidationRules = () => {
  return [
    body("email").isEmail().notEmpty(),
    body("residentAddress").notEmpty().isString(),
    body("stateOfOrigin").notEmpty().isString(),
  ];
};
const sendPasswordResetLinkValidationRules = () => {
  return [body("email").isEmail().notEmpty()];
};

const verifyValidationRules = () => {
  return [body("email").notEmpty().isEmail(), body("code").notEmpty()];
};

const renderResetPasswordFormValidationRules = () => {
  return [query("email").notEmpty().isEmail(), query("token").notEmpty()];
};

const resetPasswordValidationRules = () => {
  return [
    body("email").notEmpty().isEmail(),
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
