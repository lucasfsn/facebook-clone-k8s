# Facebook Clone

Full stack Facebook clone built using the MERN stack that allows you to communicate with friends around the world

## Contents

- [Documentation (polish version)](#documentation)
- [App Preview](#app-preview)
- [Overview](#overview)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
- [Run Locally](#run-locally)

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

## Run locally

Clone the project:

```bash
  git clone https://github.com/lucasfsn/facebook-clone
```

Navigate to the project directory:

```bash
  cd facebook-clone
```

Navigate to the client directory:

```bash
  cd client
```

Build the Docker image with following build arguments:

- VITE_BACKEND_API_URL=your_backend_api_url
- VITE_KEYCLOAK_USERINFO_ENDPOINT=your_keycloak_userinfor_endpoint_url
- VITE_KEYCLOAK_TOKEN_ENDPOINT=your_keycloak_token_endpoint_url
- VITE_KEYCLOAK_CLIENT_ID=your_keycloak_client_id
- VITE_KEYCLOAK_SECRET=your_keycloak_secret

```bash
  docker build --build-arg VITE_BACKEND_API_URL=... --build-arg VITE_KEYCLOAK_USERINFO_ENDPOINT=... --build-arg VITE_KEYCLOAK_TOKEN_ENDPOINT=... --build-arg VITE_KEYCLOAK_CLIENT_ID=... --build-arg VITE_KEYCLOAK_SECRET=... -t image:tag  .
```

Push the image to registry:

```bash
  docker push image:tag
```

Navigate to the server directory:

```bash
  cd server
```

Update the `keycloak.json` file with your specific Keycloak configuration data. This includes the following values:

- `realm`: Your Keycloak realm name
- `auth-server-url`: Your Keycloak URL
- `resource`: Your Keycloak client ID
- `secret`: Your Keycloak client secret
- `realm-public-key`: Your Keycloak public key

Build the Docker image:

```bash
  docker build -t image:tag .
```

Push the image to registry:

```bash
  docker push image:tag
```

Navigate to the directory containing the Kubernetes configuration files:

```bash
  cd k8s
```

Create a Kubernetes Secret configuration file named `backend-secrets.yml`. This file will store sensitive data such as connection strings and API keys. Replace the placeholders with your actual data.

```yaml
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

Update your system's hosts file by adding the following lines:

```bash
  127.0.0.1 api.facebook-clone.com
  127.0.0.1 facebook-clone.com
  127.0.0.1 keycloak.facebook-clone.com
```

**Windows**

```bash
  1. minikube start --memory 4096 --disk-size 10g --cpus 2
  2. minikube addons enable ingress
  3. minikube apply -f .
  4. kubectl get pods -n ingress-nginx (copy ingress-nginx-controller pod name)
  5. Add your ingress custom host names to your system configuration
  6. kubectl -n ingress-nginx port-forward pod/pod-name-from-point-4--address 0.0.0.0 80:80 443:443
```

**Linux**

```bash
  1. minikube start --memory 4096 --disk-size 10g --cpus 2
  2. minikube addons enable ingress
  3. minikube apply -f .
  4. minikube tunnel
```

Login to [keycloak](http://keycloak.facebook-clone.com)

- username: `keycloak`
- password: `keycloak`

Configure Keycloak with the following settings:

- Create a realm named `facebook-clone`.
- Create a client with the ID `keycloak`.
- Enable the following options:
  - Client Authentication
  - Standard Flow
  - Direct Access Grants
  - Service Accounts Roles
- Set the Web Origins to `http://facebook-clone.com`.

## Author

- GitHub - [@lucasfsn](https://github.com/lucasfsn)
