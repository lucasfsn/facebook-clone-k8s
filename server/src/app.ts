import cors from 'cors';
import express, { json } from 'express';
import fileUpload from 'express-fileupload';
import session from 'express-session';
import { imageRouter } from './routers/image.router';
import { postRouter } from './routers/post.router';
import { reactionRouter } from './routers/reaction.router';
import { userRouter } from './routers/user.router';
import { getMemoryStore, initKeycloak } from './utils/keycloak';

const app = express();

app.use(
  cors({
    origin: 'http://facebook-clone.com',
  })
);
app.use(
  session({
    secret: process.env.CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
    store: getMemoryStore(),
  })
);
app.use(initKeycloak().middleware());

app.use(json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);

app.use('/', userRouter);
app.use('/post', postRouter);
app.use('/image', imageRouter);
app.use('/reaction', reactionRouter);

export default app;
