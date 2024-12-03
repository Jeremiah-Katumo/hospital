import express from 'express';
import session from 'express-session';
import { signUp } from '../controllers/signup.js';
import { logIn } from '../controllers/login.js';
import { runValidation } from '../validations/index.js';
import { useSignUpValidator, useLogInValidator } from '../validations/auth.js';

const router = express.Router();

router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

router.get('/', (req, res) => {
    res.render("signup.ejs");
})

router.post('/register', useSignUpValidator, runValidation, signUp)
    .post('/login', useLogInValidator, runValidation, logIn)

export default router;