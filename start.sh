#!/bin/bash

docker run -it -p 3001:3001 --rm --restart always --name mail -d mail
