import { validationResult } from 'express-validator';
import { successResponse, errorResponse } from '../../helpers/responseHelper.js';
import { generateToken } from '../../helpers/jwtHelper.js';
import {
    findUserByUsername,
} from '../../services/authService.js';


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