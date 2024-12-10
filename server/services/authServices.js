import crypto from 'crypto';


export class AuthService {
    constructor(promiseConn) {
        this.promiseConn = promiseConn;
    }

    async findUserByEmail(email) {
        try {
            const [results] = await this.promiseConn.query(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );
            return results[0];
        } catch (error) {
            console.error('Error finding user by email:', error.message);
            throw error;
        }
    }

    async insertUser({ username, email, password, emailStatus }) {
        try {
            await this.promiseConn.query(
                'INSERT INTO users (username, email, password, email_status) VALUES (?, ?, ?, ?)',
                [username, email, password, emailStatus]
            );
        } catch (error) {
            console.error('Error inserting user:', error.message);
            throw error;
        }
    }

    async insertVerificationToken({ username, email, token }) {
        try {
            await this.promiseConn.query(
                'INSERT INTO verify (username, email, token) VALUES (?, ?, ?)',
                [username, email, token]
            );
        } catch (error) {
            console.error('Error inserting verification token:', error.message);
            throw error;
        }
    }

    async getUserIdByEmail(email) {
        try {
            const [results] = await this.promiseConn.query(
                'SELECT id FROM users WHERE email = ?',
                [email]
            );
            return results[0]?.id || null;
        } catch (error) {
            console.error('Error getting user ID by email:', error.message);
            throw error;
        }
    }

    async updateEmailVerificationStatus(email, status) {
        try {
            await this.promiseConn.query(
                'UPDATE users SET email_status = ? WHERE email = ?',
                [status, email]
            );
        } catch (error) {
            console.error('Error updating email verification status:', error.message);
            throw error;
        }
    }



    generateToken() {
        return crypto.randomBytes(20).toString('hex'); // Generates a 40-character hexadecimal string
    }

    // Insert the verification token into the database with the email
    async insertVerificationToken({ email, token }) {
        try {
            // Save the token in the database (user's record) or in a password reset table
            const query = `
                UPDATE temp 
                SET reset_token = ?, reset_token_expiry = ? 
                WHERE email = ?
            `;
            const expiry = Date.now() + 3600000; // Token expires in 1 hour
            await this.promiseConn.query(query, [token, expiry, email]);
        } catch (error) {
            console.error('Error inserting verification token:', error.message);
            throw error;
        }
    }

    // Find user by the reset token and check token expiry
    async findUserByResetToken(token) {
        try {
            const query = `
                SELECT * FROM temp
                WHERE reset_token = ? AND reset_token_expiry > ?
            `;
            const [results] = await this.promiseConn.query(query, [token, Date.now()]);
            return results[0] || null; // Return the first user or null if no match
        } catch (error) {
            console.error('Error finding user by reset token:', error.message);
            throw error;
        }
    }

    // Update the user's password in the database
    async updateUserPassword(userId, hashedPassword) {
        try {
            const query = `
                UPDATE users 
                SET password = ? 
                WHERE id = ?
            `;
            await this.promiseConn.query(query, [hashedPassword, userId]);
        } catch (error) {
            console.error('Error updating user password:', error.message);
            throw error;
        }
    }

    // Send the reset link (generates token and inserts it into DB)
    async sendResetLink(email, id) {
        try {
            const token = this.generateToken(); // Generate the reset token
            await this.insertVerificationToken({ email, token }); // Save token in the DB
            const resetLink = `http://example.com/reset-password?token=${token}`;
            // Send the reset link via email (using nodemailer or any other email service)
            // sendEmail(email, resetLink);
        } catch (error) {
            console.error('Error sending reset link:', error.message);
            throw error;
        }
    }

    // Reset password by validating the token and updating the password
    async resetPassword(token, newPassword) {
        try {
            const user = await this.findUserByResetToken(token); // Find user by token
            if (!user) {
                throw new Error('Invalid or expired token');
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the new password
            await this.updateUserPassword(user.id, hashedPassword); // Update password and clear token
        } catch (error) {
            console.error('Error resetting password:', error.message);
            throw error;
        }
    }
}
