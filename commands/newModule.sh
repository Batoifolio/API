#!/bin/bash

# Verifica que se haya pasado un nombre
if [ -z "$2" ]; then
  echo "Uso: $0 <nombre>"
  exit 1
fi

NOMBRE=$2
BASE_DIR="$1../src/modules/$NOMBRE"

# Extensiones y carpetas (usamos un array ordenado y seguro)
CARPETAS=("controllers" "interfaces" "models" "repositories" "routes" "services")
ARCHIVOS=(
  "$NOMBRE.controller.ts"
  "$NOMBRE.interface.ts"
  "$NOMBRE.model.ts"
  "$NOMBRE.repository.ts"
  "$NOMBRE.routes.ts"
  "$NOMBRE.service.ts"
)

# Crear base
mkdir -p "$BASE_DIR"

# Crear carpetas y archivos
for i in "${!CARPETAS[@]}"; do
  DIR="${CARPETAS[$i]}"
  FILE="${ARCHIVOS[$i]}"
  mkdir -p "$BASE_DIR/$DIR"
  touch "$BASE_DIR/$DIR/$FILE"
done

echo "✅ Estructura creada correctamente en $BASE_DIR"
