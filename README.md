# Blue-Green App

![](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)

### An example on how to deploy database, backend api, and frontend app, on kubernetes (with pod communication enabled)

## :construction: Build images

```sh
# build the secret manifest file (edit script to change variables)
$ ./build.secret.sh

# web app
$ docker build -t gabtec/bluegreen:v1 ./frontend/
$ docker push gabtec/bluegreen:v1

# api
$ docker build -t gabtec/bluegreen-api:v1 ./backend/
$ docker push gabtec/bluegreen-api:v1

# db migrations side car
$ docker build -t gabtec/bluegreen-db:v1 ./backend/database/
$ docker push gabtec/bluegreen-db:v1
```

## :rocket: Deploy to kubernetes cluster

### Edit k8s/\*.yaml files to change credentials

**NOTE** This is for learning pourposes, and there for no Secret manifest were used. In production don't do that

```sh
# secret
$ kubectl apply -f vault/app-secret.yaml

# database
$ kubectl apply -f backend/k8s/database.yaml

# api
$ kubectl apply -f backend/k8s/api.yaml

# app
$ kubectl apply -f frontend/k8s/
```

## (SOS) Checks

```sh
# read a secret
$ kubectl get secret app-secret -o jsonpath="{.data.DB_USER}" | base64 --decode

# check db was created
$ kubectl exec -it pod/$(kubectl get pods | grep gt-db | awk '{print $1}') -- /bin/bash

# list
$ psql -U admin -d deno_db
> \l
```

## Add argocd

```sh
# edit ingress deploy and add a flag --enable-ssl-passthrough
$ kubectl edit deploy ingress-nginx-controller -n ingress-nginx
# --> add "--enable-ssl-passthrough" on args array

#kubectl get deploy ingress-nginx-controller -n ingress-nginx -o jsonpath="{.spec.template.spec.containers[0].args}"

# get argo passwd
$ k get secret argocd-initial-admin-secret -n argocd -o jsonpath="{.data.password}" | base64 -d
```
