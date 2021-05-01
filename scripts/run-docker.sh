#!/bin/bash

cd $(dirname "$0")
cd ..

docker build --tag termterm .
docker run --init --publish 5555:5555 termterm