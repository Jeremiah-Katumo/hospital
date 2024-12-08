import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    renderRegisterPage = async (req, res) => {
        res.render('user/signup.ejs');
    }

    signUp = async (req, res) => {
        const { username, email, password } = req.body;

        try {
            // Check if user exists
            const existingUser = await this.authService.findUserByUsername(username);
            if (existingUser) {
                return res.status(400).json({ message: 'Username already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Save user
            await this.authService.insertUser({
                username,
                email,
                password: hashedPassword,
                emailStatus: 'pending',
            });

            res.status(201).json({ message: 'User signed up successfully' });
            res.render('dashboard/list.ejs');
        } catch (error) {
            console.error('Error during signup:', error.message);
            res.status(500).json({ message: 'Server error' });
        }
    };

    renderLoginPage = (req, res) => {
        res.render('user/login.ejs');
    }

    logIn = async (req, res) => {
        const { username, password } = req.body;

        try {
            const user = await this.authService.findUserByUsername(username);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Verify password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            // Generate JWT token
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({ message: 'Login successful', token });
            res.render('dashboard/list.ejs');
        } catch (error) {
            console.error('Error during login:', error.message);
            res.status(500).json({ message: 'Server error' });
        }
    };

    verify = async (req, res) => {
        const { email, token } = req.body;

        try {
            const userId = await this.authService.getUserIdByEmail(email);
            if (!userId) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update verification status
            await this.authService.updateEmailVerificationStatus(email, 'verified');
            res.status(200).json({ message: 'Email verified successfully' });
        } catch (error) {
            console.error('Error during verification:', error.message);
            res.status(500).json({ message: 'Server error' });
        }
    };

    logOut = (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error during logout:', err.message);
                return res.status(500).json({ message: 'Logout failed' });
            }
            res.status(200).json({ message: 'Logout successful' });
            res.render('user/login.ejs');
        });
    };

    reset = async (req, res) => {
        const { email, newPassword } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await this.authService.updatePassword(email, hashedPassword);
            res.status(200).json({ message: 'Password reset successful' });
            res.render('user/login.ejs');
        } catch (error) {
            console.error('Error during password reset:', error.message);
            res.status(500).json({ message: 'Server error' });
        }
    };

    renderResetPage = (req, res) => {
        res.render('user/reset.ejs');
    };

    renderForgotPasswordPage = (req, res) => {
        res.render('user/forgot-password.ejs');
    }

    async forgotPassword(req, res) {
        const { email } = req.body;
    
        try {
            await authService.sendResetLink(email);
            res.status(200).json({ message: 'Password reset link sent to your email' });
        } catch (error) {
            res.status(500).json({ message: 'Server error, please try again later' });
        }
    }

    async resetPassword(req, res) {
        const { token, newPassword } = req.body;
    
        try {
            await authService.resetPassword(token, newPassword);
            res.status(200).json({ message: 'Password reset successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error resetting password' });
        }
    }
}
