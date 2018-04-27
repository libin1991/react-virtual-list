# See https://medium.com/@nthgergo/publishing-gh-pages-with-travis-ci-53a8270e87db
set -o errexit

# config
git config --global user.email "developerdizzle+travis@gmail.com"
git config --global user.name "Travis CI"

npm run build

git add -A
git commit -am "[travis] Automatic build"

npm run docs

git add -A
git commit -am "[travis] Automatic docs"

# deploy
git push "https://${GITHUB_TOKEN}@github.com/developerdizzle/react-virtual-list.git"