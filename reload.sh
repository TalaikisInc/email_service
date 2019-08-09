#!/bin/bash

./build.sh
docker stop mail
docker rm mail
./start.sh
