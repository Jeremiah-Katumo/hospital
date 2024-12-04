import express from 'express';
import session from 'express-session';
import { signUp } from '../controllers/signup.js';
import { logIn, logOut } from '../controllers/login.js';
import { verify } from '../controllers/verify.js';
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

export default router;