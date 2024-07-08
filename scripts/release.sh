#!/usr/bin/env bash

set -e

git checkout main

git pull

rm -rf ./node_modules ./lib ./dist
npm install

git checkout .

npm version $1

npx react-docgen ./src/*.tsx | node ./scripts/buildDocs.js

git add .

git commit -m "Publish new API docs (automated commit)"

git push

git push --tags

npm run build

npm publish

