import cors from 'cors';
import express, { json } from 'express';
import fileUpload from 'express-fileupload';
import { imageRouter } from './routers/image.router';
import { postRouter } from './routers/post.router';
import { reactionRouter } from './routers/reaction.router';
import { userRouter } from './routers/user.router';

const app = express();

app.use(
  cors({
    origin: 'http://facebook-clone.com',
    // origin: 'http://localhost:8080',
  })
);
app.use(json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);

// Routers
app.use('/', userRouter);
app.use('/post', postRouter);
app.use('/image', imageRouter);
app.use('/reaction', reactionRouter);

export default app;
