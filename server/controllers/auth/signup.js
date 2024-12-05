import nodemailer from 'nodemailer';
import { validationResult } from 'express-validator';
import { successResponse, errorResponse } from '../../helpers/responseHelper.js';
import { hashPassword } from '../../helpers/bcryptHelper.js';
import {
    insertUser,
    insertVerificationToken,
    getUserIdByEmail,
} from '../../services/authService.js';


export const signUp = async (req, res) => {
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(res, 'Validation failed', 422, errors.array());
    }

    const { username, email, password } = req.body;

    try {
        const hashedPassword = await hashPassword(password);
        await insertUser(username, email, hashedPassword, 'not_verified');

        const token = generateToken({ username, email });
        await insertVerificationToken(username, email, token);

        const userId = await getUserIdByEmail(email);

        // Prepare the email content
        const verificationLink = `http://localhost:3000/api/v1/verify`;
        const output = `
            <p>Dear ${username},</p>
            <p>Thanks for signing up. Your verification details are below:</p>
            <ul>
            <li>User ID: ${userId}</li>
            <li>Token: ${token}</li>
            </ul>
            <p>Verification link: <a href="${verificationLink}">Verify</a></p>
            <p>This is an automatically generated email.</p>
        `;

        // Configure the mail transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER, // Store sensitive data in environment variables
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Verification',
            html: output,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Respond to the user
        return successResponse(res, 'Check your email for the verification token');
    } catch (err) {
        // console.error('Error during sign-up:', err);
        return errorResponse(res, 'An error occurred during sign-up', 500);
    }
};