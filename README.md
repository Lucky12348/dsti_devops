# DevOps Project

### step 1 setup project 

stack
- nodejs 20
- SQLite (local `data.sqlite`)
- Vagrant + Ansible (Ubuntu 20.04 VM)
- Jest + supertest


commands
```
npm ci
npm start
```

show api
localhost:3000/docs

### step 2 IaC (Vagrant + Ansible)

from `infra/` start the VM and provision the app
```
vagrant up
```

app runs in the VM on port 3000 (forwarded to host); health endpoint at `localhost:3000/health`.

### step 3 docker image (build + test locally)

build (uses `DockerFile`):
```
docker build -t dsti-devops:local -f DockerFile .
```

run and test health:
```
docker run --rm -p 3000:3000 dsti-devops:local
curl http://localhost:3000/health
```

### step 4 kubernetes (minikube)

start cluster (PowerShell):
```
minikube start
```

build image inside minikube docker (or push/pull from Docker Hub):
```
minikube -p minikube docker-env --shell powershell | Invoke-Expression
docker build -t dsti-devops:latest -f DockerFile .
```

apply manifests:
```
kubectl apply -f kubernetes/pv-pvc.yaml
kubectl apply -f kubernetes/deployment.yaml
kubectl apply -f kubernetes/service.yaml
```

check pod and service:
```
kubectl get pods
kubectl get svc
```

access service:
```
kubectl port-forward svc/dsti-devops-service 3000:3000
curl http://localhost:3000/health
```