import express from 'express';
import injector from '../injectors/injector.js';
import { AuthController } from '../controllers/Auth.js';

// Inject dependencies
const authService = injector.get('AuthService');
const authController = new AuthController(authService);

const authRouter = express.Router();

authRouter
    .get('/register', (req, res) => authController.renderRegisterPage(req, res)) // Optional route to render a registration page
    .post('/register', (req, res) => authController.signUp(req, res))
    .get('/login', (req, res) => authController.renderLoginPage(req, res)) // Optional route to render a login page
    .post('/login', (req, res) => authController.logIn(req, res))
    .post('/verify', (req, res) => authController.verify(req, res))
    .get('/logout', (req, res) => authController.logOut(req, res))
    .post('/reset', (req, res) => authController.reset(req, res));

export default authRouter;