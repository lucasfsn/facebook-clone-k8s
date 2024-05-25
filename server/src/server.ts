import mongoose from 'mongoose';
import app from './app';
import env from './utils/validateEnv';

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log('Mongoose connected');

    app.listen(3000, '0.0.0.0', () => {
      console.log(`Listening on port 3000`);
    });
  })
  .catch(err => {
    console.error(err);
  });
