import 'dotenv/config';
import { Router } from 'express';
import * as ImageController from '../controllers/image';
import { authenticateToken } from '../middlewares/auth';
import { uploadImage } from '../middlewares/image';

export const imageRouter = Router()
  .post('/upload', uploadImage, ImageController.uploadImage)
  .post('/getAll', authenticateToken, ImageController.getImages)
  .delete('/:id', authenticateToken, ImageController.deleteImage);
