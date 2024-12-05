import { check, validationResult } from 'express-validator';

export const useSignUpValidator = [
    check('username').notEmpty().withMessage('Username is required!'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long!'),
    check('email').notEmpty().isEmail().withMessage('Email is required and must be valid!')
];

export const useLogInValidator = [
    check('username').notEmpty().withMessage('Username is required!'),
    check('password').isLength({ min: 8}).withMessage('Password must be 8 at least 8 characters long!')
];