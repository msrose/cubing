# Cubing

http://msrose.github.io/cubing/

## Developing

Start developing: `npm install && gulp`

Run tests once: `npm test`

Run tests every time a file is changed: `npm run tdd`

Build for production: `gulp build`

Test the production build in the browser: `gulp serve:dist`

## Deploy to GitHub Pages

```
git checkout master
gulp build
git checkout gh-pages
cp -r app/dist/* .
git add .
git commit -m "<new version number>"
git tag <new version number>
git push origin --tags gh-pages
```
