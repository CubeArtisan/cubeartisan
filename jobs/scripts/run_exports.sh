#!/bin/sh
set -x
export TEMP=$(date +"%Y%m%d")
export OUTPUT_DIR=data/
export OUTPUT_FILE=$TEMP.tar.xz
# Just in case it already exists.
rm -rf $TEMP $OUTPUT_DIR
mkdir -p $TEMP $OUTPUT_DIR private
gsutil -m rsync -rd gs://cubeartisan/private ./private
node `yarn --silent node-options` exports/export_drafts.js $TEMP
node `yarn --silent node-options` exports/export_draft_logs.js $TEMP
node `yarn --silent node-options` exports/export_cubes.js  $TEMP
node `yarn --silent node-options` exports/export_decks.js  $TEMP
rm -r $TEMP/v8-compile-cache* $TEMP/yarn--*
tar -cJf $OUTPUT_DIR/$OUTPUT_FILE $TEMP
gsutil cp $OUTPUT_DIR/$OUTPUT_FILE gs://cubeartisan/exports/$OUTPUT_FILE
rm -r $TEMP $OUTPUT_DIR
