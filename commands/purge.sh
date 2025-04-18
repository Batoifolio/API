
clear;
echo "Eliminando contenedores";
docker stop $(docker ps -aq);
docker rm $(docker ps -aq);
echo "Eliminando imagenes";
docker rmi $(docker images -q);
docker rmi -f $(docker images -q);
echo "Eliminando volumenes";
docker volume rm $(docker volume ls -q);
echo "Eliminando redes";
docker network prune -f;