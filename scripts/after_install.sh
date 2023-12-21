
#!/bin/bash

cd /home/corp/whizlabs_website_v3/
docker --version
docker-compose down || echo "no contanier to down"
aws s3 cp s3://deploymentbucket-whizlabs/whizlabs_website_v3/develop/.env .
chown corp.corp .env
docker-compose up  -d --build



