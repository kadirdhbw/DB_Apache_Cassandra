<!-- @REM This Batch file is used to start two Cassandra containers in Docker

@REM Pull the latest Cassandra image from Docker Hub
docker pull cassandra:latest

@REM Create Docker network
docker network create cassandra-cluster

@REM Start first Cassandra container
docker run -d --name cassandra-node1 --network cassandra-cluster -p 9042:9042 cassandra:latest

@REM Start second Cassandra container
docker run -d --name cassandra-node2 --network cassandra-cluster -p 9043:9042 -e CASSANDRA_SEEDS=cassandra-node1 cassandra:latest

@REM Display the status of the Cassandra containers
docker ps

@REM Go into the first Cassandra container
docker exec -it cassandra-node1 bash

@REM Start the CQL shell
cqlsh

@REM Create Keyspace and Table in Cassandra
CREATE KEYSPACE tracking
WITH replication = {
  'class': 'NetworkTopologyStrategy',
  'datacenter1': 2
};

CREATE TABLE tracking.user_activity (
    user_id UUID,
    session_id UUID,
    page_visited TEXT,
    visit_time TIMESTAMP,
    PRIMARY KEY (user_id, session_id)
);

@REM Left the CQL shell and the first Cassandra container
exit
exit

@REM Display the status of the Cassandra containers
docker ps -->


# Cassandra Cluster in Docker

This Repo contains a simple script for user-activity tracking using Cassandra. It uses Docker to create a Cassandra cluster with two nodes and a Node.js server to interact with the Cassandra cluster.

## Prerequisite

- Docker
- Node.js

## How to run

1. Clone the Repo

```bash
git clone <repo-url>
```

2. Change into project directory

```bash
cd DB_Apache_Cassandra/
```

3. Install the dependencies

```bash
npm install
```

4. Start the Cassandra Containers

```bash
docker pull cassandra:latest
docker network create cassandra-cluster
docker run -d --name cassandra-node1 --network cassandra-cluster -p 9042:9042 cassandra:latest
docker run -d --name cassandra-node2 --network cassandra-cluster -p 9043:9042 -e CASSANDRA_SEEDS=cassandra-node1 cassandra:latest
```

5. Open Docker Shell

```bash
docker exec -it cassandra-node1 bash
```

6. Start the CQL shell

```bash
cqlsh
```

7. Create Keyspace and Table in Cassandra

```sql
-- Create Keyspace
CREATE KEYSPACE analytics
WITH replication = {
  'class': 'NetworkTopologyStrategy',
  'datacenter1': 2
};

-- Single user activity tracking
CREATE TABLE analytics.user_activity (
    user_id UUID,
    session_id UUID,
    page_visited TEXT,
    visit_time TIMESTAMP,
    PRIMARY KEY (user_id, session_id)
);

-- Save user session logs
CREATE TABLE analytics.session_logs (
    session_id UUID,
    user_id UUID,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    pages_visited LIST<TEXT>,
    actions TEXT,
    PRIMARY KEY (user_id, session_id)
);

-- Statistics of page views
CREATE TABLE analytics.page_views (
    page TEXT PRIMARY KEY,
    total_views COUNTER
);

-- Save aggregated data of user activity
CREATE TABLE analytics.user_summary (
    user_id UUID PRIMARY KEY,
    total_sessions INT,
    total_time_spent DOUBLE,
    total_actions INT
);

-- Analyze user behavior
CREATE TABLE analytics.conversion_rates (
    page TEXT PRIMARY KEY,
    conversions INT,
    visits INT
);

```

8. Start the Node.js server

```bash
node index.js
```

9. Open the browser and go to `http://localhost:3000/`

10. Go again into one of the Cassandra containers and start the CQL shell

```bash
docker exec -it cassandra-node1 bash
cqlsh
```

11. Show the data in the table

```sql
SELECT * FROM tracking.user_activity;
```
