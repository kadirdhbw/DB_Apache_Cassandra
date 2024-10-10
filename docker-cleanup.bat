@REM This Script deletes Docker Networks, Containers, and Images

@REM Delete Docker Networks (force delete)
echo "Deleting Docker Networks"
docker network rm -f cassandra-cluster

@REM Delete Docker Containers
echo "Deleting Docker Containers"
docker rm -f cassandra-node1

docker rm -f cassandra-node2

@REM Delete Docker Images (force delete)
echo "Deleting Docker Images"
docker rmi -f cassandra:latest

@REM Display the status of the Docker Networks, Containers, and Images
echo "Docker Networks"
docker network ls

echo "Docker Containers"
docker ps -a

echo "Docker Images"
docker images

@REM End of Script
echo "End of Script"
