# Comandos Docker
## Iniciar Docker por Primera vez
```bash
    docker compose up --build;
```

## Iniciar Docker 
```bash
    docker compose up -d;
```

## Apagar docker 
```bash
    docker compose down;
```

## Recargar los volumenes
> [!TIP]
> Los comando de eliminar Volumenes o recargarlos, son utiles, ya que siempre que se recargen se pondra la base de datos en el estado que inicial estando en la path:`/db/init.sql`.
```bash
    docker compose down -v;
    docker compose up -d;
```

### Eliminar los volumenes 
```bash
    docker compose down;
    docker volume prune -f;
    docker volume rm $(docker volume ls -q);
```

## Borrar todo docker
> [!CAUTION]
> Este comando eliminará todos los contenedores, imágenes y volúmenes de Docker, TODOS TODOS, no solo los de este proyecto.
```bash
    docker stop $(docker ps -aq);
    docker rm $(docker ps -aq);
    docker rmi $(docker images -q);
    docker rmi -f $(docker images -q);
    docker volume rm $(docker volume ls -q);
    docker network prune -f;
```
---

# Extensiones para facilidad de Dev
## - Run on Save
> [!TIP]
> El comando se encarga de corregir los errores que marque el linter, se puede ejecutar tal cual.
Esta configurado para que cuando se guarde un archivo .ts se ejecute el script:
```bash
    npm run fix
```
---


# Comando Rapidos:
> [!NOTE]  
> Estos comando se han centralizado, ya que facilitan el uso de la aplicacion a nivel de desarollo.
## Iniciar Proyecto
```bash
    bash app.sh -init
```

## Ejecutar Docker
```bash
    bash app.sh -run
```

## Parar Contenedores
```bash
    bash app.sh -stop
```

## Recargar contenedores
> [!TIP]
> Los comando de eliminar Volumenes o recargarlos, son utiles, ya que siempre que se recargen se pondra la base de datos en el estado que inicial estando en la path:`/db/init.sql`.
```bash
    bash app.sh -reload
```

### Recargar Volumenes
```bash
    bash app.sh -reload -v
```

## Purgar TODO Docker
> [!CAUTION]
> Este comando eliminará todos los contenedores, imágenes y volúmenes de Docker, TODOS TODOS, no solo los de este proyecto.
```bash
    bash app.sh -purge
```