const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
// Provide html files
app.use(express.static(path.join(__dirname, 'views')));
// API routes
app.use('/', routes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
