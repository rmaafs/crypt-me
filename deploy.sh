#Borramos cualquier cambio realizado en producción manualmente
git reset --hard
#Cambiamos a la rama de la página web
git checkout web-page
#Bajamos los cambios
git pull
#Instalamos dependencias
npm i
#Removemos el build generado anteriormente
rm -r build
#Generamos el build
npm run build
#Lo movemos a producción
cp -a build/* /var/www/crypt/