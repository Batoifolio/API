# entrar a la shell de un contenedor
# Usage: sh <container_name>
clear;
echo "Entrando a la shell de la App";
docker exec -it db-api-1 /bin/sh