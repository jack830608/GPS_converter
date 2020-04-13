#!/bin/bash

version=`cat ./DockerVersion`
docker build -t dockerhub.vpon.com/adtech/gps_converter:$version .
docker push dockerhub.vpon.com/adtech/gps_converter:$version
