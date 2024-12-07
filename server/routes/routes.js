import express from 'express';
import session from 'express-session';
import { signUp, logIn, logOut, verify, reset } from '../controllers/Auth.js';
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