#!/usr/bin/env bash

# npm version $1

react-docgen ./src/*.jsx | ./scripts/buildDocs.sh

git add .

git commit -m "Publish new API docs (automated commit)"

# git push
#
# git push --tags
#
# npm publish

# ./docs-site/publish.sh
