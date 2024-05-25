import { cleanEnv, str } from 'envalid';

export default cleanEnv(process.env, {
  MONGO_CONNECTION_STRING: str(),
  CLOUDINARY_CLOUD_NAME: str(),
  CLOUDINARY_API_SECRET: str(),
  CLOUDINARY_API_KEY: str(),
  JWT_SECRET: str(),
});
