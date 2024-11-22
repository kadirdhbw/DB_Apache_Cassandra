const client = require('./cassandraClient');
const { v4: uuidv4 } = require('uuid');

// Function to track user activity
const trackUserActivity = async (userId, sessionId, pageVisited) => {
  const query = `
    INSERT INTO user_activity (user_id, session_id, page_visited, visit_time)
    VALUES (?, ?, ?, toTimestamp(now()));
  `;
  const params = [userId, sessionId, pageVisited];
  await client.execute(query, params, { prepare: true });
};

// Function to save session log
const saveSessionLog = async (sessionId, userId, startTime, endTime, pagesVisited, actions) => {
    const sessionUuid = sessionId || uuidv4();
    const userUuid = userId || uuidv4();
  
    const query = `
    INSERT INTO session_logs (session_id, user_id, start_time, end_time, pages_visited, actions)
    VALUES (?, ?, ?, ?, ?, ?);
  `;
  const params = [sessionUuid, userUuid, startTime, endTime, pagesVisited, actions];
  await client.execute(query, params, { prepare: true });
};

// Function to increment page view
const incrementPageView = async (page) => {
  const query = `
    UPDATE page_views
    SET total_views = total_views + 1
    WHERE page = ?;
  `;
  await client.execute(query, [page], { prepare: true });
};

// Function to update user summary
const updateUserSummary = async (userId, sessions, timeSpent, actions) => {
  const query = `
    UPDATE user_summary
    SET total_sessions = total_sessions + ?,
        total_time_spent = total_time_spent + ?,
        total_actions = total_actions + ?
    WHERE user_id = ?;
  `;
  const params = [sessions, timeSpent, actions, userId];
  await client.execute(query, params, { prepare: true });
};

// Function to update conversion rate
const updateConversionRate = async (page, conversions, visits) => {
  const query = `
    UPDATE conversion_rates
    SET conversions = conversions + ?,
        visits = visits + ?
    WHERE page = ?;
  `;
  const params = [conversions, visits, page];
  await client.execute(query, params, { prepare: true });
};

// Export functions
module.exports = {
  trackUserActivity,
  saveSessionLog,
  incrementPageView,
  updateUserSummary,
  updateConversionRate,
};
