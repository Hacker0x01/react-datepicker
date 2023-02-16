#!/bin/bash

DIR_PREFIX='dp-'
PROJECT_PREFIX='@greatminds/'

function getPackagesLatestVersions() {
  mapfile -t LERNA_PACKAGES < <( lerna list )
  echo "Getting package latest version"
  for i in "${LERNA_PACKAGES[@]}"; do
    LAST_VERSION=$(git tag -l "$i*" | sort -V | tail -n1)
    TAGS+=($LAST_VERSION)
  done
  if [ ${#TAGS[@]} -eq 0 ]; then
    echo "Tags not found. Calculating tags"
    FILE=.npmignore
    mapfile -t PACKAGES < <( find . -name $FILE | jq -nRc --arg file "/$FILE" 'inputs | split($file) | .[0]' )
    for DIR in "${PACKAGES[@]}"; do
      DIR=$( echo $DIR | xargs )
      PACKAGE_NAME=$(jq -r .name "$DIR/package.json")
      PACKAGE_VERSION=$(jq -r .version "$DIR/package.json")
      TAGS+=("$PACKAGE_NAME@$PACKAGE_VERSION")
    done
  fi
  echo "Tags Found: ${TAGS[*]}"
}

function versionFromTag() {
  if [ -n "$1" ]; then
    IFS='@' read -ra ADDR <<< "$1"
    PACKAGE="@${ADDR[1]}"
    VERSION="${ADDR[2]}"
    DIR="${PACKAGE#"$PROJECT_PREFIX"}"
    ROOT="packages/${DIR#"$DIR_PREFIX"}"
    echo "PACKAGE=$PACKAGE"
    echo "VERSION=$VERSION"
    echo "DIR=$DIR"
    echo "ROOT=$ROOT"
  fi
}

function updateLernaPackages() {
  getPackagesLatestVersions
  echo "${#TAGS[@]} tags found"
  if [ $RELEASE_TYPE == 'prerelease' ]; then
    # Update each package version
    for TAG in "${TAGS[@]}"; do
      versionFromTag $TAG
      DIR=${PACKAGE#"$PROJECT_PREFIX"}
      cd "packages/${DIR#"$DIR_PREFIX"}"
      # Updating package.json with the last rc tagged version
      npm version --allow-same-version "$VERSION"
      cd ../../
    done

    if [ "$PACKAGES" == "*" ]; then 
      PACKAGES="--conventional-commits --conventional-prerelease"
    else
      PACKAGES="--conventional-commits --conventional-prerelease=$PACKAGES"
    fi
    
    git add . && git commit -am "version update" --no-verify
    npx lerna version $PACKAGES --preid rc --no-push --yes
  else
    echo "RELEASE"
    # Release Steps
    if [ "$PACKAGES" == "*" ]; then 
      PACKAGES="--conventional-commits --conventional-graduate"
    else
      PACKAGES="--conventional-commits --conventional-graduate=$PACKAGES"
    fi
    npx lerna version $VERSION_BUMP $PACKAGES --no-push --yes || npx lerna version major --conventional-commits --no-push --yes
  fi
}