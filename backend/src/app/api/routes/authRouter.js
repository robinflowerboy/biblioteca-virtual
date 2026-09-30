import express from "express";
import * as authMiddleware from '../middleware/authMiddleware.js';
import * as authController from '../controllers/authControllers.js';

const router = express.Router();

router.post('/register', authMiddleware.checkInputRules, authController.registerController)
router.post('/login', authMiddleware.checkInputRules, authController.loginController)

router.get('/dashboard', authMiddleware.authenticate, authController.dashboard)

export default router;