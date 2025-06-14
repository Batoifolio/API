# Usa una imagen oficial de Node.js como base
FROM node:20

RUN apt-get update && apt-get install -y netcat-openbsd

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias y los instala
COPY package.json ./
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

RUN chmod +x /app/wait-for


# Crea el directorio de logs y el archivo de logs vacío con permisos adecuados
RUN mkdir -p /app/logs && chmod 775 /app/logs && touch /app/logs/logs.log && chmod 666 /app/logs/logs.log
# Expone el puerto que usa la API
EXPOSE 3000

# Comando por defecto para iniciar la aplicación
CMD ["npm", "run", "seed"]
CMD ["npm", "run", "start"]