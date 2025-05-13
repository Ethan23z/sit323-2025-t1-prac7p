# SIT323-2025-T1-Prac7p

A simple Node.js microservice with MongoDB, runnable via Docker Compose and Kubernetes.

## Repo Structure

```
docker-compose.yml    # Local setup
.env.example          # Env vars example
mongo-init.js         # MongoDB user init script

src/
  ├ Dockerfile        # Build app image
  ├ index.js          # Express server + MongoDB CRUD
  └ package.json      # Dependencies: mongodb, express

k8s/
  ├ mongo-pv-pvc.yaml # PV & PVC for MongoDB
  ├ mongo-secret.yaml # MongoDB credentials
  ├ mongo-deployment.yaml # MongoDB Deployment & Service
  └ app-deployment.yaml   # App Deployment & Service
```

## Local (Docker Compose)

```bash
copy .env.example .env
docker-compose up -d --build
docker-compose logs -f app
```

## Kubernetes

```bash
kubectl apply -f k8s/mongo-pv-pvc.yaml
kubectl apply -f k8s/mongo-secret.yaml
kubectl apply -f k8s/mongo-deployment.yaml
kubectl apply -f k8s/app-deployment.yaml
kubectl get pods
kubectl port-forward svc/my-app-service 8080:80
```
