import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

/**
 * Public routes
 */

// Register new user
router.post('/register', authController.register);

// Login user
router.post('/login', authController.login);

// Refresh access token
router.post('/refresh', authController.refresh);

// Login with Telegram
router.post('/telegram', authController.loginWithTelegram);

/**
 * Protected routes (require authentication)
 */

// Get current user profile
router.get('/me', requireAuth, authController.getMe);

// Update user profile
router.patch('/profile', requireAuth, authController.updateProfile);

// Change password
router.post('/change-password', requireAuth, authController.changePassword);

export default router;
