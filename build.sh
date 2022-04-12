docker context use default
docker rmi -f sample-express-app-web
docker build -t sample-express-app-web --platform amd64 .
docker tag sample-express-app-web:latest pocsamples.azurecr.io/express-web
az acr login --name pocsamples
docker push pocsamples.azurecr.io/express-web