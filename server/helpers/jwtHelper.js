import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (user) => {  // Here the payload is the user
    const secretKey = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES;
    return jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: expiresIn });
}

const verifyToken = (token) => {
    // const token = req.cookies.token || req.headers['authorization'];
    const secretKey = process.env.JWT_SECRET;
    return jwt.verify(token, secretKey);
}

export const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization'];

    if (token) {
        try {
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Attach decoded token data to the request
            return res.redirect('/dashboards'); // Redirect if already logged in
        } catch (error) {
            console.error('Token verification failed:', error.message);
        }
    }
    next(); // Proceed to the next middleware if not authenticated
};