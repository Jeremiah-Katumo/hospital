var express = require('express');
var bodyParser = require('body-parser');
var db = require('./database/db');
var mysql = require('mysql2');
var nodemailer = require('nodemailer');
var randomToken = require('random-token');

const { check, validationResult } = require('express-validator');

var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/', [
    check('username').notEmpty().withMessage("Username is required"),
    check('password').notEmpty().withMessage("Password is required"),
    check('email').notEmpty().withMessage("Email is required")
], function(req, res) {
    errors = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(422).json({error: errors.array()});
    }

    var emailStatus = "not_verified";
    var email = req.body.email;
    var username = req.body.username;

    db.signup(req.body.username, req.body.email, req.body.password, emailStatus);
    var token = randomToken(8);

    db.verify(req.body.username, req.body.email, token);

    db.getuserid(req.body.email, function(err, result) {
        var id = result[0].id;
        var output = `<p>Dear ${username},</p>
            <p>Thanks for sign up. Your verification id and token is given below: </p>
            <ul>
            <li>User id: ${id}</li>
            <li>Token: ${token}</li>
            </ul>
            <p>Verify link: <a href="http://localhost:3000/verify">Verify</a></p>
            <p><br>This is automatically generated mail</p>`;

        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "jeremykatush@gmail.com",
                password: "@Jer0039 .!",
            },
        });

        var mailOptions = {
            from: "",
            to: email,
            subject: 'Email Verification',
            html: output
        };

        transporter.sendMail(mailOptions, function(err, info) {
            if (err) {
                return console.log(err);
            }
            
            console.log(info);
        })

        res.send("Check your email for token to verify")
    });
});

module.exports = router;