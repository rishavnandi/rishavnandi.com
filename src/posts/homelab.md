---
title: "Automate your homelab setup with Ansible"
date: "2023-03-23"
description: "Simple Ansible playbook to automate your homelab setup"
category: 'Tutorial'
writing: false
published: true
tags: ["ansible", "homelab", "docker"]
---

## Introduction

Ansible is a simple and powerful automation tool that can be used to automate your homelab setup. It is a very popular tool in the DevOps world and is used to automate the deployment of applications and services. It is also used to automate the configuration of servers and network devices. It is a very powerful tool that can be used to automate your homelab setup.

## Prerequisites

To follow this tutorial, you will need:

* A Linux server running Debian or RHEL based distro (Ubuntu, Debian, CentOS, Fedora, etc.)
* Ansible and github3.py installed on your local machine
* My [Ansible playbook](https://github.com/rishavnandi/ansible_homelab) to automate your homelab setup

## Step 1 — Installing Ansible and cloning the repository

You can install Ansible and github3.py on your local machine by running the following commands:

```bash
sudo apt update
sudo apt install python3-pip
pip3 install ansible github3.py
```

You can clone the repository by running the following command:

```bash
git clone https://github.com/rishavnandi/ansible_homelab.git
```

## Step 2 - Modifying the Ansible configuration files

Ansible uses an inventory file to store the list of hosts that it will manage. You need to modify this file to add your server to the list of hosts that Ansible will manage.

```yaml
[homeserver]
<ip_address>

[homeserver:vars]
ansible_user = <username>
ansible_ssh_private_key_file = <path_to_private_key>
```

Replace `<ip_address>` with the IP address of your server. Replace `<username>` with the username that you will use to connect to your server. Replace `<path_to_private_key>` with the path to the private key that you will use to connect to your server.
If you are using a password to connect to your server, you can replace the `ansible_ssh_private_key_file` line with the following line:

```yaml
ansible_ssh_pass = <password>
```

Replace `<password>` with the password that you will use to connect to your server.

Next we need to modify the group variables file. This file contains the variables that will be used by Ansible to configure your server. You can find this file in the `group_vars/all` directory.
You need to modify the following variables:

```yaml
username: <username>

ip_address: <ip_address>

puid: "<puid>"

pgid: "<pgid>"

timezone: <timezone>

wg_password: <wg_password>

codeserver_password: <codeserver_password>
```

Replace `<username>` with your username on your homeserver. Replace `<ip_address>` with the IP address of your homeserver. Replace `<puid>` with the PUID of your user on your homeserver. Replace `<pgid>` with the PGID of your user on your homeserver. Replace `<timezone>` with your timezone. Replace `<wg_password>` with the password that you will use to connect to your WireGuard VPN. Replace `<codeserver_password>` with the password that you will use to connect to your Code Server.

You can get the PUID and PGID of your user on your homeserver by running the following commands:

```bash
id
```

## Step 3 — Running the Ansible playbook

You can run the Ansible playbook by running the following command:

```bash
ansible-playbook main.yml
```

## Conclusion

We saw how we can use Ansible to automate the setup process of our homelab. Ansible is a very powerful tool that can be used to automate the deployment of applications and services.
You can modify the playbooks to suit your needs. You can also add more playbooks to automate the setup of other services. I hope you found this tutorial useful.