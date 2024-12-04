import db from '../database/db.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
// import randomToken from 'random-token';
import { validationResult } from 'express-validator';
import { successResponse, errorResponse } from '../helpers/responseHelper.js';
import { hashPassword } from '../helpers/bcryptHelper.js';

// export const signUp = (req, res) => {
//     const errors = validationResult(req);
//     if (!error.isEmpty()) {
//         return res.status(422).json({error: errors.array()});
//     }

//     var emailStatus = "not_verified";
//     var email = req.body.email;
//     var username = req.body.username;

//     db.signup(req.body.username, req.body.email, req.body.password, emailStatus);
//     var token = randomToken(8);

//     db.verify(req.body.username, req.body.email, token);

//     db.getuserid(req.body.email, function(err, result) {
//         var id = result[0].id;
//         var output = `<p>Dear ${username},</p>
//             <p>Thanks for sign up. Your verification id and token is given below: </p>
//             <ul>
//             <li>User id: ${id}</li>
//             <li>Token: ${token}</li>
//             </ul>
//             <p>Verify link: <a href="http://localhost:3000/verify">Verify</a></p>
//             <p><br>This is automatically generated mail</p>`;

//         var transporter = nodemailer.createTransport({
//             host: "smtp.gmail.com",
//             port: 465,
//             secure: true,
//             auth: {
//                 user: "jeremykatush@gmail.com",
//                 password: "@Jer0039 .!",
//             },
//         });

//         var mailOptions = {
//             from: "",
//             to: email,
//             subject: 'Email Verification',
//             html: output
//         };

//         transporter.sendMail(mailOptions, function(err, info) {
//             if (err) {
//                 return console.log(err);
//             }

//             console.log(info);
//         })

//         res.send("Check your email for token to verify")
//     });
// }

export const signUp = async (req, res) => {
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(res, 'Validation failed', 422, errors.array());
    }

    const { email, username, password } = req.body;

    try {
        // Check if user already exists
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return errorResponse(res, 'User already exists');
        }

        // Generate a verification token
        const emailStatus = 'not_verified';
        const token = crypto.randomBytes(4).toString('hex');

        // Hash the password and save user
        const hashedPassword = await hashPassword(password);
        await db.query('INSERT INTO users (username, email, password, email_status) VALUES (?, ?, ?, ?)', [
            username,
            email,
            hashedPassword,
            emailStatus,
        ]);

        // Save token for email verification
        await db.query('INSERT INTO email_verifications (username, email, token) VALUES (?, ?, ?)', [
            username,
            email,
            token,
        ]);

        // Retrieve the user's ID
        const [user] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
        const userId = user[0].id;

        // Prepare the email content
        const verificationLink = `http://localhost:3000/verify`;
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
        console.error('Error during sign-up:', err);
        return errorResponse(res, 'An error occurred during sign-up', 500);
    }
};