const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Login routes (without /polling-app prefix)
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.logout);

// Middleware to protect routes
const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.redirect('/polling-app/login'); // Redirect to login if not authenticated
  }
  next();
};

// Protect the admin dashboard route
router.get('/dashboard', requireAuth, authController.getDashboard);

module.exports = router;
