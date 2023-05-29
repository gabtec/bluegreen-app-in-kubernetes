# Blue-Green App

![](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)

### An example on how to deploy database, backend api, and frontend app, on kubernetes (with pod communication enabled)

## :construction: Build images

```sh
# web app
$ docker build -t gabtec/bluegreen:v1 ./frontend/
$ docker push gabtec/bluegreen:v1

# api
$ docker build -t gabtec/bluegreen-api:v1 ./backend/
$ docker push gabtec/bluegreen-api:v1
```

## :rocket: Deploy to kubernetes cluster

### Edit k8s/\*.yaml files to change credentials

**NOTE** This is for learning pourposes, and there for no Secret manifest were used. In production don't do that

```sh
# database
$ kubectl apply -f backend/k8s/database.yaml
# api
$ kubectl apply -f backend/k8s/api.yaml

# app
$ kubectl apply -f frontend/k8s/
```
