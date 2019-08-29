#!/usr/bin/env bash

rm -rf ./node_modules ./lib ./dist
yarn

git checkout .

npm version $1

yarn global add react-docgen
e

git add .

git commit -m "Publish new API docs (automated commit)"

git push

git push --tags

yarn run build

npm publish

