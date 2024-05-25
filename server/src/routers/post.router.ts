import 'dotenv/config';
import { Router } from 'express';
import * as PostController from '../controllers/post';
import { authenticateToken } from '../middlewares/auth';

export const postRouter = Router()
  .post('/add', authenticateToken, PostController.createPost)
  .get('/all', authenticateToken, PostController.allPosts)
  .delete('/:id', authenticateToken, PostController.deletePost)
  .post('/comment', authenticateToken, PostController.commentPost)
  .put('/edit/:id', authenticateToken, PostController.editPost)
  .delete('/comment/:id', authenticateToken, PostController.deleteComment);
