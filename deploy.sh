#!/bin/bash

#nano /home/ubuntu/deploy.sh (Crea el script deploy.sh)
#chmod +x /home/ubuntu/deploy.sh (Paso 2: Otorga permisos de ejecución al script)
#./deploy.sh (Paso 3: Ejecuta el script)
#Ejecuta el archivo deploy.sh: Ahora puedes ejecutar tu archivo de script:

# Define los directorios de tus proyectos
FRONTEND_DIR="/var/www/html/product-catalog-innovador"
BACKEND_DIR="/home/ubuntu/ws/product-catalog-backend-innovador-"

# Actualiza el repositorio frontend
echo "Actualizando el repositorio del frontend..."
cd $FRONTEND_DIR
git pull origin main # Asegúrate de usar la rama correcta
npm install
npm run build

# Copia los archivos del build a la carpeta donde Nginx los sirva
echo "Copiando los archivos del build de React..."
cp -r build/* /var/www/html/ # Asegúrate de que Nginx esté configurado correctamente

# Actualiza el repositorio backend
echo "Actualizando el repositorio del backend..."
cd $BACKEND_DIR
git pull origin main # Asegúrate de usar la rama correcta
npm install
echo "Compilando el backend..."
npm run pkg

# Reinicia el backend usando PM2
echo "Reiniciando el backend con PM2..."
cp $BACKEND_DIR/.env $BACKEND_DIR/pkg/
# Si deseas mostrar solo algunas variables específicas, puedes usar `grep`
echo "Imprimiendo algunas variables específicas del archivo .env..."
grep -E "DB_HOST|DB_USER|DB_PASSWORD" $BACKEND_DIR/pkg/.env
pm2 restart catalogo-productos-backend --update-env # Asume que tu aplicación backend está corriendo con PM2

echo "Despliegue completado exitosamente."