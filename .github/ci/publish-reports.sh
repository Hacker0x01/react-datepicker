#!/bin/bash

set -e

bucket="dp-test-reports"
s3_base_key="$PROJECT/$BRANCH"

function publish() {
  local report=$1

  echo "Publishing report $report"
  if [ -d $report ]; then
    aws s3 cp \
      --region $AWS_REGION \
      --quiet \
      --recursive \
      $report \
      s3://$bucket/$s3_base_key/$report
  else
    aws s3 cp \
      --region $AWS_REGION \
      --quiet \
      $report \
      s3://$bucket/$s3_base_key/$report
  fi

  if [ -f $report ]; then
    echo "https://$bucket.s3.amazonaws.com/$s3_base_key/$report"
  else
    echo "https://$bucket.s3.amazonaws.com/$s3_base_key/$report/index.html"
  fi
}

if [ -f "lerna.json" ]; then
  PACKAGES=$(ls -1 packages)
  for report in "jest_html_reporters.html" "coverage/lcov-report"; do
    for package in $PACKAGES; do
      if [ -e "packages/$package/$report" ]; then
        publish packages/$package/$report
      else
        echo "Report packages/$package/$report not found"
      fi
    done
  done
else
  for report in "jest_html_reporters.html" "coverage/lcov-report"; do
    if [ -e $report ]; then
      publish $report
    else
      echo "Report $report not found"
    fi
  done
fi