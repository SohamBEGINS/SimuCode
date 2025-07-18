const express = require('express');
const router = express.Router();
const interviewSummaryController = require('../controllers/InterviewSummaryController');

// Save a new interview summary
router.post('/', interviewSummaryController.saveSummary);

// Get all summaries for a user
router.get('/user/:userId', interviewSummaryController.getSummariesForUser);

// (Optional) Get a single summary by ID
router.get('/:id', interviewSummaryController.getSummaryById);

// backend/routes/interviewSummary.js
router.post('/clarification-feedback', interviewSummaryController.getClarificationFeedback);

module.exports = router;