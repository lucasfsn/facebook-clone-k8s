import UserModel from '../models/user';

export async function generateUsername(username: string) {
  let generating = true;

  while (generating) {
    const exists = await UserModel.findOne({ username });
    if (exists) {
      username += `${Number(new Date()) * Math.random()}`.substring(0, 1);
    } else {
      generating = false;
    }
  }

  return username;
}
