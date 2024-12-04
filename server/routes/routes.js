import express from 'express';
import session from 'express-session';
import { signUp } from '../controllers/auth/signup.js';
import { logIn, logOut } from '../controllers/auth/login.js';
import { verify } from '../controllers/verify.js';
import { reset } from '../controllers/auth/reset.js';
import { validate } from '../validations/index.js';
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

router.post('/register', validate(useSignUpValidator), signUp)
    .post('/login', validate(useLogInValidator), logIn)
    .post('/verify', verify)
    .get('/logout', logOut)
    .post('/reset', reset)

export default router;