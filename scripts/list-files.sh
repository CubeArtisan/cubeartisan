#!/bin/bash
shopt -s nullglob
echo fixtures/*.js __tests__/**/*.js server/{**/*,*}.js client/{**/*,*}.js *.cjs