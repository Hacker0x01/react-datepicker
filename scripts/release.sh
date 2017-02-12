#!/usr/bin/env bash

rm -rf ./node_modules ./lib ./dist
yarn

git checkout .

npm version $1

npm install -g react-docgen
react-docgen ./src/*.jsx | ./scripts/buildDocs.sh

git add .

git commit -m "Publish new API docs (automated commit)"

git push

git push --tags

npm publish

./docs-site/publish.sh
