#!/bin/sh
set -e

mkdir -p client/generated/filtering;
nearleyc nearley/cardFilters.ne -o client/generated/filtering/cardFilters.js;
{
    tail -n +4 client/generated/filtering/cardFilters.js |  awk '{a[i++]=$0} END {for (j=i-1; j>=0;) print a[j--] }' | tail -n +7 | awk '{a[i++]=$0} END {for (j=i-1; j>=0;) print a[j--] }';
    echo "; export default grammar;"
} | cat - > client/generated/filtering/cardFilters.js.tmp && mv client/generated/filtering/cardFilters.js.tmp client/generated/filtering/cardFilters.js
