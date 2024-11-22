const db = require('./database');

// Controller for tracking user activity
const handleTrackUserActivity = async (req, res) => {
  const { userId, sessionId, pageVisited } = req.body;
  try {
    await db.trackUserActivity(userId, sessionId, pageVisited);
    res.status(200).send('User activity tracked successfully');
  } catch (error) {
    console.error('Error tracking user activity:', error);
    res.status(500).send('Error tracking user activity');
  }
};

// Controller for session logs
const handleSaveSessionLog = async (req, res) => {
  let { sessionId, userId, startTime, endTime, pagesVisited, actions } = req.body;
  // Generate UUIDs if not provided
  if (!sessionId) sessionId = uuidv4();
  if (!userId) userId = uuidv4();
  
  try {
    await db.saveSessionLog(sessionId, userId, startTime, endTime, pagesVisited, actions);
    res.status(200).send('Session log saved successfully');
  } catch (error) {
    console.error('Error saving session log:', error);
    res.status(500).send('Error saving session log');
  }
};

// Controller für Seitenansichten
const handleIncrementPageView = async (req, res) => {
  const { page } = req.body;
  try {
    await db.incrementPageView(page);
    res.status(200).send('Page view incremented successfully');
  } catch (error) {
    console.error('Error incrementing page view:', error);
    res.status(500).send('Error incrementing page view');
  }
};

// Controller für Benutzerzusammenfassung
const handleUpdateUserSummary = async (req, res) => {
  const { userId, sessions, timeSpent, actions } = req.body;
  try {
    await db.updateUserSummary(userId, sessions, timeSpent, actions);
    res.status(200).send('User summary updated successfully');
  } catch (error) {
    console.error('Error updating user summary:', error);
    res.status(500).send('Error updating user summary');
  }
};

// Controller für Conversion-Rate
const handleUpdateConversionRate = async (req, res) => {
  const { page, conversions, visits } = req.body;
  try {
    await db.updateConversionRate(page, conversions, visits);
    res.status(200).send('Conversion rate updated successfully');
  } catch (error) {
    console.error('Error updating conversion rate:', error);
    res.status(500).send('Error updating conversion rate');
  }
};

// Exportieren aller Controller-Funktionen
module.exports = {
  handleTrackUserActivity,
  handleSaveSessionLog,
  handleIncrementPageView,
  handleUpdateUserSummary,
  handleUpdateConversionRate,
};
