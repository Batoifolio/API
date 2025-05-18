#!/bin/bash

if [ -z "$batoifolio_path" ]; then
    batoifolio_path="${PWD}/commands/"
fi

cd $batoifolio_path
cd ..

case $1 in
    -init)
        bash $batoifolio_path/init.sh;
        ;;
    -run)
        bash $batoifolio_path/run.sh;
        ;;
    -stop)
        bash $batoifolio_path/stop.sh;
        ;;
    -purge)
        bash $batoifolio_path/purge.sh;
        ;;
    -reload)
        if [ "$2" == "-v" ]; then
            bash $batoifolio_path/reload.sh -v;
        else
            bash $batoifolio_path/reload.sh;
        fi
        ;;
    -shell)
        bash $batoifolio_path/shell.sh;
        ;;
    -log)
        bash $batoifolio_path/log.sh;
        ;;
    -newModule)
        bash $batoifolio_path/newModule.sh $batoifolio_path $2;
        ;;
    -help)
        bash $batoifolio_path/help.sh;
        ;;
    *)
        clear;
        echo "Opcion no valida";
        ;;
esac