#!/bin/bash

docker run -it -p 3001:3000 --restart always --name mail -d mail
