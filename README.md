# Facebook Clone

Full stack Facebook clone built using the MERN stack that allows you to communicate with friends around the world

## Contents

- [Documentation (polish version)](#documentation)
- [App Preview](#app-preview)
- [Overview](#overview)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
- [Run Locally](#get-repository)

### [Documentation](https://github.com/lucasfsn/fb-clone-ug/tree/main/docs)

### App Preview

![Login](./preview/login.png)
![Home](./preview/home.png)
![Profile](./preview/profile.png)
![Settings](./preview/settings.png)

## Overview

### Features

- Login and registration
- Profile: View and edit user profile
- Friends: Manage the user's friends list, send friend requests
- Pictures: View, add and delete photos
- Post: Create, edit and delete posts, add and remove reaction, add and delete comment
- Search: Search for users in the application
- Settings: Manage user and application settings (dark and light mode)

### Technologies Used

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![Node](https://img.shields.io/badge/ts--node-3178C6?style=for-the-badge&logo=ts-node&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![React_Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind_CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)

## Get repository

Clone the project

```bash
  git clone https://github.com/lucasfsn/facebook-clone
```

Go to the project directory

```bash
  cd facebook-clone
```

Go to the client directory

```bash
  cd client
```

Build the Docker image with environment variables

- VITE_BACKEND_API_URL=your_backend_api_url
- VITE_KEYCLOAK_TOKEN_ENDPOINT=your_keycloak_token_endpoint_url
- VITE_KEYCLOAK_CLIENT_ID=your_keycloak_client_id
- VITE_KEYCLOAK_SECRET=your_keycloak_secret

```bash
  docker build --build-arg VITE_BACKEND_API_URL=... --build-arg VITE_KEYCLOAK_TOKEN_ENDPOINT=... --build-arg VITE_KEYCLOAK_CLIENT_ID=... --build-arg VITE_KEYCLOAK_SECRET=... -t your_image:tag  .
```

Go to the server directory

```bash
  cd server
```

Replace keycloak.json values with your keycloak data:

- realm: Your keycloak realm name
- auth-server-url: Your keycloak url
- resource: Your keycloak client id
- secret: Your keycloak client secret
- realm-public-key: Your keycloak public key

Go to the k8s directory

```bash
  cd k8s
```

Create backend-secrets.yml

```bash
  apiVersion: v1
  kind: Secret
  metadata:
    name: backend-secrets
    labels:
      app: facebook-clone
  data:
    MONGO_CONNECTION_STRING: your_mongo_connection_string
    CLIENT_SECRET: your_client_secret
    CLOUDINARY_CLOUD_NAME: your_cloudinary_cloud_name
    CLOUDINARY_API_KEY: your_cloudinary_api_key
    CLOUDINARY_API_SECRET: your_cloudinary_api_secret
```

Run locally

```bash
  1. minikube start --memory 4096 --disk-size 10g --cpus 2
  2. minikube apply -f .
  3. kubectl get pods -n ingress-nginx (copy ingress-nginx-controller pod full name)
  4. Add your ingress custom host names to your system configuration
  5. kubectl -n ingress-nginx port-forward pod/pod-name-from-point-3 --address 0.0.0.0 80:80 443:443
```

Login to [keycloak](http://keycloak.facebook-clone.com)

```bash
  username: keycloak
  password: keycloak
```

Set those things in keycloak

```bask
  Create realm with name: facebook-clone
  Create client with id: keycloak
  Client authentication: ON
  Standard Flow: ON
  Direct access grants: ON
  Service accounts roles: ON
  Anything else: OFF
  Web origins: http://facebook-clone.com
```

## Author

- GitHub - [@lucasfsn](https://github.com/lucasfsn)
