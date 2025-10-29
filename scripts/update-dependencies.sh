#!/bin/bash

cd $(dirname "$0")
cd ..

command_exists(){
  command -v "$1" &> /dev/null && echo "exists"
}

if [ -z $(command_exists "ncu") ]; then
  echo "installing npm-check-updates ..."
  npm i -g npm-check-updates
else
  echo ""
fi

function updateDependencies {
  echo "updating dependencies..."
  OUTPUT=`ncu -u -x lerna`
  SUB='All dependencies match the latest package versions'
  if [[ "$OUTPUT" == *"$SUB"* ]]; then
    echo "$OUTPUT"
  else
    rm -rf node_modules package-lock.json dist
    npm install
  fi
}

updateDependencies &&
cd packages/build && updateDependencies && cd ../../ &&
cd packages/demo && updateDependencies && cd ../../ &&
cd packages/e2e && updateDependencies && cd ../../ &&
cd packages/library && updateDependencies && cd ../../ &&

echo "Great Success!"

sleep 2