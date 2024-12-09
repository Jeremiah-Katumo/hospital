import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { validationResult } from 'express-validator';
import { generateToken } from '../helpers/jwtHelper.js';
import { comparePassword, hashPassword } from '../helpers/bcryptHelper.js';

dotenv.config()

export class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.transporter = nodemailer.createTransport({
            service: 'gmail', // Use your email service (e.g., Gmail, Yahoo, Outlook)
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    renderRegisterPage = async (req, res) => {
        res.render('user/signup.ejs');
    }

    signUp = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        try {
            // Check if user exists
            const existingUser = await this.authService.findUserByUsername(username);
            if (existingUser) {
                return res.status(400).json({ message: 'Username already exists' });
            }

            // Hash password
            const hashedPassword = hashPassword(password);

            // Save user
            const newUser = await this.authService.insertUser({
                username,
                email,
                password: hashedPassword,
                emailStatus: 'pending',
            });

            // const verificationToken = jwt.sign(
            //     { email: email },
            //     process.env.JWT_SECRET,
            //     { expiresIn: process.env.JWT_EXPIRES } // Token expires in 1 day
            // );

            // // Send verification email
            // const verificationLink = `${req.protocol}://${req.get('host')}/verify?token=${verificationToken}`;
            // console.log(verificationLink);
            // await this.transporter.sendMail({
            //     from: process.env.EMAIL_USER,
            //     to: email,
            //     subject: 'Verify Your Email Address',
            //     html: `
            //         <h3>Welcome to Our Platform, ${username}!</h3>
            //         <p>Please verify your email address by clicking the link below:</p>
            //         <a href="${verificationLink}">Verify Email</a>
            //         <p>This link will expire in 24 hours.</p>
            //     `,
            // });

            res.status(201).json({ message: 'User signed up successfully' });
            res.render('dashboard/list.ejs');
        } catch (error) {
            console.error('Error during signup:', error.message);
            res.status(500).json({ message: 'Server error' });
        }
    };

    renderLoginPage = (req, res) => {
        res.render('user/login.ejs');
    }

    logIn = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const user = await this.authService.findUserByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Verify password
            const isPasswordValid = comparePassword(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            // Generate JWT token
            const loginToken = generateToken(user);

            res.status(200).json({ message: 'Login successful', loginToken });
            res.render('dashboard/list.ejs');
        } catch (error) {
            console.error('Error during login:', error.message);
            res.status(500).json({ message: 'Server error' });
        }
    };

    verify = async (req, res) => {
        const { email, token } = req.body;

        try {
            const userId = await this.authService.getUserIdByEmail(email);
            if (!userId) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update verification status
            await this.authService.updateEmailVerificationStatus(email, 'verified');
            res.status(200).json({ message: 'Email verified successfully' });
        } catch (error) {
            console.error('Error during verification:', error.message);
            res.status(500).json({ message: 'Server error' });
        }
    };

    logOut = (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error during logout:', err.message);
                return res.status(500).json({ message: 'Logout failed' });
            }
            res.status(200).json({ message: 'Logout successful' });
            res.render('user/login.ejs');
        });
    };

    reset = async (req, res) => {
        const { email, newPassword } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await this.authService.updatePassword(email, hashedPassword);
            res.status(200).json({ message: 'Password reset successful' });
            res.render('user/login.ejs');
        } catch (error) {
            console.error('Error during password reset:', error.message);
            res.status(500).json({ message: 'Server error' });
        }
    };

    renderResetPage = (req, res) => {
        res.render('user/reset.ejs');
    };

    renderForgotPasswordPage = (req, res) => {
        res.render('user/forgot-password.ejs');
    }

    async forgotPassword(req, res) {
        const { email } = req.body;
    
        try {
            await authService.sendResetLink(email);
            res.status(200).json({ message: 'Password reset link sent to your email' });
        } catch (error) {
            res.status(500).json({ message: 'Server error, please try again later' });
        }
    }

    async resetPassword(req, res) {
        const { token, newPassword } = req.body;
    
        try {
            await authService.resetPassword(token, newPassword);
            res.status(200).json({ message: 'Password reset successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error resetting password' });
        }
    }
}
