yarn build
git checkout gh-pages
mv dist/* .
mv dist/static/* ./dist/static/
git add .
git commit -m 'update'
git push
git checkout master
rm -rf dist
