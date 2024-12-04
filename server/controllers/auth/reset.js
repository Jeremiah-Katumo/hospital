import flash from 'flash';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import db from '../../database/dbConnection.js';
import { generateToken } from '../../helpers/jwtHelper.js'
import { findOne, temp } from '../../services/resetServices.js';

dotenv.config();

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
