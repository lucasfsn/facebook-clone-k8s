## Run Locally

Clone the entire repository

```bash
  git clone https://github.com/lucasfsn/facebook-clone
```

Go to the server directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Create .env file

```bash
  touch .env
```

.env must contain the following variables:

- MONGO_CONNECTION_STRING
- PORT
- CLIENT_URL

You also need to create a Cloudinary account and enter your cloud name, API secret and API key in:

- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_SECRET
- CLOUDINARY_API_KEY

Start the server

```bash
  npm run start:dev
```
