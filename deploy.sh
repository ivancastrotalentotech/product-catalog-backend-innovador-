#!/bin/bash
# Amazon Linux 2023
# Este script automatiza el despliegue del frontend y backend

# Define los directorios de tus proyectos
FRONTEND_DIR="/home/ec2-user/environment/product-catalog-innovador"
BACKEND_DIR="/home/ec2-user/environment/product-catalog-backend-innovador-"

# Verificar si los directorios existen antes de proceder
if [ ! -d "$FRONTEND_DIR" ]; then
    echo "Error: El directorio del frontend no existe ($FRONTEND_DIR)"
    exit 1
fi

if [ ! -d "$BACKEND_DIR" ]; then
    echo "Error: El directorio del backend no existe ($BACKEND_DIR)"
    exit 1
fi

# Actualiza el repositorio frontend
echo "Actualizando el repositorio del frontend..."
cd $FRONTEND_DIR || { echo "Error: No se pudo acceder al directorio del frontend."; exit 1; }
git pull origin main || { echo "Error: Falló el 'git pull' del frontend."; exit 1; }
npm install || { echo "Error: Falló el 'npm install' del frontend."; exit 1; }
npm run build || { echo "Error: Falló el 'npm run build' del frontend."; exit 1; }

# Copia los archivos del build a la carpeta donde Nginx los sirva
echo "Copiando los archivos del build de React a /usr/share/nginx/html/..."
sudo cp -r $FRONTEND_DIR/dist/* /usr/share/nginx/html/ || { echo "Error: No se pudo copiar los archivos del build al directorio de Nginx."; exit 1; }

# Actualiza el repositorio backend
echo "Actualizando el repositorio del backend..."
cd $BACKEND_DIR || { echo "Error: No se pudo acceder al directorio del backend."; exit 1; }
git pull origin main || { echo "Error: Falló el 'git pull' del backend."; exit 1; }
npm install || { echo "Error: Falló el 'npm install' del backend."; exit 1; }

# Compilando el backend
echo "Compilando el backend..."
npm run pkg || { echo "Error: Falló la compilación del backend."; exit 1; }

# Copia el archivo .env necesario para la compilación
echo "Copiando el archivo .env al directorio de compilación..."
cp $BACKEND_DIR/.env $BACKEND_DIR/pkg/ || { echo "Error: No se pudo copiar el archivo .env."; exit 1; }

# Mostrar algunas variables específicas del archivo .env para verificar
echo "Imprimiendo algunas variables específicas del archivo .env..."
grep -E "DB_HOST|DB_USER|DB_PASSWORD" $BACKEND_DIR/pkg/.env

# Reinicia el backend usando PM2
echo "Reiniciando el backend con PM2..."
pm2 restart catalogo-productos-backend --update-env || { echo "Error: Falló el reinicio del backend con PM2."; exit 1; }

echo "Despliegue completado exitosamente."
