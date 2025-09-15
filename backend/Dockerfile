FROM node:18-alpine

WORKDIR /app

# Copia archivos de dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el código de la aplicación
COPY . .

EXPOSE 5000

CMD ["node", "server.js"]