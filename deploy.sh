ng build --configuration production --base-href https://www.meupetlindo.com/
cd dist/meupetlindoapp/
cp index.html 404.html
cd ..
cd ..
git checkout gh-pages
mkdir -o docs
rm -rf docs/*
cp -r dist/meupetlindoapp/* docs/
echo www.meupetlindo.com > docs/CNAME
ls docs/
git add .
git commit -m "Deploy"
git push
git checkout main