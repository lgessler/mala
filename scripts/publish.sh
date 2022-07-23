yarn build
git checkout gh-pages
git rm -rf *.map *.js *.txt *.css
rm -rf static
mv dist/static ./static/
mv dist/* .
git add .
git commit -m 'update'
git push
git checkout master
rm -rf dist