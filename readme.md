# Iniciar Docker por Primera vez
```bash
    docker compose up --build;
```

# Iniciar Docker
```bach
    docker compose up -d;
```

# Apagar docker 
```bash
    docker compose down;
```

# Recargar los volumenes
```bash
    docker compose down -v;
    docker compose up -d;
```

# Eliminar los volumenes 
```bash
    docker compose down;
    docker volume prune -f;
    docker volume rm $(docker volume ls -q);
```


# Extensiones para facilidad de Dev
## - Run on Save
Esta configurado para que cuando se guarde un archivo .ts se ejecute el script:
```bash
    npm run fix
```
Que se encarga de corregir los errores que marque el linter


# Borrar todo docker
```bash
    docker stop $(docker ps -aq);
    docker rm $(docker ps -aq);
    docker rmi $(docker images -q);
    docker rmi -f $(docker images -q);
    docker volume rm $(docker volume ls -q);
    docker network prune -f;
```