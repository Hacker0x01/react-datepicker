#!/bin/bash

mapfile -t LATEST_TAGS < <( git tag --contains )
for TAG in "${LATEST_TAGS[@]}"; do
  echo "Uploading tag $TAG"
  git push origin $TAG
done