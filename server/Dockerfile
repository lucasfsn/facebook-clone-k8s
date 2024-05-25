FROM node:alpine AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM node:alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist

COPY package*.json ./

RUN npm install --only=production

EXPOSE 3000

CMD ["node", "dist/server.js"]