FROM node:alpine AS builder

ARG VITE_BACKEND_API_URL
ARG VITE_KEYCLOAK_TOKEN_ENDPOINT
ARG VITE_KEYCLOAK_CLIENT_ID
ARG VITE_KEYCLOAK_SECRET
ARG VITE_KEYCLOAK_USERINFO_ENDPOINT

ENV VITE_BACKEND_API_URL=${VITE_BACKEND_API_URL}
ENV VITE_KEYCLOAK_TOKEN_ENDPOINT=${VITE_KEYCLOAK_TOKEN_ENDPOINT}
ENV VITE_KEYCLOAK_CLIENT_ID=${VITE_KEYCLOAK_CLIENT_ID}
ENV VITE_KEYCLOAK_SECRET=${VITE_KEYCLOAK_SECRET}
ENV VITE_KEYCLOAK_USERINFO_ENDPOINT=${VITE_KEYCLOAK_USERINFO_ENDPOINT}

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY conf/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

