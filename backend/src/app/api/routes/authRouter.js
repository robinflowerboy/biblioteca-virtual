import express from "express";
import * as authMiddleware from '../middleware/authMiddleware.js';
import * as authController from '../controllers/authControllers.js';

const router = express.Router();

router.post('/register', authMiddleware.checkRegisterInputRules, authController.registerController)
router.post('/login', authMiddleware.checkLoginInputRules, authController.loginController)

router.get('/', authMiddleware.authentication, (req, res)=>{ res.sendStatus(200) })

export default router;