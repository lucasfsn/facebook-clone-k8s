import 'dotenv/config';
import { Router } from 'express';
import * as ReactionController from '../controllers/reaction';
import { authenticateToken } from '../middlewares/auth';

export const reactionRouter = Router()
  .post('/add', authenticateToken, ReactionController.addReaction)
  .get('/get/:postId/:userId', ReactionController.getReaction);
