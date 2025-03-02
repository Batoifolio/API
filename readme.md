# Iniciar Docker
```bash
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

