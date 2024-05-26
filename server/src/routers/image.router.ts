import 'dotenv/config';
import { Router } from 'express';
import * as ImageController from '../controllers/image';
import { uploadImage } from '../middlewares/image';
import { getKeycloak } from '../utils/keycloak';

export const imageRouter = Router()
  .post('/upload', uploadImage, ImageController.uploadImage)
  .post('/getAll', getKeycloak().protect(), ImageController.getImages)
  .delete('/:id', getKeycloak().protect(), ImageController.deleteImage);
