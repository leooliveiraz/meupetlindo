ng build --base-href http://www.meupetlindo.com/
cd dist/meupetlindoapp/
cp index.html 404.html
cd ..
cd ..
git checkout gh-pages
rm -rf docs/*
cp -r dist/meupetlindoapp/* docs/
cp CNAME docs/
git add .
git commit -m "Deploy"
git push
git checkout main