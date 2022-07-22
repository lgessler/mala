yarn build
git checkout gh-pages
git rm -rf *.map *.js *.txt *.css
rm -rf static
mv dist/* .
mv dist/static ./static/
git add .
git commit -m 'update'
git push
git checkout master
rm -rf dist