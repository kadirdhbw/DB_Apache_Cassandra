const express = require('express');
const bodyParser = require('body-parser');
const cassandra = require('cassandra-driver');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const exp = require('constants');
const path = require('path');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Connection to Cassandra DB
const client = new cassandra.Client({ 
  contactPoints: ['127.0.0.1'], 
  localDataCenter: 'datacenter1', 
  keyspace: 'analytics' 
});

// Provide html files
app.use(express.static(path.join(__dirname, 'views')));

// API endpoint to record user activity
app.post('/track', async (req, res) => {
  const { user_id, page_visited } = req.body;
  const session_id = uuidv4();

  const query = 'INSERT INTO user_activity (user_id, session_id, page_visited, visit_time) VALUES (?, ?, ?, toTimestamp(now()))';
  const params = [user_id, session_id, page_visited];

  try {
    await client.execute(query, params, { prepare: true });
    res.status(200).send('Activity recorded');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error recording activity');
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
