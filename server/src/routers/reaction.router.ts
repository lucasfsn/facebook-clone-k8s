import 'dotenv/config';
import { Router } from 'express';
import * as ReactionController from '../controllers/reaction';
import { getKeycloak } from '../utils/keycloak';

export const reactionRouter = Router()
  .post('/add', getKeycloak().protect(), ReactionController.addReaction)
  .get('/get/:postId/:userId', ReactionController.getReaction);
