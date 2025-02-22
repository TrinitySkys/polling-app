const express = require('express');
const pollController = require('../controllers/pollController');
const authMiddleware = require('../middlewares/authMiddleware'); // Ensure this is correct

const router = express.Router();

// Show all polls
router.get('/', pollController.listPolls);

// Show create poll page (Protected)
router.get('/create', authMiddleware.requireAuth, pollController.getCreatePoll);

// Handle poll creation (Protected)
router.post('/create', authMiddleware.requireAuth, pollController.postCreatePoll);

// View a single poll by ID
router.get('/:id', pollController.getPoll);

// Handle voting on a poll
router.post('/:id/vote', pollController.postVote);

module.exports = router;
