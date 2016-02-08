#!/usr/bin/env bash

npm version $1

git push

git push --tags

npm publish

./docs/publish.sh
