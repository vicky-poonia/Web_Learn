#!/bin/bash

 

# This alternate only removes "stopped" containers
docker rm -vf $(docker ps -a | grep "Exited" | awk '{print $1}') 2>/dev/null || echo "No stopped containers to remove."



