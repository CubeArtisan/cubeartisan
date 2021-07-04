#!/bin/sh
set -e

mkdir -p generated/filtering;
nearleyc nearley/cardFilters.ne -o generated/filtering/cardFilters.js;
{
    tail -n +4 generated/filtering/cardFilters.js |  awk '{a[i++]=$0} END {for (j=i-1; j>=0;) print a[j--] }' | tail -n +7 | awk '{a[i++]=$0} END {for (j=i-1; j>=0;) print a[j--] }';
    echo "; export default grammar;"
} | cat - > generated/filtering/cardFilters.js.tmp && mv generated/filtering/cardFilters.js.tmp generated/filtering/cardFilters.js
