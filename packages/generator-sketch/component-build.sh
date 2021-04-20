#!/bin/bash

(cd ../html-to-sketch && yarn build) && yarn build && node src/inject.js $2 http://localhost:5005/$1 && node src/index.js $1 && open sketch/$1.sketch
