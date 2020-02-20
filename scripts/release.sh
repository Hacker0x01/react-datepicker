#!/usr/bin/env bash

set -e

rm -rf ./node_modules ./lib ./dist
yarn

git checkout .

npm version $1

npx react-docgen ./src/*.jsx | node ./scripts/buildDocs.js

git add .

git commit -m "Publish new API docs (automated commit)"

git push

git push --tags

yarn run build

npm publish

