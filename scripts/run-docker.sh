#!/bin/bash

cd $(dirname "$0")
cd ../demo

docker build --tag termterm .
docker run --init --publish 3000:3000 termterm