yarn build
git checkout gh-pages
mv dist/* .
mv dist/static/* ./static/
git add .
git commit -m 'update'
git push
git checkout master
rm -rf dist
