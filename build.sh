#!/bin/bash

version=`cat ./DockerVersion`
IMAGE="dockerhub.vpon.com/adtech/gps_converter:$version"
container_name="gps_converter"
docker pull ${IMAGE}
docker rm -f $container_name
docker run --name $container_name \
        -p 8017:3000 \
        --restart=always \
        -e NODE_ENV=production \
        -d ${IMAGE}