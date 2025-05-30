---
title: "Setup Minikube on WSL2"
date: "2023-01-03"
description: "An introduction to installing and configuring Minikube on WSL2"
category: 'Tutorial'
writing: false
published: true
tags: ["docker", "kubernetes", "minikube", "wsl2"]
---

Minikube is a lightweight Kubernetes implementation that allows you to run Kubernetes locally.
It is a popular choice for developers who want to experiment with Kubernetes without having to set up a full-fledged cluster.
In this guide, we will show you how to install Minikube on WSL2.

## Prerequisites

Before we begin, make sure you have the following:

- WSL2 installed and configured
- Docker Desktop installed and configured on Windows
- curl installed

## Enable systemd

Minikube uses systemd to manage the Kubernetes cluster.
WSL2 does not have systemd installed by default, so we need to install it.

First, we need to create a wsl.conf file in the /etc directory.

```bash
sudo touch /etc/wsl.conf
```

Next, we need to add the following lines to the file.

```bash
[boot]
systemd=true
```

Finally, we need to restart WSL2. Open a PowerShell window and run the following command.

```powershell
wsl.exe --shutdown
```

## Install Minikube

Now that we have systemd installed, we can install Minikube.
First, we need to download the Minikube binary.

```bash
curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
```

Next, we need to make the binary executable.

```bash
chmod +x minikube
```

Then, we need to move the binary to the /usr/local/bin directory.

```bash
sudo mv minikube /usr/local/bin/
```

Finally, we need to set the Minikube driver to docker.

```bash
minikube config set driver docker
```

## Install kubectl

Minikube uses kubectl to manage the Kubernetes cluster.
We need to install kubectl before we can start Minikube.

We can install kubectl using the following command.

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
```

Thats it! Minikube is now installed and ready to use.

## Start Minikube

To start Minikube, we need to run the following command.

```bash
minikube start
```

This will take a few minutes to complete.
Once it is done, you can verify that Minikube is running by running the following command.

```bash
minikube status
```

## Stop Minikube

To delete the Minikube cluster, run the following command.

```bash
minikube delete
```

## Conclusion

In this guide, we showed you how to install Minikube on WSL2.
Minikube is a great tool for developers who want to experiment with Kubernetes without having to set up a full-fledged cluster.
By following the steps in this guide, you can easily install Minikube on WSL2 and start using it to run Kubernetes locally.