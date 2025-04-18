
clear;
if [ "$1" == "-v" ]; then
    echo "Eliminado volumenes";
    docker compose down -v;
    echo "Levantando contenedores";
    docker compose up -d;
else
    echo "Parando contenedores";
    docker compose down;
    echo "Levantando contenedores";
    docker compose up -d;
fi