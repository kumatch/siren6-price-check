#!/bin/bash

CURRENT_DIR="$( cd "$( dirname "$0" )" && pwd )"
ROOT_DIR="$(dirname "$CURRENT_DIR")"
DATA_DIR="$ROOT_DIR/src/data"

find $DATA_DIR -type f -name '*.csv' -exec sh -c '
for file do
    json_file="$(echo $file | sed "s/\.csv$/.json/")"
    npx csv2json -d "$file" "$json_file"
done' sh {} +