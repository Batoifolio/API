#!/bin/bash

commands="./commands";

case $1 in
    -init)
        bash $commands/init.sh;
        ;;
    -run)
        bash $commands/run.sh;
        ;;
    -stop)
        bash $commands/stop.sh;
        ;;
    -purge)
        bash $commands/purge.sh;
        ;;
    -reload)
        if [ "$2" == "-v" ]; then
            bash $commands/reload.sh -v;
        else
            bash $commands/reload.sh;
        fi
        ;;
    *)
        clear;
        echo "Opcion no valida";
        ;;
esac
