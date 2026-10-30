// import package express
import express from 'express';
// init method router express
const router = express.Router();

// import controller user
import { register, login } from '../controllers/authController.js';
// import fungsi validasi request
import { validate } from '../middlewares/validator.js'
import { registerUserValidation } from '../middlewares/validation/registerValidation.js';
import { loginUserValidation } from '../middlewares/validation/loginValidation.js';

// Routing


router.post('/register', validate(registerUserValidation), register);
router.post('/login', validate(loginUserValidation), login);

export default router;
