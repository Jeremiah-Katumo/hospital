import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { validationResult } from 'express-validator';
import { successResponse, errorResponse } from '../../helpers/responseHelper.js';
import { hashPassword } from '../../helpers/bcryptHelper.js';
import { generateToken } from '../../helpers/jwtHelper.js';
import {
    insertUser,
    insertVerificationToken,
    getUserIdByEmail,
} from '../../services/authService.js';


dotenv.config();

export const signUp = async (req, res) => {
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(res, 'Validation failed', 422, errors.array());
    }

    const { username, email, password } = req.body;

    try {
        // Hash the user's password
        const hashedPassword = await hashPassword(password);

        // Insert the user into the database
        await insertUser(username, email, hashedPassword, 'not_verified');

        // Generate a verification token
        const token = generateToken({ username, email });

        // Store the verification token in the database
        await insertVerificationToken(username, email, token);

        // Retrieve the user's ID
        const user = await getUserIdByEmail(email);

        if (!user) {
            return errorResponse(res, 'Failed to retrieve user ID', 500);
        }

        // Prepare the email content
        const verificationLink = `http://localhost:3000/api/v1/verify?token=${token}`;
        const output = `
            <p>Dear ${username},</p>
            <p>Thank you for signing up. Please find your verification details below:</p>
            <ul>
                <li>User ID: ${user.id}</li>
                <li>Token: ${token}</li>
            </ul>
            <p>Click the following link to verify your account:</p>
            <a href="${verificationLink}">${verificationLink}</a>
            <p>If you did not sign up for this account, please ignore this email.</p>
            <p>This is an automated email, please do not reply.</p>
        `;

        // Configure the mail transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER, // Environment variables for credentials
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verify Your Email Address',
            html: output,
        };

        // Send the verification email
        await transporter.sendMail(mailOptions);

        // Respond with success
        return successResponse(res, 'Sign-up successful! Check your email for verification details.');
    } catch (err) {
        console.error('Error during sign-up:', err.message);
        return errorResponse(res, 'An error occurred during sign-up', 500);
    }
};
