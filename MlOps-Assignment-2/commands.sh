docker context use desktop-linux

# fix docker login
service docker stop 
rm ~/.docker/config.json
service docker start

# apply all deployments
minikube kubectl -- apply -f k8s/

# backend port forwarding
minikube kubectl -- get pods -l app=backend
minikube kubectl -- port-forward backend-deployment-6b7fc4b6c7-rptlf 3000:3000

# frontend port forwarding
minikube kubectl -- get pods -l app=frontend
minikube kubectl -- port-forward frontend-deployment-7f8f7d7b8b-7z5zv 5173:5173


