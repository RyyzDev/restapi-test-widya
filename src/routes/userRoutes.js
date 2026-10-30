// import package express
import express from 'express';
// init method router express
const router = express.Router();

// import controller user
import { getMyProfile } from '../controllers/userController.js';

// import middleware auth
import { authenticateToken } from '../middlewares/auth.js';


// Routing
router.get('/my-profile', authenticateToken, getMyProfile);

export default router;
