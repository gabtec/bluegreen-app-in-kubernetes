# KUBERNETES

## 1: Install Kind for local lab environment

```sh
# install on macOS
$ brew install kind
```

## 2: Deploy a cluster with Nginx ingress comntroller

```sh
# 3.1: deploy cluster with ingress controller (will expose port 80 and 443)
$ kind create cluster --name icluster --config k8s-config.yaml

# 3.2: install nginx ingress controller on the cluster
$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
```

## 3: Usefull commands

```sh
# 1. listar
$ kind get clusters

# 2. delete
$ kind delete cluster --name icluster

# open browser
# http://localhost
```
