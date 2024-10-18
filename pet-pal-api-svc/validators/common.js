import { body } from "express-validator";

const validations = {
  username: body('username').notEmpty().withMessage("Username is required"),
  email: body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address'),
  password: body('password').notEmpty().withMessage('Password is required')
    .isLength({ min: 4, max: 12 }).withMessage('Password character limit not satisfied'),
};

export default validations;
