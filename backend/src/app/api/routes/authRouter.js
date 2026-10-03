import express from "express";
import * as authMiddleware from '../middleware/authMiddleware.js';
import * as authController from '../controllers/authControllers.js';

const router = express.Router();

router.post('/register', authMiddleware.checkRegisterInputRules, authController.registerController)
router.post('/login', authMiddleware.checkLoginInputRules, authController.loginController)

export default router;