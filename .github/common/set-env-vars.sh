#!/bin/bash
source .github/deploy/functions.sh
source .github/common/packages-parser.sh

PROJECT_PREFIX='@greatminds/'

PROD="prod"
PREPROD="uat"
NONE="none"

if [ -z "$ROOT" ]; then
  ROOT="."
fi
PROJECT=$(jq -r .name "$ROOT/package.json" | cut -d'/' -f2)

echo "PROJECT=$PROJECT" >> $GITHUB_ENV
echo "AWS_REGION=us-east-1" >> $GITHUB_ENV

PACKAGE=''
DP_ENV="none";

if [[ $GITHUB_REF =~ v[0-9]+.[0-9]+.[0-9]+$ ]]; then
  DP_ENV=$PROD
  PREID="latest"
elif [[ $GITHUB_REF =~ v[0-9]+.[0-9]+.[0-9]+-rc.[0-9]+$ ]]; then
  DP_ENV=$PREPROD
  PREID="rc"
fi

if [[ $GITHUB_REF =~ refs\/tags\/\@greatminds ]]; then
  versionFromTag "${GITHUB_REF#"refs/tags/"}"
  if [[ $VERSION =~ [0-9]+.[0-9]+.[0-9]+$ ]]; then
    DP_ENV=$PROD
    PREID="latest"
  elif [[ $VERSION =~ [0-9]+.[0-9]+.[0-9]+-rc.[0-9]+$ ]]; then
    DP_ENV=$PREPROD
    PREID="rc"
  fi
fi

TAGS=()
if [ -d "lib" ]; then
  echo "Detected standard library repository"
  REPO_TYPE="lib"
elif [ -f "lerna.json" ]; then
  echo "Detected lerna repository"
  REPO_TYPE="lerna"
  getPackagesLatestVersions
  validatePackages
else
  echo "Unknown repository type"
  exit 1
fi

if [ -z "$VERSION" ]; then
  if [[ $GITHUB_REF =~ refs\/tags\/v ]]; then
    echo "Getting version from semver"
    VERSION=$(npx semver "${GITHUB_REF#"refs/tags/v"}") # Validate semver
  elif [ "$REPO_TYPE" == "lerna" ]; then
    echo "Getting version from lerna"
    VERSION=$(jq -r .version lerna.json)
  elif [ -f "package.json" ]; then
    echo "Getting version from package.json"
    VERSION=$(jq -r .version "$ROOT/package.json")
  else
    echo "Failed to determine version"
    exit 1
  fi
fi

echo "REPO_TYPE=$REPO_TYPE" >> $GITHUB_ENV;
echo "TAGS=${TAGS[@]}" >> $GITHUB_ENV;
echo "VERSION=$VERSION" >> $GITHUB_ENV;
echo "PACKAGE=$PACKAGE" >> $GITHUB_ENV;
echo "ROOT=$ROOT" >> $GITHUB_ENV;
# shellcheck disable=SC2086
echo "version=$VERSION" >> $GITHUB_OUTPUT;
echo "DP_ENV=$DP_ENV" >> $GITHUB_ENV;
if [ -n "$PREID" ]; then
  echo "PREID=$PREID" >> $GITHUB_ENV;
fi

echo "===================================="
echo "Project: $PROJECT";
echo "Repo Type: $REPO_TYPE";
echo "Version: $VERSION";
echo "Package: $PACKAGE";
if [ "$DP_ENV" != "none" ]; then
  echo "Deployment environment: $DP_ENV";
  echo "Deployment pre-id: $PREID";
else
  echo "No deployment environment set";
fi
echo "===================================="
