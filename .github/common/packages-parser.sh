#!/bin/bash

function validatePackages () {
  if [ "$INPUT_PACKAGES" != "*" ]; then 
    FILE=.npmignore
    mapfile -t EXISTING_PACKAGES < <( find . -name $FILE | jq -nRc --arg file "/$FILE" 'inputs | split($file) | .[0]' )
    IFS=',' read -ra INPUT <<< "$INPUT_PACKAGES"
    VALID_PACKAGES=()
    for i in "${INPUT[@]}"; do
      if [[ $i =~ \@greatminds ]]; then
        existInArray $i
        VALID_PACKAGES+=($i)
      else
        $i = "${i#"./packages/"}"
        existInArray "@greatminds/$i"
        VALID_PACKAGES+=("@greatminds/$i")
      fi
    done
    INPUT_PACKAGES=$(join_by , "${VALID_PACKAGES[@]}")
    echo "INPUT_PACKAGES=${INPUT_PACKAGES[@]}"  >> $GITHUB_ENV;
  fi
}

function existInArray() {
  element=$1
  if [ ${#EXISTING_PACKAGES[@]} -gt 0 ]; then
    if [[ ! "${EXISTING_PACKAGES[*]}" =~ "${element}" ]]; then
      echo "$element must be a package of this repository, please look for spell or typos on \"$PACKAGES\""
    fi
  else
    echo "No package was found. Check .npmignore file exist inside each package."
  fi
}

function join_by { local IFS="$1"; shift; echo "$*"; }
