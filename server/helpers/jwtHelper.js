import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (user) => {  // Here the payload is the user
    const secretKey = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN;
    return jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn });
}