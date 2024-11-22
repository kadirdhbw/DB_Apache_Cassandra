const cassandra = require('cassandra-driver');

// Connection to Cassandra DB
const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'], 
  localDataCenter: 'datacenter1',
  keyspace: 'analytics',
});

module.exports = client;
