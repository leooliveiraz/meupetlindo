ng build --configuration production
cd dist/meupetlindoapp/
rm mpl.tar.gz
tar -cvzf mpl.tar.gz *
cp index.html 404.html
scp mpl.tar.gz root@191.101.18.116:/mpl/app/
