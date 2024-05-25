import bcrypt from 'bcryptjs';
import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import PostModel from '../models/post';
import ReactionModel from '../models/reaction';
import UserModel, { User } from '../models/user';
import { generateUsername } from '../utils/generateUsername';
import env from '../utils/validateEnv';
import {
  ProfileImportSchema,
  validateBirthdate,
  validateEmail,
  validateName,
  validatePassword,
} from '../utils/validateUserData';

type Gender = 'male' | 'female' | 'other';

interface SignUpBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  birthDay?: number;
  birthMonth?: number;
  birthYear?: number;
  gender?: Gender;
}

interface LogInBody {
  email?: string;
  password?: string;
}

interface ChangePasswordBody {
  email: string;
  password: string;
}

interface ChangeUserInfoBody {
  email: string;
  value: string | { birthDay: number; birthMonth: number; birthYear: number };
}

interface ChangeProfileImageBody {
  userId: string;
  image: string;
}

type ChangeUserInfoData =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'birthDate'
  | 'password';

interface UpdateUserDetailsBody {
  details: {
    bio?: string;
    workplace?: string;
    highschool?: string;
    college?: string;
    currentCity?: string;
    homeTown?: string;
    relationship?: string;
  };
  userId: string;
}

interface ProfileImport {
  firstName: string;
  lastName: string;
  gender: Gender;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  search: {
    user: string;
    createdAt: string;
  }[];
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    birthDay,
    birthMonth,
    birthYear,
    gender,
  } = req.body;

  try {
    if (!firstName || !lastName || !email || !password || !gender)
      throw createHttpError(400, 'Parameters missing');

    if (!validateName(firstName) || !validateName(lastName))
      throw createHttpError(400, 'Invalid first name or last name');

    if (!validateEmail(email)) throw createHttpError(400, 'Invalid email');

    const existingEmail = await UserModel.findOne({ email: email }).exec();

    if (existingEmail)
      throw createHttpError(
        409,
        'A user with this email address already exists. Please choose a different one or log in instead.'
      );

    if (!validatePassword(password))
      throw createHttpError(
        400,
        'Password must be at least 8-character long combination of at least one uppercase letter, one lowercase letter, one number, and one special character'
      );

    const passwordHashed = await bcrypt.hash(password, 10);

    if (!validateBirthdate(birthYear))
      throw createHttpError(400, 'Invalid age');

    const generatedUsername = await generateUsername(firstName.toLowerCase());

    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password: passwordHashed,
      username: generatedUsername,
      birthDay,
      birthMonth,
      birthYear,
      gender,
    });

    const token = jwt.sign({ id: newUser._id.toString() }, env.JWT_SECRET);

    res.send({
      message: 'Signed up successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        picture: newUser.picture,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        birthDate: {
          birthDay: newUser.birthDay,
          birthMonth: newUser.birthMonth,
          birthYear: newUser.birthYear,
        },
      },
      token,
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const login: RequestHandler<
  unknown,
  unknown,
  LogInBody,
  unknown
> = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user)
      throw createHttpError(
        400,
        'Invalid email. Check your data and try again.'
      );

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword)
      throw createHttpError(
        401,
        'Invalid password. Check your data and try again.'
      );

    const token = jwt.sign({ id: user._id.toString() }, env.JWT_SECRET);

    res.send({
      message: 'Logged in successfully',
      user: {
        id: user._id,
        username: user.username,
        picture: user.picture,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        birthDate: {
          birthDay: user.birthDay,
          birthMonth: user.birthMonth,
          birthYear: user.birthYear,
        },
      },
      token,
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const changePassword: RequestHandler<
  unknown,
  unknown,
  ChangePasswordBody,
  unknown
> = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword)
      throw createHttpError(
        400,
        'Please choose a different password than your current one.'
      );

    if (!validatePassword(password))
      throw createHttpError(
        400,
        'Password must be at least 8-character long combination of at least one uppercase letter, one lowercase letter, one number, and one special character'
      );

    const passwordHashed = await bcrypt.hash(password, 10);

    user.password = passwordHashed;

    await user.save();

    res.send({
      message: `Your password has been changed successfully`,
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const changeUserInfo: RequestHandler<
  { data: ChangeUserInfoData },
  unknown,
  ChangeUserInfoBody,
  unknown
> = async (req, res) => {
  function checkIfNotSame(
    user: User,
    field: ChangeUserInfoData,
    val:
      | string
      | {
          birthDay: number;
          birthMonth: number;
          birthYear: number;
        }
  ) {
    if (field === 'birthDate' && typeof val !== 'string') {
      const { birthDay, birthMonth, birthYear } = val;
      const newBirthDate = new Date(birthYear, birthMonth - 1, birthDay);
      const currentBirthDate = new Date(
        user.birthYear,
        user.birthMonth - 1,
        user.birthDay
      );

      if (newBirthDate.getTime() === currentBirthDate.getTime()) {
        throw createHttpError(
          400,
          `Please choose a different birth date than your current one.`
        );
      }

      if (!validateBirthdate(birthYear))
        throw createHttpError(400, 'Invalid age');
    } else if (
      typeof val === 'string' &&
      field !== 'birthDate' &&
      user[field] === val
    )
      throw createHttpError(
        400,
        `Please choose a different ${field
          .replace(/([A-Z])/, ' $1')
          .toLowerCase()} than your current one.`
      );
  }

  try {
    const { email, value } = req.body;
    const { data } = req.params;

    const user = await UserModel.findOne({ email });

    if (!user) throw createHttpError(404, 'User not found');

    checkIfNotSame(user, data, value);

    if (typeof value === 'string') {
      if (data === 'firstName' && !validateName(value))
        throw createHttpError(
          400,
          'Invalid first name. Check your data and try again.'
        );

      if (data === 'lastName' && !validateName(value))
        throw createHttpError(
          400,
          'Invalid last name. Check your data and try again.'
        );

      if (data === 'password' && !validatePassword(value))
        throw createHttpError(
          400,
          'Password must be at least 8-character long combination of at least one uppercase letter, one lowercase letter, one number, and one special character'
        );

      if (data === 'email') {
        if (!validateEmail(value))
          throw createHttpError(
            400,
            'Invalid email. Check your data and try again.'
          );

        const emailExists = await UserModel.findOne({ email: value });

        if (emailExists)
          throw createHttpError(
            400,
            'This email is already in use. Please choose a different email.'
          );
      }
    }

    if (data === 'birthDate' && typeof value !== 'string') {
      const { birthDay, birthMonth, birthYear } = value;
      user.birthDay = birthDay;
      user.birthMonth = birthMonth;
      user.birthYear = birthYear;
    } else if (data !== 'birthDate' && typeof value === 'string') {
      user[data] = value;
    }

    await user.save();

    const message = `Your ${
      data !== 'email' ? data.replace(/([A-Z])/, ' $1').toLowerCase() : data
    } has been changed successfully`;

    res.send({
      message,
      [data]: value,
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const deleteUser: RequestHandler<
  { id: string },
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id);

    if (!user) throw createHttpError(404, 'User not found');

    await UserModel.updateMany(
      {},
      {
        $pull: {
          search: { user: user._id },
          friends: user._id,
          sentFriendRequests: user._id,
          friendRequests: user._id,
        },
      }
    );

    await PostModel.updateMany(
      {},
      { $pull: { comments: { author: user._id } } }
    );

    await ReactionModel.deleteMany({ by: user._id });

    await PostModel.deleteMany({ user: user._id });

    await UserModel.deleteOne({ _id: id });

    res.send({
      message: 'Your account has been deleted successfully',
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const getUserProfile: RequestHandler<
  { username: string },
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await UserModel.findOne({ username: username })
      .select('-password')
      .populate('friends', 'picture firstName lastName username');

    if (!user) throw createHttpError(404, 'User not found');

    const userPosts = await PostModel.find({ user: user._id })
      .populate('user')
      .populate(
        'comments.author',
        'picture firstName lastName username commentAt'
      )
      .sort({ createdAt: -1 });

    res.json({ ...user.toObject(), userPosts });

    // If you want to use aggregate instead of populate, use this code
    /* const userAggregate = await UserModel.aggregate([
      { $match: { username: username } },
      { $project: { password: 0 } },
      {
        $lookup: {
          from: 'users',
          localField: 'friends',
          foreignField: '_id',
          as: 'friends',
        },
      },
      {
        $project: {
          'friends.birthDay': 0,
          'friends.birthMonth': 0,
          'friends.birthYear': 0,
          'friends.cover': 0,
          'friends.createdAt': 0,
          'friends.details': 0,
          'friends.gender': 0,
          'friends.friends': 0,
          'friends.friendRequests': 0,
          'friends.sentFriendRequests': 0,
          'friends.email': 0,
          'friends.password': 0,
          'friends.__v': 0,
          'friends.updatedAt': 0,
          'friends.search': 0,
        },
      },
    ]);

    const user = userAggregate[0];

    if (!user) throw createHttpError(404, 'User not found');

    const userPosts = await PostModel.aggregate([
      { $match: { user: user._id } },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      {
        $unwind: {
          path: '$comments',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'comments.author',
          foreignField: '_id',
          as: 'comments.author',
        },
      },
      {
        $unwind: {
          path: '$comments.author',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: '$_id',
          type: { $first: '$type' },
          images: { $first: '$images' },
          content: { $first: '$content' },
          user: { $first: '$user' },
          key: { $first: '$key' },
          audience: { $first: '$audience' },
          comments: { $push: '$comments' },
          createdAt: { $first: '$createdAt' },
          updatedAt: { $first: '$updatedAt' },
        },
      },
      {
        $project: {
          'comments.authorDetails': 0,
          'comments.author.password': 0,
          'comments.author.__v': 0,
          'comments.author.search': 0,
          'comments.author.gender': 0,
          'comments.author.birthDay': 0,
          'comments.author.birthMonth': 0,
          'comments.author.birthYear': 0,
          'comments.author.friends': 0,
          'comments.author.friendRequests': 0,
          'comments.author.details': 0,
          'comments.author.sentFriendRequests': 0,
          'comments.author.createdAt': 0,
          'comments.author.updatedAt': 0,
          'comments.author.email': 0,
        },
      },
      {
        $project: {
          _id: 1,
          type: 1,
          images: 1,
          content: 1,
          user: 1,
          key: 1,
          audience: 1,
          createdAt: 1,
          updatedAt: 1,
          comments: {
            $filter: {
              input: '$comments',
              as: 'comment',
              cond: { $ne: ['$$comment', {}] },
            },
          },
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    res.json({ ...user, userPosts }); */
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const updateProfileImage: RequestHandler<
  { id: string },
  unknown,
  ChangeProfileImageBody,
  unknown
> = async (req, res) => {
  try {
    const { userId, image } = req.body;

    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        picture: image,
      },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const updateCoverImage: RequestHandler<
  unknown,
  unknown,
  ChangeProfileImageBody,
  unknown
> = async (req, res) => {
  try {
    const { userId, image } = req.body;

    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        cover: image,
      },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const removeCoverPhoto: RequestHandler<
  { id: string },
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  try {
    const { id } = req.params;

    await UserModel.findByIdAndUpdate(id, {
      cover: '',
    });

    res.json({ message: 'Cover photo removed successfully' });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const removeProfilePicture: RequestHandler<
  { id: string },
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findByIdAndUpdate(
      id,
      {
        picture: UserModel.schema.path('picture').options.default,
      },
      { new: true }
    );

    res.json({ user, message: 'Profile picture removed successfully' });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const updateDetails: RequestHandler<
  unknown,
  unknown,
  UpdateUserDetailsBody,
  unknown
> = async (req, res) => {
  try {
    const { details, userId } = req.body;

    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        details,
      },
      { new: true }
    );

    res.json({ user, message: 'Profile details updated successfully' });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const addFriend: RequestHandler<
  { id: string },
  unknown,
  { userId: string },
  unknown
> = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (id === userId)
      throw createHttpError(400, 'You cannot add yourself as a friend');

    const receiver = await UserModel.findById(id);
    const user = await UserModel.findById(userId);

    if (user.friends.includes(receiver._id))
      throw createHttpError(400, 'This user is already your friend');

    if (user.friendRequests.includes(receiver._id))
      throw createHttpError(400, 'This user has already sent you a request');

    if (receiver.friendRequests.includes(user._id))
      throw createHttpError(
        400,
        'You have already sent a friend request to this user'
      );

    await user.updateOne({
      $push: { sentFriendRequests: receiver._id },
    });

    await receiver.updateOne({
      $push: { friendRequests: user._id },
    });

    res.json({ message: 'Friend request has been sent successfully' });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const cancelFriendRequest: RequestHandler<
  { id: string },
  unknown,
  { userId: string },
  unknown
> = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (id === userId)
      throw createHttpError(
        400,
        'You cannot cancel a friend request to yourself'
      );

    const user = await UserModel.findById(userId);
    const receiver = await UserModel.findById(id);

    if (user.friends.includes(receiver._id))
      throw createHttpError(400, 'This user is already your friend');

    if (!receiver.friendRequests.includes(user._id))
      throw createHttpError(
        400,
        'This user has already denied your friend request'
      );

    await user.updateOne({
      $pull: { sentFriendRequests: receiver._id },
    });

    await receiver.updateOne({
      $pull: { friendRequests: user._id },
    });

    res.json({ message: 'Friend request has been cancelled successfully' });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const acceptFriendRequest: RequestHandler<
  { id: string },
  unknown,
  { userId: string },
  unknown
> = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (id === userId)
      throw createHttpError(
        400,
        'You cannot accept a friend request from yourself'
      );

    const user = await UserModel.findById(userId);
    const sender = await UserModel.findById(id);

    if (sender.friends.includes(user._id))
      throw createHttpError(400, 'This user is already your friend');

    if (!sender.sentFriendRequests.includes(user._id))
      throw createHttpError(
        400,
        'This user has already canceled friend request'
      );

    await user.updateOne({
      $pull: { friendRequests: sender._id },
      $push: { friends: sender._id },
    });

    await sender.updateOne({
      $push: { friends: user._id },
      $pull: { sentFriendRequests: user._id },
    });

    res.json({ message: 'Friend request has been accepted successfully' });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const removeFriend: RequestHandler<
  { id: string },
  unknown,
  unknown,
  { userId: string }
> = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.query.userId;

    if (id === userId)
      throw createHttpError(400, "You can't unfriend yourself");

    const user = await UserModel.findById(userId);
    const friend = await UserModel.findById(id);

    if (
      !user.friends.includes(friend._id) &&
      !friend.friends.includes(user._id)
    )
      throw createHttpError(400, 'This user is not in your friend list');

    await friend.updateOne({ $pull: { friends: user._id } });
    await user.updateOne({ $pull: { friends: friend._id } });

    res.json({
      message: 'User has been removed from your friend list successfully',
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const removeFriendRequest: RequestHandler<
  { id: string },
  unknown,
  unknown,
  { userId: string }
> = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.query.userId;

    if (id === userId)
      throw createHttpError(400, "You can't delete a request from yourself");

    const user = await UserModel.findById(userId);
    const sender = await UserModel.findById(id);

    if (!user.friendRequests.includes(sender._id))
      throw createHttpError(
        400,
        'This user has already canceled friend request'
      );

    if (!sender.sentFriendRequests.includes(user._id))
      throw createHttpError(
        400,
        'This user has already canceled friend request'
      );

    await user.updateOne({ $pull: { friendRequests: sender._id } });
    await sender.updateOne({ $pull: { sentFriendRequests: user._id } });

    res.json({
      message: 'Friend request has been deleted successfully',
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const getUserById: RequestHandler<
  { id: string },
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id).select('-password');

    if (!user) throw createHttpError(404, 'User not found');

    res.json(user);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const searchUser: RequestHandler<
  { user: string },
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  try {
    const { user } = req.params;

    /* const result = await UserModel.find({
      $or: [
        { firstName: { $regex: user, $options: 'i' } },
        { lastName: { $regex: user, $options: 'i' } },
        { username: { $regex: user, $options: 'i' } },
      ],
    }).select('picture firstName lastName username'); */

    // If you want to use aggregate instead of populate, use this code
    const result = await UserModel.aggregate([
      {
        $addFields: {
          fullName: {
            $concat: ['$firstName', ' ', '$lastName'],
          },
        },
      },
      {
        $match: {
          $or: [
            { fullName: { $regex: user, $options: 'i' } },
            { username: { $regex: user, $options: 'i' } },
          ],
        },
      },
      {
        $project: {
          picture: 1,
          firstName: 1,
          lastName: 1,
          username: 1,
        },
      },
    ]);

    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const searchAdd: RequestHandler<
  { user: string },
  unknown,
  { id: string },
  unknown
> = async (req, res) => {
  try {
    const { user } = req.params;
    const { id } = req.body;

    const reqUser = await UserModel.findById(id);
    const index = reqUser.search.findIndex(
      item => item.user.toString() == user
    );

    if (index !== -1) {
      reqUser.search[index].createdAt = new Date();
      await reqUser.save();
    } else {
      reqUser.search.push({
        user: new mongoose.Types.ObjectId(user),
        createdAt: new Date(),
      });
      await reqUser.save();
    }

    const updatedUser = await UserModel.findById(id)
      .select('search')
      .populate('search.user', 'firstName lastName picture username');

    const sorted = updatedUser.search.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    res.json(sorted);

    // If you want to use aggregate instead of populate, use this code
    /* const updatedUser = await UserModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      { $unwind: '$search' },
      {
        $lookup: {
          from: 'users',
          localField: 'search.user',
          foreignField: '_id',
          as: 'search.user',
        },
      },
      { $unwind: '$search.user' },
      {
        $project: {
          'search.user._id': 1,
          'search.user.firstName': 1,
          'search.user.lastName': 1,
          'search.user.picture': 1,
          'search.user.username': 1,
          'search.createdAt': 1,
          'search._id': 1,
        },
      },
      { $sort: { 'search.createdAt': -1 } },
      {
        $group: {
          _id: '$_id',
          search: { $push: '$search' },
        },
      },
    ]);

    res.json(updatedUser[0].search); */
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const searchGet: RequestHandler<
  { id: string },
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  try {
    const { id } = req.params;

    const userSearchHistory = await UserModel.findById(id)
      .select('search')
      .populate('search.user', 'firstName lastName picture username');

    const sortedSearchHistory = userSearchHistory.search.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    res.json(sortedSearchHistory);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const searchDelete: RequestHandler<
  { user: string },
  unknown,
  unknown,
  { id: string }
> = async (req, res) => {
  try {
    const { user } = req.params;
    const id = req.query.id;

    const result = await UserModel.findByIdAndUpdate(
      id,
      {
        $pull: { search: { user: user } },
      },
      { new: true }
    )
      .select('search')
      .populate('search.user', 'firstName lastName picture username');

    const sortedResult = result.search.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    res.json(sortedResult);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const exportProfile: RequestHandler<
  { userId: string },
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  const { userId } = req.params;
  const user = await UserModel.findById(userId).select(
    'firstName lastName gender birthDay birthMonth birthYear -_id'
  );

  if (!user) {
    return res.status(404).send({ error: 'User not found' });
  }

  res.json(user);
};

export const importProfile: RequestHandler<
  { userId: string },
  unknown,
  ProfileImport,
  unknown
> = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = req.body;

    await ProfileImportSchema.validate(profile, { strict: true });
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const result = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $set: profile },
      { new: true }
    );

    res.json({ user: result, message: 'Profile imported successfully' });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
