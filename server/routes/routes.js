import express from 'express';
import session from 'express-session';
import { signUp } from '../controllers/signup.js';
import { logIn, logOut } from '../controllers/login.js';
import { verify } from '../controllers/verify.js';
import { runValidation } from '../validations/index.js';
import { useSignUpValidator, useLogInValidator } from '../validations/auth.js';

const router = express.Router();

router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

const validate = (validations) => async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

router.get('/', (req, res) => {
    res.render("signup.ejs");
})

router.post('/register', validate(useSignUpValidator), signUp)
    .post('/login', validate(useLogInValidator), logIn)
    .post('/verify', verify)
    .get('/logout', logOut)

export default router;