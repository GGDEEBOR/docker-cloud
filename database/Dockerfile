FROM mysql:8.0

# Copiar el script de inicialización
COPY init.sql /docker-entrypoint-initdb.d/

# Variables de entorno (contraseña root)
ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=todolist

EXPOSE 3306