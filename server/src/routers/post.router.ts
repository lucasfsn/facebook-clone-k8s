import 'dotenv/config';
import { Router } from 'express';
import * as PostController from '../controllers/post';
import { getKeycloak } from '../utils/keycloak';

export const postRouter = Router()
  .post('/add', getKeycloak().protect(), PostController.createPost)
  .get('/all', getKeycloak().protect(), PostController.allPosts)
  .delete('/:id', getKeycloak().protect(), PostController.deletePost)
  .post('/comment', getKeycloak().protect(), PostController.commentPost)
  .put('/edit/:id', getKeycloak().protect(), PostController.editPost)
  .delete(
    '/comment/:id',
    getKeycloak().protect(),
    PostController.deleteComment
  );
