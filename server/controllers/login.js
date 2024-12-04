import db from '../database/dbConnection.js';
import { validationResult } from 'express-validator';
// import { request } from 'http';
import { successResponse, errorResponse } from '../helpers/responseHelper.js';
import {
    findUserByUsername,
} from '../services/authService.js';

// conn = mysql.createPool({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE_NAME,
//     waitForConnections: true,
//     connectionLimit: 10,
// });

// export const logIn = (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(422).json({errors: errors.array()});
//     }

//     var username = request.body.username;
//     var password = request.body.password;
//     if (username && password) {
//         conn.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
//             if (results.length > 0) {
//                 request.session.loggedin = true;
//                 request.session.username = username;
//                 response.cookie('username', username);
//                 var status = results[0].email_status;

//                 if (status == "not_verified") {
//                     response.send('Please make sure you verify your email!')
//                 } else {
//                     sweetAlert.fire('Logged In');
//                     response.redirect('/home');
//                 }
//             } else {
//                 response.send('Incorrect user credentials!');
//             }

//             response.end()
//         })
//     } else {
//         response.send('Please enter username and password!');
//         response.end();
//     }
// }

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
                return successResponse(res, 'Logged In', { redirect: '/home', token });
            }
        } else {
            return errorResponse(res, 'Incorrect user credentials!');
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