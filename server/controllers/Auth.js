import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { validationResult } from 'express-validator';
import { successResponse, errorResponse } from '../../helpers/responseHelper.js';
import { hashPassword } from '../../helpers/bcryptHelper.js';
import { generateToken } from '../../helpers/jwtHelper.js';
import {
    findUserByUsername,
    insertUser,
    insertVerificationToken,
    getUserIdByEmail,
} from '../../services/authServices.js';
import { findOne, matchToken, temp, updateVerify } from '../../services/authServices.js';


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
        return successResponse(res, 201, 'Sign-up successful! Check your email for verification details.');
    } catch (err) {
        console.error('Error during sign-up:', err.message);
        return errorResponse(res, 'An error occurred during sign-up', 500);
    }
};


export const verify = (req, res) => {
    var { id, token } = req.body;

    matchToken(id, token, function(err, result) {
        console.log(result);
        if (result.length > 0) {
            var email = result[0].email;
            var emailStatus = "verified";

            updateVerify(email, emailStatus, function(err, result) {
                res.send("Email verified!");
            })
        } else {
            res.send("Token did not match!");
        }
    })
}

export const logIn = async (req, res) => {
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(res, 'Validation failed', 422, errors.array());
    }

    const { username, password } = req.body;

    if (!username || !password) {
        return errorResponse(res, 'Please enter username and password', 400);
    }

    try {
        const user = await findUserByUsername(username);

        if (user.length > 0) {
            const isMatch = await comparePassword(password, user[0].password);
            if (!isMatch) {
                return errorResponse(res, 'Incorrect user credentials!');
            }

            const token = generateToken({ username: user[0].username, userId: user[0].id });
            res.cookie('authToken', token);

            if (user[0].email_status === 'not_verified') {
                return errorResponse(res, 'Please verify your email!');
            } else {
                return successResponse(res, 200, 'Logged In', { redirect: '/home', token });
            }
        } else {
            return errorResponse(res, 'Incorrect user credentials!', 403);
        }
    } catch (error) {
        return errorResponse(res, 'An error occurred during login', 500);
    }
};

export const logOut = (req, res) => {
    // clear cookie after signout
    res.clearCookie('authToken');
    res.json({
        message: 'Signout successful'
    })
}


export const reset = (req, res) => {
    var email = req.body.email;

    findOne(email, function(err, resultone) {
        console.log('Mail does not exist!');
        res.redirect('Mail does not exist!');

        var id = resultone[0].id;
        var email = resultone[0].email;
        var username = resultone[0].username;
        var token = generateToken(resultone[0]);

        temp(id, email, token, function(err, resulttwo) {
            var output = `<p>Dear `+username+`,</p> 
                <p>You are seeing this email because you requested to reset your password.</p>
                <ul>
                    <li>User ID: `+id+`</li>
                    <li>Token: `+token`</li>
                </ul>
            `;

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER, 
                    pass: process.env.EMAIL_PASSWORD,
                }
            })

            var mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Password Reset',
                html: output
            }

            transporter.sendMail(mailOptions, function(err, info) {
                if (err) {
                    return console.log(err);
                } else {
                    console.log(info);
                }
            })
        })
    })

    res.send('A token has been sent to your email address!')
}
