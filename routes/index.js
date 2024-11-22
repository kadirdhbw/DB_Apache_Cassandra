const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

// API endpoints
router.post('/track', controllers.handleTrackUserActivity);
router.post('/session', controllers.handleSaveSessionLog);
router.post('/page-view', controllers.handleIncrementPageView);
router.post('/user-summary', controllers.handleUpdateUserSummary);
router.post('/conversion-rate', controllers.handleUpdateConversionRate);

module.exports = router;
