export RESOURCE_GROUP=container-poc
export CONTAINER_ENV=poc
export REGISTRY=pocsamples
export IMAGE=pocsamples.azurecr.io/express-web:latest

export PASSWORD=$(az acr credential show --name pocsamples --query 'passwords[0].value' -o tsv)

az containerapp create \
    --name node-express-web \
    --resource-group $RESOURCE_GROUP \
    --environment $CONTAINER_ENV \
    --registry-server $REGISTRY.azurecr.io \
    --registry-username $REGISTRY \
    --registry-password $PASSWORD \
    --image $IMAGE \
    --target-port 80 \
    --ingress 'external' \
    --min-replicas 1 \
    --max-replicas 2 \
    --enable-dapr \
    --dapr-app-port 80 \
    --dapr-app-id webapp
