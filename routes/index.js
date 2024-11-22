const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const db = require('../database');
const { v4: uuidv4 } = require('uuid');

// Controller und Routes für Benutzeraktivität
router.post('/track', async (req, res) => {
  const { user_id, session_id, page_visited } = req.body;
  // Validate input
  if (!user_id || !session_id || !page_visited) {
    console.error('Invalid input:', { user_id, session_id, page_visited });
    return res.status(400).send('Invalid input: user_id, session_id, and page_visited are required.');
  }
  try {
    await db.trackUserActivity(user_id, session_id, page_visited);
    res.status(200).send('User activity tracked successfully');
  } catch (error) {
    console.error('Error tracking user activity:', error);
    res.status(500).send('Error tracking user activity');
  }
});

// Controller und Routes für Session Logs
router.post('/session', async (req, res) => {
  let { session_id, user_id, startTime, endTime, pagesVisited, actions } = req.body;
  if (!session_id) session_id = uuidv4();
  if (!user_id) user_id = uuidv4();

  try {
    await db.saveSessionLog(session_id, user_id, startTime, endTime, pagesVisited, actions);
    res.status(200).send('Session log saved successfully');
  } catch (error) {
    console.error('Error saving session log:', error);
    res.status(500).send('Error saving session log');
  }
});

// Controller und Routes für Seitenansichten
router.post('/page-view', async (req, res) => {
  const { page_visited } = req.body;
  try {
    await db.incrementPageView(page_visited);
    res.status(200).send('Page view incremented successfully');
  } catch (error) {
    console.error('Error incrementing page view:', error);
    res.status(500).send('Error incrementing page view');
  }
});

// Controller und Routes für Benutzerzusammenfassung
router.post('/user-summary', async (req, res) => {
  const { user_id, sessions, timeSpent, actions } = req.body;
  try {
    await db.updateUserSummary(user_id, sessions, timeSpent, actions);
    res.status(200).send('User summary updated successfully');
  } catch (error) {
    console.error('Error updating user summary:', error);
    res.status(500).send('Error updating user summary');
  }
});

// Controller und Routes für Conversion-Rate
router.post('/conversion-rate', async (req, res) => {
  const { page, conversions, visits } = req.body;
  try {
    await db.updateConversionRate(page, conversions, visits);
    res.status(200).send('Conversion rate updated successfully');
  } catch (error) {
    console.error('Error updating conversion rate:', error);
    res.status(500).send('Error updating conversion rate');
  }
});

module.exports = router;
